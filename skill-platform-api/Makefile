.PHONY: help build up down restart logs clean init test dev health-check shell

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^([a-zA-Z_-]+):.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

init: ## Initialize and start all services
	@echo "🚀 Initializing Skill Platform..."
	@chmod +x scripts/init.sh
	@./scripts/init.sh

build: ## Build the Docker images
	@echo "🔨 Building Docker images..."
	docker-compose build

up: ## Start all services in detached mode
	@echo "🚀 Starting services..."
	docker-compose up -d

down: ## Stop and remove all containers
	@echo "🛑 Stopping services..."
	docker-compose down

restart: ## Restart all services
	@echo "🔄 Restarting services..."
	docker-compose restart

logs: ## Show logs from all services
	docker-compose logs -f

logs-api: ## Show API logs
	docker-compose logs -f api

logs-mysql: ## Show MySQL logs
	docker-compose logs -f mysql

ps: ## Show running containers
	docker-compose ps

clean: ## Remove all containers, volumes, and images
	@echo "🧹 Cleaning up..."
	docker-compose down -v --rmi all

mysql: ## Connect to MySQL shell
	docker-compose exec mysql mysql -uskill_user -pskill_password skill_platform

migrate: ## Run database migrations
	docker-compose exec mysql mysql -uskill_user -pskill_password skill_platform < migrations/001_init.sql

test: ## Run API tests
	@echo "🧪 Testing API..."
	@curl -s http://localhost:8080/api/v1/skills | jq .
	@curl -s http://localhost:8080/api/v1/users/john_doe | jq .

rebuild: ## Rebuild and restart
	@echo "🔨 Rebuilding and restarting..."
	docker-compose up -d --build

health: ## Check health of all services
	@echo "🏥 Checking service health..."
	@docker-compose ps
	@echo "\n📡 API Health Check:"
	@curl -s http://localhost:8080/api/v1/skills > /dev/null && echo "✅ API is healthy" || echo "❌ API is unhealthy"
	@echo "\n🗄️  MySQL Health Check:"
	@docker-compose exec -T mysql mysqladmin ping -h localhost --silent && echo "✅ MySQL is healthy" || echo "❌ MySQL is unhealthy"

dev: ## Start development environment with hot reload
	@echo "🔧 Starting development environment..."
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

dev-logs: ## Show development logs
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

dev-down: ## Stop development environment
	@echo "🛑 Stopping development environment..."
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

health-check: ## Run comprehensive health check
	@chmod +x scripts/health-check.sh
	@./scripts/health-check.sh

shell: ## Open shell in API container
	@docker-compose exec api sh

shell-mysql: ## Open shell in MySQL container
	@docker-compose exec mysql sh
