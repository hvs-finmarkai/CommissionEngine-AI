from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/employees", tags=["Employees"])


class EmployeeResponse(BaseModel):
    id: int
    emp_id: str
    first_name: str
    last_name: str
    email: str
    department: str
    designation: str
    region: str
    team_leader: Optional[str] = None
    manager: Optional[str] = None
    plan_name: str
    status: str
    hire_date: str
    ytd_commission: float
    current_attainment: float


class EmployeeListResponse(BaseModel):
    items: List[EmployeeResponse]
    total: int
    page: int
    page_size: int


class CommissionHistoryItem(BaseModel):
    period: str
    base_commission: float
    accelerator: float
    spiff: float
    team_bonus: float
    gross_commission: float
    clawback: float
    net_commission: float
    attainment: float
    quota: float
    revenue: float


MOCK_EMPLOYEES = [
    {
        "id": 1, "emp_id": "EMP-1001", "first_name": "Sarah", "last_name": "Chen",
        "email": "sarah.chen@company.com", "department": "Enterprise Sales", "designation": "Senior AE",
        "region": "West", "team_leader": "Mike Johnson", "manager": "Lisa Park",
        "plan_name": "Enterprise Sales Q3", "status": "active", "hire_date": "2022-03-15",
        "ytd_commission": 48250.0, "current_attainment": 1.12,
    },
    {
        "id": 2, "emp_id": "EMP-1002", "first_name": "James", "last_name": "Wilson",
        "email": "james.wilson@company.com", "department": "SMB Sales", "designation": "Inside Sales Rep",
        "region": "East", "team_leader": "Amy Rodriguez", "manager": "Lisa Park",
        "plan_name": "SMB Inside Sales", "status": "active", "hire_date": "2023-08-01",
        "ytd_commission": 22180.0, "current_attainment": 0.89,
    },
    {
        "id": 3, "emp_id": "EMP-1003", "first_name": "Priya", "last_name": "Sharma",
        "email": "priya.sharma@company.com", "department": "Channel Partners", "designation": "Partner Manager",
        "region": "Central", "team_leader": None, "manager": "David Kim",
        "plan_name": "Channel Partner Incentive", "status": "active", "hire_date": "2021-11-20",
        "ytd_commission": 35420.0, "current_attainment": 0.95,
    },
    {
        "id": 4, "emp_id": "EMP-1004", "first_name": "Marcus", "last_name": "Thompson",
        "email": "marcus.thompson@company.com", "department": "Enterprise Sales", "designation": "Account Executive",
        "region": "South", "team_leader": "Sarah Chen", "manager": "Lisa Park",
        "plan_name": "Enterprise Sales Q3", "status": "active", "hire_date": "2024-01-10",
        "ytd_commission": 18900.0, "current_attainment": 0.72,
    },
    {
        "id": 5, "emp_id": "EMP-1005", "first_name": "Lisa", "last_name": "Park",
        "email": "lisa.park@company.com", "department": "Sales Management", "designation": "Regional Sales Director",
        "region": "National", "team_leader": None, "manager": None,
        "plan_name": "Manager Override Plan", "status": "active", "hire_date": "2019-06-01",
        "ytd_commission": 62800.0, "current_attainment": 1.05,
    },
]


@router.get("", response_model=EmployeeListResponse, status_code=status.HTTP_200_OK)
async def list_employees(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    department: Optional[str] = None,
    region: Optional[str] = None,
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_EMPLOYEES
    if search:
        filtered = [e for e in filtered if search.lower() in f"{e['first_name']} {e['last_name']}".lower() or search.lower() in e["emp_id"].lower()]
    if department:
        filtered = [e for e in filtered if e["department"] == department]
    if region:
        filtered = [e for e in filtered if e["region"] == region]
    if status_filter:
        filtered = [e for e in filtered if e["status"] == status_filter]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return EmployeeListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.get("/{emp_id}", response_model=EmployeeResponse, status_code=status.HTTP_200_OK)
async def get_employee(
    emp_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for emp in MOCK_EMPLOYEES:
        if emp["emp_id"] == emp_id or str(emp["id"]) == emp_id:
            return emp
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")


@router.get("/{emp_id}/commission", response_model=List[CommissionHistoryItem], status_code=status.HTTP_200_OK)
async def get_employee_commission(
    emp_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for emp in MOCK_EMPLOYEES:
        if emp["emp_id"] == emp_id or str(emp["id"]) == emp_id:
            return [
                CommissionHistoryItem(period="Jul 2026", base_commission=4200, accelerator=1680, spiff=500, team_bonus=300, gross_commission=6680, clawback=0, net_commission=6680, attainment=1.12, quota=83333, revenue=93333),
                CommissionHistoryItem(period="Jun 2026", base_commission=3800, accelerator=1140, spiff=0, team_bonus=300, gross_commission=5240, clawback=200, net_commission=5040, attainment=0.95, quota=83333, revenue=79166),
                CommissionHistoryItem(period="May 2026", base_commission=4500, accelerator=2250, spiff=1000, team_bonus=300, gross_commission=8050, clawback=0, net_commission=8050, attainment=1.25, quota=83333, revenue=104166),
                CommissionHistoryItem(period="Apr 2026", base_commission=3200, accelerator=640, spiff=0, team_bonus=0, gross_commission=3840, clawback=0, net_commission=3840, attainment=0.80, quota=83333, revenue=66666),
                CommissionHistoryItem(period="Mar 2026", base_commission=3900, accelerator=1170, spiff=250, team_bonus=300, gross_commission=5620, clawback=500, net_commission=5120, attainment=0.98, quota=83333, revenue=81666),
                CommissionHistoryItem(period="Feb 2026", base_commission=4100, accelerator=1640, spiff=0, team_bonus=300, gross_commission=6040, clawback=0, net_commission=6040, attainment=1.08, quota=83333, revenue=89999),
            ]
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
