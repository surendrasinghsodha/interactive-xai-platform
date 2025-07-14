import os
import sys
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import TrainRequest, ExplainRequest, FeedbackRequest
import services

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Interactive XAI Platform API", version="1.0.0")

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

@app.post("/train")
async def train_model_endpoint(
    file: UploadFile = File(...),
    model_type: str = Form(...),
    target_column: str = Form(...),
):
    try:
        logger.info(f"Training request: model={model_type}, target={target_column}")
        contents = await file.read()
        train_request = TrainRequest(model_type=model_type, target_column=target_column)
        result = await run_in_threadpool(services.train_model_service, contents, train_request)
        logger.info(f"Training successful. Model ID: {result['model_id']}")
        return result
    except Exception as e:
        logger.error(f"Error during model training: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"An error occurred during training: {e}")

@app.post("/explain")
async def explain_model_endpoint(request: ExplainRequest):
    try:
        logger.info(f"Explanation request for model ID: {request.model_id}")
        explanations = await run_in_threadpool(services.explain_model_service, request)
        logger.info("Explanation generation successful.")
        return explanations
    except Exception as e:
        logger.error(f"Error during explanation: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to get explanations: {e}")

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
import os
import sys
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool
import traceback

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import TrainRequest, ExplainRequest, FeedbackRequest
import services

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Interactive XAI Platform API", version="1.0.0")

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

@app.post("/train")
async def train_model_endpoint(
    file: UploadFile = File(...),
    model_type: str = Form(...),
    target_column: str = Form(...),
):
    try:
        logger.info(f"Training request: model={model_type}, target={target_column}")
        contents = await file.read()
        train_request = TrainRequest(model_type=model_type, target_column=target_column)
        result = await run_in_threadpool(services.train_model_service, contents, train_request)
        logger.info(f"Training successful. Model ID: {result['model_id']}")
        return result
    except Exception as e:
        logger.error(f"Error during model training: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")

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
