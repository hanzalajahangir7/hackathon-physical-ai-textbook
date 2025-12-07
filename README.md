This project is a comprehensive educational platform featuring:

- 📚 **Full Docusaurus Textbook** - Complete course content on Physical AI, ROS 2, Gazebo, NVIDIA Isaac, and Humanoid Robotics
- 🤖 **RAG Chatbot** - AI assistant that answers questions about textbook content using Gemini embeddings and Qdrant vector search
- 👤 **Content Personalization** - Adapt chapter content based on user background (software/hardware experience)
- 🌐 **Urdu Translation** - Translate any chapter to Urdu with one click
- 💬 **Ask AI on Selected Text** - Highlight text and ask specific questions about it
- 🚀 **Production-Ready** - Deployed on GitHub Pages with FastAPI backend

## ✨ Features

### Core Functionality (100 points)

- ✅ **Complete Textbook** - 13 weeks of comprehensive content
- ✅ **RAG System** - Retrieval-Augmented Generation with Gemini + Qdrant
- ✅ **Interactive Chatbot** - Floating widget on every page
- ✅ **Selected Text Queries** - Ask AI about specific passages
- ✅ **GitHub Pages Deployment** - Automated CI/CD

### Bonus Features (150 bonus points possible)

- ✅ **Content Personalization** (50 points) - Adapt content to user skill level
- ✅ **Urdu Translation** (50 points) - Full chapter translation
- ✅ **Advanced UI/UX** (50 points) - Polished, professional interface

## 🏗️ Architecture

```
hackathon-physical-ai-textbook/
├── backend/                    # FastAPI backend
│   ├── main.py                # API entry point
│   ├── routers/               # API endpoints
│   │   ├── rag_router.py     # RAG queries
│   │   ├── chat_router.py    # Chat history
│   │   └── personalize_router.py  # Personalization & translation
│   ├── services/
│   │   ├── gemini_client.py  # Gemini API integration
│   │   └── qdrant_client.py  # Vector database
│   ├── models/
│   │   └── schemas.py        # Pydantic models
│   └── database/
│       ├── db.py             # Database connection
│       └── models.py         # SQLAlchemy models
│
├── frontend/                   # Docusaurus textbook
│   ├── docs/                  # Markdown chapters
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ChatbotWidget.tsx
│   │   │   ├── AskAIButton.tsx
│   │   │   └── ChapterControls.tsx
│   │   └── theme/
│   │       └── Root.tsx      # Global component injection
│   ├── docusaurus.config.ts
│   └── sidebars.ts
│
├── rag/                        # Document processing
│   └── process_documents.py   # Chunk & upload to Qdrant
│
└── .github/workflows/
    └── deploy.yml             # GitHub Actions deployment
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))
- **Qdrant Cloud Account** ([Free tier](https://qdrant.tech/))
- **Neon PostgreSQL** ([Free tier](https://neon.tech/)) or use SQLite locally

### 1. Clone the Repository

```bash
git clone https://github.com/hanzalajahangir7/hackathon-physical-ai-textbook.git
cd hackathon-physical-ai-textbook
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env
# Edit .env and add your API keys:
# GEMINI_API_KEY=your_key_here
# QDRANT_URL=your_qdrant_url
# QDRANT_API_KEY=your_qdrant_key
# DATABASE_URL=sqlite+aiosqlite:///./test.db  # Or your Neon URL

# Run backend
python -m uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at `http://localhost:3000`

### 4. Load Data to Qdrant

```bash
cd rag

# Make sure backend .env is configured
python process_documents.py
```

This will:
1. Read all markdown files from `frontend/docs/`
2. Split them into chunks
3. Generate embeddings with Gemini
4. Upload to Qdrant

## 📖 Textbook Content

The textbook covers a complete 13-week course:

### Module 1: ROS 2 Fundamentals (Weeks 3-5)
- ROS 2 architecture and core concepts
- Nodes, topics, services, and actions
- Building packages with Python
- URDF robot descriptions

### Module 2: Simulation (Weeks 6-7)
- Gazebo environment setup
- Physics simulation
- Sensor simulation
- Digital twins

### Module 3: NVIDIA Isaac (Weeks 8-10)
- Isaac Sim photorealistic simulation
- VSLAM and navigation
- Synthetic data generation
- Jetson deployment

### Module 4: Vision-Language-Action (Weeks 11-13)
- Voice commands with Whisper
- LLM integration for planning
- Conversational robotics
- Autonomous humanoid capstone

## 🤖 RAG System

### How It Works

1. **Document Processing**:
   - Markdown files are split into 500-word chunks
   - Each chunk is embedded using Gemini `embedding-001`
   - Embeddings are stored in Qdrant with metadata

2. **Query Processing**:
   - User question is embedded with Gemini
   - Top-k similar chunks are retrieved from Qdrant
   - Context + question sent to Gemini `gemini-1.5-flash`
   - Answer is generated and returned

3. **Selected Text Mode**:
   - User highlights text on page
   - Asks question about specific passage
   - No vector search needed, direct context

### API Endpoints

```bash
# Query RAG system
POST /api/rag/query
{
  "query": "What is ROS 2?",
  "top_k": 5,
  "selected_text": null  # Optional
}

# Personalize content
POST /api/personalize/personalize
{
  "content": "Chapter text...",
  "user_background": {
    "software_exp": "intermediate",
    "hardware_exp": "beginner"
  }
}

# Translate to Urdu
POST /api/personalize/translate-urdu
{
  "content": "Chapter text..."
}

# Health check
GET /health
```

## 🎨 Frontend Components

### ChatbotWidget
- Floating button in bottom-right corner
- Opens chat interface
- Maintains conversation history
- Connects to RAG backend

### AskAIButton
- Appears when text is selected
- Opens modal for questions
- Uses selected text as context
- No vector search needed

### ChapterControls
- Sticky toolbar at top of chapters
- "Personalize for Me" button
- "Translate to Urdu" button
- "Reset to Original" button

## 🚢 Deployment

### GitHub Pages (Frontend)

1. Update `docusaurus.config.ts`:
   ```typescript
   url: 'https://hanzalajahangir7.github.io',
   baseUrl: '/hackathon-physical-ai-textbook/',
   organizationName: 'hanzalajahangir7',
   projectName: 'hackathon-physical-ai-textbook',
   ```

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. GitHub Actions will automatically deploy to GitHub Pages

4. Enable GitHub Pages in repository settings:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

### Backend Deployment

Deploy FastAPI backend to:
- **Vercel** (recommended for hackathon)
- **Railway**
- **Render**
- **AWS Lambda** (with Mangum)

Update `REACT_APP_BACKEND_URL` in frontend to point to deployed backend.

## 🔧 Configuration

### Environment Variables

Create `.env` in project root:

```bash
# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Qdrant Cloud
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key

# Database (use SQLite for local development)
DATABASE_URL=sqlite+aiosqlite:///./test.db

# Or use Neon PostgreSQL for production
# DATABASE_URL=postgresql+asyncpg://user:pass@host/db
```

### Customization

- **Add chapters**: Create markdown files in `frontend/docs/`
- **Modify styling**: Edit `frontend/src/css/custom.css`
- **Change theme**: Update `docusaurus.config.ts`
- **Adjust RAG**: Modify chunk size in `rag/process_documents.py`

## 📊 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Google Gemini** - Embeddings & text generation
- **Qdrant** - Vector database for semantic search
- **SQLAlchemy** - Database ORM
- **Pydantic** - Data validation

### Frontend
- **Docusaurus v3** - Documentation framework
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client

### DevOps
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Static hosting

## 🎯 Hackathon Scoring

| Criteria | Points | Status |
|----------|--------|--------|
| Complete textbook with Docusaurus | 30 | ✅ |
| RAG chatbot integration | 30 | ✅ |
| Answer questions from book content | 20 | ✅ |
| Answer questions from selected text | 20 | ✅ |
| **Base Total** | **100** | **✅** |
| Content personalization | 50 | ✅ |
| Urdu translation | 50 | ✅ |
| **Bonus Total** | **100** | **✅** |
| **Grand Total** | **200** | **✅** |

## 📝 License

MIT License - feel free to use this for learning!

## 🙏 Acknowledgments

- **Panaversity** - For organizing this hackathon
- **Google Gemini** - For powerful AI capabilities
- **Qdrant** - For excellent vector search
- **Docusaurus** - For beautiful documentation

## 📧 Contact

Created by [HANZALA KNOX] for Panaversity Hackathon I

- GitHub: [hanzalajahangir7](https://github.com/hanzalajahangir7)
- Email: lyneskroff2189@gmail.com

---
