"""Tests for the Plato CLI."""

from plato_cli.main import app
from plato_core.domain.deployment import ProviderType
from typer.testing import CliRunner

runner = CliRunner()


def test_add_target():
    """Test adding a new deployment target."""
    result = runner.invoke(
        app,
        ["add-target", "test-target", ProviderType.LOCAL.value, "localhost"],
    )
    assert result.exit_code == 0
    assert "Added deployment target: test-target" in result.stdout


def test_add_target_invalid_provider():
    """Test adding a target with invalid provider."""
    result = runner.invoke(
        app,
        ["add-target", "test-target", "invalid-provider", "localhost"],
    )
    assert result.exit_code == 2  # Typer validation error
    assert "Invalid value for 'PROVIDER:{local|aws|raspberry_pi}'" in result.stdout


def test_list_targets():
    """Test listing deployment targets."""
    result = runner.invoke(app, ["list-targets"])
    assert result.exit_code == 0
    assert "No targets configured yet" in result.stdout
