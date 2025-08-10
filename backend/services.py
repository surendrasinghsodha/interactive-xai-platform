import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC, SVR
import uuid
import os
import shap
import lime
import lime.lime_tabular
import logging
from typing import Dict, Any, List
import io
import warnings
import json
from datetime import datetime
import re
from fastapi import HTTPException

warnings.filterwarnings('ignore')

from models import TrainRequest, ExplainRequest, FeedbackRequest

# Configure logging
logger = logging.getLogger(__name__)

# In-memory storage for models and data
MODELS_CACHE: Dict[str, Dict[str, Any]] = {}
FEEDBACK_CACHE: Dict[str, List[Dict[str, Any]]] = {}  # Store feedback per model
EXPLANATION_CACHE: Dict[str, Dict[str, Any]] = {}  # Store explanations with IDs
TRAINING_CANCELLED = False # Flag for training cancellation

def safe_float_conversion(value):
    """Safely convert value to float, handling arrays and edge cases."""
    try:
        if isinstance(value, np.ndarray):
            if value.size == 1:
                return float(value.item())
            elif value.size == 0:
                return 0.0
            else:
                return float(value.flatten()[0])
        elif hasattr(value, 'item'):
            return float(value.item())
        else:
            return float(value)
    except (ValueError, TypeError, AttributeError):
        return 0.0

def calculate_reliability_score(model_id: str, explanation_type: str = "both") -> float:
    """Calculate reliability score based on feedback history."""
    if model_id not in FEEDBACK_CACHE:
        return 0.5
    feedbacks = FEEDBACK_CACHE[model_id]
    if not feedbacks:
        return 0.5
    if explanation_type != "both":
        feedbacks = [f for f in feedbacks if f.get('explanation_type', 'both') == explanation_type]
    if not feedbacks:
        return 0.5
    total_weight = 0
    weighted_sum = 0
    for i, feedback in enumerate(reversed(feedbacks[-10:])):
        weight = (i + 1) / 10
        rating = feedback['rating']
        normalized_rating = (rating - 1) / 4
        weighted_sum += normalized_rating * weight
        total_weight += weight
    return weighted_sum / total_weight if total_weight > 0 else 0.5

def adjust_explanation_parameters(model_id: str, avg_rating: float) -> Dict[str, Any]:
    """Adjust explanation parameters based on average rating."""
    params = {
        "shap_samples": 50, "lime_samples": 100, "num_features": 10,
        "use_tree_explainer": True, "discretize_continuous": True
    }
    if avg_rating >= 4.0:
        params.update({"shap_samples": 100, "lime_samples": 200, "num_features": 15})
    elif avg_rating < 3.0:
        params.update({
            "shap_samples": 30, "lime_samples": 50, "num_features": 8,
            "use_tree_explainer": False, "discretize_continuous": False
        })
    return params

def get_improvement_suggestions(avg_rating: float, feedback_comments: List[str]) -> List[str]:
    """Generate improvement suggestions based on rating and comments."""
    suggestions = []
    if avg_rating < 2.0:
        suggestions.extend([
            "Consider using a different model type for better explanations",
            "Try collecting more training data to improve model stability"
        ])
    elif avg_rating < 3.0:
        suggestions.extend([
            "Explanation parameters have been adjusted for better clarity",
            "Try different data points to see varied explanations"
        ])
    else:
        suggestions.append("Great! The current explanation approach works well for your data")
    comment_text = " ".join(feedback_comments).lower()
    if "confusing" in comment_text or "unclear" in comment_text:
        suggestions.append("Explanation clarity has been prioritized in the updated parameters")
    if "slow" in comment_text or "time" in comment_text:
        suggestions.append("Explanation speed has been optimized")
    return suggestions[:3]

def get_model_instance(model_type: str, problem_type: str):
    """Returns a model instance based on type and problem with efficiency optimizations."""
    if problem_type == "classification":
        models = {
            "random_forest": RandomForestClassifier(random_state=42, n_estimators=10, max_depth=5, n_jobs=-1),
            "decision_tree": DecisionTreeClassifier(random_state=42, max_depth=5),
            "logistic_regression": LogisticRegression(random_state=42, max_iter=1000, solver='saga', n_jobs=-1),
            "svm": SVC(probability=True, random_state=42, kernel='linear', cache_size=500),
        }
    else:  # regression
        models = {
            "random_forest": RandomForestRegressor(random_state=42, n_estimators=10, max_depth=5, n_jobs=-1),
            "decision_tree": DecisionTreeRegressor(random_state=42, max_depth=5),
            "linear_regression": LinearRegression(n_jobs=-1),
            "svm": SVR(kernel='linear', cache_size=500),
        }
    model = models.get(model_type)
    if model is None:
        raise ValueError(f"Unsupported model type '{model_type}' for {problem_type}.")
    return model

def inspect_csv_service(file_contents: bytes):
    """Reads CSV contents and returns columns and sample data."""
    try:
        df = pd.read_csv(io.BytesIO(file_contents))
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
        sample_data = df.head().replace({np.nan: None}).to_dict(orient='records')
        return {"columns": df.columns.tolist(), "sample_data": sample_data}
    except Exception as e:
        logger.error(f"Failed to read CSV: {e}")
        raise ValueError("Invalid CSV file. Please ensure it is correctly formatted.")

def cancel_training_service():
    """Sets the global flag to cancel training."""
    global TRAINING_CANCELLED
    TRAINING_CANCELLED = True
    logger.info("Training cancellation signal received. The current training job will be stopped.")
    return {"message": "Training cancellation signal sent successfully."}

def train_model_service(file_contents: bytes, request: TrainRequest):
    """The core service for training a model from file contents."""
    global TRAINING_CANCELLED
    TRAINING_CANCELLED = False

    if TRAINING_CANCELLED:
        logger.info("Training was cancelled before it began.")
        return {"status": "cancelled", "message": "Training cancelled by user."}

    df = pd.read_csv(io.BytesIO(file_contents))
    # FIX: Remove the "Unnamed: 0" column that pandas often adds
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

    if request.target_column not in df.columns:
        raise ValueError(f"Target column '{request.target_column}' not found in the dataset.")

    X = df.drop(columns=[request.target_column])
    y = df[request.target_column]

    problem_type = "regression" if y.dtype != 'object' and y.nunique() >= 10 else "classification"
    logger.info(f"Detected problem type: {problem_type}")

    numeric_features = X.select_dtypes(include=np.number).columns.tolist()
    categorical_features = X.select_dtypes(include=['object', 'category']).columns.tolist()

    numeric_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())])
    categorical_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='most_frequent')), ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False, drop='first'))])

    transformers = []
    if numeric_features:
        transformers.append(('num', numeric_transformer, numeric_features))
    if categorical_features:
        transformers.append(('cat', categorical_transformer, categorical_features))

    preprocessor = ColumnTransformer(transformers=transformers, remainder='drop')
    model = get_model_instance(request.model_type, problem_type)
    pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', model)])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    if TRAINING_CANCELLED:
        logger.info("Training cancelled before model fitting.")
        return {"status": "cancelled", "message": "Training cancelled by user."}

    pipeline.fit(X_train, y_train)

    model_id = str(uuid.uuid4())
    MODELS_CACHE[model_id] = {
        "pipeline": pipeline, "X_train": X_train, "X_test": X_test, "y_train": y_train, "y_test": y_test,
        "feature_names": X.columns.tolist(), "categorical_features": categorical_features,
        "numeric_features": numeric_features, "problem_type": problem_type,
        "target_column": request.target_column, "preprocessor": preprocessor, "model": model,
        "original_data": df, "created_at": datetime.now().isoformat()
    }
    FEEDBACK_CACHE[model_id] = []
    logger.info(f"Model {model_id} trained and cached.")

    return {
        "model_id": model_id, "message": "Model trained successfully.", "columns": X.columns.tolist(),
        "problem_type": problem_type, "target_column": request.target_column,
        "numeric_columns": numeric_features,
        "sample_data": df.head(10).replace({np.nan: None}).to_dict(orient='records'),
    }

def explain_model_service(request: ExplainRequest):
    """The core service for generating explanations with feedback-based adjustments."""
    try:
        model_data = MODELS_CACHE.get(request.model_id)
        if not model_data:
            raise ValueError("Model not found. Please train the model first.")
        
        avg_rating = 3.0
        if request.model_id in FEEDBACK_CACHE and FEEDBACK_CACHE[request.model_id]:
            ratings = [f['rating'] for f in FEEDBACK_CACHE[request.model_id]]
            avg_rating = sum(ratings) / len(ratings)
        
        params = adjust_explanation_parameters(request.model_id, avg_rating)
        
        pipeline = model_data["pipeline"]
        X_train = model_data["X_train"]
        feature_names = model_data["feature_names"]
        problem_type = model_data["problem_type"]
        categorical_features = model_data["categorical_features"]
        numeric_features = model_data["numeric_features"]
        
        data_point_df = pd.DataFrame([request.data_point])
        for col in feature_names:
            if col not in data_point_df.columns:
                data_point_df[col] = 'unknown' if col in categorical_features else 0
        data_point_df = data_point_df[feature_names]
        
        for col in feature_names:
            if col in categorical_features:
                data_point_df[col] = data_point_df[col].astype(str)
            elif col in numeric_features:
                data_point_df[col] = pd.to_numeric(data_point_df[col], errors='coerce').fillna(0)
        
        preprocessor = pipeline.named_steps['preprocessor']
        model = pipeline.named_steps['classifier']
        
        X_train_transformed = preprocessor.transform(X_train)
        data_point_transformed = preprocessor.transform(data_point_df)
        
        try:
            transformed_feature_names = preprocessor.get_feature_names_out()
        except:
            transformed_feature_names = [f"feature_{i}" for i in range(X_train_transformed.shape[1])]
        
        shap_explanation = None
        try:
            if params["use_tree_explainer"] and hasattr(model, 'feature_importances_'):
                explainer = shap.TreeExplainer(model)
                shap_values_raw = explainer.shap_values(data_point_transformed)
                shap_values = shap_values_raw[1].flatten() if isinstance(shap_values_raw, list) and len(shap_values_raw) > 1 else (shap_values_raw[0].flatten() if isinstance(shap_values_raw, list) else shap_values_raw.flatten())
                base_value = explainer.expected_value
                base_value = base_value[1] if isinstance(base_value, (list, np.ndarray)) and len(base_value) > 1 else (base_value[0] if isinstance(base_value, (list, np.ndarray)) else base_value)
                base_value_float = safe_float_conversion(base_value)
                shap_values_list = [safe_float_conversion(val) for val in shap_values]
                feature_importance = sorted(list(zip(transformed_feature_names, shap_values_list)), key=lambda x: abs(x[1]), reverse=True)
                top_features = feature_importance[:params["num_features"]]
                shap_explanation = {"features": [f[0] for f in top_features], "shap_values": [f[1] for f in top_features], "base_value": base_value_float, "explainer_type": "TreeExplainer", "reliability_score": calculate_reliability_score(request.model_id, "shap")}
            else:
                background_sample = shap.sample(X_train_transformed, params["shap_samples"])
                predict_fn = model.predict_proba if problem_type == "classification" and hasattr(model, 'predict_proba') else model.predict
                explainer = shap.KernelExplainer(predict_fn, background_sample)
                shap_values_raw = explainer.shap_values(data_point_transformed)
                shap_values = shap_values_raw[1][0] if isinstance(shap_values_raw, list) and len(shap_values_raw) > 1 else (shap_values_raw[0][0] if isinstance(shap_values_raw, list) else shap_values_raw[0])
                base_value = explainer.expected_value
                base_value = base_value[1] if isinstance(base_value, (list, np.ndarray)) and len(base_value) > 1 else (base_value[0] if isinstance(base_value, (list, np.ndarray)) else base_value)
                base_value_float = safe_float_conversion(base_value)
                shap_values_list = [safe_float_conversion(val) for val in shap_values]
                feature_importance = sorted(list(zip(transformed_feature_names, shap_values_list)), key=lambda x: abs(x[1]), reverse=True)
                top_features = feature_importance[:params["num_features"]]
                shap_explanation = {"features": [f[0] for f in top_features], "shap_values": [f[1] for f in top_features], "base_value": base_value_float, "explainer_type": "KernelExplainer", "reliability_score": calculate_reliability_score(request.model_id, "shap")}
        except Exception as e:
            logger.error(f"SHAP explanation failed: {e}")
            shap_explanation = {"features": ["Error"], "shap_values": [0], "base_value": 0, "explainer_type": "ErrorFallback", "reliability_score": 0.1}

        lime_explanation = None
        try:
            X_train_numeric = X_train.copy()
            data_point_numeric = data_point_df.copy()
            label_encoders = {}
            for col in categorical_features:
                if col in X_train_numeric.columns:
                    le = LabelEncoder()
                    X_train_numeric[col] = le.fit_transform(X_train_numeric[col].astype(str))
                    label_encoders[col] = le
                    try:
                        data_point_numeric[col] = le.transform(data_point_numeric[col].astype(str))
                    except ValueError:
                        data_point_numeric[col] = -1
            X_train_numeric.fillna(0, inplace=True)
            data_point_numeric.fillna(0, inplace=True)
            lime_explainer = lime.lime_tabular.LimeTabularExplainer(training_data=X_train_numeric.values, feature_names=feature_names, class_names=['0', '1'] if problem_type == "classification" else None, mode=problem_type, discretize_continuous=params["discretize_continuous"], random_state=42)
            def predict_fn_lime(x):
                df_pred = pd.DataFrame(x, columns=feature_names)
                for col, le in label_encoders.items():
                    if col in df_pred.columns:
                        try:
                            df_pred[col] = le.inverse_transform(df_pred[col].astype(int))
                        except:
                            df_pred[col] = 'unknown'
                predict_fn = pipeline.predict_proba if problem_type == "classification" else lambda d: pipeline.predict(d).reshape(-1, 1)
                return predict_fn(df_pred)
            lime_exp = lime_explainer.explain_instance(data_point_numeric.iloc[0].values, predict_fn_lime, num_features=params["num_features"], num_samples=params["lime_samples"])
            
            # FIX: Process LIME results to match SHAP's feature format
            lime_list = lime_exp.as_list()
            processed_lime_exp = {}
            for feature_str, value in lime_list:
                base_feature = None
                for name in feature_names:
                    if re.match(rf"^{re.escape(name)}\b", feature_str):
                        base_feature = name
                        break
                
                if not base_feature:
                    continue

                if base_feature in numeric_features:
                    transformed_name = f"num__{base_feature}"
                    processed_lime_exp[transformed_name] = processed_lime_exp.get(transformed_name, 0) + value
                elif base_feature in categorical_features:
                    match = re.search(r"=\s*(.+)", feature_str)
                    if match:
                        val_part = match.group(1).strip()
                        transformed_name = f"cat__{base_feature}_{val_part}"
                        processed_lime_exp[transformed_name] = value
                    else:
                        processed_lime_exp[f"cat__{base_feature}"] = value

            lime_explanation = {"lime_explanation": processed_lime_exp, "reliability_score": calculate_reliability_score(request.model_id, "lime")}
        except Exception as e:
            logger.error(f"LIME explanation failed: {e}")
            lime_explanation = {"lime_explanation": {"Error": 0}, "reliability_score": 0.1}

        overall_reliability = calculate_reliability_score(request.model_id, "both")
        explanation_id = str(uuid.uuid4())
        EXPLANATION_CACHE[explanation_id] = {"model_id": request.model_id, "shap": shap_explanation, "lime": lime_explanation, "overall_reliability": overall_reliability, "timestamp": datetime.now().isoformat(), "parameters_used": params}
        return {"shap": shap_explanation, "lime": lime_explanation, "overall_reliability": overall_reliability, "explanation_id": explanation_id}
    except Exception as e:
        logger.error(f"Explanation service error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to generate explanation.")

def handle_feedback_service(request: FeedbackRequest):
    """Handle user feedback and update model parameters."""
    try:
        if request.model_id not in MODELS_CACHE:
            raise ValueError("Model not found")
        if request.model_id not in FEEDBACK_CACHE:
            FEEDBACK_CACHE[request.model_id] = []
        feedback_entry = {"rating": request.rating, "comment": request.comment, "explanation_type": request.explanation_type, "explanation_id": request.explanation_id, "timestamp": datetime.now().isoformat()}
        FEEDBACK_CACHE[request.model_id].append(feedback_entry)
        updated_reliability = calculate_reliability_score(request.model_id, request.explanation_type)
        all_feedback = FEEDBACK_CACHE[request.model_id]
        avg_rating = sum(f['rating'] for f in all_feedback) / len(all_feedback)
        comments = [f['comment'] for f in all_feedback if f['comment']]
        suggestions = get_improvement_suggestions(avg_rating, comments)
        logger.info(f"Feedback received for model {request.model_id}: Rating {request.rating}, Updated reliability: {updated_reliability}")
        return {"message": "Feedback has been received successfully. Explanation parameters have been updated according to your input", "updated_reliability": updated_reliability, "improvement_suggestions": suggestions}
    except Exception as e:
        logger.error(f"Error processing feedback: {e}")
        raise ValueError(f"Could not process feedback: {str(e)}")
