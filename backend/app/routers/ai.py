from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.ai_service import ai_validate_commission, ai_chat

router = APIRouter(prefix="/api/ai", tags=["AI"])


class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = ""


class ValidationRequest(BaseModel):
    employee_name: str
    role: str
    achievement: float
    base_commission: float
    accelerator: float = 0
    net_commission: float
    cap: float = 0
    plan_type: str = "tiered"


@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response = await ai_chat(request.message, request.context)
    return {"response": response}


@router.post("/validate")
async def validate_endpoint(request: ValidationRequest):
    result = await ai_validate_commission(request.dict())
    return result


@router.post("/batch-validate")
async def batch_validate():
    sample_results = [
        {"employee": "Rahul Sharma", "emp_id": "DN-5023", "issue": "Commission exceeds 3x average", "severity": "high", "confidence": 0.94, "recommendation": "Review performance data for Oct"},
        {"employee": "Priya Gupta", "emp_id": "DN-5089", "issue": "Cap breach - Plan PLAN-TS-TIER", "severity": "high", "confidence": 0.97, "recommendation": "Apply cap or request exception"},
        {"employee": "Amit Kumar", "emp_id": "DN-5142", "issue": "Duplicate commission entry", "severity": "medium", "confidence": 0.91, "recommendation": "Remove duplicate entry"},
        {"employee": "Sneha Verma", "emp_id": "DN-5201", "issue": "Missing attendance data", "severity": "medium", "confidence": 0.88, "recommendation": "Verify with HR before calculation"},
        {"employee": "Vikram Singh", "emp_id": "DN-5067", "issue": "Negative clawback exceeds earnings", "severity": "high", "confidence": 0.96, "recommendation": "Cap clawback at current earnings"},
    ]
    return {
        "total_scanned": 3742,
        "anomalies_found": 8,
        "high_severity": 3,
        "medium_severity": 3,
        "low_severity": 2,
        "ai_confidence": 94.2,
        "results": sample_results,
    }
