import os
from dotenv import load_dotenv
from typing import List

load_dotenv()

# Clear any proxy settings that might interfere
for proxy_var in ['HTTP_PROXY', 'HTTPS_PROXY', 'http_proxy', 'https_proxy']:
    if proxy_var in os.environ:
        del os.environ[proxy_var]

# Set the API key as environment variable for OpenAI
API_KEY = os.getenv("OPENAI_API_KEY")
if API_KEY and "your_" not in API_KEY:
    os.environ["OPENAI_API_KEY"] = API_KEY

# Import OpenAI after setting environment variable
from openai import OpenAI

MOCK_MODE = False
client = None

if not API_KEY or "your_" in API_KEY:
    print("WARNING: OPENAI_API_KEY not found or invalid. Using MOCK MODE.")
    MOCK_MODE = True
else:
    try:
        # Initialize client - it will use the environment variable
        client = OpenAI()
        print("OpenAI client initialized successfully.")
    except Exception as e:
        print(f"Error configuring OpenAI: {e}. Switching to MOCK MODE.")
        MOCK_MODE = True

def get_embeddings(text: str) -> List[float]:
    """Generate embeddings using OpenAI or Mock"""
    if MOCK_MODE or client is None:
        return [0.1] * 1536  # OpenAI embeddings are 1536 dimensions
    
    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Embedding error: {e}")
        return [0.1] * 1536

def get_query_embedding(text: str) -> List[float]:
    """Generate query embeddings using OpenAI or Mock"""
    return get_embeddings(text)  # Same function for OpenAI

async def generate_answer(prompt: str, context: str) -> str:
    """Generate answer using OpenAI or Mock"""
    if MOCK_MODE or client is None:
        return f"""**[MOCK AI RESPONSE]**
Based on your question '{prompt}', here is a simulated answer:

Physical AI is the intersection of robotics and AI. It involves embodied agents interacting with the physical world.

*(This is a mock response because the API key is missing or invalid.)*"""

    try:
        print(f"Generating answer for: {prompt[:50]}...")
        
        # Enhanced system prompt to keep AI focused on the book
        system_prompt = """You are an AI assistant specifically built for the "Physical AI & Humanoid Robotics" textbook. 

Your role:
- ONLY answer questions related to Physical AI, Humanoid Robotics, and topics covered in this textbook
- If asked about anything unrelated to the book (e.g., general knowledge, other topics, personal questions), politely decline
- Use this exact response for off-topic questions: "I'm sorry, I am an AI assistant specifically built for the Physical AI & Humanoid Robotics textbook. I can only answer questions related to this book. Please feel free to ask me anything about Physical AI, Humanoid Robotics, embodied intelligence, robot perception, or any other topics covered in the textbook. I'm happy to assist you!"

Topics you CAN help with:
- Physical AI and embodied intelligence
- Humanoid robotics and robot design
- Robot perception (vision, sensors)
- Sim-to-real transfer
- Robot learning and control
- Digital twins and simulation
- Any content from the textbook chapters

Be helpful, clear, and educational when answering book-related questions."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"""Context from the textbook:
{context}

Question: {prompt}

Provide a clear, detailed answer based on the textbook content."""}
            ],
            temperature=0.7,
            max_tokens=500
        )
        print("Answer generated successfully")
        return response.choices[0].message.content
    except Exception as e:
        error_msg = f"Error using AI model: {str(e)}"
        print(f"ERROR in generate_answer: {error_msg}")
        raise Exception(error_msg)

async def translate_to_urdu(text: str) -> str:
    """Translate to Urdu using OpenAI or Mock"""
    if MOCK_MODE or client is None:
        return f"""**[MOCK URDU TRANSLATION]**

یہ ایک مصنوعی نمونہ ہے۔ (This is a mock sample.)

Original text: {text[:50]}..."""

    try:
        print(f"Translating to Urdu: {text[:50]}...")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional translator specializing in technical content."},
                {"role": "user", "content": f"Translate this technical text to Urdu:\\n\\n{text[:1000]}"}
            ],
            temperature=0.3,
            max_tokens=1000
        )
        print("Translation completed successfully")
        return response.choices[0].message.content
    except Exception as e:
        error_msg = f"Translation error: {str(e)}"
        print(f"ERROR in translate_to_urdu: {error_msg}")
        raise Exception(error_msg)

async def personalize_content(text: str, user_background: dict) -> str:
    """Personalize content using OpenAI or Mock"""
    if MOCK_MODE or client is None:
        level = user_background.get('software_exp', 'general')
        return f"""**[MOCK PERSONALIZED CONTENT - {level.upper()}]**

This content has been adapted for your skill level.

{text[:200]}...
*(Rest of content simulated)*"""

    try:
        print(f"Personalizing content for: {user_background}")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert educator who adapts technical content to different skill levels."},
                {"role": "user", "content": f"""Adapt this text for a user with:
Software Experience: {user_background.get('software_exp')}
Hardware Experience: {user_background.get('hardware_exp')}

Content:
{text[:1000]}"""}
            ],
            temperature=0.5,
            max_tokens=1000
        )
        print("Personalization completed successfully")
        return response.choices[0].message.content
    except Exception as e:
        error_msg = f"Personalization error: {str(e)}"
        print(f"ERROR in personalize_content: {error_msg}")
        raise Exception(error_msg)
