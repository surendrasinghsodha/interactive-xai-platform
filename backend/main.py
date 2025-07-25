import os
import sys
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool
import traceback
import asyncio

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import TrainRequest, ExplainRequest, FeedbackRequest
import services

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Interactive XAI Platform API", version="1.0.0")

# Global variable to track training cancellation
training_cancelled = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/inspect-csv")
async def inspect_csv_endpoint(file: UploadFile = File(...)):
    try:
        logger.info(f"Inspecting file: {file.filename}")
        contents = await file.read()
        return await run_in_threadpool(services.inspect_csv_service, contents)
    except Exception as e:
        logger.error(f"Error during CSV inspection: {e}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload-data")
async def upload_data_endpoint(file: UploadFile = File(...)):
    try:
        logger.info(f"Uploading file: {file.filename}")
        contents = await file.read()
        return await run_in_threadpool(services.inspect_csv_service, contents)
    except Exception as e:
        logger.error(f"Error during data upload: {e}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/train")
async def train_model_endpoint(request: dict):
    global training_cancelled
    training_cancelled = False
    
    try:
        logger.info(f"Training request: {request}")
        
        # Create TrainRequest object from the request data
        train_request = TrainRequest(
            model_type=request.get("model_type"),
            target_column=request.get("target_column"),
            feature_columns=request.get("feature_columns", []),
            problem_type=request.get("problem_type", "classification")
        )
        
        result = await run_in_threadpool(services.train_model_service_with_cancellation, train_request)
        
        if training_cancelled:
            raise HTTPException(status_code=499, detail="Training was cancelled")
            
        logger.info(f"Training successful. Model ID: {result['model_id']}")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during model training: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")

@app.post("/cancel-training")
async def cancel_training_endpoint(request: dict):
    global training_cancelled
    try:
        if request.get("action") == "cancel":
            training_cancelled = True
            logger.info("Training cancellation requested")
            return {"message": "Training cancellation requested"}
        else:
            raise HTTPException(status_code=400, detail="Invalid action")
    except Exception as e:
        logger.error(f"Error during training cancellation: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain")
async def explain_model_endpoint(request: ExplainRequest):
    try:
        logger.info(f"Explanation request for model ID: {request.model_id}")
        logger.info(f"Data point: {request.data_point}")
        explanations = await run_in_threadpool(services.explain_model_service, request)
        logger.info("Explanation generation successful.")
        return explanations
    except Exception as e:
        logger.error(f"Error during explanation: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Explanation failed: {str(e)}")

@app.post("/feedback")
async def feedback_endpoint(request: FeedbackRequest):
    try:
        logger.info(f"Feedback received for model ID: {request.model_id}")
        response = await run_in_threadpool(services.handle_feedback_service, request)
        return response
    except Exception as e:
        logger.error(f"Error processing feedback: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Could not process feedback: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Interactive XAI Platform API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
