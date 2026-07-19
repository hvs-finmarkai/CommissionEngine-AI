from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(Integer, primary_key=True, index=True)
    commission_batch_id = Column(String(50), index=True, nullable=False)
    plan_name = Column(String(255))
    amount = Column(Float, default=0.0)
    employee_count = Column(Integer, default=0)
    current_level = Column(Integer, default=1)
    status = Column(String(20), default="pending", index=True)
    levels = Column(JSON)
    initiated_by = Column(String(255))
    initiated_date = Column(DateTime(timezone=True), server_default=func.now())
    completed_date = Column(DateTime(timezone=True), nullable=True)
