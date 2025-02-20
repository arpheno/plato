# Plato - DevOps Automation Platform

Plato is a DevOps automation platform designed to remove friction from deploying and managing multiple side projects. It provides a unified interface for managing deployments across various environments, from local machines to cloud providers.

## Project Structure

```
plato/
├── packages/
│   ├── plato-core/      # Core business logic and domain models
│   ├── plato-cli/       # Command-line interface
│   ├── plato-api/       # REST API service
│   └── plato-web/       # Vue.js frontend
├── docker/              # Docker-related configurations
└── docker-compose.yml   # Docker Compose configuration
```

## Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Docker and Docker Compose
- Make (optional, for using Makefile commands)

## Development Setup

### Backend (Core, CLI, and API)

1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install the packages in development mode:
   ```bash
   pip install -e "packages/plato-core[dev]"
   pip install -e "packages/plato-cli[dev]"
   pip install -e "packages/plato-api[dev]"
   ```

3. Run tests:
   ```bash
   # Run tests for all packages
   pytest packages/plato-core/tests
   pytest packages/plato-cli/tests
   pytest packages/plato-api/tests
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd packages/plato-web
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Docker Setup

To run the entire stack using Docker:

```bash
docker-compose up --build
```

This will start:
- API service at http://localhost:8000
- Web interface at http://localhost:80

## Configuration

### Environment Variables

- `PORT`: API service port (default: 8000)
- Additional configuration options will be documented as they are implemented

## Testing

Each package contains its own test suite:

- Core: Python unit tests using pytest
- CLI: Python unit tests using pytest
- API: Python unit tests using pytest
- Web: JavaScript/TypeScript tests using Vitest

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)

## Security

For security concerns, please email [security@example.com](mailto:security@example.com).