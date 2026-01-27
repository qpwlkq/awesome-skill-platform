# Skill Platform API - Backend

RESTful API for the Skill Platform, built with Go and Gin framework.

## Features

- 🚀 Fast and efficient HTTP server
- 📊 MySQL database with GORM ORM
- 🔒 Ready for authentication middleware
- 📝 Comprehensive API endpoints
- 🔄 Auto database migrations

## Tech Stack

- **Language**: Go 1.21+
- **Framework**: Gin
- **ORM**: GORM
- **Database**: MySQL 8.0+

## Getting Started

### Prerequisites

- Go 1.21+
- MySQL 8.0+

### Installation

```bash
# Install dependencies
go mod download

# Copy and configure environment variables
cp .env.example .env

# Run migrations
mysql -u root -p skill_platform < migrations/001_init.sql

# Run server
go run cmd/server/main.go
```

The server will start on `http://localhost:8080`

## Project Structure

```
skill-platform-api/
├── cmd/
│   └── server/
│       └── main.go             # Application entry point
├── internal/
│   ├── handler/                # HTTP request handlers
│   ├── model/                  # Database models
│   ├── repository/             # Data access layer
│   ├── service/                # Business logic
│   └── middleware/             # Auth, logging, etc.
├── pkg/
│   └── config/                 # Configuration
└── migrations/                 # SQL migrations
    └── 001_init.sql
```

## API Endpoints

### Skills

```
GET    /api/v1/skills          # List all skills
GET    /api/v1/skills/:slug    # Get skill by slug
POST   /api/v1/skills          # Create new skill
PUT    /api/v1/skills/:slug    # Update skill
DELETE /api/v1/skills/:slug    # Delete skill
POST   /api/v1/skills/:slug/star    # Star a skill
DELETE /api/v1/skills/:slug/star  # Unstar a skill
```

### Users

```
GET    /api/v1/users/:username         # Get user profile
GET    /api/v1/users/:username/skills  # Get user's skills
```

### Activity

```
GET    /api/v1/activity           # Get global activity feed
GET    /api/v1/skills/:id/activity  # Get skill activity log
```

## Database Schema

### Tables

- **users**: User accounts
- **skills**: Skill definitions
- **tags**: Skill tags
- **skill_tags**: Junction table for many-to-many
- **stars**: User-starred skills
- **activity_logs**: User activity tracking

See `migrations/001_init.sql` for complete schema.

## Configuration

Environment variables:

```bash
# Server
SERVER_PORT=8080

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skill_platform
```

## Example Requests

### List all skills
```bash
curl http://localhost:8080/api/v1/skills
```

### Get skill by slug
```bash
curl http://localhost:8080/api/v1/skills/code-reviewer
```

### Create skill
```bash
curl -X POST http://localhost:8080/api/v1/skills \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-skill",
    "name": "my_skill",
    "description": "An awesome skill",
    "category": "code_review",
    "content": "You are a helpful assistant...",
    "visibility": "public",
    "author_id": 1
  }'
```

### Star a skill
```bash
curl -X POST http://localhost:8080/api/v1/skills/code-reviewer/star
```

## Development

### Run with hot reload
```bash
go install github.com/cosmtrek/air@latest
air
```

### Run tests
```bash
go test ./...
```

### Build for production
```bash
go build -o bin/server cmd/server/main.go
```

## TODO

- [ ] Add JWT authentication
- [ ] Add request validation middleware
- [ ] Add rate limiting
- [ ] Add pagination
- [ ] Add search and filtering
- [ ] Add unit tests
- [ ] Add API documentation (Swagger)

## License

ISC
