from typing import List, Optional

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


class KPIStat(BaseModel):
    label: str
    value: str
    change: float
    trend: str


class WorkflowStep(BaseModel):
    step: str
    status: str
    completed_at: Optional[str] = None
    assigned_to: Optional[str] = None


class WorkflowResponse(BaseModel):
    current_period: str
    steps: List[WorkflowStep]
    overall_progress: float


class Alert(BaseModel):
    id: int
    type: str
    severity: str
    message: str
    timestamp: str
    resolved: bool


class TrendPoint(BaseModel):
    month: str
    amount: float
    headcount: int
    avg_per_rep: float


@router.get("/stats", response_model=List[KPIStat], status_code=status.HTTP_200_OK)
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return [
        KPIStat(label="Total Commission Payout", value="$2,847,392", change=12.5, trend="up"),
        KPIStat(label="Active Employees", value="1,247", change=3.2, trend="up"),
        KPIStat(label="Avg Commission/Rep", value="$4,280", change=-2.1, trend="down"),
        KPIStat(label="Plan Attainment", value="87.3%", change=5.8, trend="up"),
        KPIStat(label="Disputes Open", value="23", change=-15.0, trend="down"),
        KPIStat(label="AI Anomalies Detected", value="7", change=40.0, trend="up"),
    ]


@router.get("/workflow", response_model=WorkflowResponse, status_code=status.HTTP_200_OK)
async def get_workflow_status(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return WorkflowResponse(
        current_period="July 2026",
        overall_progress=65.0,
        steps=[
            WorkflowStep(step="Data Ingestion", status="completed", completed_at="2026-07-01T08:00:00Z", assigned_to="System"),
            WorkflowStep(step="Validation & QA", status="completed", completed_at="2026-07-02T14:30:00Z", assigned_to="AI Engine"),
            WorkflowStep(step="Commission Calculation", status="in_progress", assigned_to="Engine"),
            WorkflowStep(step="Manager Review", status="pending", assigned_to="Regional Managers"),
            WorkflowStep(step="Finance Approval", status="pending", assigned_to="Finance Team"),
            WorkflowStep(step="Payout Processing", status="pending", assigned_to="Payroll"),
        ],
    )


@router.get("/alerts", response_model=List[Alert], status_code=status.HTTP_200_OK)
async def get_alerts(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return [
        Alert(id=1, type="anomaly", severity="high", message="Unusual spike in commission for EMP-4521 (+340% vs avg)", timestamp="2026-07-18T14:22:00Z", resolved=False),
        Alert(id=2, type="validation", severity="medium", message="12 records missing territory mapping in Q3 data", timestamp="2026-07-18T11:05:00Z", resolved=False),
        Alert(id=3, type="threshold", severity="low", message="3 employees approaching annual cap (>90%)", timestamp="2026-07-17T09:30:00Z", resolved=False),
        Alert(id=4, type="anomaly", severity="high", message="Duplicate transaction detected: TXN-88421", timestamp="2026-07-16T16:45:00Z", resolved=True),
        Alert(id=5, type="compliance", severity="medium", message="Plan PLAN-003 missing required approver level", timestamp="2026-07-15T10:00:00Z", resolved=False),
    ]


@router.get("/trend", response_model=List[TrendPoint], status_code=status.HTTP_200_OK)
async def get_commission_trend(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return [
        TrendPoint(month="Jan 2026", amount=2150000, headcount=1180, avg_per_rep=3820),
        TrendPoint(month="Feb 2026", amount=2280000, headcount=1195, avg_per_rep=3950),
        TrendPoint(month="Mar 2026", amount=2520000, headcount=1210, avg_per_rep=4120),
        TrendPoint(month="Apr 2026", amount=2380000, headcount=1225, avg_per_rep=4010),
        TrendPoint(month="May 2026", amount=2610000, headcount=1235, avg_per_rep=4180),
        TrendPoint(month="Jun 2026", amount=2720000, headcount=1240, avg_per_rep=4250),
        TrendPoint(month="Jul 2026", amount=2847392, headcount=1247, avg_per_rep=4280),
    ]
