"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { browseLinks, discoverLinks, communityLinks, adminLinks } from "@/lib/navigation";
import { SearchIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
            ? "text-accent-light bg-accent/10"
            : "text-gray-300 hover:text-white hover:bg-card-hover"
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
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent shrink-0"
          >
            WTR-LAB
          </Link>

          {/* Tablet nav (md-lg) */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            <Link
              href="/en/novel-finder"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/novel-finder") ? "text-accent-light bg-accent/10" : "text-gray-300 hover:text-white hover:bg-card-hover"
              }`}
            >
              Finder
            </Link>
            <Link
              href="/en/novel-list"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/novel-list") ? "text-accent-light bg-accent/10" : "text-gray-300 hover:text-white hover:bg-card-hover"
              }`}
            >
              Novels
            </Link>
            <Link
              href="/en/ranking/daily"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/ranking") ? "text-accent-light bg-accent/10" : "text-gray-300 hover:text-white hover:bg-card-hover"
              }`}
            >
              Ranking
            </Link>
            <Link
              href="/en/leaderboard"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/leaderboard") ? "text-accent-light bg-accent/10" : "text-gray-300 hover:text-white hover:bg-card-hover"
              }`}
            >
              Top
            </Link>
            <Link
              href="/en/library"
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                isActive("/en/library") ? "text-accent-light bg-accent/10" : "text-gray-300 hover:text-white hover:bg-card-hover"
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
                    ? "text-accent-light bg-accent/10"
                    : "text-gray-400 hover:text-accent-light hover:bg-card-hover"
                }`}
              >
                More
                <svg className={`w-3 h-3 transition-transform ${showMore ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMore && (
                <Card className="absolute top-full right-0 mt-1 w-44 p-2 shadow-xl z-50" padding={false}>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Discover</p>
                  {discoverLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowMore(false)}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "text-accent-light bg-accent/10"
                          : "text-gray-300 hover:text-white hover:bg-card-hover"
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
                          ? "text-accent-light bg-accent/10"
                          : "text-gray-300 hover:text-white hover:bg-card-hover"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Card>
              )}
            </div>
            {/* Admin dropdown */}
            <div ref={adminRef} className="relative">
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  isActive("/en/admin") ? "text-accent-light" : "text-gray-500 hover:text-accent-light"
                }`}
              >
                Admin
              </button>
              {showAdmin && (
                <Card className="absolute top-full right-0 mt-1 w-40 p-2 shadow-xl z-50" padding={false}>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowAdmin(false)}
                      className="block text-xs text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-card-hover transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </Card>
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
                    className="w-full bg-card-hover border border-line-light rounded-lg pl-4 pr-10 py-2 text-sm text-gray-200 outline-none focus:border-accent transition-colors"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-light transition-colors">
                    <SearchIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
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
              <SearchIcon className="w-5 h-5" />
            </button>

            <Button variant="primary" size="md" href="/en/login" className="hidden sm:inline-flex">
              Login
            </Button>

            {/* Hamburger */}
            <button
              className="md:hidden text-white p-2 hover:bg-card-hover rounded-lg transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
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
                  className="w-full bg-card-hover border border-line-light rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-200 outline-none focus:border-accent transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-light transition-colors">
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-card overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Browse</p>
            {browseLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-accent-light bg-accent/10"
                    : "text-gray-300 hover:text-white hover:bg-card-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-line">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Discover</p>
              {discoverLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-accent-light bg-accent/10"
                      : "text-gray-300 hover:text-white hover:bg-card-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-line">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Community</p>
              {communityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-accent-light bg-accent/10"
                      : "text-gray-300 hover:text-white hover:bg-card-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-line">
              <p className="text-[10px] uppercase tracking-wider text-gray-600 px-3 pb-1 font-semibold">Admin</p>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-accent-light bg-accent/10"
                      : "text-gray-400 hover:text-white hover:bg-card-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-line px-3">
              <Button variant="primary" size="md" href="/en/login" className="w-full py-2.5">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
