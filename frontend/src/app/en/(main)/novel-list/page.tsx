"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { novels } from "@/lib/api";

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
  Genres: { ID: number; Slug: string; Name: string }[];
}

const genreList = [
  "action","adult","adventure","comedy","drama","ecchi","erciyuan","fan-fiction","fantasy",
  "game","gender-bender","harem","historical","horror","josei","martial-arts","mature",
  "mecha","military","mystery","psychological","romance","school-life","sci-fi","seinen",
  "shoujo","shoujo-ai","shounen","shounen-ai","slice-of-life","smut","sports","supernatural",
  "tragedy","urban-life","wuxia","xianxia","xuanhuan","yaoi","yuri",
];

const mockNovels: Novel[] = [
  { ID: 1, Title: "Red Chamber: Saving the Falling Heavens", AltTitle: "红楼之挽天倾", Slug: "red-chamber-saving-falling-heavens", Author: "佚名", Status: "completed", Views: 3142, Rating: 3.5, Chapters: 1782, Readers: 3, Chars: "7.81M", AIPercent: "8.92%", Description: "A young man from a later generation transmigrates into the world of Dream of the Red Chamber.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }] },
  { ID: 2, Title: "Traveling Simultaneously: Across the Heavens", AltTitle: "同时穿越：纵横诸天", Slug: "traveling-simultaneously-across-heavens", Author: "佚名", Status: "ongoing", Views: 2105, Rating: 3.8, Chapters: 84, Readers: 13, Chars: "389K", AIPercent: "63.1%", Description: "Other popular fantasy novels.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }] },
  { ID: 3, Title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", AltTitle: "改嫁京圈太子爷后，竹马们气疯了", Slug: "remarrying-wealthy-beijing", Author: "佚名", Status: "completed", Views: 4521, Rating: 4.0, Chapters: 1051, Readers: 11, Chars: "1.83M", AIPercent: "4.76%", Description: "I transmigrated into a book during the Ghost Festival.", CoverURL: "", Genres: [{ ID: 5, Slug: "drama", Name: "Drama" }, { ID: 22, Slug: "romance", Name: "Romance" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }] },
  { ID: 4, Title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", AltTitle: "重生1983：我妻京圈大小姐", Slug: "reborn-1983-beijing-elite", Author: "佚名", Status: "ongoing", Views: 712, Rating: 3.2, Chapters: 1758, Readers: 9, Chars: "2.49M", AIPercent: "4.32%", Description: "In the winter of 1983, Ye Jianguo, a future tycoon.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 30, Slug: "slice-of-life", Name: "Slice of Life" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }] },
  { ID: 5, Title: "Real Dolls: I Use Dolls to Create Perfect Accidents", AltTitle: "真实人偶，我用人偶制造完美意外", Slug: "real-dolls-perfect-accidents", Author: "佚名", Status: "completed", Views: 580, Rating: 3.0, Chapters: 944, Readers: 59, Chars: "1.81M", AIPercent: "100%", Description: "In a parallel world called Blue Star.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 5, Slug: "drama", Name: "Drama" }, { ID: 11, Slug: "horror", Name: "Horror" }, { ID: 20, Slug: "mystery", Name: "Mystery" }, { ID: 33, Slug: "supernatural", Name: "Supernatural" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }] },
  { ID: 6, Title: "Attack on Titan: I'm an Ackerman", AltTitle: "什么！我竟然是耶格尔派？", Slug: "attack-on-titan-ackerman", Author: "佚名", Status: "ongoing", Views: 361, Rating: 3.6, Chapters: 93, Readers: 28, Chars: "156K", AIPercent: "71%", Description: "Due to limited abilities, some original settings will be modified.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }] },
  { ID: 7, Title: "The Background is So Invincible That the System Was Upgraded Overnight!", AltTitle: "背景太无敌，吓得系统连夜升级！", Slug: "invincible-background-system-upgraded", Author: "佚名", Status: "ongoing", Views: 588, Rating: 4.1, Chapters: 998, Readers: 45, Chars: "2.34M", AIPercent: "100%", Description: "When I gained an invincible background!", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 3, Slug: "comedy", Name: "Comedy" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }] },
  { ID: 8, Title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", AltTitle: "全民修仙：小师妹是丹道本科生", Slug: "global-cultivation-alchemy-furnace", Author: "佚名", Status: "completed", Views: 8120, Rating: 3.9, Chapters: 470, Readers: 13, Chars: "871K", AIPercent: "21.3%", Description: "Five hundred years ago, Earth entered the era of spiritual revival.", CoverURL: "", Genres: [{ ID: 4, Slug: "adventure", Name: "Adventure" }, { ID: 3, Slug: "comedy", Name: "Comedy" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 23, Slug: "school-life", Name: "School Life" }, { ID: 35, Slug: "urban-life", Name: "Urban Life" }] },
  { ID: 9, Title: "Black Rock Shooter's Persona", AltTitle: "综漫：黑岩小姐的人格面具", Slug: "black-rock-shooter-persona", Author: "佚名", Status: "completed", Views: 89, Rating: 3.4, Chapters: 154, Readers: 21, Chars: "344K", AIPercent: "39%", Description: "Anime/Manga Crossover Fanfiction.", CoverURL: "", Genres: [{ ID: 1, Slug: "action", Name: "Action" }, { ID: 8, Slug: "fan-fiction", Name: "Fan-Fiction" }, { ID: 12, Slug: "fantasy", Name: "Fantasy" }] },
  { ID: 10, Title: "Reversing the Immortal Path", AltTitle: "穿越之逆转仙途", Slug: "reversing-immortal-path", Author: "佚名", Status: "completed", Views: 27, Rating: 3.7, Chapters: 261, Readers: 26, Chars: "626K", AIPercent: "19.2%", Description: "Mu Heng, who had been crippled for ten years.", CoverURL: "", Genres: [{ ID: 12, Slug: "fantasy", Name: "Fantasy" }, { ID: 16, Slug: "martial-arts", Name: "Martial Arts" }] },
];

const SORT_OPTIONS = [
  { value: "created_at", label: "Addition Date" },
  { value: "title", label: "Name" },
  { value: "views", label: "View" },
  { value: "readers", label: "Reader" },
  { value: "chapters", label: "Chapter" },
];

const STATUS_OPTIONS = ["All", "Ongoing", "Completed"];

export default function NovelListPage() {
  const [data, setData] = useState<Novel[]>(mockNovels);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(7524);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const fetchData = async (p: number = 1) => {
    setLoading(true);
    setPage(p);
    try {
      const res = await novels.list({ page: p, limit: 20, status: status || undefined, genre: genre || undefined, sort, order });
      setData(res.data);
      setTotalPages(res.total_pages);
    } catch {
      const filtered = mockNovels.filter((n) => {
        if (status && n.Status !== status) return false;
        if (genre && !n.Genres.some((g) => g.Slug === genre)) return false;
        return true;
      });
      const sorted = [...filtered].sort((a, b) => {
        let cmp = 0;
        if (sort === "title") cmp = a.Title.localeCompare(b.Title);
        else if (sort === "views") cmp = a.Views - b.Views;
        else if (sort === "readers") cmp = a.Readers - b.Readers;
        else if (sort === "chapters") cmp = a.Chapters - b.Chapters;
        else cmp = a.ID - b.ID;
        return order === "desc" ? -cmp : cmp;
      });
      setData(sorted);
      setTotalPages(Math.ceil(filtered.length / 20) || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [sort, order, status, genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Novel List</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Order by</span>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); }}
            className="bg-card-hover text-sm text-gray-200 px-3 py-2 rounded-lg border border-line-light outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Order</span>
          <select
            value={order}
            onChange={(e) => { setOrder(e.target.value); }}
            className="bg-card-hover text-sm text-gray-200 px-3 py-2 rounded-lg border border-line-light outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Status</span>
          <div className="flex bg-card-hover rounded-lg p-0.5 border border-line-light">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s === "All" ? "" : s.toLowerCase()); }}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  (s === "All" && !status) || s.toLowerCase() === status
                    ? "bg-accent text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <span className="text-sm text-gray-400 mr-2">Genre</span>
          <button
            onClick={() => setShowGenreDropdown(!showGenreDropdown)}
            className="bg-card-hover text-sm text-gray-200 px-3 py-2 rounded-lg border border-line-light outline-none min-w-[120px] text-left capitalize"
          >
            {genre || "All"}
          </button>
          {showGenreDropdown && (
            <div className="absolute top-full mt-1 left-0 z-50 bg-card-hover border border-line-light rounded-xl p-2 max-h-60 overflow-y-auto w-48 shadow-xl">
              <button
                onClick={() => { setGenre(""); setShowGenreDropdown(false); }}
                className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
                  !genre ? "text-accent" : "text-gray-300 hover:text-white"
                }`}
              >
                All
              </button>
              {genreList.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGenre(g); setShowGenreDropdown(false); }}
                  className={`block w-full text-left text-sm px-3 py-1.5 rounded capitalize ${
                    genre === g ? "text-accent" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {g.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading && <span className="text-sm text-accent ml-2">Loading...</span>}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{data.length} novels</p>

      {/* Novel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((novel) => (
          <Link
            key={novel.ID}
            href={`/en/novel/${novel.ID}/${novel.Slug}`}
            className="flex gap-3 p-3 bg-card border border-line rounded-xl hover:border-accent/40 transition-colors group"
          >
            <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg bg-card-hover border border-line-light flex-shrink-0 flex items-center justify-center overflow-hidden">
              {novel.CoverURL ? (
                <img src={novel.CoverURL} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors line-clamp-2 leading-snug">
                {novel.Title}
              </h3>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">{novel.AltTitle}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-[10px] text-gray-400">
                <span className={`px-1 py-0.5 rounded ${
                  novel.Status === "ongoing" ? "bg-green-900/40 text-green-400" : "bg-blue-900/40 text-blue-400"
                }`}>
                  {novel.Status}
                </span>
                <span>{novel.Views.toLocaleString()}v</span>
                <span>{novel.Chapters}ch</span>
                {novel.Rating > 0 && <span>★{novel.Rating.toFixed(1)}</span>}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[10px] text-gray-500">
                <span>{novel.Readers} readers</span>
                <span>{novel.Chars}</span>
                {novel.AIPercent !== "0%" && <span>AI {novel.AIPercent}</span>}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {novel.Genres.slice(0, 3).map((g) => (
                  <span key={g.ID} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent-light/80 border border-accent/20">
                    {g.Name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => fetchData(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-300 hover:bg-line-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {page > 2 && (
          <button onClick={() => fetchData(1)} className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-400 hover:text-white transition-colors">
            1
          </button>
        )}
        {page > 3 && <span className="text-gray-600 text-sm">...</span>}
        {page > 1 && (
          <button onClick={() => fetchData(page - 1)} className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-400 hover:text-white transition-colors">
            {page - 1}
          </button>
        )}
        <span className="px-3 py-1.5 text-sm rounded-lg bg-accent text-white font-medium">
          {page}
        </span>
        {page < totalPages && (
          <button onClick={() => fetchData(page + 1)} className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-400 hover:text-white transition-colors">
            {page + 1}
          </button>
        )}
        {page < totalPages - 2 && <span className="text-gray-600 text-sm">...</span>}
        {page < totalPages - 1 && (
          <button onClick={() => fetchData(totalPages)} className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-400 hover:text-white transition-colors">
            {totalPages}
          </button>
        )}

        <button
          onClick={() => fetchData(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm rounded-lg bg-card-hover text-gray-300 hover:bg-line-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>

        <span className="text-xs text-gray-600 ml-2">{page} / {totalPages}</span>
      </div>
    </div>
  );
}
