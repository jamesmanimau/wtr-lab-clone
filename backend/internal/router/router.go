package router

import (
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"wtr-lab-clone/backend/internal/handler"
	"wtr-lab-clone/backend/internal/middleware"
)

func Setup(db *gorm.DB, jwtSecret string, frontendURL string, cookieSecure bool) *gin.Engine {
	r := gin.Default()

	r.Use(middleware.CORS(frontendURL))
	r.Use(middleware.Logger())

	api := r.Group("/api/v1")

	healthHandler := handler.NewHealthHandler(db)
	api.GET("/health", healthHandler.Check)

	novelHandler := handler.NewNovelHandler(db)
	api.GET("/novels", novelHandler.List)
	api.GET("/novels/trending", novelHandler.Trending)
	api.GET("/novels/recommendations", novelHandler.Recommendations)
	api.GET("/novels/random", novelHandler.Random)
	api.GET("/novels/:id", novelHandler.Get)
	api.GET("/novels/:id/chapters", novelHandler.Chapters)

	chapterHandler := handler.NewChapterHandler(db)
	api.GET("/chapters/:id", middleware.OptionalAuth(jwtSecret), chapterHandler.Get)

	authHandler := handler.NewAuthHandler(db, jwtSecret, cookieSecure)
	authLimiter := middleware.NewRateLimiter(10, 1*time.Minute)
	authGroup := api.Group("/auth")
	authGroup.Use(authLimiter.Middleware())
	{
		authGroup.POST("/register", authHandler.Register)
		authGroup.POST("/login", authHandler.Login)
		authGroup.POST("/logout", authHandler.Logout)
	}
	authMeGroup := api.Group("/auth", middleware.AuthRequired(jwtSecret))
	authMeGroup.GET("/me", authHandler.Me)

	rankingHandler := handler.NewRankingHandler(db)
	api.GET("/ranking/:period", rankingHandler.Get)

	updateHandler := handler.NewUpdateHandler(db)
	api.GET("/updates", updateHandler.Recent)

	searchHandler := handler.NewSearchHandler(db)
	api.GET("/search", searchHandler.Search)

	genreHandler := handler.NewGenreHandler(db)
	api.GET("/genres", genreHandler.List)

	leaderboardHandler := handler.NewLeaderboardHandler(db)
	api.GET("/leaderboard", leaderboardHandler.Get)

	newsHandler := handler.NewNewsHandler(db)
	api.GET("/news", newsHandler.List)
	api.GET("/news/:id", newsHandler.Get)

	statsHandler := handler.NewStatsHandler(db)
	api.GET("/stats", statsHandler.Get)

	authorHandler := handler.NewAuthorHandler(db)
	api.GET("/author/:name/novels", authorHandler.Novels)

	userHandler := handler.NewUserHandler(db)
	api.GET("/profile/:id", userHandler.GetProfile)

	protected := api.Group("")
	protected.Use(middleware.AuthRequired(jwtSecret))
	{
		voteHandler := handler.NewVoteHandler(db)
		protected.POST("/votes", voteHandler.Create)

		requestHandler := handler.NewRequestHandler(db)
		protected.POST("/requests", requestHandler.Create)

		libraryHandler := handler.NewLibraryHandler(db)
		protected.GET("/library", libraryHandler.Get)
	}

	adminGroup := protected.Group("")
	adminGroup.Use(middleware.AdminRequired(db))
	{
		requestHandler := handler.NewRequestHandler(db)
		adminGroup.PUT("/requests/:id", requestHandler.Review)

		adminGroup.POST("/novels", novelHandler.Create)
		adminGroup.PUT("/novels/:id", novelHandler.Update)
		adminGroup.DELETE("/novels/:id", novelHandler.Delete)

		importerHandler := handler.NewImporterHandler(db)
		adminGroup.POST("/novels/import", importerHandler.Import)
	}

	api.GET("/novels/import/search", func(c *gin.Context) {
		impHandler := handler.NewImporterHandler(db)
		impHandler.Search(c)
	})

	return r
}
