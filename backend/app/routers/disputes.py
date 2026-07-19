from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/disputes", tags=["Disputes"])


class DisputeCreate(BaseModel):
    emp_id: str
    period: str
    category: str
    description: str
    disputed_amount: float
    expected_amount: float


class DisputeResponse(BaseModel):
    id: int
    dispute_id: str
    emp_id: str
    employee_name: str
    period: str
    category: str
    description: str
    disputed_amount: float
    expected_amount: float
    status: str
    priority: str
    submitted_at: str
    resolved_at: Optional[str] = None
    resolution_note: Optional[str] = None
    assigned_to: Optional[str] = None


class DisputeListResponse(BaseModel):
    items: List[DisputeResponse]
    total: int
    page: int
    page_size: int


class StatusUpdateRequest(BaseModel):
    status: str
    resolution_note: Optional[str] = None
    assigned_to: Optional[str] = None


MOCK_DISPUTES = [
    {
        "id": 1, "dispute_id": "DSP-001", "emp_id": "EMP-1002", "employee_name": "James Wilson",
        "period": "Jun 2026", "category": "Missing Transaction",
        "description": "Deal with Acme Corp (TXN-77201) not included in June calculation",
        "disputed_amount": 2225, "expected_amount": 3500, "status": "open", "priority": "high",
        "submitted_at": "2026-07-05T14:00:00Z", "resolved_at": None, "resolution_note": None, "assigned_to": "Finance Team",
    },
    {
        "id": 2, "dispute_id": "DSP-002", "emp_id": "EMP-1004", "employee_name": "Marcus Thompson",
        "period": "Jul 2026", "category": "Incorrect Rate",
        "description": "Applied 4% rate instead of 8% for deals above 50% attainment",
        "disputed_amount": 1800, "expected_amount": 3600, "status": "under_review", "priority": "medium",
        "submitted_at": "2026-07-12T09:30:00Z", "resolved_at": None, "resolution_note": None, "assigned_to": "Lisa Park",
    },
    {
        "id": 3, "dispute_id": "DSP-003", "emp_id": "EMP-1001", "employee_name": "Sarah Chen",
        "period": "May 2026", "category": "Clawback Error",
        "description": "Clawback applied for deal that was not cancelled - customer confirmed active",
        "disputed_amount": 8050, "expected_amount": 8550, "status": "resolved", "priority": "high",
        "submitted_at": "2026-06-20T11:00:00Z", "resolved_at": "2026-06-25T16:00:00Z",
        "resolution_note": "Clawback reversed. Customer contract verified as active.", "assigned_to": "Finance Team",
    },
]


@router.get("", response_model=DisputeListResponse, status_code=status.HTTP_200_OK)
async def list_disputes(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    status_filter: Optional[str] = Query(None, alias="status"),
    emp_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_DISPUTES
    if status_filter:
        filtered = [d for d in filtered if d["status"] == status_filter]
    if emp_id:
        filtered = [d for d in filtered if d["emp_id"] == emp_id]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return DisputeListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.post("", response_model=DisputeResponse, status_code=status.HTTP_201_CREATED)
async def create_dispute(
    dispute_data: DisputeCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    now = datetime.utcnow().isoformat() + "Z"
    return {
        "id": 4, "dispute_id": "DSP-004", "emp_id": dispute_data.emp_id,
        "employee_name": "Employee", "period": dispute_data.period,
        "category": dispute_data.category, "description": dispute_data.description,
        "disputed_amount": dispute_data.disputed_amount, "expected_amount": dispute_data.expected_amount,
        "status": "open", "priority": "medium", "submitted_at": now,
        "resolved_at": None, "resolution_note": None, "assigned_to": None,
    }


@router.patch("/{dispute_id}/status", response_model=DisputeResponse, status_code=status.HTTP_200_OK)
async def update_dispute_status(
    dispute_id: int,
    body: StatusUpdateRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    valid_statuses = ("open", "under_review", "resolved", "rejected")
    if body.status not in valid_statuses:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid status. Must be one of: {valid_statuses}")
    for d in MOCK_DISPUTES:
        if d["id"] == dispute_id:
            updated = {**d, "status": body.status}
            if body.resolution_note:
                updated["resolution_note"] = body.resolution_note
            if body.assigned_to:
                updated["assigned_to"] = body.assigned_to
            if body.status == "resolved":
                updated["resolved_at"] = datetime.utcnow().isoformat() + "Z"
            return updated
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dispute not found")
