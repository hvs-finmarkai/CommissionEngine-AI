from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/validation", tags=["Validation"])


class ValidationResult(BaseModel):
    id: int
    scan_id: str
    type: str
    severity: str
    category: str
    message: str
    affected_records: int
    affected_employees: List[str]
    detected_at: str
    resolved: bool
    resolved_at: Optional[str] = None
    resolved_by: Optional[str] = None


class ValidationListResponse(BaseModel):
    items: List[ValidationResult]
    total: int
    page: int
    page_size: int


class ScanRequest(BaseModel):
    scope: str = "full"
    period: Optional[str] = None


class ScanResponse(BaseModel):
    scan_id: str
    status: str
    message: str
    issues_found: int
    scan_duration_ms: int


class ResolveRequest(BaseModel):
    resolution_note: str


MOCK_VALIDATIONS = [
    {
        "id": 1, "scan_id": "SCAN-2026-07-001", "type": "anomaly", "severity": "high",
        "category": "Commission Spike", "message": "Commission payout 340% above rolling average for EMP-4521",
        "affected_records": 1, "affected_employees": ["EMP-4521"],
        "detected_at": "2026-07-18T14:22:00Z", "resolved": False, "resolved_at": None, "resolved_by": None,
    },
    {
        "id": 2, "scan_id": "SCAN-2026-07-001", "type": "data_quality", "severity": "medium",
        "category": "Missing Mapping", "message": "12 revenue records missing territory mapping",
        "affected_records": 12, "affected_employees": ["EMP-2104", "EMP-2105", "EMP-2106"],
        "detected_at": "2026-07-18T11:05:00Z", "resolved": False, "resolved_at": None, "resolved_by": None,
    },
    {
        "id": 3, "scan_id": "SCAN-2026-07-001", "type": "duplicate", "severity": "high",
        "category": "Duplicate Transaction", "message": "Transaction TXN-88421 appears in two calculation batches",
        "affected_records": 2, "affected_employees": ["EMP-1001"],
        "detected_at": "2026-07-16T16:45:00Z", "resolved": True, "resolved_at": "2026-07-17T09:00:00Z", "resolved_by": "Admin User",
    },
    {
        "id": 4, "scan_id": "SCAN-2026-07-001", "type": "threshold", "severity": "low",
        "category": "Cap Warning", "message": "3 employees at >90% of annual commission cap",
        "affected_records": 3, "affected_employees": ["EMP-1001", "EMP-1005", "EMP-3042"],
        "detected_at": "2026-07-17T09:30:00Z", "resolved": False, "resolved_at": None, "resolved_by": None,
    },
    {
        "id": 5, "scan_id": "SCAN-2026-07-001", "type": "rule_conflict", "severity": "medium",
        "category": "Plan Conflict", "message": "Overlapping tier definitions in PLAN-003 between 80-120% range",
        "affected_records": 56, "affected_employees": [],
        "detected_at": "2026-07-15T10:00:00Z", "resolved": False, "resolved_at": None, "resolved_by": None,
    },
]


@router.get("/results", response_model=ValidationListResponse, status_code=status.HTTP_200_OK)
async def get_validation_results(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    severity: Optional[str] = None,
    resolved: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_VALIDATIONS
    if severity:
        filtered = [v for v in filtered if v["severity"] == severity]
    if resolved is not None:
        filtered = [v for v in filtered if v["resolved"] == resolved]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return ValidationListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.post("/scan", response_model=ScanResponse, status_code=status.HTTP_202_ACCEPTED)
async def run_validation_scan(
    request: ScanRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return ScanResponse(
        scan_id="SCAN-2026-07-002", status="completed",
        message=f"AI validation scan completed for scope: {request.scope}",
        issues_found=5, scan_duration_ms=3420,
    )


@router.patch("/{validation_id}/resolve", response_model=ValidationResult, status_code=status.HTTP_200_OK)
async def resolve_validation(
    validation_id: int,
    body: ResolveRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for v in MOCK_VALIDATIONS:
        if v["id"] == validation_id:
            resolved = {**v, "resolved": True, "resolved_at": datetime.utcnow().isoformat() + "Z", "resolved_by": current_user["full_name"]}
            return resolved
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Validation result not found")
