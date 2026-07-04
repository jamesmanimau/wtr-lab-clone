"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { novels, genres as genresApi } from "@/lib/api";

interface Genre {
  ID: number;
  Slug: string;
  Name: string;
}

interface Novel {
  ID: number;
  Title: string;
  AltTitle: string;
  Slug: string;
  Author: string;
  Status: string;
  Views: number;
  Rating: number;
  Chapters: number;
  Readers: number;
  Chars: string;
  AIPercent: string;
  Description: string;
  CoverURL: string;
  Genres: Genre[];
  CreatedAt?: string;
  RatingCount?: number;
  Tags?: string[];
  ReleaseStatus?: string;
  AddedMinutesAgo?: number;
}

type SortField = "created_at" | "rating" | "chapters" | "views" | "title" | "readers" | "reviews";
type Order = "desc" | "asc";
type StatusFilter = "" | "ongoing" | "completed" | "hiatus" | "dropped";
type ReleaseFilter = "all" | "released" | "voting";
type MatchMode = "and" | "or";

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "created_at", label: "Addition Date" },
  { value: "rating", label: "Rating" },
  { value: "chapters", label: "Chapters" },
  { value: "views", label: "Views" },
  { value: "title", label: "Title" },
  { value: "readers", label: "Readers" },
  { value: "reviews", label: "Reviews" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "hiatus", label: "Hiatus" },
  { value: "dropped", label: "Dropped" },
];

const RELEASE_OPTIONS: { value: ReleaseFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "released", label: "Released" },
  { value: "voting", label: "Voting" },
];

const CHAPTER_OPTIONS = [
  { value: 0, label: "Any chapters" },
  { value: 100, label: "100+ chapters" },
  { value: 500, label: "500+ chapters" },
  { value: 1000, label: "1000+ chapters" },
  { value: 2000, label: "2000+ chapters" },
];

const RATING_OPTIONS = [
  { value: 0, label: "Any rating" },
  { value: 3.0, label: "3.0+" },
  { value: 3.5, label: "3.5+" },
  { value: 4.0, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
];

const REVIEW_OPTIONS = [
  { value: 0, label: "Any reviews" },
  { value: 50, label: "50+" },
  { value: 100, label: "100+" },
  { value: 500, label: "500+" },
  { value: 1000, label: "1000+" },
];

const TAG_CATEGORIES = [
  "Protagonist Archetype",
  "Adaptation",
  "Power System",
  "Setting",
  "Theme",
] as const;

const TAGS: { name: string; category: string }[] = [
  { name: "Male Protagonist", category: "Protagonist Archetype" },
  { name: "Female Protagonist", category: "Protagonist Archetype" },
  { name: "Smart Protagonist", category: "Protagonist Archetype" },
  { name: "Cold Protagonist", category: "Protagonist Archetype" },
  { name: "Overpowered Protagonist", category: "Protagonist Archetype" },
  { name: "Antihero", category: "Protagonist Archetype" },
  { name: "Naruto", category: "Adaptation" },
  { name: "Douluo Dalu", category: "Adaptation" },
  { name: "Honkai", category: "Adaptation" },
  { name: "One Piece", category: "Adaptation" },
  { name: "Pokemon", category: "Adaptation" },
  { name: "Marvel", category: "Adaptation" },
  { name: "System", category: "Power System" },
  { name: "Cultivation", category: "Power System" },
  { name: "Level Up", category: "Power System" },
  { name: "Magic", category: "Power System" },
  { name: "Superpowers", category: "Power System" },
  { name: "Game World", category: "Setting" },
  { name: "Modern World", category: "Setting" },
  { name: "Ancient World", category: "Setting" },
  { name: "Apocalypse", category: "Setting" },
  { name: "Magic School", category: "Setting" },
  { name: "Transmigration", category: "Theme" },
  { name: "Reincarnation", category: "Theme" },
  { name: "Revenge", category: "Theme" },
  { name: "Face Slapping", category: "Theme" },
  { name: "Love Triangle", category: "Theme" },
  { name: "Slow Burn", category: "Theme" },
];

const FALLBACK_GENRES = [
  "action","adult","adventure","comedy","drama","ecchi","erciyuan","fan-fiction","fantasy",
  "game","gender-bender","harem","historical","horror","josei","martial-arts","mature",
  "mecha","military","mystery","psychological","romance","school-life","sci-fi","seinen",
  "shoujo","shoujo-ai","shounen","shounen-ai","slice-of-life","smut","sports","supernatural",
  "tragedy","urban-life","wuxia","xianxia","xuanhuan","yaoi","yuri",
];

const FALLBACK_NOVELS: Novel[] = [
  { ID: 1, Title: "Red Chamber: Saving the Falling Heavens", AltTitle: "红楼之挽天倾", Slug: "red-chamber-saving-falling-heavens", Author: "佚名", Status: "completed", Views: 3142, Rating: 3.5, Chapters: 1782, Readers: 3, Chars: "7.81M", AIPercent: "8.92%", Description: "A young man from a later generation transmigrates into the world of Dream of the Red Chamber.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "Transmigration", "Ancient World"], ReleaseStatus: "released", AddedMinutesAgo: 120, RatingCount: 314 },
  { ID: 2, Title: "Traveling Simultaneously: Across the Heavens", AltTitle: "同时穿越：纵横诸天", Slug: "traveling-simultaneously-across-heavens", Author: "佚名", Status: "ongoing", Views: 2105, Rating: 3.8, Chapters: 84, Readers: 13, Chars: "389K", AIPercent: "63.1%", Description: "Other popular fantasy novels.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "System", "Game World"], ReleaseStatus: "released", AddedMinutesAgo: 45, RatingCount: 210 },
  { ID: 3, Title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", AltTitle: "改嫁京圈太子爷后，竹马们气疯了", Slug: "remarrying-wealthy-beijing", Author: "佚名", Status: "completed", Views: 4521, Rating: 4.0, Chapters: 1051, Readers: 11, Chars: "1.83M", AIPercent: "4.76%", Description: "I transmigrated into a book during the Ghost Festival.", CoverURL: "", Genres: [{ ID: 5, Slug: "drama", Name: "Drama" }, { ID: 22, Slug: "romance", Name: "Romance" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }], Tags: ["Female Protagonist", "Transmigration", "Modern World", "Love Triangle"], ReleaseStatus: "released", AddedMinutesAgo: 200, RatingCount: 452 },
  { ID: 4, Title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", AltTitle: "重生1983：我妻京圈大小姐", Slug: "reborn-1983-beijing-elite", Author: "佚名", Status: "ongoing", Views: 712, Rating: 3.2, Chapters: 1758, Readers: 9, Chars: "2.49M", AIPercent: "4.32%", Description: "In the winter of 1983, Ye Jianguo, a future tycoon.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 30, Slug: "slice-of-life", Name: "Slice of Life" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }], Tags: ["Male Protagonist", "Reincarnation", "Modern World", "Revenge"], ReleaseStatus: "released", AddedMinutesAgo: 90, RatingCount: 71 },
  { ID: 5, Title: "Real Dolls: I Use Dolls to Create Perfect Accidents", AltTitle: "真实人偶，我用人偶制造完美意外", Slug: "real-dolls-perfect-accidents", Author: "佚名", Status: "completed", Views: 580, Rating: 3.0, Chapters: 944, Readers: 59, Chars: "1.81M", AIPercent: "100%", Description: "In a parallel world called Blue Star.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 11, Slug: "horror", Name: "Horror" }, { ID: 20, Slug: "mystery", Name: "Mystery" }, { ID: 21, Slug: "psychological", Name: "Psychological" }, { ID: 33, Slug: "supernatural", Name: "Supernatural" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }], Tags: ["Male Protagonist", "System", "Modern World", "Superpowers"], ReleaseStatus: "released", AddedMinutesAgo: 300, RatingCount: 58 },
  { ID: 6, Title: "Attack on Titan: I'm an Ackerman", AltTitle: "什么！我竟然是耶格尔派？", Slug: "attack-on-titan-ackerman", Author: "佚名", Status: "ongoing", Views: 361, Rating: 3.6, Chapters: 93, Readers: 28, Chars: "156K", AIPercent: "71%", Description: "Due to limited abilities, some original settings will be modified.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }], Tags: ["Male Protagonist", "Overpowered Protagonist", "Adaptation"], ReleaseStatus: "released", AddedMinutesAgo: 15, RatingCount: 36 },
  { ID: 7, Title: "The Background is So Invincible That the System Was Upgraded Overnight!", AltTitle: "背景太无敌，吓得系统连夜升级！", Slug: "invincible-background-system-upgraded", Author: "佚名", Status: "ongoing", Views: 588, Rating: 4.1, Chapters: 998, Readers: 45, Chars: "2.34M", AIPercent: "100%", Description: "When I gained an invincible background!", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 3, Slug: "comedy", Name: "Comedy" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 14, Slug: "xianxia", Name: "Xianxia" }], Tags: ["Male Protagonist", "System", "Cultivation", "Overpowered Protagonist"], ReleaseStatus: "released", AddedMinutesAgo: 5, RatingCount: 88 },
  { ID: 8, Title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", AltTitle: "全民修仙：小师妹是丹道本科生", Slug: "global-cultivation-alchemy-furnace", Author: "佚名", Status: "completed", Views: 8120, Rating: 3.9, Chapters: 470, Readers: 13, Chars: "871K", AIPercent: "21.3%", Description: "Five hundred years ago, Earth entered the era of spiritual revival.", CoverURL: "", Genres: [{ ID: 4, Slug: "adventure", Name: "Adventure" }, { ID: 3, Slug: "comedy", Name: "Comedy" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 23, Slug: "school-life", Name: "School Life" }, { ID: 33, Slug: "supernatural", Name: "Supernatural" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }], Tags: ["Female Protagonist", "Cultivation", "Magic School", "Slow Burn"], ReleaseStatus: "voting", AddedMinutesAgo: 60, RatingCount: 130 },
  { ID: 9, Title: "Black Rock Shooter's Persona", AltTitle: "综漫：黑岩小姐的人格面具", Slug: "black-rock-shooter-persona", Author: "佚名", Status: "completed", Views: 89, Rating: 3.4, Chapters: 154, Readers: 21, Chars: "344K", AIPercent: "39%", Description: "Anime/Manga Crossover Fanfiction.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 21, Slug: "psychological", Name: "Psychological" }], Tags: ["Female Protagonist", "Adaptation", "Game World"], ReleaseStatus: "released", AddedMinutesAgo: 500, RatingCount: 8 },
  { ID: 10, Title: "Reversing the Immortal Path", AltTitle: "穿越之逆转仙途", Slug: "reversing-immortal-path", Author: "佚名", Status: "completed", Views: 27, Rating: 3.7, Chapters: 261, Readers: 26, Chars: "626K", AIPercent: "19.2%", Description: "Mu Heng, who had been crippled for ten years.", CoverURL: "", Genres: [{ ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 16, Slug: "martial-arts", Name: "Martial Arts" }, { ID: 22, Slug: "romance", Name: "Romance" }], Tags: ["Male Protagonist", "Cultivation", "Revenge", "Ancient World"], ReleaseStatus: "released", AddedMinutesAgo: 1000, RatingCount: 2 },
];

const ITEMS_PER_PAGE = 20;

function formatViews(views: number): string {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return String(views);
}

function statusColor(status: string): string {
  switch (status) {
    case "ongoing": return "bg-green-900/40 text-green-400";
    case "completed": return "bg-blue-900/40 text-blue-400";
    case "hiatus": return "bg-yellow-900/40 text-yellow-400";
    case "dropped": return "bg-red-900/40 text-red-400";
    default: return "bg-gray-900/40 text-gray-400";
  }
}

export default function NovelFinderPage() {
  const [query, setQuery] = useState("");
  const [descOnly, setDescOnly] = useState(false);
  const [sort, setSort] = useState<SortField>("created_at");
  const [order, setOrder] = useState<Order>("desc");
  const [status, setStatus] = useState<StatusFilter>("");
  const [release, setRelease] = useState<ReleaseFilter>("all");
  const [minChapters, setMinChapters] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [minReviews, setMinReviews] = useState(0);
  const [genreMode, setGenreMode] = useState<MatchMode>("or");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [tagMode, setTagMode] = useState<MatchMode>("or");
  const [tags, setTags] = useState<string[]>([]);
  const [excludedTags, setExcludedTags] = useState<string[]>([]);

  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreOptions, setGenreOptions] = useState<{ slug: string; name: string }[]>([]);
  const [tagOpen, setTagOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const [tagCategory, setTagCategory] = useState<string>("All");
  const [exTagOpen, setExTagOpen] = useState(false);
  const [exTagQuery, setExTagQuery] = useState("");
  const [exTagCategory, setExTagCategory] = useState<string>("All");

  useEffect(() => {
    genresApi.list().then((res) => {
      const data = (res as { data?: Genre[] }).data;
      const list: { slug: string; name: string }[] = data?.map((g: Genre) => ({ slug: g.Slug, name: g.Name })) || [];
      if (list.length > 0) setGenreOptions(list);
    }).catch(() => {
      setGenreOptions(FALLBACK_GENRES.map((s) => ({ slug: s, name: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })));
    });
  }, []);

  function toggleGenre(slug: string) {
    setSelectedGenres((prev) =>
      prev.includes(slug) ? prev.filter((g) => g !== slug) : [...prev, slug]
    );
  }

  function toggleTag(name: string) {
    setTags((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  }

  function toggleExcludedTag(name: string) {
    setExcludedTags((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  }

  function clearAll() {
    setQuery("");
    setDescOnly(false);
    setSort("created_at");
    setOrder("desc");
    setStatus("");
    setRelease("all");
    setMinChapters(0);
    setMinRating(0);
    setMinReviews(0);
    setGenreMode("or");
    setSelectedGenres([]);
    setTagMode("or");
    setTags([]);
    setExcludedTags([]);
  }

  async function doSearch(p: number = 1) {
    setLoading(true);
    setSearched(true);
    setPage(p);
    try {
      const params: Record<string, string | number | undefined> = { page: p, limit: ITEMS_PER_PAGE, sort, order };
      if (query) params.q = query;
      if (status) params.status = status;
      if (selectedGenres.length > 0) params.genres = selectedGenres.join(",");
      if (selectedGenres.length > 0) params.genre_mode = genreMode;
      if (minChapters > 0) params.min_chapters = minChapters;
      if (minRating > 0) params.min_rating = minRating;
      if (minReviews > 0) params.min_reviews = minReviews;
      const res = await novels.list(params);
      const apiData: Novel[] = res.data || [];
      const filtered = clientSideFilter(apiData);
      setData(filtered);
      setTotalPages(res.total_pages || Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1);
    } catch {
      const filtered = clientSideFilter(FALLBACK_NOVELS);
      setData(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1);
    } finally {
      setLoading(false);
    }
  }

  function clientSideFilter(items: Novel[]): Novel[] {
    return items.filter((novel) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = descOnly
          ? novel.Description.toLowerCase()
          : `${novel.Title} ${novel.AltTitle} ${novel.Description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (status && novel.Status !== status) return false;
      if (release !== "all" && novel.ReleaseStatus && novel.ReleaseStatus !== release) return false;
      if (novel.Chapters < minChapters) return false;
      if (novel.Rating < minRating) return false;
      const reviews = novel.RatingCount || 0;
      if (reviews < minReviews) return false;
      if (selectedGenres.length > 0) {
        const novelGenreSlugs = novel.Genres?.map((g) => g.Slug) || [];
        const match = genreMode === "and"
          ? selectedGenres.every((g) => novelGenreSlugs.includes(g))
          : selectedGenres.some((g) => novelGenreSlugs.includes(g));
        if (!match) return false;
      }
      const novelTags = novel.Tags || [];
      if (tags.length > 0) {
        const match = tagMode === "and"
          ? tags.every((t) => novelTags.includes(t))
          : tags.some((t) => novelTags.includes(t));
        if (!match) return false;
      }
      if (excludedTags.length > 0 && excludedTags.some((t) => novelTags.includes(t))) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      let cmp = 0;
      switch (sort) {
        case "created_at": cmp = (a.AddedMinutesAgo || 9999) - (b.AddedMinutesAgo || 9999); break;
        case "rating": cmp = b.Rating - a.Rating; break;
        case "chapters": cmp = b.Chapters - a.Chapters; break;
        case "views": cmp = b.Views - a.Views; break;
        case "title": cmp = a.Title.localeCompare(b.Title); break;
        case "readers": cmp = b.Readers - a.Readers; break;
        case "reviews": cmp = (b.RatingCount || 0) - (a.RatingCount || 0); break;
      }
      return order === "desc" ? cmp : -cmp;
    });
  }

  const pagedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, page]);

  const activeCount =
    selectedGenres.length +
    tags.length +
    excludedTags.length +
    (status ? 1 : 0) +
    (release !== "all" ? 1 : 0) +
    (minChapters > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minReviews > 0 ? 1 : 0);

  const filteredTags = TAGS.filter((tag) => {
    const matchesCategory = tagCategory === "All" || tag.category === tagCategory;
    const matchesQuery = tag.name.toLowerCase().includes(tagQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const filteredExTags = TAGS.filter((tag) => {
    const matchesCategory = exTagCategory === "All" || tag.category === exTagCategory;
    const matchesQuery = tag.name.toLowerCase().includes(exTagQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const half = Math.ceil(genreOptions.length / 2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Novel Finder</h1>

      {/* Search bar */}
      <div className="flex items-center overflow-hidden rounded-xl border border-[#2a2a4a] bg-[#12122a]">
        <span className="border-r border-[#2a2a4a] bg-[#1e1e3a] px-4 py-3 text-sm font-semibold text-gray-400">
          Search
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch(1)}
          placeholder="Novel name or raw title..."
          className="flex-1 bg-transparent px-4 py-3 text-base outline-none text-gray-200 placeholder:text-gray-600"
        />
      </div>

      {/* Description only toggle */}
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-400">
        <input
          type="checkbox"
          checked={descOnly}
          onChange={(e) => setDescOnly(e.target.checked)}
          className="h-4 w-4 rounded border-[#2a2a4a] accent-[#2193b0]"
        />
        Description only search
      </label>

      {/* Filter toggle */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-[#2a2a4a] bg-[#12122a] px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#1e1e3a]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? "Hide Filters" : "Show Filters"}
          {activeCount > 0 && (
            <span className="ml-1 rounded-full bg-[#2193b0] px-2 py-0.5 text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mt-4 space-y-5 rounded-xl border border-[#1e1e3a] bg-[#12122a] p-4 sm:p-6">
          {/* Sort + order */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-gray-500">Sort by</label>
              <div className="flex flex-wrap gap-1 bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a]">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setSort(o.value)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                      sort === o.value
                        ? "bg-[#2193b0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-500">Order</label>
              <div className="flex bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a] w-fit">
                {(["desc", "asc"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOrder(o)}
                    className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
                      order === o
                        ? "bg-[#2193b0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {o === "desc" ? "Descending" : "Ascending"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm text-gray-500">Status</label>
            <div className="flex flex-wrap gap-1 bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a] w-fit">
              {STATUS_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setStatus(o.value)}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors capitalize ${
                    status === o.value
                      ? "bg-[#2193b0] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Release status */}
          <div>
            <label className="mb-1.5 block text-sm text-gray-500">Release Status</label>
            <div className="flex flex-wrap gap-1 bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a] w-fit">
              {RELEASE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setRelease(o.value)}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                    release === o.value
                      ? "bg-[#2193b0] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-gray-600">Only applies when API data includes release status.</p>
          </div>

          {/* Chapters / rating / reviews */}
          <div>
            <label className="mb-1.5 block text-sm text-gray-500">Minimums</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <select
                value={minChapters}
                onChange={(e) => setMinChapters(Number(e.target.value))}
                className="rounded-lg border border-[#2a2a4a] bg-[#1e1e3a] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#2193b0]"
              >
                {CHAPTER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="rounded-lg border border-[#2a2a4a] bg-[#1e1e3a] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#2193b0]"
              >
                {RATING_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                value={minReviews}
                onChange={(e) => setMinReviews(Number(e.target.value))}
                className="rounded-lg border border-[#2a2a4a] bg-[#1e1e3a] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-[#2193b0]"
              >
                {REVIEW_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Genres */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-sm text-gray-500">Genres</label>
              <div className="flex bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a]">
                {(["or", "and"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setGenreMode(m)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors uppercase ${
                      genreMode === m
                        ? "bg-[#2193b0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 max-h-64 overflow-y-auto">
              {[genreOptions.slice(0, half), genreOptions.slice(half)].map((column, ci) => (
                <ul key={ci} className="space-y-0.5">
                  {column.map((genre) => (
                    <li key={genre.slug}>
                      <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-300 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(genre.slug)}
                          onChange={() => toggleGenre(genre.slug)}
                          className="h-4 w-4 rounded border-[#2a2a4a] accent-[#2193b0]"
                        />
                        {genre.name}
                      </label>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-sm text-gray-500">Tags</label>
              <div className="flex bg-[#1e1e3a] rounded-lg p-0.5 border border-[#2a2a4a]">
                {(["or", "and"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTagMode(m)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors uppercase ${
                      tagMode === m
                        ? "bg-[#2193b0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className={`flex min-h-[44px] w-full flex-wrap items-center gap-2 rounded-lg border bg-[#1e1e3a] px-3 py-2 ${
                  tagOpen ? "border-[#2193b0]" : "border-[#2a2a4a]"
                }`}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-[#2a2a4a] px-2 py-0.5 text-xs font-medium text-gray-300"
                  >
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remove ${tag}`}
                      onClick={() => toggleTag(tag)}
                      className="text-gray-500 hover:text-white"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <input
                  value={tagQuery}
                  onChange={(e) => setTagQuery(e.target.value)}
                  onFocus={() => setTagOpen(true)}
                  placeholder={tags.length === 0 ? "Select tags..." : ""}
                  className="flex-1 min-w-24 bg-transparent text-sm outline-none text-gray-200 placeholder:text-gray-600"
                />
                <button
                  type="button"
                  aria-label="Toggle tag dropdown"
                  onClick={() => setTagOpen((v) => !v)}
                  className="text-gray-500"
                >
                  <svg className={`w-4 h-4 transition-transform ${tagOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {tagOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setTagOpen(false)}
                  />
                  <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#2a2a4a] bg-[#12122a] shadow-lg">
                    <div className="flex flex-wrap gap-2 border-b border-[#1e1e3a] p-3">
                      {(["All", ...TAG_CATEGORIES] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setTagCategory(cat)}
                          className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            tagCategory === cat
                              ? "bg-[#2193b0] text-white"
                              : "bg-[#1e1e3a] text-gray-400 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <ul className="max-h-60 overflow-y-auto py-1">
                      {filteredTags.length === 0 && (
                        <li className="px-4 py-3 text-sm text-gray-500">No tags found.</li>
                      )}
                      {filteredTags.map((tag) => {
                        const active = tags.includes(tag.name);
                        return (
                          <li key={tag.name}>
                            <button
                              type="button"
                              onClick={() => toggleTag(tag.name)}
                              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                                active
                                  ? "bg-[#2193b0]/10 text-[#6dd5ed]"
                                  : "text-gray-300 hover:bg-[#1e1e3a]"
                              }`}
                            >
                              <span>{tag.name}</span>
                              <span className="text-[10px] text-gray-500">{tag.category}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Excluded tags */}
          <div>
            <label className="mb-2 block text-xs font-medium text-red-400">Excluded Tags</label>
            <div className="relative">
              <div
                className={`flex min-h-[44px] w-full flex-wrap items-center gap-2 rounded-lg border bg-[#1e1e3a] px-3 py-2 ${
                  exTagOpen ? "border-[#2193b0]" : "border-red-900/40"
                }`}
              >
                {excludedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-400"
                  >
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remove ${tag}`}
                      onClick={() => toggleExcludedTag(tag)}
                      className="text-red-500 hover:text-red-300"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <input
                  value={exTagQuery}
                  onChange={(e) => setExTagQuery(e.target.value)}
                  onFocus={() => setExTagOpen(true)}
                  placeholder={excludedTags.length === 0 ? "Select tags to exclude..." : ""}
                  className="flex-1 min-w-24 bg-transparent text-sm outline-none text-gray-200 placeholder:text-gray-600"
                />
                <button
                  type="button"
                  aria-label="Toggle excluded tag dropdown"
                  onClick={() => setExTagOpen((v) => !v)}
                  className="text-gray-500"
                >
                  <svg className={`w-4 h-4 transition-transform ${exTagOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {exTagOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setExTagOpen(false)}
                  />
                  <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#2a2a4a] bg-[#12122a] shadow-lg">
                    <div className="flex flex-wrap gap-2 border-b border-[#1e1e3a] p-3">
                      {(["All", ...TAG_CATEGORIES] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setExTagCategory(cat)}
                          className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            exTagCategory === cat
                              ? "bg-[#2193b0] text-white"
                              : "bg-[#1e1e3a] text-gray-400 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <ul className="max-h-60 overflow-y-auto py-1">
                      {filteredExTags.length === 0 && (
                        <li className="px-4 py-3 text-sm text-gray-500">No tags found.</li>
                      )}
                      {filteredExTags.map((tag) => {
                        const active = excludedTags.includes(tag.name);
                        return (
                          <li key={tag.name}>
                            <button
                              type="button"
                              onClick={() => toggleExcludedTag(tag.name)}
                              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                                active
                                  ? "bg-red-900/20 text-red-400"
                                  : "text-gray-300 hover:bg-[#1e1e3a]"
                              }`}
                            >
                              <span>{tag.name}</span>
                              <span className="text-[10px] text-gray-500">{tag.category}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-[#1e1e3a] pt-4">
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-2 rounded-lg border border-[#2a2a4a] px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#1e1e3a]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear All
            </button>
            <button
              type="button"
              onClick={() => {
                setShowFilters(false);
                doSearch(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-lg bg-[#2193b0] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results info */}
      {searched && (
        <div className="mt-8 mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {loading ? (
              <span className="text-[#2193b0]">Searching...</span>
            ) : (
              <>
                <span className="font-bold text-white">{data.length}</span> novel{data.length !== 1 ? "s" : ""} found
              </>
            )}
          </p>
          {!loading && (
            <p className="text-xs text-gray-600">
              Sorted by: <span className="font-medium text-gray-400">{SORT_OPTIONS.find((o) => o.value === sort)?.label}</span> ({order === "desc" ? "Descending" : "Ascending"})
            </p>
          )}
        </div>
      )}

      {/* Results grid */}
      {searched && !loading && (
        <>
          {data.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#2a2a4a] bg-[#12122a] py-16 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-semibold text-gray-400">No novels found</p>
              <p className="mt-1 text-sm text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {pagedData.map((novel) => (
                  <Link
                    key={novel.ID}
                    href={`/en/novel/${novel.ID}/${novel.Slug}`}
                    className="group flex w-full flex-col overflow-hidden rounded-xl border border-[#1e1e3a] bg-[#12122a] transition-shadow hover:shadow-md hover:border-[#2193b0]/40"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1e1e3a]">
                      {novel.CoverURL ? (
                        <img
                          src={novel.CoverURL}
                          alt={`Cover of ${novel.Title}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white group-hover:text-[#6dd5ed] transition-colors">
                        {novel.Title}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-md border border-[#2a2a4a] px-2 py-0.5 text-[10px] font-medium text-gray-400 capitalize">
                          {novel.Genres?.[0]?.Name || novel.Genres?.[0]?.Slug || "General"}
                        </span>
                        <span className="text-xs font-semibold text-gray-300">{novel.Chapters} Ch</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <svg className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-gray-300">{novel.Rating.toFixed(1)}</span>
                        <span aria-hidden className="text-gray-700">·</span>
                        <span className="text-gray-500">{formatViews(novel.Views)} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${statusColor(novel.Status)}`}>
                          {novel.Status}
                        </span>
                        {novel.AIPercent !== "0%" && novel.AIPercent !== "" && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-900/30 text-purple-400">
                            AI {novel.AIPercent}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => doSearch(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-300 hover:bg-[#2a2a4a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {page > 2 && (
                    <button onClick={() => doSearch(1)} className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-400 hover:text-white transition-colors">
                      1
                    </button>
                  )}
                  {page > 3 && <span className="text-gray-600 text-xs">...</span>}
                  {page > 1 && (
                    <button onClick={() => doSearch(page - 1)} className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-400 hover:text-white transition-colors">
                      {page - 1}
                    </button>
                  )}
                  <span className="px-3 py-1.5 text-xs rounded-lg bg-[#2193b0] text-white font-medium">
                    {page}
                  </span>
                  {page < totalPages && (
                    <button onClick={() => doSearch(page + 1)} className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-400 hover:text-white transition-colors">
                      {page + 1}
                    </button>
                  )}
                  {page < totalPages - 2 && <span className="text-gray-600 text-xs">...</span>}
                  {page < totalPages - 1 && (
                    <button onClick={() => doSearch(totalPages)} className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-400 hover:text-white transition-colors">
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() => doSearch(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1e3a] text-gray-300 hover:bg-[#2a2a4a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Initial state */}
      {!searched && (
        <div className="text-center py-16">
          <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-400 text-lg mb-2">Search Thousands of Novels</p>
          <p className="text-gray-600 text-sm">Use the search bar above or open filters to narrow down by genre, tags, status, and more.</p>
        </div>
      )}
    </div>
  );
}
