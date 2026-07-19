from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/approvals", tags=["Approvals"])


class ApprovalLevel(BaseModel):
    level: int
    role: str
    approver: Optional[str] = None
    status: str
    actioned_at: Optional[str] = None
    comment: Optional[str] = None


class ApprovalResponse(BaseModel):
    id: int
    commission_batch_id: str
    period: str
    department: str
    total_amount: float
    employee_count: int
    current_level: int
    total_levels: int
    status: str
    levels: List[ApprovalLevel]
    submitted_at: str
    submitted_by: str


class ApprovalListResponse(BaseModel):
    items: List[ApprovalResponse]
    total: int
    page: int
    page_size: int


class CommentRequest(BaseModel):
    comment: str


class ApprovalActionResponse(BaseModel):
    id: int
    status: str
    message: str
    actioned_at: str


MOCK_APPROVALS = [
    {
        "id": 1, "commission_batch_id": "BATCH-2026-07-ENT", "period": "Jul 2026",
        "department": "Enterprise Sales", "total_amount": 892450, "employee_count": 142,
        "current_level": 2, "total_levels": 3, "status": "pending",
        "levels": [
            {"level": 1, "role": "Sales Manager", "approver": "Lisa Park", "status": "approved", "actioned_at": "2026-07-15T10:00:00Z", "comment": "Numbers verified"},
            {"level": 2, "role": "Finance Director", "approver": None, "status": "pending", "actioned_at": None, "comment": None},
            {"level": 3, "role": "VP Sales", "approver": None, "status": "pending", "actioned_at": None, "comment": None},
        ],
        "submitted_at": "2026-07-14T09:00:00Z", "submitted_by": "System",
    },
    {
        "id": 2, "commission_batch_id": "BATCH-2026-07-SMB", "period": "Jul 2026",
        "department": "SMB Sales", "total_amount": 445200, "employee_count": 318,
        "current_level": 1, "total_levels": 2, "status": "pending",
        "levels": [
            {"level": 1, "role": "Sales Manager", "approver": None, "status": "pending", "actioned_at": None, "comment": None},
            {"level": 2, "role": "Finance Director", "approver": None, "status": "pending", "actioned_at": None, "comment": None},
        ],
        "submitted_at": "2026-07-14T09:30:00Z", "submitted_by": "System",
    },
    {
        "id": 3, "commission_batch_id": "BATCH-2026-06-ENT", "period": "Jun 2026",
        "department": "Enterprise Sales", "total_amount": 856300, "employee_count": 140,
        "current_level": 3, "total_levels": 3, "status": "approved",
        "levels": [
            {"level": 1, "role": "Sales Manager", "approver": "Lisa Park", "status": "approved", "actioned_at": "2026-06-16T10:00:00Z", "comment": "Approved"},
            {"level": 2, "role": "Finance Director", "approver": "Robert Chen", "status": "approved", "actioned_at": "2026-06-17T14:00:00Z", "comment": "Financials confirmed"},
            {"level": 3, "role": "VP Sales", "approver": "Jennifer Wu", "status": "approved", "actioned_at": "2026-06-18T09:00:00Z", "comment": "Released for payout"},
        ],
        "submitted_at": "2026-06-15T09:00:00Z", "submitted_by": "System",
    },
]


@router.get("", response_model=ApprovalListResponse, status_code=status.HTTP_200_OK)
async def list_approvals(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    status_filter: Optional[str] = Query(None, alias="status"),
    period: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_APPROVALS
    if status_filter:
        filtered = [a for a in filtered if a["status"] == status_filter]
    if period:
        filtered = [a for a in filtered if a["period"] == period]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return ApprovalListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.post("/{approval_id}/approve", response_model=ApprovalActionResponse, status_code=status.HTTP_200_OK)
async def approve(
    approval_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for a in MOCK_APPROVALS:
        if a["id"] == approval_id:
            return ApprovalActionResponse(
                id=approval_id, status="approved",
                message=f"Batch {a['commission_batch_id']} approved at level {a['current_level']}",
                actioned_at=datetime.utcnow().isoformat() + "Z",
            )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approval not found")


@router.post("/{approval_id}/reject", response_model=ApprovalActionResponse, status_code=status.HTTP_200_OK)
async def reject(
    approval_id: int,
    body: CommentRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for a in MOCK_APPROVALS:
        if a["id"] == approval_id:
            return ApprovalActionResponse(
                id=approval_id, status="rejected",
                message=f"Batch {a['commission_batch_id']} rejected: {body.comment}",
                actioned_at=datetime.utcnow().isoformat() + "Z",
            )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approval not found")


@router.post("/{approval_id}/comment", response_model=ApprovalActionResponse, status_code=status.HTTP_200_OK)
async def add_comment(
    approval_id: int,
    body: CommentRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for a in MOCK_APPROVALS:
        if a["id"] == approval_id:
            return ApprovalActionResponse(
                id=approval_id, status=a["status"],
                message=f"Comment added to {a['commission_batch_id']}",
                actioned_at=datetime.utcnow().isoformat() + "Z",
            )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approval not found")
