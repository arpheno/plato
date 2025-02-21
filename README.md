# Plato - DevOps Automation Platform

[![CI](https://github.com/arpheno/plato/actions/workflows/ci.yml/badge.svg)](https://github.com/arpheno/plato/actions/workflows/ci.yml)
[![Coverage Report](https://img.shields.io/badge/coverage-report-blue.svg)](https://arpheno.github.io/plato/)

Plato is a DevOps automation platform designed to remove friction from deploying and managing multiple side projects. It provides a unified interface for managing deployments across various environments, from local machines to cloud providers.

## Coverage Reports

- [Latest Coverage Report](https://arpheno.github.io/plato/) - View detailed test coverage for both Python and JavaScript code
  - Python Coverage: View reports for plato-core, plato-cli, and plato-api
  - Frontend Coverage: View Vue.js component and unit test coverage

## Features

- 🚀 Unified deployment interface
- 🔄 Automated CI/CD pipelines
- 📊 Deployment monitoring and logging
- 🛡️ Security-first approach
- 🎯 Multi-environment support
- 🔌 Extensible plugin architecture

## Project Structure

```
plato/
├── packages/
│   ├── plato-core/      # Core business logic and domain models
│   ├── plato-cli/       # Command-line interface
│   ├── plato-api/       # REST API service
│   └── plato-web/       # Vue.js frontend
├── docker/              # Docker-related configurations
├── .github/             # GitHub Actions and configuration
└── docker-compose.yml   # Docker Compose configuration
```

## Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Docker and Docker Compose
- Make (optional, for using Makefile commands)
- Git
- pre-commit

## Development Setup

### Quick Start

```bash
# Clone the repository
git clone https://github.com/arpheno/plato.git
cd plato

# Setup backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
make install-dev  # Installs all backend packages in development mode

# Setup frontend
cd packages/plato-web
npm install
cd ../..

# Setup pre-commit hooks
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg  # For conventional commits check
```

### Detailed Setup

#### Backend (Core, CLI, and API)

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
   make test  # Runs all tests with coverage
   # Or run individual package tests:
   pytest packages/plato-core/tests
   pytest packages/plato-cli/tests
   pytest packages/plato-api/tests
   ```

#### Frontend

1. Install dependencies:
   ```bash
   cd packages/plato-web
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   npm run coverage  # For coverage report
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Testing Strategy

We follow a comprehensive testing approach:

### Backend Testing
- Unit tests with pytest
- Integration tests for API endpoints
- Property-based testing for core logic
- 90%+ code coverage requirement

### Frontend Testing
- Component tests with Vitest
- E2E tests with Cypress
- Accessibility testing
- Visual regression testing

## Docker Setup

To run the entire stack using Docker:

```bash
docker-compose up --build
```

Services:
- API: http://localhost:8000
- Web Interface: http://localhost:80
- Documentation: http://localhost:8000/docs

## Configuration

### Environment Variables

Core configuration:
- `PLATO_ENV`: Environment name (development/staging/production)
- `LOG_LEVEL`: Logging level (default: INFO)
- `PORT`: API service port (default: 8000)

Frontend configuration:
- `VITE_API_URL`: API endpoint URL
- `VITE_ENV`: Environment name

See `.env.example` for all available options.

## Development Workflow

1. Create a feature branch from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards:
   - Use type hints in Python code
   - Follow Vue.js Composition API patterns
   - Write tests for new features
   - Update documentation as needed

3. Stage your changes:
   ```bash
   git add .
   ```
   Pre-commit hooks will automatically:
   - Format code (Ruff for Python, Prettier for JS/TS/Vue)
   - Run linters
   - Check types with MyPy
   - Run tests (without coverage)
   - Validate commit messages
   - Check for common issues (merge conflicts, large files, etc.)

   Note: Full test coverage checks are run in CI pipelines.

4. Commit your changes:
   ```bash
   git commit -m "type(scope): description"
   ```
   If any pre-commit checks fail:
   - Review the errors
   - Make necessary fixes
   - Stage the changes
   - Try committing again

5. Run tests and linting:
   ```bash
   make lint test  # Backend
   npm run lint test  # Frontend
   ```

6. Create a pull request:
   - Use the PR template
   - Link related issues
   - Add meaningful description
   - Request reviews

## Deployment

We use GitHub Actions for CI/CD:

1. Push to feature branch:
   - Runs tests
   - Checks code coverage
   - Performs linting

2. Merge to main:
   - Runs full test suite
   - Builds Docker images
   - Deploys to staging
   - Runs integration tests

3. Create release:
   - Deploys to production
   - Runs smoke tests
   - Monitors deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes (use conventional commits)
4. Push to the branch
5. Create a Pull Request

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

## Support

- Documentation: [Link to docs]
- Issue Tracker: GitHub Issues
- Security: [security@example.com](mailto:security@example.com)

## License

[MIT License](LICENSE)
