"""
Plato CLI - DevOps automation tool for managing multiple side projects.
"""

from typing import Optional

import typer
from plato_core.domain.deployment import DeploymentTarget, ProviderType
from rich import print as rprint

app = typer.Typer(
    name="plato",
    help="DevOps automation tool for managing multiple side projects",
    add_completion=False,
)


@app.command()
def add_target(
    name: str = typer.Argument(..., help="Name of the deployment target"),
    provider: ProviderType = typer.Argument(..., help="Type of deployment provider"),
    host: str = typer.Argument(..., help="Hostname or IP address"),
    config_file: Optional[str] = typer.Option(
        None, "--config", "-c", help="Path to YAML config file"
    ),
) -> None:
    """Add a new deployment target."""
    try:
        target = DeploymentTarget(
            name=name,
            provider=provider,
            host=host,
        )
        rprint(f"[green]✓[/green] Added deployment target: {target.name}")
    except Exception as e:
        rprint(f"[red]✗[/red] Failed to add target: {str(e)}")
        raise typer.Exit(1)


@app.command()
def list_targets() -> None:
    """List all configured deployment targets."""
    # Placeholder - will implement storage later
    rprint("[yellow]No targets configured yet[/yellow]")


if __name__ == "__main__":
    app()
