from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(100), nullable=False)
    account = Column(String(100))
    region = Column(String(100))
    department = Column(String(100))
    team_leader_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    manager_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    join_date = Column(Date)
    plan_id = Column(Integer, ForeignKey("commission_plans.id"), nullable=True)
    is_active = Column(Boolean, default=True)

    team_leader = relationship("Employee", remote_side=[id], foreign_keys=[team_leader_id])
    manager = relationship("Employee", remote_side=[id], foreign_keys=[manager_id])
    commission_plan = relationship("CommissionPlan", back_populates="employees")
    commission_results = relationship("CommissionResult", back_populates="employee")
    performance_data = relationship("PerformanceData", back_populates="employee")
