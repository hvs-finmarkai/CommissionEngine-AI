from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/commissions", tags=["Commissions"])


class CommissionBreakdown(BaseModel):
    component: str
    amount: float
    rate: float
    basis: str


class CommissionResult(BaseModel):
    id: int
    emp_id: str
    employee_name: str
    department: str
    period: str
    plan_name: str
    revenue: float
    quota: float
    attainment: float
    base_commission: float
    accelerator_bonus: float
    team_bonus: float
    spiff: float
    quarterly_bonus: float
    manager_override: float
    clawback: float
    gross_commission: float
    net_commission: float
    cap_applied: bool
    anomaly_flags: List[str]
    breakdown: List[CommissionBreakdown]
    status: str


class CommissionListResponse(BaseModel):
    items: List[CommissionResult]
    total: int
    page: int
    page_size: int


class CalculateRequest(BaseModel):
    period: str
    plan_ids: Optional[List[str]] = None
    department: Optional[str] = None


class CalculateResponse(BaseModel):
    job_id: str
    status: str
    message: str
    records_queued: int


class PeriodSummary(BaseModel):
    period: str
    total_payout: float
    total_employees: int
    avg_commission: float
    avg_attainment: float
    cap_hits: int
    anomalies_detected: int
    top_department: str
    total_clawbacks: float


MOCK_COMMISSIONS = [
    {
        "id": 1, "emp_id": "EMP-1001", "employee_name": "Sarah Chen", "department": "Enterprise Sales",
        "period": "Jul 2026", "plan_name": "Enterprise Sales Q3", "revenue": 93333, "quota": 83333,
        "attainment": 1.12, "base_commission": 4200, "accelerator_bonus": 1680, "team_bonus": 300,
        "spiff": 500, "quarterly_bonus": 0, "manager_override": 0, "clawback": 0,
        "gross_commission": 6680, "net_commission": 6680, "cap_applied": False,
        "anomaly_flags": [], "breakdown": [
            {"component": "Base", "amount": 4200, "rate": 0.08, "basis": "Revenue attainment"},
            {"component": "Accelerator", "amount": 1680, "rate": 0.12, "basis": "Above 100% tier"},
            {"component": "Team Bonus", "amount": 300, "rate": 0.0, "basis": "Team goal met"},
            {"component": "SPIFF", "amount": 500, "rate": 0.0, "basis": "New logo bonus"},
        ], "status": "approved",
    },
    {
        "id": 2, "emp_id": "EMP-1002", "employee_name": "James Wilson", "department": "SMB Sales",
        "period": "Jul 2026", "plan_name": "SMB Inside Sales", "revenue": 44500, "quota": 50000,
        "attainment": 0.89, "base_commission": 2225, "accelerator_bonus": 0, "team_bonus": 0,
        "spiff": 0, "quarterly_bonus": 0, "manager_override": 0, "clawback": 0,
        "gross_commission": 2225, "net_commission": 2225, "cap_applied": False,
        "anomaly_flags": [], "breakdown": [
            {"component": "Base", "amount": 2225, "rate": 0.05, "basis": "Revenue attainment"},
        ], "status": "pending_approval",
    },
    {
        "id": 3, "emp_id": "EMP-1003", "employee_name": "Priya Sharma", "department": "Channel Partners",
        "period": "Jul 2026", "plan_name": "Channel Partner Incentive", "revenue": 178000, "quota": 187500,
        "attainment": 0.95, "base_commission": 5340, "accelerator_bonus": 0, "team_bonus": 0,
        "spiff": 0, "quarterly_bonus": 0, "manager_override": 0, "clawback": 0,
        "gross_commission": 5340, "net_commission": 5340, "cap_applied": False,
        "anomaly_flags": [], "breakdown": [
            {"component": "Base", "amount": 5340, "rate": 0.03, "basis": "Revenue attainment"},
        ], "status": "approved",
    },
]


@router.get("/summary", response_model=PeriodSummary, status_code=status.HTTP_200_OK)
async def get_period_summary(
    period: str = Query("Jul 2026"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return PeriodSummary(
        period=period, total_payout=2847392, total_employees=1247, avg_commission=4280,
        avg_attainment=0.873, cap_hits=14, anomalies_detected=7, top_department="Enterprise Sales",
        total_clawbacks=18500,
    )


@router.get("", response_model=CommissionListResponse, status_code=status.HTTP_200_OK)
async def list_commissions(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    period: Optional[str] = None,
    department: Optional[str] = None,
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_COMMISSIONS
    if period:
        filtered = [c for c in filtered if c["period"] == period]
    if department:
        filtered = [c for c in filtered if c["department"] == department]
    if status_filter:
        filtered = [c for c in filtered if c["status"] == status_filter]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return CommissionListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.post("/calculate", response_model=CalculateResponse, status_code=status.HTTP_202_ACCEPTED)
async def trigger_calculation(
    request: CalculateRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return CalculateResponse(
        job_id="JOB-2026-07-001", status="queued",
        message=f"Commission calculation queued for {request.period}", records_queued=1247,
    )


@router.get("/{commission_id}", response_model=CommissionResult, status_code=status.HTTP_200_OK)
async def get_commission_detail(
    commission_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for comm in MOCK_COMMISSIONS:
        if comm["id"] == commission_id:
            return comm
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Commission record not found")
