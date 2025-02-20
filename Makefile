.PHONY: help install test test-cov lint format clean docker-build docker-up docker-down

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	@echo "Installing Python dependencies..."
	uv venv .venv
	. .venv/bin/activate && uv pip install -e "packages/plato-core[dev]"
	. .venv/bin/activate && uv pip install -e "packages/plato-cli[dev]"
	. .venv/bin/activate && uv pip install -e "packages/plato-api[dev]"
	@echo "Installing frontend dependencies..."
	cd packages/plato-web && npm install

test: ## Run all tests
	@echo "Running Python tests..."
	. .venv/bin/activate && pytest
	@echo "Running frontend tests..."
	cd packages/plato-web && npm test

test-cov: ## Run tests with coverage
	@echo "Running Python tests with coverage..."
	. .venv/bin/activate && pytest --cov=plato_core --cov=plato_cli --cov=plato_api --cov-report=term-missing --cov-report=html
	@echo "Running frontend tests with coverage..."
	cd packages/plato-web && npm run test:coverage

test-watch: ## Run tests in watch mode
	. .venv/bin/activate && pytest-watch

lint: ## Run all linters
	@echo "Running Python linters..."
	. .venv/bin/activate && ruff check .
	. .venv/bin/activate && black --check .
	. .venv/bin/activate && mypy packages/plato-*/src
	@echo "Running frontend linters..."
	cd packages/plato-web && npm run lint

format: ## Format all code
	@echo "Formatting Python code..."
	. .venv/bin/activate && black .
	. .venv/bin/activate && ruff check --fix .
	@echo "Formatting frontend code..."
	cd packages/plato-web && npm run format

clean: ## Clean up build artifacts and cache
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name ".coverage" -exec rm -rf {} +
	find . -type d -name "coverage_html" -exec rm -rf {} +
	find . -type d -name "dist" -exec rm -rf {} +
	find . -type d -name "build" -exec rm -rf {} +
	find . -type d -name "node_modules" -exec rm -rf {} +

docker-build: ## Build Docker images
	docker-compose build

docker-up: ## Start Docker services
	docker-compose up

docker-down: ## Stop Docker services
	docker-compose down 