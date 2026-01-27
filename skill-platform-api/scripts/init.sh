#!/bin/bash

# Skill Platform API - Init Script
# This script initializes the database and starts the services

set -e

echo "🚀 Skill Platform API - Initialization"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found, creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please review and update .env with your configuration${NC}"
fi

# Create docker-compose.override.yml for development (optional)
if [ ! -f docker-compose.override.yml ]; then
    echo -e "${GREEN}✅ No docker-compose.override.yml found, skipping...${NC}"
fi

# Pull latest images
echo -e "\n${GREEN}📦 Pulling Docker images...${NC}"
docker-compose pull

# Build and start services
echo -e "\n${GREEN}🔨 Building and starting services...${NC}"
docker-compose up -d --build

# Wait for MySQL to be ready
echo -e "\n${GREEN}⏳ Waiting for MySQL to be ready...${NC}"
until docker-compose exec -T mysql mysqladmin ping -h localhost --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 2
done
echo -e "${GREEN}✅ MySQL is ready!${NC}"

# Wait for API to be ready
echo -e "\n${GREEN}⏳ Waiting for API to be ready...${NC}"
sleep 5
until curl -s http://localhost:8080/api/v1/skills > /dev/null; do
    echo "API is unavailable - sleeping"
    sleep 2
done
echo -e "${GREEN}✅ API is ready!${NC}"

echo -e "\n${GREEN}🎉 All services are up and running!${NC}"
echo -e "\n${GREEN}📊 Service Status:${NC}"
docker-compose ps

echo -e "\n${GREEN}📝 API is available at: http://localhost:8080${NC}"
echo -e "${GREEN}📊 MySQL is available at: localhost:3306${NC}"
echo -e "\n${YELLOW}💡 Useful commands:${NC}"
echo "  docker-compose logs -f          # View all logs"
echo "  docker-compose logs -f api       # View API logs"
echo "  docker-compose logs -f mysql     # View MySQL logs"
echo "  docker-compose down              # Stop all services"
echo "  docker-compose restart           # Restart all services"
