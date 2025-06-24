import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
import pickle
from io import StringIO

# In-memory model storage
MODEL_STORE = {}


def train_model(model_type: str, csv_content: str):
    df = pd.read_csv(StringIO(csv_content))

    if 'target' not in df.columns:
        raise ValueError("Uploaded CSV must contain a 'target' column.")

    X = df.drop(columns=['target'])
    y = df['target']

    if y.nunique() < 2:
        raise ValueError("Target column must contain at least 2 classes.")

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    model = {
        "random_forest": RandomForestClassifier(),
        "logistic_regression": LogisticRegression(max_iter=1000),
        "naive_bayes": GaussianNB(),
        "decision_tree": DecisionTreeClassifier()
    }.get(model_type)

    if model is None:
        raise ValueError(f"Unsupported model type: {model_type}")

    model.fit(X_train, y_train)

    # Save model in memory store
    MODEL_STORE[model_type] = model
    return model, X
