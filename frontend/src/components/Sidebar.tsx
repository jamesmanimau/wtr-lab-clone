"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    title: "Browse",
    links: [
      { href: "/en/novel-finder", label: "Finder" },
      { href: "/en/novel-list", label: "Novels" },
      { href: "/en/ranking/daily", label: "Ranking" },
      { href: "/en/leaderboard", label: "Leaderboard" },
      { href: "/en/library", label: "Library" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/en/trending", label: "Trending" },
      { href: "/en/recommendation", label: "Recommendations" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/en/news", label: "News" },
      { href: "/en/public-stats", label: "Stats" },
      { href: "/en/profile/request-serie", label: "Request Series" },
      { href: "/en/profile/vote-serie", label: "Vote Series" },
    ],
  },
  {
    title: "Admin",
    links: [
      { href: "/en/admin/import", label: "Import" },
      { href: "/en/admin/requests", label: "Requests" },
      { href: "/en/admin/novels", label: "Manage" },
    ],
  },
];

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname?.startsWith(href) ?? false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/en/novel-finder?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-[#12122a] border-r border-[#1e1e3a] z-50 shadow-2xl shadow-black/50">
      <div className="px-6 pt-6 pb-4">
        <Link
          href="/en"
          className="text-2xl font-bold bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] bg-clip-text text-transparent"
        >
          WTR-LAB
        </Link>
      </div>

      <form onSubmit={handleSearch} className="px-4 pb-4">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search novels..."
            className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg pl-4 pr-10 py-2 text-sm text-gray-200 outline-none focus:border-[#2193b0] transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6dd5ed] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">
              {section.title}
            </p>
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-[#6dd5ed] bg-[#2193b0]/10"
                    : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="px-4 pb-6 pt-4 border-t border-[#1e1e3a]">
        <Link
          href="/en/login"
          className="block text-center text-sm px-4 py-2.5 rounded-lg bg-[#2193b0] hover:bg-[#1a7a94] text-white transition-colors"
        >
          Login
        </Link>
      </div>
    </aside>
  );
}
