# Group Chat Semantic Search

A full-stack application featuring a React/Vite frontend and a FastAPI machine learning backend. This project enables semantic searching over group chat messages, utilizing TF-IDF and Cosine Similarity, along with a custom Hinglish NLP preprocessing pipeline to bridge the semantic gap.

## Features
- **Semantic Search**: Powered by Scikit-learn's TF-IDF Vector Space Index.
- **Hinglish NLP Processing**: Automatically expands search queries with domain-specific Hinglish synonyms (e.g., expanding "trip" to "manali", "goa", "pahad", etc.).
- **Hybrid Scoring**: Combines vector similarity, BM25 exact match keyword overlap, sender attribution, and temporal filtering.
- **FastAPI Backend**: High-performance Python backend serving the ML engine.
- **Modern Frontend**: Built with React, Vite, Tailwind CSS, and Lucide Icons.

## Project Structure
- `/` - React frontend built with Vite and Tailwind CSS.
- `/ml_api/` - FastAPI backend and Scikit-learn ML Engine.

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- pip

### Running Locally

1. **Start the Backend (ML API)**
   Navigate to the `ml_api` directory, install Python dependencies, and start the FastAPI server:
   ```bash
   cd ml_api
   pip install -r requirements.txt
   uvicorn app:app --port 8000
   ```
   The backend will be running at `http://127.0.0.1:8000`.

2. **Start the Frontend**
   Navigate to the root directory, install Node dependencies, and start the Vite development server:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.
