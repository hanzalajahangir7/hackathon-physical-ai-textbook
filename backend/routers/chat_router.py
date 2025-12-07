from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from models.schemas import ChatHistory as ChatHistorySchema
from database.db import get_session
from database.models import ChatHistory
from sqlalchemy import select

router = APIRouter()

@router.post("/save")
async def save_chat(chat: ChatHistorySchema, session: AsyncSession = Depends(get_session)):
    """Save chat history"""
    for message in chat.messages:
        db_message = ChatHistory(
            session_id="default",
            role=message.role,
            content=message.content
        )
        session.add(db_message)
    await session.commit()
    return {"status": "saved"}

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str, session: AsyncSession = Depends(get_session)):
    """Get chat history for a session"""
    result = await session.execute(
        select(ChatHistory).where(ChatHistory.session_id == session_id).order_by(ChatHistory.created_at)
    )
    messages = result.scalars().all()
    return {"messages": [{"role": m.role, "content": m.content} for m in messages]}
