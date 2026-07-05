package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"wtr-lab-clone/backend/internal/model"
)

type ChapterHandler struct {
	DB *gorm.DB
}

func NewChapterHandler(db *gorm.DB) *ChapterHandler {
	return &ChapterHandler{DB: db}
}

func (h *ChapterHandler) Get(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var chapter model.Chapter
	if err := h.DB.Preload("Novel").First(&chapter, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "chapter not found"})
		return
	}

	if chapter.IsLocked {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "login required to access locked chapter"})
			return
		}

		var user model.User
		if err := h.DB.First(&user, userID).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			return
		}

		var existingTx model.TicketTransaction
		err := h.DB.Where("user_id = ? AND ref_type = ? AND ref_id = ?", user.ID, "chapter", chapter.ID).First(&existingTx).Error
		if err == nil {
			c.JSON(http.StatusOK, chapter)
			return
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		if user.Tickets < float64(chapter.TicketCost) {
			c.JSON(http.StatusPaymentRequired, gin.H{"error": "insufficient tickets"})
			return
		}

		err = h.DB.Transaction(func(tx *gorm.DB) error {
			if err := tx.Model(&user).Update("tickets", user.Tickets-float64(chapter.TicketCost)).Error; err != nil {
				return err
			}

			txRecord := model.TicketTransaction{
				UserID:  user.ID,
				Amount:  -float64(chapter.TicketCost),
				Type:    "spend",
				RefType: "chapter",
				RefID:   chapter.ID,
				Note:    "Unlock chapter " + strconv.Itoa(chapter.Number) + " of " + chapter.Novel.Title,
			}
			if err := tx.Create(&txRecord).Error; err != nil {
				return err
			}

			return nil
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to process ticket payment"})
			return
		}
	}

	c.JSON(http.StatusOK, chapter)
}
