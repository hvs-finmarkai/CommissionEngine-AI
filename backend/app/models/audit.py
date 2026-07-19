from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    user_id = Column(Integer, index=True)
    user_name = Column(String(255))
    action = Column(String(100), nullable=False, index=True)
    details = Column(Text)
    old_value = Column(Text)
    new_value = Column(Text)
    ip_address = Column(String(45))
