from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/users", tags=["User Management"])

users_db = [
    {"id": 1, "name": "Anita Desai", "email": "anita@finmark.ai", "role": "Admin", "department": "Finance", "status": "active", "last_login": "19 Jul 2026, 09:00 AM", "created_at": "2025-01-15"},
    {"id": 2, "name": "Vikash Kumar", "email": "vikash@finmark.ai", "role": "Sales Manager", "department": "Sales", "status": "active", "last_login": "19 Jul 2026, 08:45 AM", "created_at": "2025-02-01"},
    {"id": 3, "name": "Priya Sharma", "email": "priya@finmark.ai", "role": "Finance", "department": "Finance", "status": "active", "last_login": "18 Jul 2026, 06:30 PM", "created_at": "2025-03-10"},
    {"id": 4, "name": "Rahul Verma", "email": "rahul@finmark.ai", "role": "HR", "department": "HR", "status": "active", "last_login": "18 Jul 2026, 05:15 PM", "created_at": "2025-04-05"},
    {"id": 5, "name": "Neha Singh", "email": "neha@finmark.ai", "role": "Employee", "department": "Sales", "status": "active", "last_login": "17 Jul 2026, 04:00 PM", "created_at": "2025-05-20"},
    {"id": 6, "name": "Arjun Patel", "email": "arjun@finmark.ai", "role": "Employee", "department": "Operations", "status": "inactive", "last_login": "10 Jul 2026, 11:00 AM", "created_at": "2025-06-15"},
]

next_id = 7


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "Employee"
    department: str = "Sales"


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    department: Optional[str] = None
    status: Optional[str] = None


@router.get("")
async def list_users():
    return {"users": users_db, "total": len(users_db)}


@router.get("/{user_id}")
async def get_user(user_id: int):
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", status_code=201)
async def create_user(data: UserCreate):
    global next_id
    if any(u["email"] == data.email for u in users_db):
        raise HTTPException(status_code=400, detail="Email already exists")
    new_user = {
        "id": next_id,
        "name": data.name,
        "email": data.email,
        "role": data.role,
        "department": data.department,
        "status": "active",
        "last_login": "Never",
        "created_at": datetime.utcnow().strftime("%Y-%m-%d"),
    }
    next_id += 1
    users_db.append(new_user)
    return new_user


@router.put("/{user_id}")
async def update_user(user_id: int, data: UserUpdate):
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if data.name is not None:
        user["name"] = data.name
    if data.email is not None:
        user["email"] = data.email
    if data.role is not None:
        user["role"] = data.role
    if data.department is not None:
        user["department"] = data.department
    if data.status is not None:
        user["status"] = data.status
    return user


@router.delete("/{user_id}")
async def delete_user(user_id: int):
    global users_db
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    users_db = [u for u in users_db if u["id"] != user_id]
    return {"message": "User deleted", "id": user_id}


@router.patch("/{user_id}/toggle-status")
async def toggle_status(user_id: int):
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["status"] = "inactive" if user["status"] == "active" else "active"
    return user
