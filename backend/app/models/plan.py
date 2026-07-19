from sqlalchemy import Column, Integer, String, Float, Date, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class CommissionPlan(Base):
    __tablename__ = "commission_plans"

    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)
    role = Column(String(100))
    account = Column(String(100))
    status = Column(String(20), nullable=False, default="draft", index=True)
    version = Column(Integer, default=1)
    effective_date = Column(Date)
    rules = Column(JSON)
    tiers = Column(JSON)
    cap_amount = Column(Float)
    floor_amount = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    employees = relationship("Employee", back_populates="commission_plan")
