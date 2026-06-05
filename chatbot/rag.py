from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

load_dotenv()

# ------------------------------------
# Load Vector DB
# ------------------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
)

retriever = vectorstore.as_retriever(
  search_type = "mmr",
  search_kwargs = {
    "k": 4, 
    "fetch_k": 10,
    "lambda_mult": 0.5
  }
)

# ------------------------------------
# LLM
# ------------------------------------

llm = ChatMistralAI(
  model = "mistral-small-2506", 
  api_key=os.getenv("MISTRAL_API_KEY"),
  temperature=0.2
)

# ------------------------------------
# Prompt
# ------------------------------------

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system", 
            """
            Yor are a helpful grievance assistant.
            Rules:
            - Use ONLY the provided context.
            - Do not make up information.
            - If the answer is not found in the context, respond exactly:
              "Please see the instruction given on the home page."
            - Answer in a professional and friendly manner.
            - Use bullet points when appropriate.
            - Keep responses concise (2_3 lines)
            """
        ),
        (
            "human",
            """
            Context : {context},
            Question : {question}
            """
        )
    ]
)

# ------------------------------------
# Chat Loop
# ------------------------------------

print("RAG system is ready. Ask your question!")
print("Press 0 to exit ")

def get_response(query: str):

    docs = retriever.invoke(query)

    context = "\n\n".join([doc.page_content for doc in docs])

    chain = prompt | llm | StrOutputParser()

    response = chain.invoke({
        "context": context,
        "question": query
    })

    return response