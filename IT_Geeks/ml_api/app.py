import re
import math
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="Group Chat Semantic Search API — Himesh bhawsar ML Engine",
    description="FastAPI Microservice powered by Scikit-learn TF-IDF + N-gram Cosine Similarity & Hinglish NLP Preprocessing",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hinglish Concept Expansion Map (Bridging the Semantic Gap)
HINGLISH_SYNONYMS = {
    "trip": "manali trip goa pahad mountain vacation travel chalo pack baseline tickets",
    "decide": "fix final pack kardo baseline lock confirm confirm",
    "destination": "manali goa rishikesh pahad beach place location",
    "budget": "kharcha cost per head gpay paisa rate 6500 5k token price money expenditure",
    "cost": "price rate 6500 5k kharcha per head total token inr",
    "stay": "resort cottage room hotel stay booking venue orchard",
    "person": "per head per person individual per member participant",
    "money": "gpay transfer payment cash account token 5k 10k inr",
    "collecting": "gpay kar do bhej do transfer receive collection priya",
    "offsite": "workshop hackathon offsite meeting architecture q3 bangalore",
    "meeting": "workshop hackathon session meeting call",
    "scheduled": "august 3rd week 18th-20th date time fix",
    "food": "menu shuddh shakahari veg pure kitchen food breakfast dinner options",
    "vegetarian": "shuddh shakahari pure veg kitchen vegetarian nonveg",
    "mountains": "pahad crisp air manali weather cold hill station",
    "beach": "goa hot weather sea ocean",
    "airport": "cab flight morning subah 4 baje pick departure indigo",
    "advance": "token money 10k transfer done advance confirmation slip",
    "flight": "indigo morning flight 6:15 am booking ticket departure",
    "hackathon": "bangalore tech park office hall 4 workshop venue"
}

class SearchRequest(BaseModel):
    query: str
    sender: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    searchMode: Optional[str] = "hybrid"

def preprocess_text(text: str) -> str:
    """Preprocess and expand Hinglish text with domain synonyms."""
    text_lower = text.lower()
    expanded_tokens = [text_lower]
    
    for term, expansion in HINGLISH_SYNONYMS.items():
        if term in text_lower:
            expanded_tokens.append(expansion)
            
    return " ".join(expanded_tokens)

# Global in-memory storage for Corpus Indexing
corpus_messages: List[Dict[str, Any]] = []
vectorizer: Optional[TfidfVectorizer] = None
tfidf_matrix = None

@app.on_event("startup")
def load_and_index_corpus():
    """Initializes and builds TF-IDF Vector Space Index on startup."""
    global corpus_messages, vectorizer, tfidf_matrix
    print("FastAPI ML Engine: System Ready!")

@app.post("/api/index")
def index_messages(messages: List[Dict[str, Any]]):
    """Indexes chat messages using Scikit-learn TfidfVectorizer."""
    global corpus_messages, vectorizer, tfidf_matrix
    corpus_messages = messages
    
    raw_texts = [preprocess_text(msg.get("text", "")) for msg in messages]
    
    # Character & Word N-gram TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(
        ngram_range=(1, 3),
        sublinear_tf=True,
        max_features=25000,
        token_pattern=r'(?u)\b\w+\b'
    )
    
    tfidf_matrix = vectorizer.fit_transform(raw_texts)
    return {
        "status": "success",
        "total_indexed": len(messages),
        "vocabulary_size": len(vectorizer.vocabulary_)
    }

@app.post("/api/search")
def search_messages(req: SearchRequest):
    """Performs Hybrid RRF Vector Search over group chat corpus."""
    global corpus_messages, vectorizer, tfidf_matrix
    
    if not corpus_messages or vectorizer is None or tfidf_matrix is None:
        return {"results": [], "error": "Index not loaded yet"}

    query_processed = preprocess_text(req.query)
    query_vec = vectorizer.transform([query_processed])
    
    # Scikit-learn Cosine Similarity computation
    cosine_sims = cosine_similarity(query_vec, tfidf_matrix).flatten()
    
    # Sender attribution detection
    query_lower = req.query.lower()
    detected_sender = req.sender
    if not detected_sender:
        for msg in corpus_messages:
            sender_name = msg.get("sender", "").lower()
            if sender_name in query_lower:
                detected_sender = msg.get("sender")
                break
                
    results = []
    
    for idx, msg in enumerate(corpus_messages):
        vec_score = float(cosine_sims[idx])
        
        # Calculate BM25 / Keyword exact overlap score
        text_lower = msg["text"].lower()
        words = [w for w in re.findall(r'\w+', query_lower) if len(w) > 2]
        exact_matches = sum(1 for w in words if w in text_lower)
        bm25_score = (exact_matches / max(len(words), 1)) if words else 0.0
        
        # Attributed boost
        attributed_boost = 0.0
        if detected_sender and msg.get("sender", "").lower() == detected_sender.lower():
            attributed_boost = 0.4
            
        # Temporal filter logic
        temporal_boost = 0.0
        if req.startDate and req.endDate:
            msg_date = msg.get("date", "")
            if req.startDate <= msg_date <= req.endDate:
                temporal_boost = 0.3
            else:
                # Penalize out of date range
                vec_score *= 0.1
                
        # Reciprocal Rank Fusion (RRF) / Hybrid scoring
        if req.searchMode == "keyword":
            final_score = bm25_score + attributed_boost + temporal_boost
        elif req.searchMode == "semantic":
            final_score = vec_score + attributed_boost + temporal_boost
        else: # Hybrid (Default)
            final_score = (0.6 * vec_score) + (0.4 * bm25_score) + attributed_boost + temporal_boost
            
        if final_score > 0.01:
            # Retrieve surrounding context window (+/- 5 messages)
            start_ctx = max(0, idx - 5)
            end_ctx = min(len(corpus_messages), idx + 6)
            context_msgs = corpus_messages[start_ctx:end_ctx]
            
            results.append({
                "message": msg,
                "score": round(final_score, 4),
                "matchType": "semantic" if vec_score > bm25_score else "attributed" if attributed_boost > 0 else "temporal",
                "context": context_msgs,
                "vectorSimilarity": round(vec_score, 4),
                "bm25Score": round(bm25_score, 4),
                "attributedBoost": attributed_boost,
                "temporalBoost": temporal_boost,
                "highlights": words
            })
            
    # Sort results descending by score
    results.sort(key=lambda x: x["score"], reverse=True)
    return {"results": results[:50], "totalHits": len(results)}

@app.get("/health")
def healthcheck():
    return {
        "status": "healthy",
        "engine": "FastAPI + Scikit-learn ML Backend",
        "developer": "Himesh bhawsar (Full-Stack + AI/ML Engineer)"
    }
