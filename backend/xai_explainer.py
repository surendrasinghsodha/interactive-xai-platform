import shap
import lime.lime_tabular
import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator

# ---------------------------
# Get SHAP Explainer for any model
# ---------------------------
def get_shap_explainer(model: BaseEstimator, X_background: pd.DataFrame):
    try:
        # If model is tree-based
        return shap.Explainer(model, X_background)
    except Exception:
        # Fallback for others
        return shap.Explainer(model.predict_proba, X_background)

# ---------------------------
# SHAP Explanation Function
# ---------------------------
def explain_with_shap(model: BaseEstimator, features: list, X_background: pd.DataFrame, target_class: int = 1):
    sample = pd.DataFrame([features], columns=X_background.columns)
    explainer = get_shap_explainer(model, X_background)
    shap_values = explainer(sample)

    try:
        # For classification models
        values = shap_values.values[target_class][0]
    except (IndexError, TypeError):
        # For regression or fallback
        values = shap_values.values[0]

    return {
        "features": X_background.columns.tolist(),
        "shap_values": values.tolist()
    }

# ---------------------------
# LIME Explanation Function
# ---------------------------
def explain_with_lime(model: BaseEstimator, features: list, X_background: pd.DataFrame):
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
