# Color scheme
BLUE := \033[34m
GREEN := \033[32m
RED := \033[31m
YELLOW := \033[33m
BOLD := \033[1m
RESET := \033[0m

# Helper functions
define log_info
	@echo "$(BLUE)$(BOLD)INFO:$(RESET) $(1)"
endef

define log_success
	@echo "$(GREEN)$(BOLD)SUCCESS:$(RESET) $(1)"
endef

define log_warning
	@echo "$(YELLOW)$(BOLD)WARNING:$(RESET) $(1)"
endef

define log_error
	@echo "$(RED)$(BOLD)ERROR:$(RESET) $(1)"
endef

.PHONY: help install test test-cov test-watch lint format clean docker-build docker-up docker-down dev check-deps

help: ## Show this help
	@echo "$(BOLD)Available commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(BLUE)  %-30s$(RESET) %s\n", $$1, $$2}'

check-deps: ## Check if required dependencies are installed
	$(call log_info,Checking required dependencies...)
	@which uv >/dev/null 2>&1 || ($(call log_error,"uv is not installed. Install with: curl -LsSf https://astral.sh/uv/install.sh | sh") && exit 1)
	@which npm >/dev/null 2>&1 || ($(call log_error,"npm is not installed. Install Node.js from: https://nodejs.org") && exit 1)
	@which docker >/dev/null 2>&1 || ($(call log_error,"docker is not installed. Install from: https://docs.docker.com/get-docker") && exit 1)
	@which docker-compose >/dev/null 2>&1 || ($(call log_error,"docker-compose is not installed. Install from: https://docs.docker.com/compose/install") && exit 1)
	$(call log_success,All dependencies are installed!)

install: check-deps ## Install all dependencies
	$(call log_info,Installing Python dependencies...)
	@uv venv .venv
	@. .venv/bin/activate && uv pip install -e "packages/plato-core[dev]"
	@. .venv/bin/activate && uv pip install -e "packages/plato-cli[dev]"
	@. .venv/bin/activate && uv pip install -e "packages/plato-api[dev]"
	$(call log_success,Python dependencies installed!)
	$(call log_info,Installing frontend dependencies...)
	@cd packages/plato-web && npm install
	$(call log_success,Frontend dependencies installed!)

dev: check-deps ## Start development servers
	$(call log_info,Starting development servers...)
	$(call log_info,Starting API server on port 8000...)
	@. .venv/bin/activate && uvicorn plato_api.main:app --reload --port 8000 & \
	echo $$! > .api.pid
	$(call log_info,Starting frontend dev server...)
	@cd packages/plato-web && npm run dev & \
	echo $$! > .web.pid
	$(call log_success,Development servers started! Use $(BOLD)Ctrl+C$(RESET) to stop.)
	@trap 'kill $$(cat .api.pid) $$(cat .web.pid) 2>/dev/null; rm -f .api.pid .web.pid' INT TERM

test: ## Run all tests
	$(call log_info,Running Python tests...)
	@. .venv/bin/activate && pytest
	$(call log_info,Running frontend tests...)
	@cd packages/plato-web && npm test

test-cov: ## Run tests with coverage
	$(call log_info,Running Python tests with coverage...)
	@. .venv/bin/activate && pytest --cov=plato_core --cov=plato_cli --cov=plato_api --cov-report=term-missing --cov-report=html
	$(call log_info,Running frontend tests with coverage...)
	@cd packages/plato-web && npm run test:coverage
	$(call log_success,Coverage reports generated!)

test-watch: ## Run tests in watch mode
	$(call log_info,Starting test watchers...)
	$(call log_info,Starting Python test watcher...)
	@. .venv/bin/activate && pytest-watch & \
	echo $$! > .pytest.pid
	$(call log_info,Starting frontend test watcher...)
	@cd packages/plato-web && npm run test:watch & \
	echo $$! > .vitest.pid
	$(call log_success,Test watchers started! Use $(BOLD)Ctrl+C$(RESET) to stop.)
	@trap 'kill $$(cat .pytest.pid) $$(cat .vitest.pid) 2>/dev/null; rm -f .pytest.pid .vitest.pid' INT TERM

lint: ## Run all linters
	$(call log_info,Running Python linters...)
	@. .venv/bin/activate && ruff check .
	@. .venv/bin/activate && black --check .
	@. .venv/bin/activate && mypy packages/plato-*/src
	$(call log_info,Running frontend linters...)
	@cd packages/plato-web && npm run lint
	$(call log_success,All linting checks completed!)

format: ## Format all code
	$(call log_info,Formatting Python code...)
	@. .venv/bin/activate && black .
	@. .venv/bin/activate && ruff check --fix .
	$(call log_info,Formatting frontend code...)
	@cd packages/plato-web && npm run format
	$(call log_success,All code formatted!)

clean: ## Clean up build artifacts and cache
	$(call log_info,Cleaning up build artifacts and cache...)
	@find . -type d -name "__pycache__" -exec rm -rf {} +
	@find . -type d -name "*.egg-info" -exec rm -rf {} +
	@find . -type d -name ".pytest_cache" -exec rm -rf {} +
	@find . -type d -name ".coverage" -exec rm -rf {} +
	@find . -type d -name "coverage_html" -exec rm -rf {} +
	@find . -type d -name "dist" -exec rm -rf {} +
	@find . -type d -name "build" -exec rm -rf {} +
	@find . -type d -name "node_modules" -exec rm -rf {} +
	@rm -f .*.pid
	$(call log_success,Clean up complete!)

docker-build: check-deps ## Build Docker images
	$(call log_info,Building Docker images...)
	@docker-compose build
	$(call log_success,Docker images built!)

docker-up: check-deps ## Start Docker services
	$(call log_info,Starting Docker services...)
	@docker-compose up

docker-down: ## Stop Docker services
	$(call log_info,Stopping Docker services...)
	@docker-compose down
	$(call log_success,Docker services stopped!)
