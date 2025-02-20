"""Tests for the Plato API."""

import pytest
from fastapi.testclient import TestClient
from plato_api.main import app
from plato_core.domain.deployment import ProviderType

client = TestClient(app)


def test_health_check():
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_create_target():
    """Test creating a new deployment target."""
    target_data = {
        "name": "test-target",
        "provider": ProviderType.LOCAL.value,
        "host": "localhost",
        "config": {"port": "8080"}
    }
    response = client.post("/api/v1/targets", json=target_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == target_data["name"]
    assert data["provider"] == target_data["provider"]
    assert data["host"] == target_data["host"]


def test_create_target_invalid():
    """Test creating a target with invalid data."""
    target_data = {
        "name": "test-target",
        "provider": "invalid-provider",  # Invalid enum value
        "host": "localhost"
    }
    response = client.post("/api/v1/targets", json=target_data)
    assert response.status_code == 422  # Validation error


def test_list_targets():
    """Test listing deployment targets."""
    response = client.get("/api/v1/targets")
    assert response.status_code == 200
    assert response.json() == []  # Empty list for now 