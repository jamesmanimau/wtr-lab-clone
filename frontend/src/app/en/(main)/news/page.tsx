"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { news } from "@/lib/api";

interface NewsItem {
  ID: number;
  Title: string;
  Type: string;
  CreatedAt: string;
  Slug: string;
}

const MOCK_NEWS: NewsItem[] = [
  { ID: 428, Title: "🎉 16th Giveaway Winners 🎉", Type: "news", CreatedAt: "2026-07-02", Slug: "16th-giveaway-winners" },
  { ID: 427, Title: "🎉 Our 16th Giveaway is LIVE! 🎉", Type: "news", CreatedAt: "2026-06-25", Slug: "16th-giveaway-live" },
  { ID: 426, Title: "Version 1.13.3 - New Source Management & Bug Fixes!", Type: "changelog", CreatedAt: "2026-06-20", Slug: "v1-13-3" },
  { ID: 425, Title: "🔥 New Feature: Community Folders", Type: "changelog", CreatedAt: "2026-06-15", Slug: "community-folders" },
  { ID: 424, Title: "🏆 15th Giveaway Results", Type: "news", CreatedAt: "2026-06-10", Slug: "15th-giveaway-results" },
  { ID: 423, Title: "Version 1.13.2 - Performance Improvements", Type: "changelog", CreatedAt: "2026-06-05", Slug: "v1-13-2" },
  { ID: 422, Title: "📢 Site Maintenance Scheduled", Type: "news", CreatedAt: "2026-06-01", Slug: "maintenance-scheduled" },
  { ID: 421, Title: "Version 1.13.1 - Bug Fixes", Type: "changelog", CreatedAt: "2026-05-28", Slug: "v1-13-1" },
  { ID: 420, Title: "🎉 Site Hits 1 Million Visitors!", Type: "news", CreatedAt: "2026-05-20", Slug: "1-million-visitors" },
];

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { return dateStr.split("T")[0]; }
}

export default function NewsListPage() {
  const [items, setItems] = useState<NewsItem[]>(MOCK_NEWS);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    news.list({ limit: 50 })
      .then((res) => { if (res.data?.length) setItems(res.data); })
      .catch(() => {});
  }, []);

  const filtered = filterType === "all" ? items : items.filter((n) => n.Type === filterType);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">News & Updates</h1>
      <div className="flex gap-1 bg-[#1e1e3a] rounded-lg p-0.5 mb-8 inline-flex">
        {[
          { key: "all", label: "All" },
          { key: "news", label: "News" },
          { key: "changelog", label: "Changelog" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              filterType === tab.key ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map((item) => (
          <Link
            key={item.ID}
            href={`/en/news/${item.ID}`}
            className="block p-5 bg-[#12122a] border border-[#1e1e3a] rounded-xl hover:border-violet-800/40 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">{item.Title}</h2>
                <p className="text-xs text-gray-600 mt-1">{formatDate(item.CreatedAt)}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                item.Type === "changelog"
                  ? "bg-blue-900/40 text-blue-400 border border-blue-800/30"
                  : "bg-violet-900/40 text-violet-300 border border-violet-800/30"
              }`}>{item.Type}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
