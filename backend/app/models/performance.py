from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class PerformanceData(Base):
    __tablename__ = "performance_data"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False, index=True)
    source = Column(String(100))
    period = Column(String(20), nullable=False, index=True)
    metrics = Column(JSON)
    target_achievement_pct = Column(Float, default=0.0)
    attendance_pct = Column(Float, default=0.0)
    quality_score = Column(Float, default=0.0)
    imported_at = Column(DateTime(timezone=True), server_default=func.now())

    employee = relationship("Employee", back_populates="performance_data")
