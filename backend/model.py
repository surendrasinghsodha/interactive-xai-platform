import pickle
import numpy as np


MODEL_PATH = "saved_models/model.pkl"


def load_model():
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    return model

def predict_instance(model, features: list):
    X = np.array(features).reshape(1, -1)
    prediction = model.predict(X)
    return int(prediction[0])
