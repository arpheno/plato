"""
Plato API - REST API service for DevOps automation platform.
"""

from fastapi import FastAPI, HTTPException
from plato_core.domain.deployment import DeploymentTarget

app = FastAPI(
    title="Plato API",
    description="REST API service for DevOps automation platform",
    version="0.1.0",
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/api/v1/targets", response_model=DeploymentTarget)
async def create_target(target: DeploymentTarget) -> DeploymentTarget:
    """Create a new deployment target."""
    try:
        # Validate the target - will implement persistence later
        if not target.validate_credentials():
            raise ValueError("Invalid credentials")
        return target
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/v1/targets")
async def list_targets() -> list[DeploymentTarget]:
    """List all deployment targets."""
    # Placeholder - will implement storage later
    return []
