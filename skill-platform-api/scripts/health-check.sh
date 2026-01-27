#!/bin/bash

# Health check script for Skill Platform services

echo "🏥 Skill Platform Health Check"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if services are running
if ! docker-compose ps &> /dev/null; then
    echo -e "${RED}❌ Docker Compose services are not running${NC}"
    echo "Run 'make up' or 'docker-compose up -d' to start services"
    exit 1
fi

# Function to check service health
check_service() {
    local service_name=$1
    local health_url=$2
    local container_name=$3

    echo -n "Checking $service_name... "

    # Check if container is running
    if ! docker-compose ps | grep -q "$container_name.*Up"; then
        echo -e "${RED}❌ Container is not running${NC}"
        return 1
    fi

    # Check HTTP health endpoint
    if curl -s -f "$health_url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Healthy${NC}"
        return 0
    else
        echo -e "${RED}❌ Unhealthy${NC}"
        return 1
    fi
}

# Function to check MySQL
check_mysql() {
    echo -n "Checking MySQL... "

    # Check if container is running
    if ! docker-compose ps | grep -q "skill-platform-mysql.*Up"; then
        echo -e "${RED}❌ Container is not running${NC}"
        return 1
    fi

    # Try to connect to MySQL
    if docker-compose exec -T mysql mysqladmin ping -h localhost --silent > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Healthy${NC}"

        # Show MySQL info
        version=$(docker-compose exec -T mysql mysql -V | head -1)
        echo "  $version"
        return 0
    else
        echo -e "${RED}❌ Cannot connect${NC}"
        return 1
    fi
}

# Check services
check_service "API" "http://localhost:8080/api/v1/skills" "skill-platform-api"
check_mysql

# Show container status
echo ""
echo "📊 Container Status:"
docker-compose ps

# Show resource usage
echo ""
echo "💻 Resource Usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# Show recent logs
echo ""
echo "📝 Recent Logs (last 10 lines):"
echo ""
echo "--- API Logs ---"
docker-compose logs --tail=10 api 2>&1 | grep -v "^\s*$" || true

echo ""
echo "--- MySQL Logs ---"
docker-compose logs --tail=10 mysql 2>&1 | grep -v "^\s*$" || true

# Test API endpoints
echo ""
echo "🔗 Testing API Endpoints:"
echo ""

test_endpoint() {
    local name=$1
    local url=$2

    echo -n "  $name... "
    response=$(curl -s -w "\n%{http_code}" "$url" 2>&1)
    http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ $http_code${NC}"
    else
        echo -e "${RED}❌ $http_code${NC}"
    fi
}

test_endpoint "GET /api/v1/skills" "http://localhost:8080/api/v1/skills"
test_endpoint "GET /api/v1/users/john_doe" "http://localhost:8080/api/v1/users/john_doe"
test_endpoint "GET /api/v1/activity" "http://localhost:8080/api/v1/activity"

echo ""
echo -e "${GREEN}✨ Health check complete!${NC}"
