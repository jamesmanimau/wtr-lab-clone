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

const mockTrending: Novel[] = [
  { ID: 1, Title: "Naruto: In Konoha Village, I Awakened Wood Release at the Start", Slug: "naruto-konoha-wood", Rating: 3.8, Chapters: 1002, Views: 123456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 2, Title: "Question and Answer Douluo: Tang San's Time Travel Revealed", Slug: "qa-douluo", Rating: 1.7, Chapters: 372, Views: 169503, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 3, Title: "Hogwarts: My Magic Has Turned Evil!", Slug: "hogwarts-evil-magic", Rating: 4.5, Chapters: 486, Views: 89234, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 4, Title: "Battle Through the Heavens: I Can Solidify the Talents of All Things", Slug: "btth-solidify", Rating: 4.2, Chapters: 723, Views: 76543, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 5, Title: "Douluo Continent: A Fictional Sky, Turning Fiction Into Reality", Slug: "douluo-fictional-sky", Rating: 3.5, Chapters: 289, Views: 65432, CoverURL: "", Genres: [{Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 6, Title: "As Long As I Lack Morality, Konoha Can't Do Anything to Me!", Slug: "lack-morality-konoha", Rating: 4.0, Chapters: 156, Views: 54321, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 7, Title: "Football: I See Weaknesses!", Slug: "football-weaknesses", Rating: 1.8, Chapters: 156, Views: 41170, CoverURL: "", Genres: [{Slug:"sports",Name:"Sports"}] },
  { ID: 8, Title: "Marvel: Checking in at New York, Starting with a Silver Superman", Slug: "marvel-silver-superman", Rating: 3.7, Chapters: 412, Views: 39876, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
  { ID: 9, Title: "Douluo Continent: Taking Tang San As a Disciple", Slug: "douluo-disciple", Rating: 2.0, Chapters: 284, Views: 62994, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 10, Title: "I Just Started High School, But the System Insists I'm an Emperor", Slug: "high-school-emperor", Rating: 1.9, Chapters: 264, Views: 51120, CoverURL: "", Genres: [{Slug:"comedy",Name:"Comedy"}] },
  { ID: 11, Title: "Douluo Continent: Qian Renxue, Your Martial Soul Has Become Sentient!", Slug: "qian-renxue-sentient", Rating: 3.6, Chapters: 198, Views: 28765, CoverURL: "", Genres: [{Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 12, Title: "The Cruelty of the Uchiha", Slug: "cruelty-uchiha", Rating: 4.3, Chapters: 89, Views: 23456, CoverURL: "", Genres: [{Slug:"action",Name:"Action"}] },
];

export default function TrendingPage() {
  const [data, setData] = useState<Novel[]>(mockTrending);
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
