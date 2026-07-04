"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { novels } from "@/lib/api";

interface Novel {
  ID: number;
  Title: string;
  AltTitle: string;
  Slug: string;
  Author: string;
  AuthorSlug: string;
  Status: string;
  Views: number;
  Rating: number;
  RatingCount: number;
  Chapters: number;
  Readers: number;
  Chars: string;
  AIPercent: string;
  Description: string;
  CoverURL: string;
  RequestedBy: string;
  ReleasedBy: string;
  Genres: { ID: number; Slug: string; Name: string }[];
}

interface Chapter {
  ID: number;
  NovelID: number;
  Number: number;
  Title: string;
  IsLocked: boolean;
  TicketCost: number;
}

const mockNovelDetail: Novel = {
  ID: 1,
  Title: "Having Dinner with His Brother, the Cold and Aloof Tycoon Becomes Addicted to His Doting Affections",
  AltTitle: "陪哥哥吃饭，冷欲大佬强宠上瘾",
  Slug: "having-dinner-with-his-brother",
  Author: "半条活鱼",
  AuthorSlug: "ban-tiao-huo-yu",
  Status: "completed",
  Views: 3142,
  Rating: 3.5,
  RatingCount: 45,
  Chapters: 135,
  Readers: 17,
  Chars: "250K",
  AIPercent: "37%",
  Description: `[Cold and aloof tycoon × Bright and delicate, lazy princess + Forced marriage + 12-year age gap + 1v1, both are virgins] The first time she saw him, she only thought he had a great physique and, unaware of her own limitations, handed him her business card, asking him to be her model. The second time, she got drunk and went into the wrong room, groping him all over. Later, Yunxi learned that he was Zhao Qiyue, the head of the Zhao family, the most powerful family in Beijing's elite circle, not only incredibly powerful but also ruthless. No one who messed with him had a good ending. Later, he pinned her against the car door: "You touched me, and you think you can run away?" Yunxi gave him her first kiss, and all her future kisses in return. But the man still wasn't satisfied. Yunxi begged him: "Brother, can we be even now?" Zhao Qiyue pulled her into his arms: "Even? Sure, let's get married first." The Yun family's little princess, considered the least promising by her elders, was ultimately spoiled rotten by that cold and aloof tycoon.`,
  CoverURL: "",
  RequestedBy: "Diddy",
  ReleasedBy: "Blackie",
  Genres: [
    { ID: 22, Slug: "romance", Name: "Romance" },
    { ID: 30, Slug: "slice-of-life", Name: "Slice of Life" },
    { ID: 35, Slug: "urban-life", Name: "Urban Life" },
  ],
};

export default function NovelDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterPage, setChapterPage] = useState(1);
  const [totalChapters, setTotalChapters] = useState(0);
  const [activeTab, setActiveTab] = useState<"about" | "toc" | "reviews" | "recommendations">("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchNovel = async () => {
      setLoading(true);
      try {
        const res = await novels.get(id);
        setNovel(res);
      } catch {
        const m = mockNovelDetail;
        m.ID = parseInt(id) || 1;
        m.Slug = params?.slug as string || m.Slug;
        setNovel(m);
      }
      setLoading(false);
    };
    fetchNovel();
  }, [id, params?.slug]);

  useEffect(() => {
    if (!id) return;
    const fetchChapters = async () => {
      try {
        const res = await novels.chapters(id, { page: chapterPage, limit: 50 });
        setChapters(res.data);
        setTotalChapters(res.total);
      } catch {
        const total = novel?.Chapters || 100;
        setTotalChapters(total);
        const start = (chapterPage - 1) * 50;
        const end = Math.min(start + 50, total);
        const items: Chapter[] = [];
        for (let i = start + 1; i <= end; i++) {
          items.push({
            ID: i,
            NovelID: parseInt(id),
            Number: i,
            Title: `Chapter ${i}`,
            IsLocked: i > total / 2,
            TicketCost: i > total / 2 ? 10 : 0,
          });
        }
        setChapters(items);
      }
    };
    fetchChapters();
  }, [id, chapterPage, novel?.Chapters]);

  if (loading || !novel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#1e1e3a] rounded w-1/2 mx-auto" />
          <div className="h-4 bg-[#1e1e3a] rounded w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  const firstChapter = chapters.length > 0 ? chapters[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/en/novel-list" className="hover:text-violet-400 transition-colors">Novels</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{novel.Title.slice(0, 60)}</span>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {/* Cover */}
        <div className="w-48 sm:w-56 aspect-[3/4] rounded-xl bg-[#1e1e3a] border border-[#2a2a4a] flex-shrink-0 flex items-center justify-center overflow-hidden mx-auto sm:mx-0">
          {novel.CoverURL ? (
            <img src={novel.CoverURL} alt="" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{novel.Title}</h1>
          {novel.AltTitle && (
            <p className="text-sm text-gray-500 mt-1">{novel.AltTitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              novel.Status === "ongoing" ? "bg-green-900/40 text-green-400 border border-green-800/30" : "bg-blue-900/40 text-blue-400 border border-blue-800/30"
            }`}>
              {novel.Status.charAt(0).toUpperCase() + novel.Status.slice(1)}
            </span>
            <span className="text-gray-400">{novel.Views.toLocaleString()} Views</span>
            <span className="text-gray-400">{novel.Chapters} Chapters</span>
            <span className="text-gray-400">{novel.Readers} Readers</span>
            <span className="text-gray-400">{novel.Chars}</span>
            {novel.Rating > 0 && (
              <span className="text-yellow-400">★ {novel.Rating.toFixed(1)} ({novel.RatingCount})</span>
            )}
          </div>

          {/* AI Progress */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <span>AI-Unlock Progress</span>
              <span className="text-violet-400">{novel.AIPercent}</span>
            </div>
            <div className="w-full max-w-xs h-2 bg-[#1e1e3a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"
                style={{ width: novel.AIPercent }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {novel.Genres.map((g) => (
              <Link
                key={g.ID}
                href={`/en/novel-list?genre=${g.Slug}`}
                className="text-xs px-2.5 py-1 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800/30 hover:bg-violet-800/50 transition-colors"
              >
                {g.Name}
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {firstChapter && (
              <Link
                href={`/en/novel/${novel.ID}/${novel.Slug}/chapter-${firstChapter.Number}`}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Start Reading
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e1e3a] mb-6">
        <div className="flex gap-6">
          {(["about", "toc", "reviews", "recommendations"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-violet-400 border-violet-500"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              {tab === "about" ? "Novel Summary" : tab === "toc" ? "Table of Contents" : tab === "reviews" ? "Reviews" : "Recommendations"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "about" && (
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{novel.Description}</p>

          {/* Details */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Author</span>
              <p className="text-gray-200">{novel.Author}</p>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p className="text-gray-200 capitalize">{novel.Status}</p>
            </div>
            <div>
              <span className="text-gray-500">Date Added</span>
              <p className="text-gray-200">July 3, 2026</p>
            </div>
            <div>
              <span className="text-gray-500">Requested</span>
              <p className="text-gray-200">{novel.RequestedBy || "-"}</p>
            </div>
            <div>
              <span className="text-gray-500">Released</span>
              <p className="text-gray-200">{novel.ReleasedBy || "-"}</p>
            </div>
            <div>
              <span className="text-gray-500">Total Chapters</span>
              <p className="text-gray-200">{novel.Chapters}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "toc" && (
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-4">
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {chapters.map((ch) => (
              <Link
                key={ch.ID}
                href={`/en/novel/${novel.ID}/${novel.Slug}/chapter-${ch.Number}`}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-[#1e1e3a] transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm text-gray-500 w-8 flex-shrink-0">#{ch.Number}</span>
                  <span className="text-sm text-gray-200 group-hover:text-violet-400 transition-colors line-clamp-1">
                    {ch.Title || `Chapter ${ch.Number}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {ch.IsLocked && (
                    <span className="text-xs text-yellow-500 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      {ch.TicketCost}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Chapter pagination */}
          {totalChapters > 50 && (
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#1e1e3a]">
              <button
                onClick={() => setChapterPage(Math.max(1, chapterPage - 1))}
                disabled={chapterPage <= 1}
                className="px-3 py-1 text-xs rounded bg-[#1e1e3a] text-gray-400 hover:text-white disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <span className="text-xs text-gray-500">
                {chapterPage} / {Math.ceil(totalChapters / 50)}
              </span>
              <button
                onClick={() => setChapterPage(Math.min(Math.ceil(totalChapters / 50), chapterPage + 1))}
                disabled={chapterPage >= Math.ceil(totalChapters / 50)}
                className="px-3 py-1 text-xs rounded bg-[#1e1e3a] text-gray-400 hover:text-white disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6 text-center text-sm text-gray-500">
          No reviews yet. Be the first to review!
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6 text-center text-sm text-gray-500">
          No recommendations available.
        </div>
      )}
    </div>
  );
}
