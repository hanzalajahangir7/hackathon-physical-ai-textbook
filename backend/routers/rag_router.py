from fastapi import APIRouter, HTTPException
from models.schemas import QueryRequest, QueryResponse
from services.openai_client import get_query_embedding, generate_answer
from services.qdrant_client import search_vectors

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    """Query RAG system"""
    try:
        if request.selected_text:
            # User selected specific text
            answer = await generate_answer(request.query, request.selected_text)
            return QueryResponse(answer=answer, sources=[])
        
        # Try RAG query with Qdrant
        try:
            query_vector = get_query_embedding(request.query)
            results = search_vectors(query_vector, limit=request.top_k)
            
            if results and len(results) > 0:
                context = "\n\n".join([
                    f"Source {i+1}: {r['payload'].get('text', '')}"
                    for i, r in enumerate(results)
                ])
                
                answer = await generate_answer(request.query, context)
                
                return QueryResponse(
                    answer=answer,
                    sources=[{
                        "text": r['payload'].get('text', '')[:200] + "...",
                        "chapter": r['payload'].get('chapter', 'Unknown'),
                        "score": r['score']
                    } for r in results]
                )
        except Exception as qdrant_error:
            print(f"Qdrant error (using direct AI): {qdrant_error}")
        
        # Fallback: Use AI without RAG context
        context = "You are an expert on Physical AI and Humanoid Robotics. Answer based on your knowledge."
        answer = await generate_answer(request.query, context)
        
        return QueryResponse(
            answer=answer,
            sources=[]
        )
    except Exception as e:
        print(f"Error in query_rag: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
