from typing import List, Optional

from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/audit-logs", tags=["Audit Logs"])


class AuditLogEntry(BaseModel):
    id: int
    timestamp: str
    user_id: int
    user_name: str
    user_email: str
    action: str
    resource_type: str
    resource_id: str
    description: str
    old_value: Optional[dict] = None
    new_value: Optional[dict] = None
    ip_address: str


class AuditLogListResponse(BaseModel):
    items: List[AuditLogEntry]
    total: int
    page: int
    page_size: int


MOCK_AUDIT_LOGS = [
    {
        "id": 1, "timestamp": "2026-07-18T14:30:00Z", "user_id": 1, "user_name": "Admin User",
        "user_email": "admin@company.com", "action": "approval.approve", "resource_type": "approval",
        "resource_id": "BATCH-2026-07-ENT", "description": "Approved commission batch for Enterprise Sales",
        "old_value": {"status": "pending"}, "new_value": {"status": "approved"}, "ip_address": "192.168.1.100",
    },
    {
        "id": 2, "timestamp": "2026-07-18T11:15:00Z", "user_id": 1, "user_name": "Admin User",
        "user_email": "admin@company.com", "action": "plan.update", "resource_type": "plan",
        "resource_id": "PLAN-001", "description": "Updated Enterprise Sales Q3 plan tiers",
        "old_value": {"base_rate": 0.07}, "new_value": {"base_rate": 0.08}, "ip_address": "192.168.1.100",
    },
    {
        "id": 3, "timestamp": "2026-07-17T16:45:00Z", "user_id": 2, "user_name": "Lisa Park",
        "user_email": "lisa.park@company.com", "action": "commission.calculate", "resource_type": "commission",
        "resource_id": "JOB-2026-07-001", "description": "Triggered commission calculation for Jul 2026",
        "old_value": None, "new_value": {"period": "Jul 2026", "records": 1247}, "ip_address": "192.168.1.105",
    },
    {
        "id": 4, "timestamp": "2026-07-17T10:00:00Z", "user_id": 1, "user_name": "Admin User",
        "user_email": "admin@company.com", "action": "dispute.resolve", "resource_type": "dispute",
        "resource_id": "DSP-003", "description": "Resolved dispute DSP-003: Clawback reversed",
        "old_value": {"status": "under_review"}, "new_value": {"status": "resolved"}, "ip_address": "192.168.1.100",
    },
    {
        "id": 5, "timestamp": "2026-07-16T09:30:00Z", "user_id": 3, "user_name": "Robert Chen",
        "user_email": "robert.chen@company.com", "action": "validation.scan", "resource_type": "validation",
        "resource_id": "SCAN-2026-07-001", "description": "Initiated AI validation scan - 5 issues found",
        "old_value": None, "new_value": {"issues_found": 5, "scope": "full"}, "ip_address": "192.168.1.110",
    },
    {
        "id": 6, "timestamp": "2026-07-15T14:00:00Z", "user_id": 1, "user_name": "Admin User",
        "user_email": "admin@company.com", "action": "plan.create", "resource_type": "plan",
        "resource_id": "PLAN-003", "description": "Created new plan: Channel Partner Incentive",
        "old_value": None, "new_value": {"plan_id": "PLAN-003", "status": "draft"}, "ip_address": "192.168.1.100",
    },
]


@router.get("", response_model=AuditLogListResponse, status_code=status.HTTP_200_OK)
async def list_audit_logs(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    action: Optional[str] = None,
    resource_type: Optional[str] = None,
    user_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_AUDIT_LOGS
    if action:
        filtered = [l for l in filtered if l["action"] == action]
    if resource_type:
        filtered = [l for l in filtered if l["resource_type"] == resource_type]
    if user_id:
        filtered = [l for l in filtered if l["user_id"] == user_id]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return AuditLogListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)
