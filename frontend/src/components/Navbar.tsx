"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const browseLinks = [
  { href: "/en/novel-finder", label: "Finder" },
  { href: "/en/novel-list", label: "Novels" },
  { href: "/en/ranking/daily", label: "Ranking" },
  { href: "/en/leaderboard", label: "Leaderboard" },
  { href: "/en/library", label: "Library" },
];

const discoverLinks = [
  { href: "/en/trending", label: "Trending" },
  { href: "/en/recommendation", label: "Recommendations" },
];

const communityLinks = [
  { href: "/en/news", label: "News" },
  { href: "/en/public-stats", label: "Stats" },
  { href: "/en/profile/request-serie", label: "Request Series" },
  { href: "/en/profile/vote-serie", label: "Vote Series" },
];

const adminLinks = [
  { href: "/en/admin/import", label: "Import" },
  { href: "/en/admin/requests", label: "Requests" },
  { href: "/en/admin/novels", label: "Manage" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
    setShowAdmin(false);
    setShowMore(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (adminRef.current && !adminRef.current.contains(target)) setShowAdmin(false);
      if (moreRef.current && !moreRef.current.contains(target)) setShowMore(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/en/novel-finder?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowSearch(false);
    }
  };

  const isActive = (href: string) => pathname?.startsWith(href) ?? false;

  const sectionLinks = (links: { href: string; label: string }[]) =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => { setOpen(false); setShowAdmin(false); setShowMore(false); }}
        className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
          isActive(link.href)
            ? "text-[#6dd5ed] bg-[#2193b0]/10"
            : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
        }`}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 nav-gradient lg:hidden shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/en"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] bg-clip-text text-transparent shrink-0"
          >
            WTR-LAB
          </Link>

          {/* Tablet nav (md-lg) */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            <Link
              href="/en/novel-finder"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/novel-finder") ? "text-[#6dd5ed] bg-[#2193b0]/10" : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
              }`}
            >
              Finder
            </Link>
            <Link
              href="/en/novel-list"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/novel-list") ? "text-[#6dd5ed] bg-[#2193b0]/10" : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
              }`}
            >
              Novels
            </Link>
            <Link
              href="/en/ranking/daily"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/ranking") ? "text-[#6dd5ed] bg-[#2193b0]/10" : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
              }`}
            >
              Ranking
            </Link>
            <Link
              href="/en/leaderboard"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/leaderboard") ? "text-[#6dd5ed] bg-[#2193b0]/10" : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
              }`}
            >
              Top
            </Link>
            <Link
              href="/en/library"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/library") ? "text-[#6dd5ed] bg-[#2193b0]/10" : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
              }`}
            >
              Library
            </Link>
            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className={`text-xs px-2 py-1.5 rounded-lg transition-colors flex items-center gap-0.5 ${
                  showMore
                    ? "text-[#6dd5ed] bg-[#2193b0]/10"
                    : "text-gray-400 hover:text-[#6dd5ed] hover:bg-[#1e1e3a]"
                }`}
              >
                More
                <svg className={`w-3 h-3 transition-transform ${showMore ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMore && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-[#12122a] border border-[#1e1e3a] rounded-xl p-2 shadow-xl z-50">
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Discover</p>
                  {discoverLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowMore(false)}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "text-[#6dd5ed] bg-[#2193b0]/10"
                          : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 pt-2 font-semibold">Community</p>
                  {communityLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowMore(false)}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "text-[#6dd5ed] bg-[#2193b0]/10"
                          : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Admin dropdown */}
            <div ref={adminRef} className="relative">
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  isActive("/en/admin") ? "text-[#6dd5ed]" : "text-gray-500 hover:text-[#6dd5ed]"
                }`}
              >
                Admin
              </button>
              {showAdmin && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-[#12122a] border border-[#1e1e3a] rounded-xl p-2 shadow-xl z-50">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowAdmin(false)}
                      className="block text-xs text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1e1e3a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Tablet search toggle */}
          <div className="hidden md:flex lg:hidden items-center">
            {showSearch ? (
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    ref={searchRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => { setTimeout(() => { if (!search) setShowSearch(false); }, 200); }}
                    placeholder="Search novels..."
                    className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg pl-4 pr-10 py-2 text-sm text-gray-200 outline-none focus:border-[#2193b0] transition-colors"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6dd5ed] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile search icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/en/login"
              className="hidden sm:inline-block text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg bg-[#2193b0] hover:bg-[#1a7a94] text-white transition-colors"
            >
              Login
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden text-white p-2 hover:bg-[#1e1e3a] rounded-lg transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search novels..."
                  className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-200 outline-none focus:border-[#2193b0] transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6dd5ed] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#12122a] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Browse</p>
            {browseLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-[#6dd5ed] bg-[#2193b0]/10"
                    : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-[#1e1e3a]">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Discover</p>
              {discoverLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-[#6dd5ed] bg-[#2193b0]/10"
                      : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-[#1e1e3a]">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Community</p>
              {communityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-[#6dd5ed] bg-[#2193b0]/10"
                      : "text-gray-300 hover:text-white hover:bg-[#1e1e3a]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-[#1e1e3a]">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Admin</p>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-[#6dd5ed] bg-[#2193b0]/10"
                      : "text-gray-400 hover:text-white hover:bg-[#1e1e3a]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-[#1e1e3a] px-3">
              <Link
                href="/en/login"
                onClick={() => setOpen(false)}
                className="block text-center text-sm px-4 py-2.5 rounded-lg bg-[#2193b0] hover:bg-[#1a7a94] text-white transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
