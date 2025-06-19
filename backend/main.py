from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.model import load_model, predict_instance
from backend.xai_explainer import explain_with_shap, explain_with_lime
from backend.schemas import InputData
import pandas as pd

app = FastAPI()

# Allow frontend (React) access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained model
model = load_model()

@app.post("/predict")
def predict(data: InputData):
    prediction = predict_instance(model, data.features)
    return {"prediction": prediction}

@app.post("/explain/shap")
def shap_explanation(data: InputData):
    explanation = explain_with_shap(model, data.features)
    return explanation

@app.post("/explain/lime")
def lime_explanation(data: InputData):
    explanation = explain_with_lime(model, data.features)
    return explanation
