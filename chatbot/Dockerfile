# ---------- Stage 1: Install dependencies ----------
FROM python:3.11-slim AS deps

WORKDIR /app

# Install build dependencies for hnswlib / chromadb compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install PyTorch CPU-only version first to avoid downloading CUDA (~2.5GB)
RUN pip install --no-cache-dir --default-timeout=1000 torch --index-url https://download.pytorch.org/whl/cpu

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# ---------- Stage 2: Build ----------
FROM python:3.11-slim AS builder

WORKDIR /app

COPY --from=deps /usr/local /usr/local
COPY . .

# No build step required for FastAPI.
# If you generated assets or preprocessed data,
# this is where you'd do it.

# ---------- Stage 3: Run ----------
FROM python:3.11-slim AS runner

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY --from=builder /usr/local /usr/local
COPY --from=builder /app .

EXPOSE 8000

CMD ["uvicorn", "chatbot_api:app", "--host", "0.0.0.0", "--port", "8000"]