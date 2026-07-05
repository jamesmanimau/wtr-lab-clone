package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string `gorm:"uniqueIndex;size:100;not null"`
	Email        string `gorm:"uniqueIndex;size:255;not null"`
	PasswordHash string `gorm:"size:255;not null" json:"-"`
	DisplayName  string `gorm:"size:100"`
	AvatarURL    string `gorm:"size:1000"`
	Tickets      float64 `gorm:"default:0"`
	IsAdmin      bool    `gorm:"default:false"`
}
