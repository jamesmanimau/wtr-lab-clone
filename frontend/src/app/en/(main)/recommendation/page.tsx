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

export default function RecommendationPage() {
  const [data, setData] = useState<Novel[]>(mockData);
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

      <div className="mt-8 bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Editor&apos;s Pick</h2>
        <div className="flex gap-4">
          <div className="w-28 aspect-[3/4] rounded-lg bg-[#1e1e3a] border border-[#2a2a4a] flex-shrink-0 flex items-center justify-center">
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
      </div>
    </div>
  );
}
