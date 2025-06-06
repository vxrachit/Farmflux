from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini_service import get_chatbot_response
from app.models.chatbot import ChatRequest



router = APIRouter()

@router.post("/chatbot")
async def chatbot_endpoint(request: ChatRequest):
    answer = await get_chatbot_response(request.question)
    if not answer:
        raise HTTPException(status_code=500, detail="Failed to get chatbot response")
    return {"answer": answer}