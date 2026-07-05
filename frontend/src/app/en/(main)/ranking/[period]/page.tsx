"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { novels } from "@/lib/api";
import { Novel } from "@/types";
import { MOCK_RANKING_FULL } from "@/lib/mockData";

const periods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "all_time", label: "All Time" },
];

export default function RankingPage() {
  const params = useParams();
  const currentPeriod = (params?.period as string) || "daily";
  const [data, setData] = useState<Novel[]>(MOCK_RANKING_FULL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await novels.list({ sort: "views", order: "desc", limit: 50 });
        setData(res.data);
      } catch {
        setData(MOCK_RANKING_FULL);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPeriod]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Novel Ranking</h1>

      {/* Period tabs */}
      <div className="flex gap-1 bg-card-hover rounded-lg p-0.5 mb-6 inline-flex">
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
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors group"
            >
              <span className={`text-xl font-bold w-8 text-center shrink-0 ${
                i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-600" : "text-gray-600"
              }`}>
                #{i + 1}
              </span>
              <div className="w-10 h-14 rounded bg-card-hover flex-shrink-0 flex items-center justify-center overflow-hidden">
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
