"use client";

import { useState } from "react";
import Link from "next/link";

interface ChapterData {
  number: number;
  title: string;
  content: string;
  isLocked?: boolean;
}

interface NovelData {
  id: number;
  slug: string;
  title: string;
  totalChapters: number;
}

interface ChapterReaderProps {
  chapter: ChapterData | null;
  novel: NovelData | null;
  loading: boolean;
  error?: string;
  prevHref?: string;
  nextHref?: string;
  novelHref: string;
}

type FontFamily = "sans" | "serif" | "mono";
type ReaderTheme = "dark" | "light" | "sepia";

const themeStyles: Record<ReaderTheme, { bg: string; text: string; card: string; border: string; muted: string }> = {
  dark: { bg: "#0a0a1a", text: "#d1d5db", card: "#12122a", border: "#1e1e3a", muted: "#6b7280" },
  light: { bg: "#ffffff", text: "#374151", card: "#f9fafb", border: "#e5e7eb", muted: "#9ca3af" },
  sepia: { bg: "#fbf0d9", text: "#5b4636", card: "#f5e6c8", border: "#e3d3ad", muted: "#8b7355" },
};

const fontClasses: Record<FontFamily, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

export default function ChapterReader({ chapter, novel, loading, error, prevHref, nextHref, novelHref }: ChapterReaderProps) {
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("sans");
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("dark");
  const [showDisplay, setShowDisplay] = useState(false);
  const [sourceTab, setSourceTab] = useState("web");

  if (loading || !chapter || !novel) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-[#1e1e3a] rounded w-2/3 mx-auto" />
          <div className="h-4 bg-[#1e1e3a] rounded w-1/3 mx-auto" />
          <div className="h-4 bg-[#1e1e3a] rounded w-1/4 mx-auto" />
          <div className="h-px bg-[#1e1e3a] my-8" />
          {[70, 85, 60, 90, 75, 65, 80, 55].map((w, i) => (
            <div key={i} className="h-3 bg-[#1e1e3a] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Failed to load chapter</h2>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        <Link href={novelHref} className="px-4 py-2 bg-[#2193b0] hover:bg-[#1a7a94] text-white text-sm rounded-lg transition-colors">
          Back to Novel
        </Link>
      </div>
    );
  }

  const progress = novel.totalChapters > 0 ? ((chapter.number / novel.totalChapters) * 100).toFixed(1) : "0";
  const theme = themeStyles[readerTheme];

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: "100vh" }}>
      <div className="sticky top-0 z-30" style={{ backgroundColor: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link href={novelHref} className="text-sm font-semibold truncate block hover:text-[#2193b0] transition-colors" style={{ color: theme.text }}>
            {novel.title}
          </Link>
        </div>
      </div>

      <div style={{ backgroundColor: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {prevHref ? (
              <Link href={prevHref} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: theme.border, color: theme.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </Link>
            ) : (
              <div className="px-4 py-2 opacity-40" />
            )}
            <div className="text-center">
              <p className="font-semibold text-sm">Ch. {chapter.number} / {novel.totalChapters}</p>
              <p className="text-xs" style={{ color: theme.muted }}>{progress}%</p>
            </div>
            {nextHref ? (
              <Link href={nextHref} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: theme.border, color: theme.text }}>
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="px-4 py-2 opacity-40" />
            )}
          </div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
            <div className="h-full rounded-full bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="grid grid-cols-3 rounded-lg overflow-hidden border" style={{ borderColor: theme.border }}>
            {[
              { key: "web", label: "Web" },
              { key: "web+", label: "Web+" },
              { key: "ai", label: "AI" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSourceTab(tab.key)}
                className="px-4 py-2.5 text-sm font-medium transition-colors border-r last:border-r-0"
                style={{
                  backgroundColor: sourceTab === tab.key ? "#2193b0" : "transparent",
                  color: sourceTab === tab.key ? "#ffffff" : theme.muted,
                  borderColor: theme.border,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="pb-36 transition-colors" style={{ backgroundColor: theme.bg }}>
        <article className="max-w-3xl mx-auto px-4 py-8">
          <header className="mb-6">
            <h2 className="flex flex-wrap items-baseline gap-x-3 text-2xl font-bold leading-tight" style={{ color: theme.text }}>
              <span># {chapter.number}</span>
              {chapter.title && <span className="font-normal">{chapter.title}</span>}
            </h2>
            <div className="mt-4 h-px w-full opacity-15" style={{ backgroundColor: theme.text }} />
          </header>

          <div
            className={`leading-relaxed space-y-5 ${fontClasses[fontFamily]}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.9" }}
          >
            {chapter.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-justify">{para}</p>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={novelHref} className="text-sm transition-colors hover:text-[#2193b0]" style={{ color: theme.muted }}>
              ← Back to Table of Contents
            </Link>
          </div>
        </article>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40" style={{ backgroundColor: theme.card, borderTop: `1px solid ${theme.border}` }}>
        <nav>
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-5">
              {[
                { key: "read", label: "Read", icon: "M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" },
                { key: "display", label: "Display", icon: "M12 4v16M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M9 20h6" },
                { key: "speech", label: "Speech", icon: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" },
                { key: "settings", label: "Settings", icon: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6" },
                { key: "more", label: "More", icon: "M4 5h16M4 12h16M4 19h16" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (item.key === "display") setShowDisplay(!showDisplay);
                    else if (item.key !== "read") setShowDisplay(false);
                  }}
                  className="flex flex-col items-center gap-1 py-2.5 text-xs transition-colors hover:text-[#2193b0]"
                  style={{ color: showDisplay && item.key === "display" ? "#2193b0" : theme.muted }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {showDisplay && (
          <div className="border-t" style={{ borderColor: theme.border, backgroundColor: theme.bg }}>
            <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: theme.muted }}>Font Size</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border"
                    style={{ borderColor: theme.border, color: theme.text }}
                    disabled={fontSize <= 14}
                  >
                    A-
                  </button>
                  <span className="text-sm w-8 text-center" style={{ color: theme.text }}>{fontSize}</span>
                  <button
                    onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border"
                    style={{ borderColor: theme.border, color: theme.text }}
                    disabled={fontSize >= 28}
                  >
                    A+
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: theme.muted }}>Font</span>
                <div className="flex gap-2">
                  {(["sans", "serif", "mono"] as FontFamily[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFontFamily(f)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
                      style={{
                        borderColor: fontFamily === f ? "#2193b0" : theme.border,
                        backgroundColor: fontFamily === f ? "#2193b0/10" : "transparent",
                        color: fontFamily === f ? "#6dd5ed" : theme.text,
                      }}
                    >
                      {f === "sans" ? "Sans" : f === "serif" ? "Serif" : "Mono"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: theme.muted }}>Theme</span>
                <div className="flex gap-2">
                  {(["dark", "light", "sepia"] as ReaderTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setReaderTheme(t)}
                      className="w-8 h-8 rounded-lg transition-colors border"
                      style={{
                        backgroundColor: t === "dark" ? "#0a0a1a" : t === "light" ? "#ffffff" : "#fbf0d9",
                        borderColor: readerTheme === t ? "#2193b0" : theme.border,
                      }}
                      title={t.charAt(0).toUpperCase() + t.slice(1)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
