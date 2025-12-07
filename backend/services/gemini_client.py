import google.generativeai as genai
import os
from dotenv import load_dotenv
from typing import List

load_dotenv()

# Check for API Key
API_KEY = os.getenv("GEMINI_API_KEY")
MOCK_MODE = False

if not API_KEY or "your_" in API_KEY:
    print("WARNING: GEMINI_API_KEY not found or invalid. Using MOCK MODE.")
    MOCK_MODE = True
else:
    try:
        genai.configure(api_key=API_KEY)
    except Exception as e:
        print(f"Error configuring Gemini: {e}. Switching to MOCK MODE.")
        MOCK_MODE = True

def get_embeddings(text: str) -> List[float]:
    """Generate embeddings using Gemini or Mock"""
    if MOCK_MODE:
        return [0.1] * 768
    
    try:
        result = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_document"
        )
        return result['embedding']
    except Exception:
        return [0.1] * 768

def get_query_embedding(text: str) -> List[float]:
    """Generate query embeddings using Gemini or Mock"""
    if MOCK_MODE:
        return [0.1] * 768
        
    try:
        result = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_query"
        )
        return result['embedding']
    except Exception:
        return [0.1] * 768

async def generate_answer(prompt: str, context: str) -> str:
    """Generate answer using Gemini or Mock"""
    if MOCK_MODE:
        return f"""**[MOCK AI RESPONSE]**
Based on your question '{prompt}', here is a simulated answer:

Physical AI is the intersection of robotics and AI. It involves embodied agents interacting with the physical world.

*(This is a mock response because the API key is missing or invalid.)*"""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        full_prompt = f"""You are an expert teacher of Physical AI and Humanoid Robotics.
Context:
{context}

Question: {prompt}

Provide a clear, detailed answer."""
        
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        return f"Error using AI model: {str(e)}"

async def translate_to_urdu(text: str) -> str:
    """Translate to Urdu using Gemini or Mock"""
    if MOCK_MODE:
        return f"""**[MOCK URDU TRANSLATION]**

یہ ایک مصنوعی نمونہ ہے۔ (This is a mock sample.)

Original text: {text[:50]}..."""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        prompt = f"Translate this technical text to Urdu:\n\n{text}"
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Translation error: {str(e)}"

async def personalize_content(text: str, user_background: dict) -> str:
    """Personalize content using Gemini or Mock"""
    if MOCK_MODE:
        level = user_background.get('software_exp', 'general')
        return f"""**[MOCK PERSONALIZED CONTENT - {level.upper()}]**

This content has been adapted for your skill level.

{text[:200]}...
*(Rest of content simulated)*"""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        prompt = f"""Adapt this text for a user with:
Software Exp: {user_background.get('software_exp')}
Hardware Exp: {user_background.get('hardware_exp')}

Content:
{text}"""
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Personalization error: {str(e)}"
