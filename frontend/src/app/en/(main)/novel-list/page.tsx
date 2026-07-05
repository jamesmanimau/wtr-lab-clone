"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { novels } from "@/lib/api";
import { Novel } from "@/types";
import { MOCK_NOVEL_LIST } from "@/lib/mockData";

const genreList = [
  "action","adult","adventure","comedy","drama","ecchi","erciyuan","fan-fiction","fantasy",
  "game","gender-bender","harem","historical","horror","josei","martial-arts","mature",
  "mecha","military","mystery","psychological","romance","school-life","sci-fi","seinen",
  "shoujo","shoujo-ai","shounen","shounen-ai","slice-of-life","smut","sports","supernatural",
  "tragedy","urban-life","wuxia","xianxia","xuanhuan","yaoi","yuri",
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
  const [data, setData] = useState<Novel[]>(MOCK_NOVEL_LIST);
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
      const filtered = MOCK_NOVEL_LIST.filter((n) => {
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
