"use client";

import { useState } from "react";
import Link from "next/link";

interface VotableNovel {
  id: number;
  title: string;
  slug: string;
  votes: number;
  voted: boolean;
}

const mockNovels: VotableNovel[] = [
  { id: 1, title: "Having Dinner with His Brother", slug: "having-dinner", votes: 234, voted: false },
  { id: 2, title: "Corpse Puppet Phoenix Girl", slug: "corpse-puppet", votes: 567, voted: false },
  { id: 3, title: "I am the Crown Prince of the Ming Dynasty", slug: "crown-prince", votes: 1234, voted: true },
  { id: 4, title: "Naruto: In Konoha Village, I Awakened Wood Release", slug: "naruto-konoha-wood", votes: 3456, voted: false },
  { id: 5, title: "Could I Really End Up 'collapsing My Image'", slug: "rule-horror", votes: 89, voted: false },
];

export default function VoteSeriePage() {
  const [novels, setNovels] = useState(mockNovels);

  const toggleVote = (id: number) => {
    setNovels((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, voted: !n.voted, votes: n.votes + (n.voted ? -1 : 1) } : n
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-2">Vote Novels</h1>
      <p className="text-sm text-gray-500 mb-6">
        Vote for the novels you want to see prioritized. The most voted novels get translated faster.
      </p>

      <div className="space-y-3">
        {novels.map((novel) => (
          <div
            key={novel.id}
            className="flex items-center gap-4 p-4 bg-[#12122a] border border-[#1e1e3a] rounded-xl"
          >
            <div className="w-12 h-16 rounded-lg bg-[#1e1e3a] flex-shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/en/novel/${novel.id}/${novel.slug}`} className="text-sm text-gray-200 hover:text-violet-400 transition-colors font-medium">
                {novel.title}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">{novel.votes} votes</p>
            </div>
            <button
              onClick={() => toggleVote(novel.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                novel.voted
                  ? "bg-violet-600 text-white"
                  : "bg-[#1e1e3a] text-gray-400 hover:text-white hover:bg-[#2a2a4a]"
              }`}
            >
              {novel.voted ? "Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
