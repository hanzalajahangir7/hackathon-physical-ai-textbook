# 🚀 QUICK START GUIDE

## Prerequisites Check

Before starting, ensure you have:

- [ ] Python 3.11 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] Git installed
- [ ] A code editor (VS Code recommended)

Check versions:
```bash
python --version
node --version
git --version
```

## Step 1: Get API Keys (5 minutes)

### Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Qdrant Cloud (Free Tier)
1. Go to https://qdrant.tech/
2. Sign up for free account
3. Create a cluster
4. Copy cluster URL and API key

### Neon PostgreSQL (Optional - can use SQLite)
1. Go to https://neon.tech/
2. Sign up for free
3. Create a database
4. Copy connection string

## Step 2: Setup Environment (2 minutes)

1. Navigate to project:
```bash
cd "c:\Users\Ai Bonga\Desktop\Hackathon-Project"
```

2. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

3. Edit `.env` and add your keys:
```
GEMINI_API_KEY=your_actual_gemini_key
QDRANT_URL=your_actual_qdrant_url
QDRANT_API_KEY=your_actual_qdrant_key
DATABASE_URL=sqlite+aiosqlite:///./test.db
```

## Step 3: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# You should see "Successfully installed..." messages
```

## Step 4: Frontend Setup (3 minutes)

Open a NEW terminal window:

```bash
# Navigate to frontend
cd "c:\Users\Ai Bonga\Desktop\Hackathon-Project\frontend"

# Install dependencies
npm install

# This will take 2-3 minutes
```

## Step 5: Load Data to Qdrant (2 minutes)

Open a THIRD terminal window:

```bash
# Navigate to rag folder
cd "c:\Users\Ai Bonga\Desktop\Hackathon-Project\rag"

# Run document processing
python process_documents.py

# You should see:
# Processing: ...
# Uploaded X vectors
# [SUCCESS] All documents processed
```

## Step 6: Start Backend (1 minute)

In the backend terminal (where venv is activated):

```bash
# Make sure you're in backend folder
cd "c:\Users\Ai Bonga\Desktop\Hackathon-Project\backend"

# Start FastAPI server
python -m uvicorn main:app --reload

# You should see:
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Keep this terminal open!**

## Step 7: Start Frontend (1 minute)

In the frontend terminal:

```bash
# Make sure you're in frontend folder
cd "c:\Users\Ai Bonga\Desktop\Hackathon-Project\frontend"

# Start Docusaurus
npm start

# Browser will automatically open to http://localhost:3000
```

**Keep this terminal open!**

## Step 8: Test Everything (5 minutes)

### Test 1: Textbook Loads
- ✅ Browser should show the textbook homepage
- ✅ Navigation sidebar should be visible
- ✅ Click through chapters

### Test 2: Chatbot
- ✅ Click the 💬 button in bottom-right corner
- ✅ Type: "What is ROS 2?"
- ✅ Wait for AI response
- ✅ Should get detailed answer about ROS 2

### Test 3: Selected Text Query
- ✅ Go to any chapter
- ✅ Highlight some text
- ✅ Click "🤖 Ask AI about this" button
- ✅ Type a question about the selected text
- ✅ Get specific answer

### Test 4: Personalization
- ✅ Go to any chapter
- ✅ Click "👤 Personalize for Me" button
- ✅ Wait for content to adapt
- ✅ Content should be rewritten for your level

### Test 5: Urdu Translation
- ✅ Click "🌐 Translate to Urdu" button
- ✅ Wait for translation
- ✅ Content should appear in Urdu

### Test 6: Backend API
- ✅ Open http://localhost:8000
- ✅ Should see: {"message": "Physical AI Textbook API Running"}
- ✅ Open http://localhost:8000/health
- ✅ Should see: {"status": "healthy"}

## Troubleshooting

### Backend won't start

**Error**: "No module named 'fastapi'"
```bash
# Make sure venv is activated
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

**Error**: "Address already in use"
```bash
# Kill process on port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

### Frontend won't start

**Error**: "Cannot find module"
```bash
# Delete node_modules and reinstall
cd frontend
rmdir /s node_modules  # Windows
# rm -rf node_modules  # Mac/Linux
npm install
```

**Error**: "Port 3000 already in use"
```bash
# Use different port
npm start -- --port 3001
```

### RAG not working

**Error**: "Invalid API key"
- Check `.env` file has correct Gemini API key
- No spaces around `=` sign
- No quotes around values

**Error**: "Qdrant connection failed"
- Verify Qdrant cluster is running
- Check URL format: `https://xxx.qdrant.io`
- Verify API key is correct

**Error**: "No results found"
- Run `python rag/process_documents.py` again
- Check that markdown files exist in `frontend/docs/`
- Verify Qdrant collection was created

### Chatbot not responding

1. Check backend is running (http://localhost:8000/health)
2. Open browser console (F12) and check for errors
3. Verify CORS is enabled in backend
4. Check network tab for failed requests

## Next Steps

### For Local Development

You're all set! You can now:
- Edit chapters in `frontend/docs/`
- Modify components in `frontend/src/components/`
- Update backend logic in `backend/`
- Test changes in real-time

### For Deployment

See README.md section "Deployment" for:
- GitHub Pages setup
- Backend deployment options
- Environment variable configuration

## Quick Commands Reference

### Backend
```bash
# Start backend
cd backend
venv\Scripts\activate
python -m uvicorn main:app --reload

# Run tests (if you add them)
pytest

# Check logs
# Logs appear in terminal
```

### Frontend
```bash
# Start dev server
cd frontend
npm start

# Build for production
npm run build

# Serve production build
npm run serve

# Clear cache
npm run clear
```

### RAG
```bash
# Process documents
cd rag
python process_documents.py

# Re-process after adding new chapters
python process_documents.py
```

## Success Indicators

You know everything is working when:

1. ✅ Backend shows: "Uvicorn running on http://127.0.0.1:8000"
2. ✅ Frontend opens automatically in browser
3. ✅ Chatbot responds to questions
4. ✅ Selected text queries work
5. ✅ Personalization changes content
6. ✅ Urdu translation works
7. ✅ No errors in browser console (F12)
8. ✅ No errors in terminal windows

## Time Estimate

- **Initial Setup**: 15-20 minutes
- **Testing**: 5-10 minutes
- **Total**: 25-30 minutes

## Getting Help

If stuck:
1. Check error messages carefully
2. Review this guide step-by-step
3. Check README.md for detailed info
4. Check PROJECT_SUMMARY.md for troubleshooting
5. Verify all prerequisites are installed

---

**You're ready to go! Start building and testing your Physical AI textbook! 🚀**
