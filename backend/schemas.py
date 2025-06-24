from pydantic import BaseModel
from typing import List, Optional

class InputData(BaseModel):
    features: List[float]

class ModelTrainRequest(BaseModel):
    model_type: str  # "random_forest", "logistic_regression", etc.
    csv_data: str     # CSV file content (base64 or raw string)

class FeedbackRequest(BaseModel):
    model_type: str
    features: List[float]
    feedback_rating: int  # 1 to 5
