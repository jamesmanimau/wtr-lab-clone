"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/lib/api";
import { Novel } from "@/types";
import { MOCK_TRENDING } from "@/lib/mockData";

export default function TrendingPage() {
  const [data, setData] = useState<Novel[]>(MOCK_TRENDING);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    novels.trending()
      .then((res) => { if (res.data?.length) setData(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Trending</h1>

      {loading ? (
        <div className="text-center py-8 text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.map((novel) => (
            <NovelCard
              key={novel.ID}
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
