"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import NovelCard from "@/components/NovelCard";
import { author } from "@/lib/api";

interface Novel {
  ID: number; Title: string; Slug: string; Rating: number; Chapters: number;
  Genres: { Slug: string; Name: string }[];
}

const MOCK_NOVELS: Novel[] = [
  { ID: 7, Title: "I am the Crown Prince of the Ming Dynasty", Slug: "i-am-the-crown-prince-of-the-ming-dynasty", Rating: 4.2, Chapters: 1592, Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 6, Title: "First-rank Di Consort", Slug: "first-rank-di-consort", Rating: 3.6, Chapters: 387, Genres: [{Slug:"historical",Name:"Historical"}] },
];

export default function AuthorPage() {
  const params = useParams();
  const authorName = decodeURIComponent((params?.name as string) || "");
  const [novels, setNovels] = useState<Novel[]>(MOCK_NOVELS);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    author.novels(authorName)
      .then((res) => { if (res.data?.length) setNovels(res.data); })
      .catch(() => {});
  }, [authorName]);

  const sorted = [...novels].sort((a, b) => {
    if (sort === "rating") return b.Rating - a.Rating;
    if (sort === "chapters") return b.Chapters - a.Chapters;
    return b.ID - a.ID;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{authorName}</h1>
        <p className="text-sm text-gray-500 mt-1">{novels.length} novels</p>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-400">Sort:</span>
        {["newest", "rating", "chapters"].map((s) => (
          <button key={s} onClick={() => setSort(s)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${sort === s ? "bg-violet-600 text-white" : "bg-[#1e1e3a] text-gray-400 hover:text-white"}`}
          >{s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sorted.map((novel) => (
          <NovelCard key={novel.ID} title={novel.Title} genre={novel.Genres[0]?.Slug || "action"} chapters={novel.Chapters} rating={novel.Rating.toString()} href={`/en/novel/${novel.ID}/${novel.Slug}`} compact />
        ))}
      </div>
    </div>
  );
}
