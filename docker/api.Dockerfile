# Use Python 3.11 slim as base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY packages/plato-core/pyproject.toml packages/plato-core/
COPY packages/plato-api/pyproject.toml packages/plato-api/

# Install dependencies for both packages
RUN pip install --no-cache-dir -e packages/plato-core && \
    pip install --no-cache-dir -e packages/plato-api

# Copy source code
COPY packages/plato-core/src packages/plato-core/src
COPY packages/plato-api/src packages/plato-api/src

# Set environment variables
ENV PYTHONPATH=/app/packages/plato-core/src:/app/packages/plato-api/src
ENV PORT=8000

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "plato_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
