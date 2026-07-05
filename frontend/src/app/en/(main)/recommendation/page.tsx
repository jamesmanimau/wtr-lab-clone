"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/lib/api";
import { Novel } from "@/types";
import { MOCK_RECOMMENDATION } from "@/lib/mockData";

export default function RecommendationPage() {
  const [data, setData] = useState<Novel[]>(MOCK_RECOMMENDATION);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    novels.recommendations()
      .then((res) => { if (res.data?.length) setData(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Recommendations</h1>

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

      <Card className="mt-8 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Editor&apos;s Pick</h2>
        <div className="flex gap-4">
          <div className="w-28 aspect-[3/4] rounded-lg bg-card-hover border border-line-light flex-shrink-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/en/novel/1/naruto-konoha-wood`} className="text-base font-semibold text-white hover:text-violet-400 transition-colors">
              Naruto: In Konoha Village, I Awakened Wood Release at the Start
            </Link>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
              <span>★ 3.8</span>
              <span>📚 1002</span>
            </div>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
              Konoha 52nd year. Chiba awakened her memories of her past life. As one of the descendants of the Senju clan.
            </p>
            <Link
              href="/en/novel/1/naruto-konoha-wood/continue"
              className="inline-block mt-3 px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg transition-colors"
            >
              START READING
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
