from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class CommissionResult(Base):
    __tablename__ = "commission_results"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False, index=True)
    plan_id = Column(String(50), nullable=False, index=True)
    period = Column(String(20), nullable=False, index=True)
    base_commission = Column(Float, default=0.0)
    accelerator_bonus = Column(Float, default=0.0)
    team_bonus = Column(Float, default=0.0)
    spiff_bonus = Column(Float, default=0.0)
    quarterly_bonus = Column(Float, default=0.0)
    manager_override = Column(Float, default=0.0)
    clawback_amount = Column(Float, default=0.0)
    gross_commission = Column(Float, default=0.0)
    net_commission = Column(Float, default=0.0)
    cap_applied = Column(Boolean, default=False)
    calculation_breakdown = Column(JSON)
    anomaly_flags = Column(JSON)
    approval_status = Column(String(20), default="pending", index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    employee = relationship("Employee", back_populates="commission_results")
