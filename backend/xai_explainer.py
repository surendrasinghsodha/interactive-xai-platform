import shap
import lime.lime_tabular
import numpy as np
import pandas as pd
import pickle
from sklearn.base import BaseEstimator

# Path to background data used for explanation
BACKGROUND_DATA_PATH = "backend/sample_data/sample.csv"

# Load and prepare background data
df_background = pd.read_csv(BACKGROUND_DATA_PATH)
X_background = df_background.drop(columns=["target"])  # Assumes "target" is the label column


# SHAP: Return the most appropriate explainer
def get_shap_explainer(model: BaseEstimator):
    try:
        # Tree-based models
        return shap.TreeExplainer(model)
    except Exception:
        # Fallback for non-tree models
        return shap.Explainer(model.predict_proba, X_background)


def explain_with_shap(model: BaseEstimator, features: list, target_class: int = 1):
    """
    Explains a prediction using SHAP values.
    Args:
        model: Trained ML model
        features: List of input features
        target_class: Class index for explanation (default: 1 for binary classification)
    Returns:
        Dictionary with feature names and SHAP values
    """
    explainer = get_shap_explainer(model)

    # Ensure input format
    sample = pd.DataFrame([features], columns=X_background.columns)

    # Get SHAP values
    shap_values = explainer(sample)

    # Defensive extraction: classification returns 3D, regression returns 2D
    try:
        values = shap_values.values[target_class][0]  # binary/multiclass case
    except (IndexError, TypeError):
        values = shap_values.values[0]  # regression or fallback

    return {
        "features": X_background.columns.tolist(),
        "shap_values": values.tolist()
    }


def explain_with_lime(model: BaseEstimator, features: list):
    """
    Explains a prediction using LIME.
    Args:
        model: Trained ML model
        features: List of input features
    Returns:
        Dictionary of feature impacts from LIME
    """
    explainer = lime.lime_tabular.LimeTabularExplainer(
        training_data=X_background.values,
        feature_names=X_background.columns.tolist(),
        class_names=["Class 0", "Class 1"],
        mode="classification"
    )

    explanation = explainer.explain_instance(
        np.array(features),
        model.predict_proba,
        num_features=len(features)
    )

    return {
        "lime_explanation": dict(explanation.as_list())
    }
