from fastapi import FastAPI
from pydantic import BaseModel
from rag import get_response

# ---------------------------
# FastAPI app
# ---------------------------

app = FastAPI()

# ---------------------------
# Request schema
# ---------------------------

class ChatRequest(BaseModel):
    question: str


# ---------------------------
# API Endpoint
# ---------------------------

@app.post("/chat")
def chat(data: ChatRequest):

    answer = get_response(data.question)

    return {
        "answer": answer
    }