package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

type Skill struct {
	ID          uint     `json:"id"`
	Slug        string   `json:"slug"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Category    string   `json:"category"`
	Author      string   `json:"author"`
	Stars       int      `json:"stars"`
}

var mockSkills = []Skill{
	{
		ID:          1,
		Slug:        "code-reviewer",
		Name:        "code_reviewer",
		Description: "AI-powered code review assistant for PRs",
		Category:    "code_review",
		Author:     "@sarah_dev",
		Stars:       342,
	},
	{
		ID:          2,
		Slug:        "test-generator",
		Name:        "test_generator",
		Description: "Auto-generate unit tests from source code",
		Category:    "testing",
		Author:     "@mike_eng",
		Stars:       218,
	},
	{
		ID:          3,
		Slug:        "deploy-helper",
		Name:        "deploy_helper",
		Description: "Streamline CI/CD pipeline configurations",
		Category:    "devops",
		Author:     "@lisa_ops",
		Stars:       156,
	},
	{
		ID:          4,
		Slug:        "sql-optimizer",
		Name:        "sql_optimizer",
		Description: "Optimize SQL queries for better performance",
		Category:    "database",
		Author:     "@db_master",
		Stars:       89,
	},
	{
		ID:          5,
		Slug:        "doc-writer",
		Name:        "doc_writer",
		Description: "Generate technical documentation from code",
		Category:    "documentation",
		Author:     "@tech_writer",
		Stars:       67,
	},
	{
		ID:          6,
		Slug:        "vuln-scanner",
		Name:        "vuln_scanner",
		Description: "Scan code for security vulnerabilities",
		Category:    "security",
		Author:     "@sec_expert",
		Stars:       134,
	},
}

func main() {
	// Use port 8081
	port := ":8081"

	r := gin.Default()

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "Skill Platform API is running"})
	})

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
		// Skills
		v1.GET("/skills", func(c *gin.Context) {
			c.JSON(200, mockSkills)
		})

		v1.GET("/skills/:slug", func(c *gin.Context) {
			slug := c.Param("slug")
			for _, skill := range mockSkills {
				if skill.Slug == slug {
					c.JSON(200, skill)
					return
				}
			}
			c.JSON(404, gin.H{"error": "Skill not found"})
		})

		// Users
		v1.GET("/users/:username", func(c *gin.Context) {
			username := c.Param("username")
			c.JSON(200, gin.H{
				"username": username,
				"email": username + "@example.com",
				"bio": "// full-stack developer",
				"skill_count": 12,
				"star_count": 2400,
				"download_count": 8100,
			})
		})

		// Activity
		v1.GET("/activity", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"activities": []gin.H{
					{"id": "1", "symbol": "✓", "text": "published code_reviewer v1.2.0", "time": "2h ago"},
					{"id": "2", "symbol": "+", "text": "starred git_helper by @alice_dev", "time": "5h ago"},
					{"id": "3", "symbol": "○", "text": "draft sql_optimizer updated", "time": "1d ago"},
				},
			})
		})
	}

	// Start server
	log.Printf("🚀 Skill Platform API starting on port%s\n", port)
	log.Printf("📡 API Documentation: http://localhost%s/api/v1/skills\n", port)
	log.Printf("🏥 Health Check: http://localhost%s/health\n", port)

	if err := r.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
