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

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    history: list[Message]


# ---------------------------
# API Endpoint
# ---------------------------

@app.post("/chat")
def chat(data: ChatRequest):
    print(data)

    answer = get_response(
        query=data.question,
        history=data.history
    )

    return {
        "answer": answer
    }