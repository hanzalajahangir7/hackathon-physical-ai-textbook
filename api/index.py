import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from backend.main import app

# Vercel expects a variable named 'app' or a function
# FastAPI app can be used directly
