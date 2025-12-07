from pydantic import BaseModel
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5
    selected_text: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[dict]

class PersonalizeRequest(BaseModel):
    content: str
    user_background: dict

class TranslateRequest(BaseModel):
    content: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatHistory(BaseModel):
    messages: List[ChatMessage]
