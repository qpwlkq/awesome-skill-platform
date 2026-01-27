package model

import (
	"time"
)

//go:generate go run github.com/golang.org/tools/cmd/stringer@latest

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Username  string    `gorm:"uniqueIndex;size:50" json:"username"`
	Email     string    `gorm:"uniqueIndex;size:100" json:"email"`
	AvatarURL string    `json:"avatar_url"`
	Bio       string    `json:"bio"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Skills    []Skill   `gorm:"foreignKey:AuthorID" json:"skills,omitempty"`
}

type Skill struct {
	ID             uint       `gorm:"primaryKey" json:"id"`
	Slug           string     `gorm:"uniqueIndex;size:100" json:"slug"`
	Name           string     `gorm:"size:100" json:"name"`
	Description    string     `gorm:"type:text" json:"description"`
	Category       string     `gorm:"size:50" json:"category"`
	Content        string     `gorm:"type:longtext" json:"content"`
	Visibility     string     `gorm:"default:public" json:"visibility"`
	License        string     `gorm:"size:50;default:MIT" json:"license"`
	Version        string     `gorm:"size:20;default:1.0.0" json:"version"`
	AuthorID       uint       `json:"author_id"`
	StarsCount     int        `gorm:"default:0" json:"stars_count"`
	DownloadsCount int        `gorm:"default:0" json:"downloads_count"`
	ForksCount     int        `gorm:"default:0" json:"forks_count"`
	CreatedAt      time.Time  `json:"created_at"`
	UpdatedAt      time.Time  `json:"updated_at"`
	Author         User       `gorm:"foreignKey:AuthorID" json:"author,omitempty"`
	Tags           []Tag      `gorm:"many2many:skill_tags" json:"tags,omitempty"`
}

type Tag struct {
	ID    uint    `gorm:"primaryKey" json:"id"`
	Name  string  `gorm:"uniqueIndex;size:50" json:"name"`
	Skills []Skill `gorm:"many2many:skill_tags" json:"skills,omitempty"`
}

type Star struct {
	UserID    uint      `gorm:"primaryKey" json:"user_id"`
	SkillID   uint      `gorm:"primaryKey" json:"skill_id"`
	CreatedAt time.Time `json:"created_at"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Skill     Skill     `gorm:"foreignKey:SkillID" json:"skill,omitempty"`
}

type ActivityLog struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `json:"user_id"`
	Action    string    `json:"action"` // published, starred, forked, draft_updated
	SkillID   *uint     `json:"skill_id"`
	Metadata  string    `gorm:"type:json" json:"metadata"`
	CreatedAt time.Time `json:"created_at"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Skill     *Skill    `gorm:"foreignKey:SkillID" json:"skill,omitempty"`
}
