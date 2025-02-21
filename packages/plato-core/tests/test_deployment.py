"""Tests for deployment domain models."""

from plato_core.domain.deployment import DeploymentTarget, ProviderType


def test_create_local_deployment():
    """Test creating a local deployment target."""
    target = DeploymentTarget(
        name="local-dev",
        provider=ProviderType.LOCAL,
        host="localhost",
        config={"port": "8080"},
    )
    assert target.name == "local-dev"
    assert target.provider == ProviderType.LOCAL
    assert target.host == "localhost"
    assert target.config["port"] == "8080"
    assert target.credentials is None


def test_create_aws_deployment():
    """Test creating an AWS deployment target with credentials."""
    target = DeploymentTarget(
        name="prod-aws",
        provider=ProviderType.AWS,
        host="ec2-1-2-3-4.compute-1.amazonaws.com",
        credentials={
            "aws_access_key_id": "dummy_key",
            "aws_secret_access_key": "dummy_secret",
        },
        config={"region": "us-west-2", "instance_type": "t3.micro"},
    )
    assert target.name == "prod-aws"
    assert target.provider == ProviderType.AWS
    assert target.credentials is not None
    assert "aws_access_key_id" in target.credentials
    assert target.config["region"] == "us-west-2"


def test_validate_credentials():
    """Test credential validation."""
    target = DeploymentTarget(
        name="test", provider=ProviderType.LOCAL, host="localhost"
    )
    assert target.validate_credentials() is True  # Currently a placeholder
