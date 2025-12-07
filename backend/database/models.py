from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database.db import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    role = Column(String)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    software_exp = Column(String)
    hardware_exp = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
