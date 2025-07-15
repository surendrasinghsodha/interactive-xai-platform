from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from enum import Enum

class ModelType(str, Enum):
    random_forest = "random_forest"
    decision_tree = "decision_tree"
    logistic_regression = "logistic_regression"
    svm = "svm"
    linear_regression = "linear_regression"

class ProblemType(str, Enum):
    CLASSIFICATION = "classification"
    REGRESSION = "regression"

class InspectResponse(BaseModel):
    columns: List[str]
    sample_data: List[Dict[str, Any]]

class TrainRequest(BaseModel):
    model_type: ModelType
    target_column: str

class TrainResponse(BaseModel):
    model_id: str
    message: str
    columns: List[str]
    problem_type: ProblemType
    target_column: str
    numeric_columns: List[str]
    sample_data: List[Dict[str, Any]]

class ExplainRequest(BaseModel):
    model_id: str
    data_point: Dict[str, Any]

class ShapExplanation(BaseModel):
    features: List[str]
    shap_values: List[float]
    base_value: float
    explainer_type: str
    reliability_score: Optional[float] = None

class LimeExplanation(BaseModel):
    lime_explanation: Dict[str, float]
    reliability_score: Optional[float] = None

class ExplainResponse(BaseModel):
    shap: ShapExplanation
    lime: LimeExplanation
    overall_reliability: Optional[float] = None

class FeedbackRequest(BaseModel):
    model_id: str
    explanation_id: Optional[str] = None
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None
    explanation_type: Optional[str] = "both"  # "shap", "lime", or "both"

class FeedbackResponse(BaseModel):
    message: str
    updated_reliability: Optional[float] = None
    improvement_suggestions: Optional[List[str]] = None
