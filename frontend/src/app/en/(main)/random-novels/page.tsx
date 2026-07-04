"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/lib/api";

interface Novel {
  ID: number; Title: string; Slug: string; Rating: number;
  Chapters: number; Views: number; CoverURL: string;
  Genres: { Slug: string; Name: string }[];
}

const mockData: Novel[] = [
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

export default function RandomNovelsPage() {
  const [data, setData] = useState<Novel[]>(mockData);
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
