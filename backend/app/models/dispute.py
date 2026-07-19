from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(Integer, primary_key=True, index=True)
    dispute_id = Column(String(50), unique=True, index=True, nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False, index=True)
    category = Column(String(100), nullable=False)
    description = Column(Text)
    amount = Column(Float, default=0.0)
    status = Column(String(20), default="open", index=True)
    resolution_notes = Column(Text)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    resolved_date = Column(DateTime(timezone=True), nullable=True)
