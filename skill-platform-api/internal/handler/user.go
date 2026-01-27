package handler

import (
	"net/http"
	"skill-platform-api/internal/model"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupUserRoutes(r *gin.RouterGroup, db *gorm.DB) {
	r.GET("/users/:username", getUser(db))
	r.GET("/users/:username/skills", getUserSkills(db))
}

func getUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username := c.Param("username")
		var user model.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func getUserSkills(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username := c.Param("username")
		var user model.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		var skills []model.Skill
		if err := db.Where("author_id = ?", user.ID).Find(&skills).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, skills)
	}
}

func SetupActivityRoutes(r *gin.RouterGroup, db *gorm.DB) {
	r.GET("/activity", getActivity(db))
	r.GET("/skills/:id/activity", getSkillActivity(db))
}

func getActivity(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var activities []model.ActivityLog
		if err := db.Preload("User").Preload("Skill").Order("created_at DESC").Limit(50).Find(&activities).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, activities)
	}
}

func getSkillActivity(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var activities []model.ActivityLog
		if err := db.Preload("User").Where("skill_id = ?", id).Order("created_at DESC").Find(&activities).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, activities)
	}
}
