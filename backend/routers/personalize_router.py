from fastapi import APIRouter
from models.schemas import PersonalizeRequest, TranslateRequest
from services.openai_client import personalize_content, translate_to_urdu

router = APIRouter()

@router.post("/personalize")
async def personalize(request: PersonalizeRequest):
    """Personalize content based on user background"""
    result = await personalize_content(request.content, request.user_background)
    return {"personalized_content": result}

@router.post("/translate-urdu")
async def translate(request: TranslateRequest):
    """Translate content to Urdu"""
    result = await translate_to_urdu(request.content)
    return {"translated_content": result}
