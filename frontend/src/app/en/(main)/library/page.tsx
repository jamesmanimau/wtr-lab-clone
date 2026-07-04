"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { library, auth } from "@/lib/api";

type Tab = "updates" | "history" | "folders";

interface FollowItem { title: string; href: string; chapters: number; newChapters?: number; }
interface HistoryItem { title: string; chapter: string; novelHref: string; chapterHref: string; time: string; }

const MOCK_FOLLOWS: FollowItem[] = [
  { title: "Naruto: In Konoha Village, I Awakened Wood Release", href: "/en/novel/11/naruto-konoha-wood", chapters: 1002, newChapters: 3 },
  { title: "Could I Really End Up 'collapsing My Image'", href: "/en/novel/8/rule-horror", chapters: 925, newChapters: 1 },
  { title: "Don't Be Too Wild", href: "/en/novel/10/dont-be-too-wild", chapters: 160, newChapters: 2 },
];

const MOCK_HISTORY: HistoryItem[] = [
  { title: "Having Dinner with His Brother", chapter: "Chapter 135", novelHref: "/en/novel/1/having-dinner", chapterHref: "/en/novel/1/having-dinner/chapter-135", time: "2 hours ago" },
  { title: "Corpse Puppet Phoenix Girl", chapter: "Chapter 242", novelHref: "/en/novel/2/corpse-puppet", chapterHref: "/en/novel/2/corpse-puppet/chapter-242", time: "5 hours ago" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("updates");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    auth.me().then(() => setLoggedIn(true)).catch(() => {}).finally(() => setChecking(false));
  }, []);

  if (checking) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-gray-500">Checking...</div>;

  if (!loggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-10 max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-lg font-semibold text-white mb-2">Login Required</h2>
          <p className="text-sm text-gray-500 mb-6">You need to login to use Library features.</p>
          <Link href="/en/login" className="inline-block px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Library</h1>
      <div className="flex gap-4 border-b border-[#1e1e3a] mb-6">
        {(["updates", "history", "folders"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab ? "text-violet-400 border-violet-500" : "text-gray-500 border-transparent hover:text-gray-300"
            }`}>{tab === "updates" ? "🔥 Updates" : tab === "history" ? "History" : "Followed Folders"}</button>
        ))}
      </div>

      {activeTab === "updates" && MOCK_FOLLOWS.map((novel, i) => (
        <Link key={i} href={novel.href} className="flex items-center gap-4 p-4 mb-3 bg-[#12122a] border border-[#1e1e3a] rounded-xl hover:border-violet-800/40 transition-colors group">
          <div className="w-14 h-20 rounded-lg bg-[#1e1e3a] flex-shrink-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-200 group-hover:text-violet-400 transition-colors font-medium">{novel.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{novel.chapters} chapters</p>
          </div>
          {novel.newChapters && <span className="text-xs px-2 py-1 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800/30">+{novel.newChapters} new</span>}
        </Link>
      ))}

      {activeTab === "history" && MOCK_HISTORY.map((item, i) => (
        <Link key={i} href={item.chapterHref} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#12122a] transition-colors group">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-200 group-hover:text-violet-400 transition-colors">{item.title}</p>
            <p className="text-xs text-violet-400 mt-0.5">{item.chapter}</p>
          </div>
          <span className="text-xs text-gray-600 shrink-0 ml-4">{item.time}</span>
        </Link>
      ))}

      {activeTab === "folders" && (
        <div className="text-center py-8 text-sm text-gray-500">No folders yet. Follow novels to create folders.</div>
      )}
    </div>
  );
}
