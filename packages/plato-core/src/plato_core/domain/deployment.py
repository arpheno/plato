"""Domain models for deployment targets and configurations."""

from enum import Enum
from typing import Dict, Optional
from pydantic import BaseModel, Field


class ProviderType(str, Enum):
    """Supported deployment provider types."""
    
    LOCAL = "local"
    AWS = "aws"
    RASPBERRY_PI = "raspberry_pi"


class DeploymentTarget(BaseModel):
    """
    Represents a deployment target where projects can be deployed.
    
    This is a core domain entity that encapsulates the concept of where
    and how a project should be deployed, including necessary configuration
    and credentials.
    """
    
    name: str = Field(..., description="Unique name for this deployment target")
    provider: ProviderType = Field(..., description="Type of deployment provider")
    host: str = Field(..., description="Hostname or IP address for deployment")
    credentials: Optional[Dict[str, str]] = Field(
        default=None,
        description="Encrypted credentials needed for deployment"
    )
    config: Dict[str, str] = Field(
        default_factory=dict,
        description="Additional configuration for this target"
    )
    
    def validate_credentials(self) -> bool:
        """
        Validate that all required credentials are present and valid.
        
        Returns:
            bool: True if credentials are valid, False otherwise
        """
        # This is a placeholder - actual implementation will vary by provider
        return True 