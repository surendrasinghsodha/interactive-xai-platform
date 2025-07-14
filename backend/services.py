import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
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

from models import TrainRequest, ExplainRequest, FeedbackRequest

# Configure logging
logger = logging.getLogger(__name__)

# In-memory storage for models and data
MODELS_CACHE: Dict[str, Dict[str, Any]] = {}

def get_model_instance(model_type: str, problem_type: str):
    """Returns a model instance based on type and problem."""
    if problem_type == "classification":
        models = {
            "random_forest": RandomForestClassifier(random_state=42, n_estimators=10),
            "decision_tree": DecisionTreeClassifier(random_state=42, max_depth=5),
            "logistic_regression": LogisticRegression(random_state=42, max_iter=1000),
            "svm": SVC(probability=True, random_state=42, kernel='linear'),
        }
    else:  # regression
        models = {
            "random_forest": RandomForestRegressor(random_state=42, n_estimators=10),
            "decision_tree": DecisionTreeRegressor(random_state=42, max_depth=5),
            "linear_regression": LinearRegression(),
            "svm": SVR(kernel='linear'),
        }
    
    model = models.get(model_type)
    if model is None:
        raise ValueError(f"Unsupported model type '{model_type}' for {problem_type}.")
    return model

def inspect_csv_service(file_contents: bytes):
    """Reads CSV contents and returns columns and sample data."""
    try:
        df = pd.read_csv(io.BytesIO(file_contents))
        # Replace non-serializable values like NaN with None
        sample_data = df.head().replace({np.nan: None}).to_dict(orient='records')
        return {"columns": df.columns.tolist(), "sample_data": sample_data}
    except Exception as e:
        logger.error(f"Failed to read CSV: {e}")
        raise ValueError("Invalid CSV file. Please ensure it is correctly formatted.")

def train_model_service(file_contents: bytes, request: TrainRequest):
    """The core service for training a model from file contents."""
    df = pd.read_csv(io.BytesIO(file_contents))
    
    if request.target_column not in df.columns:
        raise ValueError(f"Target column '{request.target_column}' not found in the dataset.")

    X = df.drop(columns=[request.target_column])
    y = df[request.target_column]

    # Detect problem type
    if y.dtype == 'object' or y.nunique() < 10:
        problem_type = "classification"
    else:
        problem_type = "regression"
    
    logger.info(f"Detected problem type: {problem_type}")

    # Identify column types
    numeric_features = X.select_dtypes(include=np.number).columns.tolist()
    categorical_features = X.select_dtypes(include=['object', 'category']).columns.tolist()

    # Create preprocessing pipelines
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')), 
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')), 
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])

    preprocessor = ColumnTransformer(transformers=[
        ('num', numeric_transformer, numeric_features), 
        ('cat', categorical_transformer, categorical_features)
    ])
    
    model = get_model_instance(request.model_type, problem_type)
    pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', model)])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    pipeline.fit(X_train, y_train)

    model_id = str(uuid.uuid4())
    MODELS_CACHE[model_id] = {
        "pipeline": pipeline,
        "X_train": X_train,
        "X_test": X_test,
        "y_train": y_train,
        "y_test": y_test,
        "feature_names": X.columns.tolist(),
        "categorical_features": [X.columns.get_loc(c) for c in categorical_features],
        "problem_type": problem_type,
        "target_column": request.target_column,
        "preprocessor": preprocessor,
        "model": model,
    }
    
    logger.info(f"Model {model_id} trained and cached.")

    return {
        "model_id": model_id,
        "message": "Model trained successfully.",
        "columns": X.columns.tolist(),
        "problem_type": problem_type,
        "target_column": request.target_column,
        "numeric_columns": numeric_features,
        "sample_data": df.head(10).replace({np.nan: None}).to_dict(orient='records'),
    }

def explain_model_service(request: ExplainRequest):
    """The core service for generating explanations."""
    try:
        model_data = MODELS_CACHE.get(request.model_id)
        if not model_data:
            raise ValueError("Model not found. Please train the model first.")

        pipeline = model_data["pipeline"]
        X_train = model_data["X_train"]
        feature_names = model_data["feature_names"]
        problem_type = model_data["problem_type"]
        
        # Convert data point to DataFrame
        data_point_df = pd.DataFrame([request.data_point])[feature_names]
        
        # Get preprocessor and model from pipeline
        preprocessor = pipeline.named_steps['preprocessor']
        model = pipeline.named_steps['classifier']
        
        # Transform training data and data point
        X_train_transformed = preprocessor.transform(X_train)
        data_point_transformed = preprocessor.transform(data_point_df)
        
        # Get feature names after transformation
        try:
            transformed_feature_names = preprocessor.get_feature_names_out()
        except:
            # Fallback if get_feature_names_out() is not available
            transformed_feature_names = [f"feature_{i}" for i in range(X_train_transformed.shape[1])]

        # SHAP Explanation
        try:
            # Use a smaller sample for faster computation
            background_sample = shap.sample(X_train_transformed, min(50, X_train_transformed.shape[0]))
            
            if problem_type == "classification" and hasattr(model, 'predict_proba'):
                explainer = shap.KernelExplainer(model.predict_proba, background_sample)
                shap_values_raw = explainer.shap_values(data_point_transformed)
                
                # Handle different SHAP output formats
                if isinstance(shap_values_raw, list):
                    # Multi-class case - take the positive class (usually index 1)
                    shap_values = shap_values_raw[1][0] if len(shap_values_raw) > 1 else shap_values_raw[0][0]
                    base_value = explainer.expected_value[1] if len(explainer.expected_value) > 1 else explainer.expected_value[0]
                else:
                    # Binary case
                    shap_values = shap_values_raw[0]
                    base_value = explainer.expected_value
            else:
                # Regression case
                explainer = shap.KernelExplainer(model.predict, background_sample)
                shap_values_raw = explainer.shap_values(data_point_transformed)
                shap_values = shap_values_raw[0]
                base_value = explainer.expected_value

            # Ensure arrays are properly converted to lists
            shap_values_list = [float(val) for val in np.array(shap_values).flatten()]
            base_value_float = float(np.array(base_value).item() if hasattr(base_value, 'item') else base_value)
            
            shap_explanation = {
                "features": transformed_feature_names.tolist()[:len(shap_values_list)],
                "shap_values": shap_values_list,
                "base_value": base_value_float,
                "explainer_type": "KernelExplainer"
            }
            
        except Exception as e:
            logger.error(f"SHAP explanation failed: {e}")
            # Fallback SHAP explanation
            shap_explanation = {
                "features": feature_names,
                "shap_values": [0.0] * len(feature_names),
                "base_value": 0.0,
                "explainer_type": "Fallback"
            }

        # LIME Explanation
        try:
            lime_explainer = lime.lime_tabular.LimeTabularExplainer(
                training_data=X_train.values,
                feature_names=feature_names,
                class_names=['0', '1'] if problem_type == "classification" else None,
                categorical_features=model_data["categorical_features"],
                mode=problem_type,
                discretize_continuous=True
            )

            def predict_fn(x):
                try:
                    df = pd.DataFrame(x, columns=feature_names)
                    # Ensure proper data types
                    for col in feature_names:
                        if col in X_train.columns:
                            df[col] = df[col].astype(X_train[col].dtype)
                    
                    if problem_type == "classification":
                        return pipeline.predict_proba(df)
                    else:
                        predictions = pipeline.predict(df)
                        return predictions.reshape(-1, 1)
                except Exception as e:
                    logger.error(f"Predict function error: {e}")
                    # Return default predictions
                    if problem_type == "classification":
                        return np.array([[0.5, 0.5]] * len(x))
                    else:
                        return np.array([[0.0]] * len(x))

            lime_exp = lime_explainer.explain_instance(
                data_point_df.iloc[0].values, 
                predict_fn, 
                num_features=min(10, len(feature_names))
            )
            
            lime_explanation = {"lime_explanation": dict(lime_exp.as_list())}
            
        except Exception as e:
            logger.error(f"LIME explanation failed: {e}")
            # Fallback LIME explanation
            lime_explanation = {
                "lime_explanation": {feature: 0.0 for feature in feature_names[:5]}
            }

        return {"shap": shap_explanation, "lime": lime_explanation}
        
    except Exception as e:
        logger.error(f"Explanation service error: {e}", exc_info=True)
        raise ValueError(f"Failed to generate explanations: {str(e)}")

def handle_feedback_service(request: FeedbackRequest):
    """Placeholder for handling user feedback."""
    logger.info(f"Feedback received for model {request.model_id}: Rating {request.rating}, Comment: {request.comment}")
    return {"message": "Feedback received successfully."}
