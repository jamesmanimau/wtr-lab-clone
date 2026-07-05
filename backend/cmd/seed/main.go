package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"wtr-lab-clone/backend/internal/config"
	"wtr-lab-clone/backend/internal/model"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var genres = []struct {
	Slug string
	Name string
}{
	{"action", "Action"},
	{"adult", "Adult"},
	{"adventure", "Adventure"},
	{"comedy", "Comedy"},
	{"drama", "Drama"},
	{"ecchi", "Ecchi"},
	{"erciyuan", "Erciyuan"},
	{"fan-fiction", "Fan-Fiction"},
	{"fantasy", "Fantasy"},
	{"game", "Game"},
	{"gender-bender", "Gender Bender"},
	{"harem", "Harem"},
	{"historical", "Historical"},
	{"horror", "Horror"},
	{"josei", "Josei"},
	{"martial-arts", "Martial Arts"},
	{"mature", "Mature"},
	{"mecha", "Mecha"},
	{"military", "Military"},
	{"mystery", "Mystery"},
	{"psychological", "Psychological"},
	{"romance", "Romance"},
	{"school-life", "School Life"},
	{"sci-fi", "Sci-Fi"},
	{"seinen", "Seinen"},
	{"shoujo", "Shoujo"},
	{"shoujo-ai", "Shoujo Ai"},
	{"shounen", "Shounen"},
	{"shounen-ai", "Shounen Ai"},
	{"slice-of-life", "Slice of Life"},
	{"smut", "Smut"},
	{"sports", "Sports"},
	{"supernatural", "Supernatural"},
	{"tragedy", "Tragedy"},
	{"urban-life", "Urban Life"},
	{"wuxia", "Wuxia"},
	{"xianxia", "Xianxia"},
	{"xuanhuan", "Xuanhuan"},
	{"yaoi", "Yaoi"},
	{"yuri", "Yuri"},
}

var sampleNovels = []struct {
	Title       string
	AltTitle    string
	Slug        string
	Author      string
	AuthorSlug  string
	Status      string
	Description string
	Genres      []string
	Chapters    int
	Chars       string
	AIPercent   string
	Rating      float64
}{
	{
		Title: "Having Dinner with His Brother, the Cold and Aloof Tycoon Becomes Addicted to His Doting Affections",
		AltTitle: "陪哥哥吃饭，冷欲大佬强宠上瘾",
		Slug: "having-dinner-with-his-brother-the-cold-and-aloof-tycoon-becomes-addicted-to-his-doting-affections",
		Author: "半条活鱼", AuthorSlug: "ban-tiao-huo-yu",
		Status: "completed",
		Description: "[Cold and aloof tycoon × Bright and delicate, lazy princess + Forced marriage + 12-year age gap + 1v1, both are virgins]",
		Genres: []string{"romance", "slice-of-life", "urban-life"},
		Chapters: 135, Chars: "250K", AIPercent: "37%", Rating: 3.5,
	},
	{
		Title: "Corpse Puppet Phoenix Girl",
		AltTitle: "尸傀凰女",
		Slug: "corpse-puppet-phoenix-girl",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "ongoing",
		Description: "Meeting you at the most beautiful street corner was the worst decision I ever made.",
		Genres: []string{"adult", "adventure", "fantasy", "romance"},
		Chapters: 242, Chars: "653K", AIPercent: "20.7%", Rating: 3.8,
	},
	{
		Title: "Reborn As the Little Delicate Wife of the Domineering Ceo",
		AltTitle: "豪门重生，夫人超超超厉害",
		Slug: "reborn-as-the-little-delicate-wife-of-the-domineering-ceo",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "Sweet and fluffy, incredibly romantic, the female lead's various powerful personas are exposed online.",
		Genres: []string{"romance", "urban-life"},
		Chapters: 378, Chars: "638K", AIPercent: "13.2%", Rating: 4.0,
	},
	{
		Title: "The Corpse Family is Heavy",
		AltTitle: "尸家重地",
		Slug: "the-corpse-family-is-heavy",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "You can't be greedy for cheap deals in this world.",
		Genres: []string{"action", "adult", "fantasy", "mystery", "supernatural"},
		Chapters: 252, Chars: "469K", AIPercent: "19.8%", Rating: 3.2,
	},
	{
		Title: "Can You Please Comfort Me?",
		AltTitle: "可不可以哄哄我",
		Slug: "can-you-please-comfort-me",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "As a child, Shen Shengsheng played house and made a promise with an older boy.",
		Genres: []string{"drama", "josei", "romance", "tragedy", "urban-life"},
		Chapters: 149, Chars: "235K", AIPercent: "33.6%", Rating: 3.0,
	},
	{
		Title: "First-rank Di Consort",
		AltTitle: "一品嫡妃",
		Slug: "first-rank-di-consort",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "Song Anran, a wealthy and beautiful woman, is ambitiously expanding her business empire.",
		Genres: []string{"historical", "romance"},
		Chapters: 387, Chars: "2.99M", AIPercent: "15.5%", Rating: 3.6,
	},
	{
		Title: "I am the Crown Prince of the Ming Dynasty",
		AltTitle: "我在大明当太子",
		Slug: "i-am-the-crown-prince-of-the-ming-dynasty",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "College student Zhu Yu transmigrates into the body of the famous Third Prince Zhu.",
		Genres: []string{"action", "adult", "adventure", "drama", "fantasy", "historical", "military", "xuanhuan"},
		Chapters: 1592, Chars: "2.96M", AIPercent: "3.14%", Rating: 4.2,
	},
	{
		Title: "Could I Really End Up 'collapsing My Image' Even in the World of Rule Horror",
		AltTitle: "我还能在规则怪谈里塌房不成？",
		Slug: "could-i-really-end-up-collapsing-my-image-even-in-the-world-of-rule-horror",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "ongoing",
		Description: "Infinite Flow + Rule-Based Ghost Stories + Thriller Game + Strong Female Team.",
		Genres: []string{"mystery", "psychological"},
		Chapters: 925, Chars: "1.75M", AIPercent: "5.4%", Rating: 4.1,
	},
	{
		Title: "The Legend of the Mountain and Sea Demon Subduing",
		AltTitle: "大丰小道士",
		Slug: "the-legend-of-the-mountain-and-sea-demon-subduing",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "completed",
		Description: "In the realm of mountains and seas, sects stand in great numbers, and demons roam freely.",
		Genres: []string{"action", "adventure", "martial-arts"},
		Chapters: 1522, Chars: "2.82M", AIPercent: "3.29%", Rating: 3.9,
	},
	{
		Title: "Don't Be Too Wild",
		AltTitle: "别太野",
		Slug: "dont-be-too-wild",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "ongoing",
		Description: "A seemingly innocent but actually rebellious heiress x a cold and roguish prince.",
		Genres: []string{"romance", "school-life", "slice-of-life"},
		Chapters: 160, Chars: "309K", AIPercent: "31.3%", Rating: 3.4,
	},
	{
		Title: "Naruto: In Konoha Village, I Awakened Wood Release at the Start",
		AltTitle: "火影：木叶村，开局觉醒木遁",
		Slug: "naruto-in-konoha-village-i-awakened-wood-release-at-the-start",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "ongoing",
		Description: "Konoha 52nd year. Chiba awakened her memories of her past life.",
		Genres: []string{"action", "fan-fiction", "fantasy", "martial-arts", "seinen", "supernatural"},
		Chapters: 1002, Chars: "1.8M", AIPercent: "8.5%", Rating: 3.8,
	},
	{
		Title: "I Just Started High School, But the System Insists I'm an Emperor in My Twilight Years",
		AltTitle: "刚上高一，系统非说我是晚年大帝",
		Slug: "i-just-started-high-school-but-the-system-insists-im-an-emperor-in-my-twilight-years",
		Author: "佚名", AuthorSlug: "yi-ming",
		Status: "ongoing",
		Description: "Jiang Feng is an ordinary high school student at Linchuan High School.",
		Genres: []string{"action", "comedy", "fantasy", "martial-arts", "school-life", "supernatural", "urban-life"},
		Chapters: 264, Chars: "450K", AIPercent: "12%", Rating: 1.9,
	},
}

func main() {
	cfg := config.Load()

	db, err := gorm.Open(postgres.Open(cfg.DSN()), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	if err := db.AutoMigrate(
		&model.Genre{},
		&model.Novel{},
		&model.NovelGenre{},
		&model.Chapter{},
		&model.User{},
		&model.Vote{},
		&model.Request{},
		&model.TicketTransaction{},
		&model.News{},
		&model.ReadingHistory{},
		&model.NovelFollow{},
	); err != nil {
		log.Fatalf("failed to migrate: %v", err)
	}

	seedGenres(db)
	seedNovels(db)
	seedUsers(db)
	seedNews(db)

	log.Println("seed completed")
}

func seedGenres(db *gorm.DB) {
	for _, g := range genres {
		db.FirstOrCreate(&model.Genre{}, model.Genre{Slug: g.Slug, Name: g.Name})
	}
	fmt.Printf("seeded %d genres\n", len(genres))
}

func seedNovels(db *gorm.DB) {
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))

	for i, s := range sampleNovels {
		novel := model.Novel{
			Title:       s.Title,
			AltTitle:    s.AltTitle,
			Slug:        s.Slug,
			Author:      s.Author,
			AuthorSlug:  s.AuthorSlug,
			Status:      s.Status,
			Views:       uint64(rng.Intn(500000) + 1000),
			Rating:      s.Rating,
			RatingCount: uint(rng.Intn(500) + 20),
			Chapters:    s.Chapters,
			Readers:     rng.Intn(5000) + 10,
			Chars:       s.Chars,
			AIPercent:   s.AIPercent,
			Description: s.Description,
		}

		var existing model.Novel
		if err := db.Where("slug = ?", novel.Slug).First(&existing).Error; err == nil {
			continue
		}

		if err := db.Create(&novel).Error; err != nil {
			log.Printf("failed to create novel %s: %v", novel.Title, err)
			continue
		}

		for _, genreSlug := range s.Genres {
			var genre model.Genre
			if err := db.Where("slug = ?", genreSlug).First(&genre).Error; err == nil {
				db.Create(&model.NovelGenre{NovelID: novel.ID, GenreID: genre.ID})
			}
		}

		seedChapters(db, novel.ID, s.Chapters)

		fmt.Printf("seeded novel %d/%d: %s (%d chapters)\n", i+1, len(sampleNovels), novel.Title, s.Chapters)
	}
}

func seedChapters(db *gorm.DB, novelID uint, count int) {
	for i := 1; i <= count; i++ {
		chapter := model.Chapter{
			NovelID:  novelID,
			Number:   i,
			Title:    fmt.Sprintf("Chapter %d", i),
			Content:  fmt.Sprintf("This is the content of chapter %d. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", i),
			IsLocked: i > count/2,
		}

		var existing model.Chapter
		if err := db.Where("novel_id = ? AND number = ?", novelID, i).First(&existing).Error; err == nil {
			continue
		}

		db.Create(&chapter)
	}
}

func seedUsers(db *gorm.DB) {
	users := []struct {
		Username string
		Email    string
		Password string
		Tickets  float64
		IsAdmin  bool
	}{
		{"admin", "admin@wtrlab.com", "admin123", 99999, true},
		{"Mega_bells", "mega@example.com", "password", 3569.76, false},
		{"StandardCrystal", "crystal@example.com", "password", 2907.17, false},
		{"Alpha2", "alpha2@example.com", "password", 2693.07, false},
		{"reader1", "reader1@example.com", "password", 100, false},
	}

	for _, u := range users {
		var existing model.User
		if err := db.Where("email = ?", u.Email).First(&existing).Error; err == nil {
			continue
		}

		hash, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		user := model.User{
			Username:     u.Username,
			Email:        u.Email,
			PasswordHash: string(hash),
			DisplayName:  u.Username,
			Tickets:      u.Tickets,
			IsAdmin:      u.IsAdmin,
		}
		db.Create(&user)
		fmt.Printf("seeded user: %s\n", u.Username)
	}
}

func seedNews(db *gorm.DB) {
	news := []struct {
		Title   string
		Content string
		Type    string
		Slug    string
	}{
		{
			Title: "🎉 16th Giveaway Winners 🎉",
			Content: "Congratulations to all the winners of our 16th Giveaway!",
			Type: "news", Slug: "16th-giveaway-winners",
		},
		{
			Title: "🎉 Our 16th Giveaway is LIVE! 🎉",
			Content: "Our 16th Giveaway is now live! Participate now for a chance to win amazing prizes.",
			Type: "news", Slug: "16th-giveaway-live",
		},
		{
			Title: "Version 1.13.3 - New Source Management & Bug Fixes!",
			Content: "We have released version 1.13.3 with new source management features and various bug fixes.",
			Type: "changelog", Slug: "v1-13-3",
		},
	}

	for _, n := range news {
		var existing model.News
		if err := db.Where("slug = ?", n.Slug).First(&existing).Error; err == nil {
			continue
		}

		db.Create(&model.News{
			Title:   n.Title,
			Content: n.Content,
			Type:    n.Type,
			Slug:    n.Slug,
		})
		fmt.Printf("seeded news: %s\n", n.Title)
	}
}
