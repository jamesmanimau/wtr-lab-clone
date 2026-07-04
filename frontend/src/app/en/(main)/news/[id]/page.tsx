"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { news } from "@/lib/api";

interface NewsDetail {
  ID: number;
  Title: string;
  Content: string;
  Type: string;
  CreatedAt: string;
}

const MOCK_DETAILS: Record<number, NewsDetail> = {
  428: { ID: 428, Title: "🎉 16th Giveaway Winners 🎉", Content: "We are excited to announce the winners...\n\n🏆 Grand Prize: Mega_bells\n🥈 Second Place: StandardCrystal\n🥉 Third Place: Alpha2", Type: "news", CreatedAt: "2026-07-02" },
  427: { ID: 427, Title: "🎉 Our 16th Giveaway is LIVE! 🎉", Content: "Our 16th Giveaway is now live!\n\nParticipate now for a chance to win amazing prizes!", Type: "news", CreatedAt: "2026-06-25" },
  426: { ID: 426, Title: "Version 1.13.3 - New Source Management & Bug Fixes!", Content: "✨ New Features:\n- New Source Management system\n- Improved chapter loading performance\n\n🐛 Bug Fixes:\n- Fixed reading history\n- Fixed mobile pagination", Type: "changelog", CreatedAt: "2026-06-20" },
};

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
  catch { return dateStr; }
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = parseInt((params?.id as string) || "0");
  const [detail, setDetail] = useState<NewsDetail | null>(MOCK_DETAILS[id] || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    news.get(id)
      .then((res) => setDetail(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading && !detail) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-gray-500">Loading...</div>;
  }

  if (!detail) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-gray-500">News not found.</p>
        <Link href="/en/news" className="text-violet-400 hover:text-violet-300 text-sm mt-2 inline-block">← Back to News</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/en/news" className="hover:text-violet-400 transition-colors">News</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">{detail.Title.slice(0, 50)}</span>
      </nav>
      <article className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded ${
            detail.Type === "changelog"
              ? "bg-blue-900/40 text-blue-400 border border-blue-800/30"
              : "bg-violet-900/40 text-violet-300 border border-violet-800/30"
          }`}>{detail.Type}</span>
          <span className="text-xs text-gray-600">{formatDate(detail.CreatedAt)}</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-6">{detail.Title}</h1>
        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{detail.Content}</div>
        <div className="mt-8 pt-6 border-t border-[#1e1e3a]">
          <Link href="/en/news" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Back to News</Link>
        </div>
      </article>
    </div>
  );
}
