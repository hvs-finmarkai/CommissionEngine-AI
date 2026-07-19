from typing import List

from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


class OverviewMetric(BaseModel):
    metric: str
    current_value: float
    previous_value: float
    change_pct: float
    trend: str


class AnalyticsOverview(BaseModel):
    period: str
    metrics: List[OverviewMetric]
    commission_by_type: dict
    payout_distribution: dict


class DepartmentROI(BaseModel):
    department: str
    total_revenue: float
    total_commission: float
    roi: float
    headcount: int
    avg_attainment: float
    cost_per_dollar_revenue: float


class TopEarner(BaseModel):
    rank: int
    emp_id: str
    name: str
    department: str
    plan: str
    revenue: float
    commission: float
    attainment: float


@router.get("/overview", response_model=AnalyticsOverview, status_code=status.HTTP_200_OK)
async def get_analytics_overview(
    period: str = Query("Jul 2026"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return AnalyticsOverview(
        period=period,
        metrics=[
            OverviewMetric(metric="Total Payout", current_value=2847392, previous_value=2720000, change_pct=4.7, trend="up"),
            OverviewMetric(metric="Avg Attainment", current_value=87.3, previous_value=84.1, change_pct=3.8, trend="up"),
            OverviewMetric(metric="Commission/Revenue Ratio", current_value=6.2, previous_value=6.5, change_pct=-4.6, trend="down"),
            OverviewMetric(metric="Plan Effectiveness", current_value=92.1, previous_value=89.5, change_pct=2.9, trend="up"),
        ],
        commission_by_type={
            "base": 1650000, "accelerator": 720000, "spiff": 185000,
            "team_bonus": 142000, "quarterly_bonus": 95000, "manager_override": 55392,
        },
        payout_distribution={
            "0-2000": 180, "2000-4000": 420, "4000-6000": 350,
            "6000-8000": 185, "8000-10000": 72, "10000+": 40,
        },
    )


@router.get("/department-roi", response_model=List[DepartmentROI], status_code=status.HTTP_200_OK)
async def get_department_roi(
    period: str = Query("Jul 2026"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return [
        DepartmentROI(department="Enterprise Sales", total_revenue=18500000, total_commission=892450, roi=20.7, headcount=142, avg_attainment=0.92, cost_per_dollar_revenue=0.048),
        DepartmentROI(department="SMB Sales", total_revenue=9200000, total_commission=445200, roi=20.6, headcount=318, avg_attainment=0.85, cost_per_dollar_revenue=0.048),
        DepartmentROI(department="Channel Partners", total_revenue=12800000, total_commission=356000, roi=35.9, headcount=56, avg_attainment=0.91, cost_per_dollar_revenue=0.028),
        DepartmentROI(department="Sales Management", total_revenue=40500000, total_commission=285000, roi=142.1, headcount=45, avg_attainment=1.02, cost_per_dollar_revenue=0.007),
        DepartmentROI(department="Mid-Market", total_revenue=14200000, total_commission=625000, roi=22.7, headcount=186, avg_attainment=0.88, cost_per_dollar_revenue=0.044),
    ]


@router.get("/top-earners", response_model=List[TopEarner], status_code=status.HTTP_200_OK)
async def get_top_earners(
    period: str = Query("Jul 2026"),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    return [
        TopEarner(rank=1, emp_id="EMP-1001", name="Sarah Chen", department="Enterprise Sales", plan="Enterprise Sales Q3", revenue=93333, commission=6680, attainment=1.12),
        TopEarner(rank=2, emp_id="EMP-3042", name="David Park", department="Enterprise Sales", plan="Enterprise Sales Q3", revenue=104000, commission=8320, attainment=1.25),
        TopEarner(rank=3, emp_id="EMP-1005", name="Lisa Park", department="Sales Management", plan="Manager Override Plan", revenue=2100000, commission=9450, attainment=1.05),
        TopEarner(rank=4, emp_id="EMP-2201", name="Alex Rivera", department="Mid-Market", plan="Mid-Market Growth", revenue=88000, commission=6160, attainment=1.10),
        TopEarner(rank=5, emp_id="EMP-1003", name="Priya Sharma", department="Channel Partners", plan="Channel Partner Incentive", revenue=178000, commission=5340, attainment=0.95),
        TopEarner(rank=6, emp_id="EMP-4102", name="Kevin Zhang", department="Enterprise Sales", plan="Enterprise Sales Q3", revenue=87500, commission=5250, attainment=1.05),
        TopEarner(rank=7, emp_id="EMP-2305", name="Maria Santos", department="SMB Sales", plan="SMB Inside Sales", revenue=62000, commission=3100, attainment=1.24),
        TopEarner(rank=8, emp_id="EMP-3501", name="Tom Bradley", department="Mid-Market", plan="Mid-Market Growth", revenue=82000, commission=4920, attainment=1.03),
        TopEarner(rank=9, emp_id="EMP-1004", name="Marcus Thompson", department="Enterprise Sales", plan="Enterprise Sales Q3", revenue=68000, commission=2720, attainment=0.82),
        TopEarner(rank=10, emp_id="EMP-4521", name="Rachel Kim", department="Enterprise Sales", plan="Enterprise Sales Q3", revenue=125000, commission=12500, attainment=1.50),
    ][:limit]
