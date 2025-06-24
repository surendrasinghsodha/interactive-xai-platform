from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import InputData, ModelTrainRequest, FeedbackRequest
from backend.train_model import train_model, MODEL_STORE
from backend.xai_explainer import explain_with_shap, explain_with_lime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Track current training data (X) used per model type
current_X = {}

# -------------------------
# Train Model Endpoint
# -------------------------
@app.post("/train")
def train_endpoint(payload: ModelTrainRequest):
    model, X = train_model(payload.model_type, payload.csv_data)
    MODEL_STORE[payload.model_type] = model     # Save model in memory store
    current_X[payload.model_type] = X           # Save X for this model type
    return {
        "status": "✅ Model trained successfully",
        "columns": X.columns.tolist()
    }

# -------------------------
# SHAP Explanation Endpoint
# -------------------------
@app.post("/explain/shap")
def explain_shap(payload: InputData, model_type: str):
    model = MODEL_STORE.get(model_type)
    X = current_X.get(model_type)
    if not model or X is None:
        return {"error": "❌ Model not found or not trained."}
    return explain_with_shap(model, payload.features, X)

# -------------------------
# LIME Explanation Endpoint
# -------------------------
@app.post("/explain/lime")
def explain_lime(payload: InputData, model_type: str):
    model = MODEL_STORE.get(model_type)
    X = current_X.get(model_type)
    if not model or X is None:
        return {"error": "❌ Model not found or not trained."}
    return explain_with_lime(model, payload.features, X)

# -------------------------
# Feedback Loop Endpoint
# -------------------------
@app.post("/feedback")
def feedback_loop(payload: FeedbackRequest):
    model = MODEL_STORE.get(payload.model_type)
    X = current_X.get(payload.model_type)

    if not model or X is None:
        return {"error": "❌ No existing model to retrain."}

    if payload.feedback_rating >= 3:
        return {"status": "✅ Thank you for your feedback!"}

    # If feedback is poor (e.g., < 3), retrain using current features and predicted labels
    pseudo_y = model.predict(X)
    df_for_retraining = X.copy()
    df_for_retraining["target"] = pseudo_y

    # Retrain model
    retrained_model, X_new = train_model(payload.model_type, df_for_retraining.to_csv(index=False))
    MODEL_STORE[payload.model_type] = retrained_model
    current_X[payload.model_type] = X_new

    # Return updated explanations
    shap_expl = explain_with_shap(retrained_model, payload.features, X_new)
    lime_expl = explain_with_lime(retrained_model, payload.features, X_new)

    return {
        "status": "🔁 Model retrained due to low feedback",
        "shap": shap_expl,
        "lime": lime_expl
    }
