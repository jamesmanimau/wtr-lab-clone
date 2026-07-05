import { Novel } from "@/types";

export const MOCK_NEW_NOVELS = [
  { title: "Red Chamber: Saving the Falling Heavens", genre: "action", chapters: 1782, href: "/en/novel/1" },
  { title: "Traveling Simultaneously: Across the Heavens", genre: "action", chapters: 84, href: "/en/novel/2" },
  { title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", genre: "drama", chapters: 1051, href: "/en/novel/3" },
  { title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", genre: "action", chapters: 1758, href: "/en/novel/4" },
  { title: "Real Dolls: I Use Dolls to Create Perfect Accidents", genre: "action", chapters: 944, href: "/en/novel/5" },
  { title: "Attack on Titan: I'm an Ackerman", genre: "action", chapters: 93, href: "/en/novel/6" },
  { title: "The Background is So Invincible That the System Was Upgraded Overnight!", genre: "action", chapters: 998, href: "/en/novel/7" },
  { title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", genre: "action", chapters: 470, href: "/en/novel/8" },
  { title: "Black Rock Shooter's Persona", genre: "action", chapters: 154, href: "/en/novel/9" },
  { title: "Reversing the Immortal Path", genre: "action", chapters: 261, href: "/en/novel/10" },
];

export const MOCK_RANKING = [
  { rank: 1, title: "Douluo Continent: Soul Beasts Extinct, I Created My Own Soul Rings", views: "44,711", rating: "4.1", href: "/en/novel/11" },
  { rank: 2, title: "I Was Livestreaming in Douluo Continent, and My Audience Was Bibi Dong!", views: "41,392", rating: "2.0", href: "/en/novel/12" },
  { rank: 3, title: "Douluo Continent: The Plague God Descends, Tang San Gets Tricked", views: "35,947", rating: "3.9", href: "/en/novel/13" },
  { rank: 4, title: "Douluo Continent: Blue Silver Emperor, Hextech Five-choose-three!", views: "31,439", rating: "3.2", href: "/en/novel/14" },
  { rank: 5, title: "Douluo Continent: Martial Soul - Golden Lion Mastiff, All Soul Skills Amplified", views: "26,617", rating: "3.6", href: "/en/novel/15" },
];

export const MOCK_UPDATES = [
  { title: "Online Game for Everyone: Why Did I Become a Beggar NPC?", chapter: "#649 Chapter 649: An Unchangeable Situation!", chapterHref: "/en/novel/16/chapter-649", novelHref: "/en/novel/16", hasImage: true },
  { title: "After Being Diagnosed with a Terminal Illness, the Fake Heiress Teams Up with a Rugged-looking Man to Prolong Her Life", chapter: "#172 Chapter 172: Don't worry, I'm not in a relationship.", chapterHref: "/en/novel/17/chapter-172", novelHref: "/en/novel/17", hasImage: true },
  { title: "Crossover Anime/manga Invasion Single-player Game: I Rely on the Ability to Copy Love and Kill", chapter: "#74 Chapter 74: Marrying a Person", chapterHref: "/en/novel/18/chapter-74", novelHref: "/en/novel/18", hasImage: true },
  { title: "Star Lord: My Summoning Pool is a Rice Pool", chapter: "#301 Chapter 301: Deep Sea Black Market", chapterHref: "/en/novel/19/chapter-301", novelHref: "/en/novel/19", hasImage: true },
  { title: "I've Become a God, and You're Telling Me This Isn't a Game?", chapter: "#228 Chapter 228: The Supreme Leader", chapterHref: "/en/novel/20/chapter-228", novelHref: "/en/novel/20", hasImage: true },
  { title: "Spirit Wizard", chapter: "#254 Chapter 254: Discovering a Strange Place", chapterHref: "/en/novel/21/chapter-254", novelHref: "/en/novel/21", hasImage: true },
];

export const MOCK_RANDOM = [
  { title: "Binding the Shanhaijing Pearl at the Beginning, I Became the Global Treasure Hunt King", genre: "action", chapters: 122, rating: "3.1", href: "/en/novel/25" },
  { title: "Peninsula: Kpop Hit Maker", genre: "drama", chapters: 191, rating: "2.2", href: "/en/novel/26" },
  { title: "Wuxia Crossover: Sweeping the Heavens", genre: "action", chapters: 501, rating: "2.5", href: "/en/novel/27" },
  { title: "Invincible Heavenly Emperor", genre: "action", chapters: 3871, rating: "2.5", href: "/en/novel/28" },
  { title: "Naruto: I Was Spoiled by the Heavenly Curtain to Unify the Ninja World", genre: "action", chapters: 96, rating: "2.5", href: "/en/novel/29" },
  { title: "The Marvel World of Heroes", genre: "action", chapters: 469, rating: "2.5", href: "/en/novel/30" },
  { title: "Start with Uchiha to escape and sail", genre: "action", chapters: 434, rating: "3.3", href: "/en/novel/31" },
  { title: "There are No Ancestors. They are All Made Up by Me.", genre: "action", chapters: 328, rating: "3.4", href: "/en/novel/32" },
  { title: "Overthrow the Han Dynasty", genre: "action", chapters: 289, rating: "1.0", href: "/en/novel/33" },
  { title: "A Crossover Anime/manga Business, Starting with the Ten Holy Blades Saving Himeko", genre: "action", chapters: 158, rating: "4.1", href: "/en/novel/34" },
];

export const MOCK_SPENDERS = [
  { name: "CadenF", tickets: "805.63", href: "/en/profile/1" },
  { name: "Ashley917", tickets: "675.7", href: "/en/profile/2" },
  { name: "zerokings", tickets: "87.83", href: "/en/profile/3" },
];

// Rich mock data matching API response shape for NovelCard pages
// Fields: ID, Title, Slug, Rating, Chapters, Views, CoverURL, Genres
export const MOCK_NOVEL_CARDS = [
  { ID: 1, Title: "Red Chamber: Saving the Falling Heavens", Slug: "red-chamber-saving-falling-heavens", Rating: 3.5, Chapters: 1782, Views: 3142, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "drama", Name: "Drama" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }, { Slug: "historical", Name: "Historical" }, { Slug: "romance", Name: "Romance" }] },
  { ID: 2, Title: "Traveling Simultaneously: Across the Heavens", Slug: "traveling-simultaneously-across-heavens", Rating: 3.8, Chapters: 84, Views: 2105, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }] },
  { ID: 3, Title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", Slug: "remarrying-wealthy-beijing", Rating: 4.0, Chapters: 1051, Views: 4521, CoverURL: "", Genres: [{ Slug: "drama", Name: "Drama" }, { Slug: "romance", Name: "Romance" }] },
  { ID: 4, Title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", Slug: "reborn-1983-beijing-elite", Rating: 3.2, Chapters: 1758, Views: 712, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "urban-life", Name: "Urban Life" }] },
  { ID: 5, Title: "Real Dolls: I Use Dolls to Create Perfect Accidents", Slug: "real-dolls-perfect-accidents", Rating: 3.0, Chapters: 944, Views: 580, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "horror", Name: "Horror" }] },
  { ID: 6, Title: "Attack on Titan: I'm an Ackerman", Slug: "attack-on-titan-ackerman", Rating: 3.6, Chapters: 93, Views: 361, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }] },
  { ID: 7, Title: "The Background is So Invincible That the System Was Upgraded Overnight!", Slug: "invincible-background-system-upgraded", Rating: 4.1, Chapters: 998, Views: 588, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }] },
  { ID: 8, Title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", Slug: "global-cultivation-alchemy-furnace", Rating: 3.9, Chapters: 470, Views: 8120, CoverURL: "", Genres: [{ Slug: "adventure", Name: "Adventure" }, { Slug: "comedy", Name: "Comedy" }] },
  { ID: 9, Title: "Black Rock Shooter's Persona", Slug: "black-rock-shooter-persona", Rating: 3.4, Chapters: 154, Views: 89, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "psychological", Name: "Psychological" }] },
  { ID: 10, Title: "Reversing the Immortal Path", Slug: "reversing-immortal-path", Rating: 3.7, Chapters: 261, Views: 27, CoverURL: "", Genres: [{ Slug: "fantasy", Name: "Fantasy" }, { Slug: "martial-arts", Name: "Martial Arts" }] },
  { ID: 11, Title: "Douluo Continent: Controlling Time, I Helped Bibi Dong Ascend to Godhood", Slug: "douluo-continent-controlling-time", Rating: 4.2, Chapters: 344, Views: 15500, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }] },
  { ID: 12, Title: "Marvel: Starting with the Brain in a Vat", Slug: "marvel-starting-with-brain-in-vat", Rating: 3.8, Chapters: 245, Views: 12800, CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "sci-fi", Name: "Sci-Fi" }] },
];

// Trending page fallback data
export const MOCK_TRENDING = [
  { ID: 1, Title: "Naruto: In Konoha Village, I Awakened Wood Release at the Start", Slug: "naruto-konoha-wood", Rating: 3.8, Chapters: 1002, Views: 123456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 2, Title: "Question and Answer Douluo: Tang San's Time Travel Revealed", Slug: "qa-douluo", Rating: 1.7, Chapters: 372, Views: 169503, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 3, Title: "Hogwarts: My Magic Has Turned Evil!", Slug: "hogwarts-evil-magic", Rating: 4.5, Chapters: 486, Views: 89234, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 4, Title: "Battle Through the Heavens: I Can Solidify the Talents of All Things", Slug: "btth-solidify", Rating: 4.2, Chapters: 723, Views: 76543, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 5, Title: "Douluo Continent: A Fictional Sky, Turning Fiction Into Reality", Slug: "douluo-fictional-sky", Rating: 3.5, Chapters: 289, Views: 65432, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 6, Title: "As Long As I Lack Morality, Konoha Can't Do Anything to Me!", Slug: "lack-morality-konoha", Rating: 4.0, Chapters: 156, Views: 54321, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 7, Title: "Football: I See Weaknesses!", Slug: "football-weaknesses", Rating: 1.8, Chapters: 156, Views: 41170, CoverURL: "", Genres: [{Slug:"sports",Name:"Sports"}] },
  { ID: 8, Title: "Marvel: Checking in at New York, Starting with a Silver Superman", Slug: "marvel-silver-superman", Rating: 3.7, Chapters: 412, Views: 39876, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 9, Title: "Douluo Continent: Taking Tang San As a Disciple", Slug: "douluo-disciple", Rating: 2.0, Chapters: 284, Views: 62994, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 10, Title: "I Just Started High School, But the System Insists I'm an Emperor", Slug: "high-school-emperor", Rating: 1.9, Chapters: 264, Views: 51120, CoverURL: "", Genres: [{Slug:"comedy",Name:"Comedy"}] },
  { ID: 11, Title: "Douluo Continent: Qian Renxue, Your Martial Soul Has Become Sentient!", Slug: "qian-renxue-sentient", Rating: 3.6, Chapters: 198, Views: 28765, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 12, Title: "The Cruelty of the Uchiha", Slug: "cruelty-uchiha", Rating: 4.3, Chapters: 89, Views: 23456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
];

// Recommendation page fallback data
export const MOCK_RECOMMENDATION = [
  { ID: 2, Title: "Question and Answer Douluo: Tang San's Time Travel Revealed", Slug: "qa-douluo", Rating: 1.7, Chapters: 372, Views: 169503, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 3, Title: "Douluo Continent: Taking Tang San As a Disciple", Slug: "douluo-disciple", Rating: 2.0, Chapters: 284, Views: 62994, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 4, Title: "I Just Started High School, But the System Insists I'm an Emperor", Slug: "high-school-emperor", Rating: 1.9, Chapters: 264, Views: 51120, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 5, Title: "All Heavens: My Dantian is a Universe in Its Own", Slug: "dantian-universe", Rating: 3.2, Chapters: 412, Views: 34567, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 6, Title: "Pretending to Be the Villain, All I Want is to Die at Naruto's Hands", Slug: "pretending-villain", Rating: 2.8, Chapters: 98, Views: 23456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 7, Title: "On the Day the Empress Sentenced Me to Death, the System Granted Me Emperor Level Cultivation", Slug: "empress-sentenced", Rating: 3.5, Chapters: 203, Views: 18765, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 8, Title: "Naruto talent entry: Starting with otsusuki bloodline", Slug: "otsusuki-bloodline", Rating: 4.1, Chapters: 156, Views: 34521, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 9, Title: "Start Learning Magic at Hogwarts", Slug: "magic-hogwarts", Rating: 3.9, Chapters: 234, Views: 28765, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 10, Title: "Douluo Continent: A Sharp Commentary on the Goddesses", Slug: "douluo-commentary", Rating: 2.9, Chapters: 198, Views: 41918, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
];

// Random novels page fallback data
export const MOCK_RANDOM_NOVELS = [
  { ID: 11, Title: "Binding the Shanhaijing Pearl at the Beginning", Slug: "shanhaijing-pearl", Rating: 3.1, Chapters: 122, Views: 8765, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 12, Title: "Peninsula: Kpop Hit Maker", Slug: "kpop-hit-maker", Rating: 2.2, Chapters: 191, Views: 12345, CoverURL: "", Genres: [{Slug:"drama",Name:"Drama"}] },
  { ID: 13, Title: "Wuxia Crossover: Sweeping the Heavens", Slug: "wuxia-crossover", Rating: 2.5, Chapters: 501, Views: 23456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 14, Title: "Invincible Heavenly Emperor", Slug: "invincible-heavenly-emperor", Rating: 2.5, Chapters: 3871, Views: 98765, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 15, Title: "Naruto: I Was Spoiled by the Heavenly Curtain", Slug: "naruto-heavenly-curtain", Rating: 2.5, Chapters: 96, Views: 6543, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 16, Title: "The Marvel World of Heroes", Slug: "marvel-world-heroes", Rating: 3.0, Chapters: 469, Views: 34567, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 17, Title: "Start with Uchiha to escape and sail", Slug: "uchiha-escape-sail", Rating: 3.3, Chapters: 434, Views: 28976, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 18, Title: "There are No Ancestors. They are All Made Up by Me.", Slug: "no-ancestors", Rating: 3.4, Chapters: 328, Views: 15432, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 19, Title: "Overthrow the Han Dynasty", Slug: "overthrow-han", Rating: 1.0, Chapters: 289, Views: 10987, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 20, Title: "A Crossover Anime Business, Starting with the Ten Holy Blades", Slug: "crossover-anime-business", Rating: 4.1, Chapters: 158, Views: 5432, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 21, Title: "Cyberpunk Ro's Mysterious Revival", Slug: "cyberpunk-ro", Rating: 4.0, Chapters: 619, Views: 23456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 22, Title: "Dio Brando is Challenging FGO", Slug: "dio-brando-fgo", Rating: 2.3, Chapters: 949, Views: 18765, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
];

// Author page fallback data
export const MOCK_AUTHOR_NOVELS = [
  { ID: 7, Title: "I am the Crown Prince of the Ming Dynasty", Slug: "i-am-the-crown-prince-of-the-ming-dynasty", Rating: 4.2, Chapters: 1592, Views: 50000, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 6, Title: "First-rank Di Consort", Slug: "first-rank-di-consort", Rating: 3.6, Chapters: 387, Views: 25000, CoverURL: "", Genres: [{Slug:"historical",Name:"Historical"}] },
];

// Novel-list page fallback data
export const MOCK_NOVEL_LIST = [
  { ID: 1, Title: "Red Chamber: Saving the Falling Heavens", AltTitle: "红楼之挽天倾", Slug: "red-chamber-saving-falling-heavens", Author: "佚名", Status: "completed", Views: 3142, Rating: 3.5, Chapters: 1782, Readers: 3, Chars: "7.81M", AIPercent: "8.92%", Description: "A young man from a later generation transmigrates into the world of Dream of the Red Chamber.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"drama",Name:"Drama"},{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 2, Title: "Traveling Simultaneously: Across the Heavens", AltTitle: "同时穿越：纵横诸天", Slug: "traveling-simultaneously-across-heavens", Author: "佚名", Status: "ongoing", Views: 2105, Rating: 3.8, Chapters: 84, Readers: 13, Chars: "389K", AIPercent: "63.1%", Description: "Other popular fantasy novels.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 3, Title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", AltTitle: "改嫁京圈太子爷后，竹马们气疯了", Slug: "remarrying-wealthy-beijing", Author: "佚名", Status: "completed", Views: 4521, Rating: 4.0, Chapters: 1051, Readers: 11, Chars: "1.83M", AIPercent: "4.76%", Description: "I transmigrated into a book during the Ghost Festival.", CoverURL: "", Genres: [{Slug:"drama",Name:"Drama"},{Slug:"romance",Name:"Romance"},{Slug:"urban-life",Name:"Urban Life"}] },
  { ID: 4, Title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", AltTitle: "重生1983：我妻京圈大小姐", Slug: "reborn-1983-beijing-elite", Author: "佚名", Status: "ongoing", Views: 712, Rating: 3.2, Chapters: 1758, Readers: 9, Chars: "2.49M", AIPercent: "4.32%", Description: "In the winter of 1983, Ye Jianguo, a future tycoon.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"drama",Name:"Drama"},{Slug:"urban-life",Name:"Urban Life"}] },
  { ID: 5, Title: "Real Dolls: I Use Dolls to Create Perfect Accidents", AltTitle: "真实人偶，我用人偶制造完美意外", Slug: "real-dolls-perfect-accidents", Author: "佚名", Status: "completed", Views: 580, Rating: 3.0, Chapters: 944, Readers: 59, Chars: "1.81M", AIPercent: "100%", Description: "In a parallel world called Blue Star.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"horror",Name:"Horror"},{Slug:"mystery",Name:"Mystery"},{Slug:"urban-life",Name:"Urban Life"}] },
  { ID: 6, Title: "Attack on Titan: I'm an Ackerman", AltTitle: "什么！我竟然是耶格尔派？", Slug: "attack-on-titan-ackerman", Author: "佚名", Status: "ongoing", Views: 361, Rating: 3.6, Chapters: 93, Readers: 28, Chars: "156K", AIPercent: "71%", Description: "Due to limited abilities, some original settings will be modified.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 7, Title: "The Background is So Invincible That the System Was Upgraded Overnight!", AltTitle: "背景太无敌，吓得系统连夜升级！", Slug: "invincible-background-system-upgraded", Author: "佚名", Status: "ongoing", Views: 588, Rating: 4.1, Chapters: 998, Readers: 45, Chars: "2.34M", AIPercent: "100%", Description: "When I gained an invincible background!", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"comedy",Name:"Comedy"},{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 8, Title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", AltTitle: "全民修仙：小师妹是丹道本科生", Slug: "global-cultivation-alchemy-furnace", Author: "佚名", Status: "completed", Views: 8120, Rating: 3.9, Chapters: 470, Readers: 13, Chars: "871K", AIPercent: "21.3%", Description: "Five hundred years ago, Earth entered the era of spiritual revival.", CoverURL: "", Genres: [{Slug:"adventure",Name:"Adventure"},{Slug:"comedy",Name:"Comedy"},{Slug:"fantasy",Name:"Fantasy"},{Slug:"school-life",Name:"School Life"}] },
  { ID: 9, Title: "Black Rock Shooter's Persona", AltTitle: "综漫：黑岩小姐的人格面具", Slug: "black-rock-shooter-persona", Author: "佚名", Status: "completed", Views: 89, Rating: 3.4, Chapters: 154, Readers: 21, Chars: "344K", AIPercent: "39%", Description: "Anime/Manga Crossover Fanfiction.", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"},{Slug:"psychological",Name:"Psychological"}] },
  { ID: 10, Title: "Reversing the Immortal Path", AltTitle: "穿越之逆转仙途", Slug: "reversing-immortal-path", Author: "佚名", Status: "completed", Views: 27, Rating: 3.7, Chapters: 261, Readers: 26, Chars: "626K", AIPercent: "19.2%", Description: "Mu Heng, who had been crippled for ten years.", CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"},{Slug:"martial-arts",Name:"Martial Arts"},{Slug:"romance",Name:"Romance"}] },
];

// Ranking page fallback data
// Novel-finder page fallback data
export const FALLBACK_NOVELS: Novel[] = [
  { ID: 1, Title: "Red Chamber: Saving the Falling Heavens", AltTitle: "红楼之挽天倾", Slug: "red-chamber-saving-falling-heavens", Author: "佚名", Status: "completed", Views: 3142, Rating: 3.5, Chapters: 1782, Readers: 3, Chars: "7.81M", AIPercent: "8.92%", Description: "A young man from a later generation transmigrates into the world of Dream of the Red Chamber.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "drama", Name: "Drama" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "Transmigration", "Ancient World"], ReleaseStatus: "released", AddedMinutesAgo: 120, RatingCount: 314 },
  { ID: 2, Title: "Traveling Simultaneously: Across the Heavens", AltTitle: "同时穿越：纵横诸天", Slug: "traveling-simultaneously-across-heavens", Author: "佚名", Status: "ongoing", Views: 2105, Rating: 3.8, Chapters: 84, Readers: 13, Chars: "389K", AIPercent: "63.1%", Description: "Other popular fantasy novels.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "System", "Game World"], ReleaseStatus: "released", AddedMinutesAgo: 45, RatingCount: 210 },
  { ID: 3, Title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", AltTitle: "改嫁京圈太子爷后，竹马们气疯了", Slug: "remarrying-wealthy-beijing", Author: "佚名", Status: "completed", Views: 4521, Rating: 4.0, Chapters: 1051, Readers: 11, Chars: "1.83M", AIPercent: "4.76%", Description: "I transmigrated into a book during the Ghost Festival.", CoverURL: "", Genres: [{ Slug: "drama", Name: "Drama" }, { Slug: "romance", Name: "Romance" }, { Slug: "urban-life", Name: "Urban Life" }], Tags: ["Female Protagonist", "Transmigration", "Modern World", "Love Triangle"], ReleaseStatus: "released", AddedMinutesAgo: 200, RatingCount: 452 },
  { ID: 4, Title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", AltTitle: "重生1983：我妻京圈大小姐", Slug: "reborn-1983-beijing-elite", Author: "佚名", Status: "ongoing", Views: 712, Rating: 3.2, Chapters: 1758, Readers: 9, Chars: "2.49M", AIPercent: "4.32%", Description: "In the winter of 1983, Ye Jianguo, a future tycoon.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "drama", Name: "Drama" }, { Slug: "slice-of-life", Name: "Slice of Life" }, { Slug: "urban-life", Name: "Urban Life" }], Tags: ["Male Protagonist", "Reincarnation", "Modern World", "Revenge"], ReleaseStatus: "released", AddedMinutesAgo: 90, RatingCount: 71 },
  { ID: 5, Title: "Real Dolls: I Use Dolls to Create Perfect Accidents", AltTitle: "真实人偶，我用人偶制造完美意外", Slug: "real-dolls-perfect-accidents", Author: "佚名", Status: "completed", Views: 580, Rating: 3.0, Chapters: 944, Readers: 59, Chars: "1.81M", AIPercent: "100%", Description: "In a parallel world called Blue Star.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "drama", Name: "Drama" }, { Slug: "horror", Name: "Horror" }, { Slug: "mystery", Name: "Mystery" }, { Slug: "psychological", Name: "Psychological" }, { Slug: "supernatural", Name: "Supernatural" }, { Slug: "urban-life", Name: "Urban Life" }], Tags: ["Male Protagonist", "System", "Modern World", "Superpowers"], ReleaseStatus: "released", AddedMinutesAgo: 300, RatingCount: 58 },
  { ID: 6, Title: "Attack on Titan: I'm an Ackerman", AltTitle: "什么！我竟然是耶格尔派？", Slug: "attack-on-titan-ackerman", Author: "佚名", Status: "ongoing", Views: 361, Rating: 3.6, Chapters: 93, Readers: 28, Chars: "156K", AIPercent: "71%", Description: "Due to limited abilities, some original settings will be modified.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "Overpowered Protagonist", "Adaptation"], ReleaseStatus: "released", AddedMinutesAgo: 15, RatingCount: 36 },
  { ID: 7, Title: "The Background is So Invincible That the System Was Upgraded Overnight!", AltTitle: "背景太无敌，吓得系统连夜升级！", Slug: "invincible-background-system-upgraded", Author: "佚名", Status: "ongoing", Views: 588, Rating: 4.1, Chapters: 998, Readers: 45, Chars: "2.34M", AIPercent: "100%", Description: "When I gained an invincible background!", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "comedy", Name: "Comedy" }, { Slug: "fantasy", Name: "Fantasy" }, { Slug: "xianxia", Name: "Xianxia" }], Tags: ["Male Protagonist", "System", "Cultivation", "Overpowered Protagonist"], ReleaseStatus: "released", AddedMinutesAgo: 5, RatingCount: 88 },
  { ID: 8, Title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", AltTitle: "全民修仙：小师妹是丹道本科生", Slug: "global-cultivation-alchemy-furnace", Author: "佚名", Status: "completed", Views: 8120, Rating: 3.9, Chapters: 470, Readers: 13, Chars: "871K", AIPercent: "21.3%", Description: "Five hundred years ago, Earth entered the era of spiritual revival.", CoverURL: "", Genres: [{ Slug: "adventure", Name: "Adventure" }, { Slug: "comedy", Name: "Comedy" }, { Slug: "fantasy", Name: "Fantasy" }, { Slug: "school-life", Name: "School Life" }, { Slug: "supernatural", Name: "Supernatural" }, { Slug: "urban-life", Name: "Urban Life" }], Tags: ["Female Protagonist", "Cultivation", "Magic School", "Slow Burn"], ReleaseStatus: "voting", AddedMinutesAgo: 60, RatingCount: 130 },
  { ID: 9, Title: "Black Rock Shooter's Persona", AltTitle: "综漫：黑岩小姐的人格面具", Slug: "black-rock-shooter-persona", Author: "佚名", Status: "completed", Views: 89, Rating: 3.4, Chapters: 154, Readers: 21, Chars: "344K", AIPercent: "39%", Description: "Anime/Manga Crossover Fanfiction.", CoverURL: "", Genres: [{ Slug: "action", Name: "Action" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }, { Slug: "psychological", Name: "Psychological" }], Tags: ["Female Protagonist", "Adaptation", "Game World"], ReleaseStatus: "released", AddedMinutesAgo: 500, RatingCount: 8 },
  { ID: 10, Title: "Reversing the Immortal Path", AltTitle: "穿越之逆转仙途", Slug: "reversing-immortal-path", Author: "佚名", Status: "completed", Views: 27, Rating: 3.7, Chapters: 261, Readers: 26, Chars: "626K", AIPercent: "19.2%", Description: "Mu Heng, who had been crippled for ten years.", CoverURL: "", Genres: [{ Slug: "fantasy", Name: "Fantasy" }, { Slug: "martial-arts", Name: "Martial Arts" }, { Slug: "romance", Name: "Romance" }], Tags: ["Male Protagonist", "Cultivation", "Revenge", "Ancient World"], ReleaseStatus: "released", AddedMinutesAgo: 1000, RatingCount: 2 },
];

// Novel detail page fallback data
export const MOCK_NOVEL_DETAIL: Novel = {
  ID: 1,
  Title: "Red Chamber: Saving the Falling Heavens",
  AltTitle: "红楼之挽天倾",
  Slug: "red-chamber-saving-falling-heavens",
  Author: "佚名",
  AuthorSlug: "yi-ming",
  Status: "completed",
  Views: 3142,
  Rating: 3.5,
  RatingCount: 314,
  Chapters: 1782,
  Readers: 3,
  Chars: "7.81M",
  AIPercent: "8.92%",
  Description: "A young man from a later generation transmigrates into the world of Dream of the Red Chamber and...",
  CoverURL: "",
  RequestedBy: "Reader1",
  ReleasedBy: "Admin",
  Genres: [{ Slug: "action", Name: "Action" }, { Slug: "drama", Name: "Drama" }, { Slug: "fan-fiction", Name: "Fan-Fiction" }, { Slug: "fantasy", Name: "Fantasy" }],
};

export const MOCK_RANKING_FULL = [
  { ID: 22, Title: "Douluo Continent: Soul Beasts Extinct, I Created My Own Soul Rings", Slug: "douluo-soul-beasts", Author: "佚名", Status: "ongoing", Views: 44711, Rating: 4.1, Chapters: 523, Readers: 1200, Chars: "1.2M", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 23, Title: "I Was Livestreaming in Douluo Continent, and My Audience Was Bibi Dong!", Slug: "livestreaming-douluo", Author: "佚名", Status: "ongoing", Views: 41392, Rating: 2.0, Chapters: 412, Readers: 980, Chars: "980K", CoverURL: "", Genres: [{Slug:"comedy",Name:"Comedy"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 24, Title: "Douluo Continent: The Plague God Descends, Tang San Gets Tricked", Slug: "plague-god-douluo", Author: "佚名", Status: "ongoing", Views: 35947, Rating: 3.9, Chapters: 387, Readers: 850, Chars: "890K", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 25, Title: "Douluo Continent: Blue Silver Emperor, Hextech Five-choose-three!", Slug: "blue-silver-emperor", Author: "佚名", Status: "ongoing", Views: 31439, Rating: 3.2, Chapters: 298, Readers: 720, Chars: "720K", CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 26, Title: "Douluo Continent: Martial Soul - Golden Lion Mastiff, All Soul Skills Amplified", Slug: "golden-lion-mastiff", Author: "佚名", Status: "ongoing", Views: 26617, Rating: 3.6, Chapters: 267, Readers: 650, Chars: "650K", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 27, Title: "Naruto: I Can See Vitality, Starting with the Soft Fist", Slug: "naruto-soft-fist", Author: "佚名", Status: "ongoing", Views: 23456, Rating: 4.0, Chapters: 234, Readers: 540, Chars: "540K", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 28, Title: "Football: I See Weaknesses!", Slug: "football-weaknesses", Author: "佚名", Status: "ongoing", Views: 41170, Rating: 1.8, Chapters: 156, Readers: 320, Chars: "320K", CoverURL: "", Genres: [{Slug:"sports",Name:"Sports"}] },
  { ID: 29, Title: "Hogwarts: My Magic Has Turned Evil!", Slug: "hogwarts-evil-magic", Author: "佚名", Status: "ongoing", Views: 89234, Rating: 4.5, Chapters: 486, Readers: 1500, Chars: "1.1M", CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 30, Title: "Naruto talent entry: Starting with otsusuki bloodline", Slug: "otsusuki-bloodline", Author: "佚名", Status: "ongoing", Views: 34521, Rating: 4.1, Chapters: 156, Readers: 430, Chars: "380K", CoverURL: "", Genres: [{Slug:"action",Name:"Action"},{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 31, Title: "I Just Started High School, But the System Insists I'm an Emperor", Slug: "high-school-emperor", Author: "佚名", Status: "ongoing", Views: 51120, Rating: 1.9, Chapters: 264, Readers: 780, Chars: "620K", CoverURL: "", Genres: [{Slug:"comedy",Name:"Comedy"}] },
];
