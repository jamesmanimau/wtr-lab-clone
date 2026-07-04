package handler

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"wtr-lab-clone/backend/internal/model"
)

type NovelHandler struct {
	DB *gorm.DB
}

func NewNovelHandler(db *gorm.DB) *NovelHandler {
	return &NovelHandler{DB: db}
}

func (h *NovelHandler) List(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	status := c.Query("status")
	genre := c.Query("genre")
	sort := c.DefaultQuery("sort", "created_at")
	order := c.DefaultQuery("order", "desc")
	q := c.Query("q")
	minChapters, _ := strconv.Atoi(c.DefaultQuery("min_chapters", "0"))
	minRating, _ := strconv.ParseFloat(c.DefaultQuery("min_rating", "0"), 64)
	minReviews, _ := strconv.Atoi(c.DefaultQuery("min_reviews", "0"))
	genresParam := c.Query("genres")
	genreMode := c.DefaultQuery("genre_mode", "or")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}

	query := h.DB.Model(&model.Novel{}).Preload("Genres")

	if q != "" {
		like := "%" + q + "%"
		query = query.Where("title ILIKE ? OR alt_title ILIKE ? OR description ILIKE ?", like, like, like)
	}

	if status != "" {
		query = query.Where("status = ?", status)
	}

	if genre != "" {
		query = query.Joins("JOIN novel_genres ON novel_genres.novel_id = novels.id").
			Joins("JOIN genres ON genres.id = novel_genres.genre_id").
			Where("genres.slug = ?", genre)
	}

	if genresParam != "" {
		genreSlugs := strings.Split(genresParam, ",")
		if genreMode == "and" {
			for _, slug := range genreSlugs {
				slug = strings.TrimSpace(slug)
				if slug == "" {
					continue
				}
				subQuery := h.DB.Table("novel_genres").
					Select("novel_id").
					Joins("JOIN genres ON genres.id = novel_genres.genre_id").
					Where("genres.slug = ?", slug)
				query = query.Where("novels.id IN (?)", subQuery)
			}
		} else {
			query = query.Joins("JOIN novel_genres ON novel_genres.novel_id = novels.id").
				Joins("JOIN genres ON genres.id = novel_genres.genre_id").
				Where("genres.slug IN ?", genreSlugs)
		}
	}

	if minChapters > 0 {
		query = query.Where("chapters >= ?", minChapters)
	}
	if minRating > 0 {
		query = query.Where("rating >= ?", minRating)
	}
	if minReviews > 0 {
		query = query.Where("rating_count >= ?", minReviews)
	}

	sortMap := map[string]string{
		"created_at": "novels.created_at",
		"title":      "novels.title",
		"views":      "novels.views",
		"chapters":   "novels.chapters",
		"rating":     "novels.rating",
		"readers":    "novels.readers",
		"reviews":    "novels.rating_count",
	}
	if col, ok := sortMap[sort]; ok {
		query = query.Order(col + " " + order)
	} else {
		query = query.Order("novels.created_at DESC")
	}

	var total int64
	query.Count(&total)

	var novels []model.Novel
	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&novels).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	totalPages := int(total) / limit
	if int(total)%limit > 0 {
		totalPages++
	}

	c.JSON(http.StatusOK, gin.H{
		"data":        novels,
		"page":        page,
		"limit":       limit,
		"total":       total,
		"total_pages": totalPages,
	})
}

func (h *NovelHandler) Get(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var novel model.Novel
	if err := h.DB.Preload("Genres").First(&novel, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "novel not found"})
		return
	}

	c.JSON(http.StatusOK, novel)
}

func (h *NovelHandler) Chapters(c *gin.Context) {
	novelID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 200 {
		limit = 50
	}

	var total int64
	h.DB.Model(&model.Chapter{}).Where("novel_id = ?", novelID).Count(&total)

	var chapters []model.Chapter
	offset := (page - 1) * limit
	if err := h.DB.Where("novel_id = ?", novelID).
		Order("number ASC").
		Offset(offset).Limit(limit).
		Find(&chapters).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    chapters,
		"page":    page,
		"limit":   limit,
		"total":   total,
	})
}

func (h *NovelHandler) Random(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	if limit < 1 || limit > 50 {
		limit = 10
	}

	var novels []model.Novel
	if err := h.DB.Preload("Genres").
		Order("RANDOM()").
		Limit(limit).
		Find(&novels).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": novels})
}

func (h *NovelHandler) Trending(c *gin.Context) {
	var novels []model.Novel
	if err := h.DB.Preload("Genres").
		Order("views DESC").
		Limit(20).
		Find(&novels).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": novels})
}

func (h *NovelHandler) Recommendations(c *gin.Context) {
	var novels []model.Novel
	if err := h.DB.Preload("Genres").
		Order("rating DESC, views DESC").
		Limit(12).
		Find(&novels).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": novels})
}
