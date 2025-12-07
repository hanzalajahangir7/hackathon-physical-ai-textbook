import os
from pathlib import Path
import sys
sys.path.append('../backend')

from services.gemini_client import get_embeddings
from services.qdrant_client import init_collection, upsert_vectors
from qdrant_client.models import PointStruct

def split_into_chunks(text: str, chunk_size: int = 500) -> list:
    """Split text into chunks"""
    words = text.split()
    chunks = []
    current = []
    
    for word in words:
        current.append(word)
        if len(current) >= chunk_size:
            chunks.append(' '.join(current))
            current = []
    
    if current:
        chunks.append(' '.join(current))
    
    return chunks

def process_markdown_files(docs_path: str):
    """Process all markdown and upload to Qdrant"""
    init_collection(768)
    
    points = []
    doc_id = 0
    
    for md_file in Path(docs_path).rglob("*.md"):
        print(f"Processing: {md_file}")
        
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        chunks = split_into_chunks(content, 500)
        
        for chunk in chunks:
            embedding = get_embeddings(chunk)
            
            point = PointStruct(
                id=doc_id,
                vector=embedding,
                payload={
                    "text": chunk,
                    "chapter": str(md_file.parent.name),
                    "file": str(md_file.name)
                }
            )
            points.append(point)
            doc_id += 1
            
            # Batch upload
            if len(points) >= 100:
                upsert_vectors(points)
                print(f"Uploaded {len(points)} vectors")
                points = []
    
    if points:
        upsert_vectors(points)
        print(f"Uploaded final {len(points)} vectors")

if __name__ == "__main__":
    process_markdown_files("../frontend/docs")
    print("[SUCCESS] All documents processed and uploaded to Qdrant")
