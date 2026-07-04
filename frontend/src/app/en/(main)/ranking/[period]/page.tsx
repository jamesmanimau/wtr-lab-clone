"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { novels } from "@/lib/api";

interface Novel {
  ID: number; Title: string; Slug: string; Author: string; Status: string;
  Views: number; Rating: number; Chapters: number; Readers: number; Chars: string;
  CoverURL: string;
  Genres: { ID: number; Slug: string; Name: string }[];
}

const periods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "all_time", label: "All Time" },
];

const mockRanking: Novel[] = [
  { ID: 1, Title: "Question and Answer Douluo: Tang San's Time Travel Revealed, Tang Hao Breaks Through Defense", Slug: "qa-douluo", Author: "佚名", Status: "ongoing", Views: 169503, Rating: 1.7, Chapters: 372, Readers: 892, Chars: "890K", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:8,Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 2, Title: "Douluo Continent: Taking Tang San As a Disciple, with a Ten-thousand-fold Return for Teaching Him", Slug: "douluo-disciple", Author: "佚名", Status: "ongoing", Views: 62994, Rating: 2.0, Chapters: 284, Readers: 456, Chars: "650K", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:8,Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 3, Title: "Lord: God-tier Attribute, Recruits Fallen Angels of Original Sin", Slug: "lord-god-tier", Author: "佚名", Status: "ongoing", Views: 51502, Rating: 3.3, Chapters: 412, Readers: 1203, Chars: "1.1M", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:12,Slug:"fantasy",Name:"Fantasy"}] },
  { ID: 4, Title: "I Just Started High School, But the System Insists I'm an Emperor in My Twilight Years", Slug: "high-school-emperor", Author: "佚名", Status: "ongoing", Views: 51120, Rating: 1.9, Chapters: 264, Readers: 88, Chars: "450K", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:3,Slug:"comedy",Name:"Comedy"}] },
  { ID: 5, Title: "Douluo Continent: A Sharp Commentary on the Goddesses, Bibi Dong Breaks Down in Defense", Slug: "douluo-commentary", Author: "佚名", Status: "ongoing", Views: 41918, Rating: 2.9, Chapters: 198, Readers: 567, Chars: "520K", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:8,Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 6, Title: "Football: I See Weaknesses!", Slug: "football-weaknesses", Author: "佚名", Status: "ongoing", Views: 41170, Rating: 1.8, Chapters: 156, Readers: 234, Chars: "380K", CoverURL: "", Genres: [{ID:32,Slug:"sports",Name:"Sports"}] },
  { ID: 7, Title: "I am the Crown Prince of the Ming Dynasty", Slug: "crown-prince-ming", Author: "佚名", Status: "completed", Views: 78901, Rating: 4.2, Chapters: 1592, Readers: 505, Chars: "2.96M", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:11,Slug:"historical",Name:"Historical"}] },
  { ID: 8, Title: "Naruto: In Konoha Village, I Awakened Wood Release at the Start", Slug: "naruto-konoha-wood", Author: "佚名", Status: "ongoing", Views: 123456, Rating: 3.8, Chapters: 1002, Readers: 342, Chars: "1.8M", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:8,Slug:"fan-fiction",Name:"Fan-Fiction"}] },
  { ID: 9, Title: "Could I Really End Up 'collapsing My Image' Even in the World of Rule Horror", Slug: "rule-horror", Author: "佚名", Status: "ongoing", Views: 8120, Rating: 4.1, Chapters: 925, Readers: 15, Chars: "1.75M", CoverURL: "", Genres: [{ID:20,Slug:"mystery",Name:"Mystery"}] },
  { ID: 10, Title: "The Legend of the Mountain and Sea Demon Subduing", Slug: "mountain-sea-demon", Author: "佚名", Status: "completed", Views: 4580, Rating: 3.9, Chapters: 1522, Readers: 3, Chars: "2.82M", CoverURL: "", Genres: [{ID:1,Slug:"action",Name:"Action"},{ID:16,Slug:"martial-arts",Name:"Martial Arts"}] },
];

export default function RankingPage() {
  const params = useParams();
  const currentPeriod = (params?.period as string) || "daily";
  const [data, setData] = useState<Novel[]>(mockRanking);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await novels.list({ sort: "views", order: "desc", limit: 50 });
        setData(res.data);
      } catch {
        setData(mockRanking);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPeriod]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Novel Ranking</h1>

      {/* Period tabs */}
      <div className="flex gap-1 bg-[#1e1e3a] rounded-lg p-0.5 mb-6 inline-flex">
        {periods.map((p) => (
          <Link
            key={p.key}
            href={`/en/ranking/${p.key}`}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              currentPeriod === p.key
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {p.label}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8 text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-2">
          {data.map((novel, i) => (
            <Link
              key={novel.ID}
              href={`/en/novel/${novel.ID}/${novel.Slug}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#12122a] transition-colors group"
            >
              <span className={`text-xl font-bold w-8 text-center shrink-0 ${
                i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-600" : "text-gray-600"
              }`}>
                #{i + 1}
              </span>
              <div className="w-10 h-14 rounded bg-[#1e1e3a] flex-shrink-0 flex items-center justify-center overflow-hidden">
                {novel.CoverURL ? (
                  <img src={novel.CoverURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-200 group-hover:text-violet-400 transition-colors line-clamp-1 leading-snug">
                  #{i + 1} {novel.Title}
                </p>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                  <span>{novel.Views.toLocaleString()} Views</span>
                  <span>★ {novel.Rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
