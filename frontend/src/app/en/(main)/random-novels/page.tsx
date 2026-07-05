"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/lib/api";
import { Novel } from "@/types";
import { MOCK_RANDOM_NOVELS } from "@/lib/mockData";

export default function RandomNovelsPage() {
  const [data, setData] = useState<Novel[]>(MOCK_RANDOM_NOVELS);
  const [loading, setLoading] = useState(false);

  const fetchRandom = () => {
    setLoading(true);
    novels.random(12)
      .then((res) => { if (res.data?.length) setData(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRandom(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Random Novels</h1>
        <button
          onClick={fetchRandom}
          disabled={loading}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
        >
          {loading ? "Shuffling..." : "🔄 Shuffle"}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.map((novel, i) => (
            <NovelCard
              key={i}
              title={novel.Title}
              genre={novel.Genres[0]?.Slug || "action"}
              chapters={novel.Chapters}
              rating={novel.Rating.toString()}
              href={`/en/novel/${novel.ID}/${novel.Slug}`}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}
