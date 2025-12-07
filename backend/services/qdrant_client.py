from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import os
from typing import List, Dict

client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)

COLLECTION_NAME = "physical_ai_textbook"

def init_collection(vector_size: int = 1536):
    """Initialize Qdrant collection"""
    collections = client.get_collections().collections
    if not any(col.name == COLLECTION_NAME for col in collections):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )

def upsert_vectors(points: List[PointStruct]):
    """Upsert vectors to Qdrant"""
    client.upsert(collection_name=COLLECTION_NAME, points=points)

def search_vectors(query_vector: List[float], limit: int = 5) -> List[Dict]:
    """Search similar vectors"""
    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit
    )
    return [{"id": h.id, "score": h.score, "payload": h.payload} for h in results]
