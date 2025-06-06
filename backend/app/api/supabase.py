from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel, EmailStr
import httpx
import os

app = FastAPI()
router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
async def login(user: UserLogin):
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "email": user.email,
        "password": user.password
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        try:
            detail = response.json()
        except Exception:
            detail = {"message": "Login failed", "status": response.status_code}
        raise HTTPException(status_code=response.status_code, detail=detail)

    return response.json()

@router.post("/signup")
async def signup(user: UserLogin):
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "email": user.email,
        "password": user.password
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)

    if response.status_code >= 400:
        try:
            detail = response.json()
        except Exception:
            detail = {"message": "Signup failed", "status": response.status_code}
        raise HTTPException(status_code=response.status_code, detail=detail)

    return response.json()

app.include_router(router, prefix="/api")
