from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/plans", tags=["Commission Plans"])


class TierRule(BaseModel):
    min_attainment: float
    max_attainment: float
    rate: float
    accelerator: float = 1.0


class PlanCreate(BaseModel):
    name: str
    description: str
    type: str
    effective_start: str
    effective_end: str
    base_rate: float
    quota_target: float
    cap_amount: Optional[float] = None
    floor_amount: Optional[float] = None
    tiers: List[TierRule] = []
    rules: dict = {}


class PlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    effective_start: Optional[str] = None
    effective_end: Optional[str] = None
    base_rate: Optional[float] = None
    quota_target: Optional[float] = None
    cap_amount: Optional[float] = None
    floor_amount: Optional[float] = None
    tiers: Optional[List[TierRule]] = None
    rules: Optional[dict] = None


class PlanResponse(BaseModel):
    id: int
    plan_id: str
    name: str
    description: str
    type: str
    status: str
    effective_start: str
    effective_end: str
    base_rate: float
    quota_target: float
    cap_amount: Optional[float]
    floor_amount: Optional[float]
    tiers: List[TierRule]
    rules: dict
    employee_count: int
    created_at: str
    updated_at: str


class PlanListResponse(BaseModel):
    items: List[PlanResponse]
    total: int
    page: int
    page_size: int


class StatusUpdate(BaseModel):
    status: str


MOCK_PLANS = [
    {
        "id": 1, "plan_id": "PLAN-001", "name": "Enterprise Sales Q3",
        "description": "Tiered commission plan for enterprise account executives",
        "type": "tiered", "status": "active", "effective_start": "2026-07-01", "effective_end": "2026-09-30",
        "base_rate": 0.08, "quota_target": 500000, "cap_amount": 75000, "floor_amount": 2000,
        "tiers": [
            {"min_attainment": 0, "max_attainment": 0.5, "rate": 0.04, "accelerator": 0.5},
            {"min_attainment": 0.5, "max_attainment": 1.0, "rate": 0.08, "accelerator": 1.0},
            {"min_attainment": 1.0, "max_attainment": 1.5, "rate": 0.12, "accelerator": 1.5},
            {"min_attainment": 1.5, "max_attainment": 99.0, "rate": 0.16, "accelerator": 2.0},
        ],
        "rules": {"clawback_period_days": 90, "split_deal_enabled": True},
        "employee_count": 142, "created_at": "2026-06-01T10:00:00Z", "updated_at": "2026-06-28T14:30:00Z",
    },
    {
        "id": 2, "plan_id": "PLAN-002", "name": "SMB Inside Sales",
        "description": "Flat rate commission for SMB inside sales representatives",
        "type": "flat", "status": "active", "effective_start": "2026-07-01", "effective_end": "2026-09-30",
        "base_rate": 0.05, "quota_target": 200000, "cap_amount": 30000, "floor_amount": 1500,
        "tiers": [{"min_attainment": 0, "max_attainment": 99.0, "rate": 0.05, "accelerator": 1.0}],
        "rules": {"clawback_period_days": 60, "split_deal_enabled": False},
        "employee_count": 318, "created_at": "2026-06-01T10:00:00Z", "updated_at": "2026-06-15T09:00:00Z",
    },
    {
        "id": 3, "plan_id": "PLAN-003", "name": "Channel Partner Incentive",
        "description": "Quarterly bonus plan for channel partner managers",
        "type": "bonus", "status": "draft", "effective_start": "2026-10-01", "effective_end": "2026-12-31",
        "base_rate": 0.03, "quota_target": 750000, "cap_amount": 100000, "floor_amount": 5000,
        "tiers": [
            {"min_attainment": 0, "max_attainment": 0.8, "rate": 0.02, "accelerator": 0.7},
            {"min_attainment": 0.8, "max_attainment": 1.2, "rate": 0.03, "accelerator": 1.0},
            {"min_attainment": 1.2, "max_attainment": 99.0, "rate": 0.05, "accelerator": 1.8},
        ],
        "rules": {"clawback_period_days": 120, "split_deal_enabled": True, "quarterly_bonus": True},
        "employee_count": 56, "created_at": "2026-07-10T08:00:00Z", "updated_at": "2026-07-10T08:00:00Z",
    },
    {
        "id": 4, "plan_id": "PLAN-004", "name": "Manager Override Plan",
        "description": "Override commission for sales managers based on team performance",
        "type": "override", "status": "active", "effective_start": "2026-07-01", "effective_end": "2026-09-30",
        "base_rate": 0.02, "quota_target": 2000000, "cap_amount": 50000, "floor_amount": 3000,
        "tiers": [{"min_attainment": 0, "max_attainment": 99.0, "rate": 0.02, "accelerator": 1.0}],
        "rules": {"team_threshold": 0.8, "override_type": "team_revenue"},
        "employee_count": 45, "created_at": "2026-06-01T10:00:00Z", "updated_at": "2026-06-20T11:00:00Z",
    },
]


@router.get("", response_model=PlanListResponse, status_code=status.HTTP_200_OK)
async def list_plans(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    status_filter: Optional[str] = Query(None, alias="status"),
    type_filter: Optional[str] = Query(None, alias="type"),
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    filtered = MOCK_PLANS
    if status_filter:
        filtered = [p for p in filtered if p["status"] == status_filter]
    if type_filter:
        filtered = [p for p in filtered if p["type"] == type_filter]
    if search:
        filtered = [p for p in filtered if search.lower() in p["name"].lower()]
    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    return PlanListResponse(items=filtered[start:end], total=total, page=page, page_size=page_size)


@router.get("/{plan_id}", response_model=PlanResponse, status_code=status.HTTP_200_OK)
async def get_plan(
    plan_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for plan in MOCK_PLANS:
        if plan["plan_id"] == plan_id or str(plan["id"]) == plan_id:
            return plan
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")


@router.post("", response_model=PlanResponse, status_code=status.HTTP_201_CREATED)
async def create_plan(
    plan_data: PlanCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    now = datetime.utcnow().isoformat() + "Z"
    return {
        "id": 5, "plan_id": "PLAN-005", "name": plan_data.name,
        "description": plan_data.description, "type": plan_data.type, "status": "draft",
        "effective_start": plan_data.effective_start, "effective_end": plan_data.effective_end,
        "base_rate": plan_data.base_rate, "quota_target": plan_data.quota_target,
        "cap_amount": plan_data.cap_amount, "floor_amount": plan_data.floor_amount,
        "tiers": [t.model_dump() for t in plan_data.tiers], "rules": plan_data.rules,
        "employee_count": 0, "created_at": now, "updated_at": now,
    }


@router.put("/{plan_id}", response_model=PlanResponse, status_code=status.HTTP_200_OK)
async def update_plan(
    plan_id: str,
    plan_data: PlanUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for plan in MOCK_PLANS:
        if plan["plan_id"] == plan_id or str(plan["id"]) == plan_id:
            updated = {**plan}
            for k, v in plan_data.model_dump(exclude_none=True).items():
                updated[k] = v
            updated["updated_at"] = datetime.utcnow().isoformat() + "Z"
            return updated
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")


@router.post("/{plan_id}/clone", response_model=PlanResponse, status_code=status.HTTP_201_CREATED)
async def clone_plan(
    plan_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    for plan in MOCK_PLANS:
        if plan["plan_id"] == plan_id or str(plan["id"]) == plan_id:
            now = datetime.utcnow().isoformat() + "Z"
            cloned = {**plan, "id": 6, "plan_id": "PLAN-006", "name": f"{plan['name']} (Copy)", "status": "draft", "employee_count": 0, "created_at": now, "updated_at": now}
            return cloned
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")


@router.patch("/{plan_id}/status", response_model=PlanResponse, status_code=status.HTTP_200_OK)
async def update_plan_status(
    plan_id: str,
    status_data: StatusUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    if status_data.status not in ("active", "draft", "archived"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status")
    for plan in MOCK_PLANS:
        if plan["plan_id"] == plan_id or str(plan["id"]) == plan_id:
            updated = {**plan, "status": status_data.status, "updated_at": datetime.utcnow().isoformat() + "Z"}
            return updated
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")
