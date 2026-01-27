package handler

import (
	"net/http"
	"skill-platform-api/internal/model"

	"github.com/gin-gonic/gin"
)

// Mock data for testing without database
var mockSkills = []model.Skill{
	{
		ID:             1,
		Slug:           "code-reviewer",
		Name:           "code_reviewer",
		Description:    "AI-powered code review assistant for PRs",
		Category:       "code_review",
		Content:        "You are an expert code reviewer...",
		Visibility:     "public",
		License:        "MIT",
		Version:        "1.2.0",
		AuthorID:       1,
		StarsCount:     342,
		DownloadsCount: 1247,
		ForksCount:     23,
		Author: model.User{
			ID:       1,
			Username: "sarah_dev",
			Email:    "sarah@example.com",
			Bio:      "Senior engineer",
		},
		Tags: []model.Tag{
			{ID: 1, Name: "code_review"},
			{ID: 2, Name: "ai"},
			{ID: 3, Name: "quality"},
		},
	},
}

// listSkillsMock returns mock skills without database
func listSkillsMock(db interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, mockSkills)
	}
}
