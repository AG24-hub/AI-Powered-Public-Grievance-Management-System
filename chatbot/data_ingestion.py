from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from pathlib import Path

#--------------------------------------------------
#load document
#--------------------------------------------------

pdf_path = Path(__file__).parent / "data" / "WEST_BENGAL_PUBLIC_GRIEVANCE_KNOWLEDGE_BASE.pdf"

loader = PyPDFLoader(str(pdf_path))

docs = loader.load()

print("Document loaded")

#--------------------------------------------------
#chunking
#--------------------------------------------------

splitter =  RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)

print("Chunking completed")


#--------------------------------------------------
#Embedding and storing
#--------------------------------------------------

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="chroma_db"
)

print("Document stored")