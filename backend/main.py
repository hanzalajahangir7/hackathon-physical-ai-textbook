from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import os

from routers import rag_router, chat_router, personalize_router
from database.db import init_db

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown (if needed)

app = FastAPI(
    title="Physical AI Textbook API", 
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rag_router.router, prefix="/api/rag", tags=["RAG"])
app.include_router(chat_router.router, prefix="/api/chat", tags=["Chat"])
app.include_router(personalize_router.router, prefix="/api/personalize", tags=["Personalize"])

@app.get("/")
async def root():
    return {"message": "Physical AI Textbook API Running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
