package handler

import (
	"net/http"
	"skill-platform-api/internal/model"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Mock skills for testing
var mockSkills []model.Skill

func init() {
	mockSkills = []model.Skill{
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
		},
	}
}

func SetupSkillRoutes(r *gin.RouterGroup, db *gorm.DB) {
	r.GET("/skills", listSkills(db))
	r.GET("/skills/:slug", getSkill(db))
	r.POST("/skills", createSkill(db))
	r.PUT("/skills/:slug", updateSkill(db))
	r.DELETE("/skills/:slug", deleteSkill(db))

	r.POST("/skills/:slug/star", starSkill(db))
	r.DELETE("/skills/:slug/star", unstarSkill(db))
}

func listSkills(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Try to get from database first
		var skills []model.Skill
		if err := db.Preload("Author").Preload("Tags").Find(&skills).Error; err != nil {
			// If database fails, return mock data
			c.JSON(http.StatusOK, mockSkills)
			return
		}
		c.JSON(http.StatusOK, skills)
	}
}

func getSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		var skill model.Skill
		if err := db.Preload("Author").Preload("Tags").Where("slug = ?", slug).First(&skill).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
			return
		}
		c.JSON(http.StatusOK, skill)
	}
}

func createSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var skill model.Skill
		if err := c.ShouldBindJSON(&skill); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.Create(&skill).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, skill)
	}
}

func updateSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		var skill model.Skill
		if err := db.Where("slug = ?", slug).First(&skill).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
			return
		}
		if err := c.ShouldBindJSON(&skill); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.Save(&skill).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, skill)
	}
}

func deleteSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		if err := db.Where("slug = ?", slug).Delete(&model.Skill{}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.Status(http.StatusNoContent)
	}
}

func starSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Implementation would check authentication
		slug := c.Param("slug")
		var skill model.Skill
		if err := db.Where("slug = ?", slug).First(&skill).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
			return
		}
		skill.StarsCount++
		if err := db.Save(&skill).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"stars": skill.StarsCount})
	}
}

func unstarSkill(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		var skill model.Skill
		if err := db.Where("slug = ?", slug).First(&skill).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
			return
		}
		if skill.StarsCount > 0 {
			skill.StarsCount--
		}
		if err := db.Save(&skill).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"stars": skill.StarsCount})
	}
}
