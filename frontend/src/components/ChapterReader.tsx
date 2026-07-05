"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ChapterData {
  number: number;
  title: string;
  content: string;
  isLocked?: boolean;
  createdAt?: string;
}

interface NovelData {
  id: number;
  slug: string;
  title: string;
  coverUrl?: string;
  totalChapters: number;
  category?: string;
}

interface ChapterReaderProps {
  chapter: ChapterData | null;
  novel: NovelData | null;
  chapters?: { number: number; title: string; createdAt?: string }[];
  loading: boolean;
  error?: string;
  prevHref?: string;
  nextHref?: string;
  novelHref: string;
  onAddToLibrary?: () => void;
  inLibrary?: boolean;
}

type FontFamily = "sans" | "serif" | "mono";

const readerBgOptions = [
  { key: "white", bg: "#ffffff", text: "#374151", label: "White" },
  { key: "cream", bg: "#fbf0d9", text: "#5b4636", label: "Cream" },
  { key: "brown", bg: "#f5e6c8", text: "#5b4636", label: "Light Brown" },
  { key: "blue", bg: "#e8f4fd", text: "#1e3a5f", label: "Blue" },
  { key: "pink", bg: "#fde8ef", text: "#5f3e4e", label: "Pink" },
  { key: "green", bg: "#e8f5e9", text: "#2e4a3a", label: "Green" },
];

const siteThemes: Record<string, { bg: string; text: string; card: string; border: string; muted: string }> = {
  dark: { bg: "#0a0a1a", text: "#d1d5db", card: "#12122a", border: "#1e1e3a", muted: "#6b7280" },
  light: { bg: "#f3f4f6", text: "#374151", card: "#ffffff", border: "#e5e7eb", muted: "#9ca3af" },
};

const fontClasses: Record<FontFamily, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

const navItems = [
  { key: "read", label: "Read", icon: "M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" },
  { key: "display", label: "Display", icon: "M12 4v16M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M9 20h6" },
  { key: "speech", label: "Speech", icon: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" },
  { key: "settings", label: "Settings", icon: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6" },
  { key: "more", label: "More", icon: "M4 5h16M4 12h16M4 19h16" },
];

export default function ChapterReader({ chapter, novel, chapters, loading, error, prevHref, nextHref, novelHref, onAddToLibrary, inLibrary }: ChapterReaderProps) {
  const [activeTab, setActiveTab] = useState("read");
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.7);
  const [fontFamily, setFontFamily] = useState<FontFamily>("sans");
  const [readerBgKey, setReaderBgKey] = useState("cream");
  const [siteThemeKey, setSiteThemeKey] = useState("dark");
  const [translationMode, setTranslationMode] = useState("web");
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("auto");
  const [translationProvider, setTranslationProvider] = useState("google");
  const [showToc, setShowToc] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const readerBg = readerBgOptions.find((o) => o.key === readerBgKey) || readerBgOptions[0];
  const siteTheme = siteThemes[siteThemeKey];
  const textColor = readerBg.text;
  const bgColor = readerBg.bg;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setShowToc(false);
  }, [chapter?.number]);

  useEffect(() => {
    if (!isSpeaking) return;
    const utterance = new SpeechSynthesisUtterance(chapter?.content || "");
    utterance.rate = speechSpeed;
    utterance.lang = language === "auto" ? "en-US" : language;
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => setIsSpeaking(false);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isSpeaking, chapter?.content, speechSpeed, language]);

  const toggleSpeech = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
    }
  }, [isSpeaking]);

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

  const renderPanel = () => {
    switch (activeTab) {
      case "display":
        return (
          <div className="border-t" style={{ borderColor: siteTheme.border, backgroundColor: siteTheme.bg }}>
            <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Font Size</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border" style={{ borderColor: siteTheme.border, color: siteTheme.text }} disabled={fontSize <= 12}>A-</button>
                  <span className="text-sm w-8 text-center" style={{ color: siteTheme.text }}>{fontSize}</span>
                  <button onClick={() => setFontSize(Math.min(32, fontSize + 1))} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border" style={{ borderColor: siteTheme.border, color: siteTheme.text }} disabled={fontSize >= 32}>A+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Line Height</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setLineHeight(Math.max(1.0, +(lineHeight - 0.1).toFixed(1)))} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border" style={{ borderColor: siteTheme.border, color: siteTheme.text }} disabled={lineHeight <= 1.0}>-</button>
                  <span className="text-sm w-10 text-center" style={{ color: siteTheme.text }}>{lineHeight}</span>
                  <button onClick={() => setLineHeight(Math.min(3.0, +(lineHeight + 0.1).toFixed(1)))} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors border" style={{ borderColor: siteTheme.border, color: siteTheme.text }} disabled={lineHeight >= 3.0}>+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Font</span>
                <div className="flex gap-2">
                  {(["sans", "serif", "mono"] as FontFamily[]).map((f) => (
                    <button key={f} onClick={() => setFontFamily(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border" style={{ borderColor: fontFamily === f ? "#2193b0" : siteTheme.border, backgroundColor: fontFamily === f ? "#2193b0/10" : "transparent", color: fontFamily === f ? "#6dd5ed" : siteTheme.text }}>{f === "sans" ? "Sans" : f === "serif" ? "Serif" : "Mono"}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "speech":
        return (
          <div className="border-t" style={{ borderColor: siteTheme.border, backgroundColor: siteTheme.bg }}>
            <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Text-to-Speech</span>
                <button onClick={toggleSpeech} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: isSpeaking ? "#ef4444" : "#2193b0", color: "#ffffff" }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    {isSpeaking ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M5 3l14 9-14 9z" />}
                  </svg>
                  {isSpeaking ? "Stop" : "Play"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Speed: {speechSpeed.toFixed(1)}x</span>
                <input type="range" min="0.5" max="2.0" step="0.1" value={speechSpeed} onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))} className="w-40 accent-[#2193b0]" />
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="border-t" style={{ borderColor: siteTheme.border, backgroundColor: siteTheme.bg }}>
            <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Translation Service</span>
                <div className="flex gap-1 rounded-lg overflow-hidden border" style={{ borderColor: siteTheme.border }}>
                  {["web", "web+", "ai"].map((mode) => (
                    <button key={mode} onClick={() => setTranslationMode(mode)} className="px-3 py-1.5 text-xs font-medium transition-colors" style={{ backgroundColor: translationMode === mode ? "#2193b0" : "transparent", color: translationMode === mode ? "#ffffff" : siteTheme.muted }}>{mode === "web" ? "Web" : mode === "web+" ? "Web+" : "AI"}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Reader Language</span>
                <div className="flex gap-2">
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs rounded-lg px-2 py-1.5 border bg-transparent" style={{ borderColor: siteTheme.border, color: siteTheme.text }}>
                    <option value="auto">Auto Detect</option>
                    <option value="en-US">English</option>
                    <option value="id-ID">Indonesian</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="ko-KR">Korean</option>
                    <option value="zh-CN">Chinese</option>
                  </select>
                  <select value={translationProvider} onChange={(e) => setTranslationProvider(e.target.value)} className="text-xs rounded-lg px-2 py-1.5 border bg-transparent" style={{ borderColor: siteTheme.border, color: siteTheme.text }}>
                    <option value="google">Google</option>
                    <option value="deepl">DeepL</option>
                    <option value="microsoft">Microsoft</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Site Theme</span>
                <div className="flex gap-2">
                  {["dark", "light"].map((t) => (
                    <button key={t} onClick={() => setSiteThemeKey(t)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize" style={{ borderColor: siteThemeKey === t ? "#2193b0" : siteTheme.border, color: siteThemeKey === t ? "#6dd5ed" : siteTheme.text }}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: siteTheme.muted }}>Reader Theme</span>
                <div className="flex gap-2">
                  {readerBgOptions.map((opt) => (
                    <button key={opt.key} onClick={() => setReaderBgKey(opt.key)} className="w-7 h-7 rounded-full border-2 transition-all" style={{ backgroundColor: opt.bg, borderColor: readerBgKey === opt.key ? "#2193b0" : "transparent" }} title={opt.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "more":
        return (
          <div className="border-t" style={{ borderColor: siteTheme.border, backgroundColor: siteTheme.bg }}>
            <div className="mx-auto max-w-3xl px-4 py-4 space-y-3">
              {[
                { key: "raw", label: "Raw (Original Source)", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
                { key: "report", label: "Report Issue", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" },
                { key: "recrawl", label: "Recrawl (needs login)", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
                { key: "retranslate", label: "Re-translate (needs login)", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
                { key: "batch", label: "Batch Re-translate (needs login)", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
              ].map((item) => (
                <button key={item.key} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-[#1e1e3a]" style={{ color: siteTheme.text }}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors" style={{ backgroundColor: siteTheme.bg, color: siteTheme.text }}>
      {/* Top bar: novel title */}
      <div className="sticky top-0 z-30" style={{ backgroundColor: siteTheme.card, borderBottom: `1px solid ${siteTheme.border}` }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={novelHref} className="text-sm font-semibold truncate hover:text-[#2193b0] transition-colors" style={{ color: siteTheme.text }}>
            {novel.title}
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowToc(!showToc)} className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: siteTheme.border, color: siteTheme.text }}>
              Contents
            </button>
          </div>
        </div>
      </div>

      {/* Top navigation: prev/next + progress */}
      <div style={{ backgroundColor: siteTheme.card, borderBottom: `1px solid ${siteTheme.border}` }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {prevHref ? (
              <Link href={prevHref} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: siteTheme.border, color: siteTheme.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Prev
              </Link>
            ) : (
              <div className="px-4 py-2 opacity-40" />
            )}
            <div className="text-center">
              <p className="font-semibold text-sm">Ch. {chapter.number} / {novel.totalChapters}</p>
              <p className="text-xs" style={{ color: siteTheme.muted }}>{progress}%</p>
            </div>
            {nextHref ? (
              <Link href={nextHref} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: siteTheme.border, color: siteTheme.text }}>
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <div className="px-4 py-2 opacity-40" />
            )}
          </div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: siteTheme.border }}>
            <div className="h-full rounded-full bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Translation mode bar */}
      <div style={{ backgroundColor: siteTheme.card, borderBottom: `1px solid ${siteTheme.border}` }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="grid grid-cols-3 rounded-lg overflow-hidden border" style={{ borderColor: siteTheme.border }}>
            {["web", "web+", "ai"].map((mode) => (
              <button key={mode} onClick={() => setTranslationMode(mode)} className="px-4 py-2.5 text-sm font-medium transition-colors border-r last:border-r-0" style={{ backgroundColor: translationMode === mode ? "#2193b0" : "transparent", color: translationMode === mode ? "#ffffff" : siteTheme.muted, borderColor: siteTheme.border }}>
                {mode === "web" ? "Web" : mode === "web+" ? "Web+" : "AI"}
              </button>
            ))}
          </div>
          {translationMode === "ai" && (
            <div className="mt-2 p-3 rounded-lg text-xs" style={{ backgroundColor: "#1e1e3a", color: "#fbbf24", border: "1px solid #3a3a5a" }}>
              <strong>AI Translation:</strong> Guests can preview the first 10 chapters for free. After that, please register a free account or use another translation service (Web/Web+).
            </div>
          )}
        </div>
      </div>

      {/* Main content area: reader + optional TOC sidebar */}
      <div className="flex max-w-5xl mx-auto relative">
        {/* TOC sidebar */}
        {showToc && chapters && chapters.length > 0 && (
          <div className="hidden md:block w-64 shrink-0 border-r overflow-y-auto" style={{ borderColor: siteTheme.border, backgroundColor: siteTheme.card, maxHeight: "calc(100vh - 200px)", position: "sticky", top: "120px" }}>
            <div className="p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: siteTheme.muted }}>Table of Contents</h3>
              <div className="space-y-0.5">
                {chapters.map((ch) => (
                  <Link key={ch.number} href={`/en/novel/${novel.id}/${novel.slug}/chapter-${ch.number}`} className="flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors hover:bg-[#1e1e3a]" style={{ color: ch.number === chapter.number ? "#6dd5ed" : siteTheme.text, backgroundColor: ch.number === chapter.number ? "#1e1e3a" : "transparent" }}>
                    <span className="truncate">Ch. {ch.number}{ch.title ? ` - ${ch.title}` : ""}</span>
                    {ch.createdAt && <span className="text-[10px] shrink-0 ml-2" style={{ color: siteTheme.muted }}>{new Date(ch.createdAt).toLocaleDateString()}</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOC mobile drawer */}
        {showToc && chapters && chapters.length > 0 && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setShowToc(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto" style={{ backgroundColor: siteTheme.card }} onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold" style={{ color: siteTheme.text }}>Table of Contents</h3>
                  <button onClick={() => setShowToc(false)} className="text-xs" style={{ color: siteTheme.muted }}>Close</button>
                </div>
                <div className="space-y-0.5">
                  {chapters.map((ch) => (
                    <Link key={ch.number} href={`/en/novel/${novel.id}/${novel.slug}/chapter-${ch.number}`} onClick={() => setShowToc(false)} className="flex items-center justify-between px-2 py-2 rounded text-xs transition-colors hover:bg-[#1e1e3a]" style={{ color: ch.number === chapter.number ? "#6dd5ed" : siteTheme.text, backgroundColor: ch.number === chapter.number ? "#1e1e3a" : "transparent" }}>
                      <span className="truncate">Ch. {ch.number}{ch.title ? ` - ${ch.title}` : ""}</span>
                      {ch.createdAt && <span className="text-[10px] shrink-0 ml-2" style={{ color: siteTheme.muted }}>{new Date(ch.createdAt).toLocaleDateString()}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reader content */}
        <main ref={contentRef} className="flex-1 pb-36 transition-colors min-w-0">
          <article className="max-w-3xl mx-auto px-4 py-8">
            <header className="mb-6">
              <Link href={novelHref} className="text-xs font-medium transition-colors hover:text-[#2193b0]" style={{ color: siteTheme.muted }}>
                {novel.title}
              </Link>
              <h2 className="flex flex-wrap items-baseline gap-x-3 text-2xl font-bold leading-tight mt-1" style={{ color: textColor }}>
                <span>#{chapter.number}</span>
                {chapter.title && <span className="font-normal">{chapter.title}</span>}
              </h2>
              <div className="mt-4 h-px w-full opacity-15" style={{ backgroundColor: textColor }} />
            </header>

            <div className={`leading-relaxed space-y-5 ${fontClasses[fontFamily]}`} style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}`, color: textColor, backgroundColor: bgColor, padding: "1rem", borderRadius: "0.5rem" }}>
              {chapter.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-justify">{para}</p>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href={novelHref} className="text-sm transition-colors hover:text-[#2193b0]" style={{ color: siteTheme.muted }}>
                ← Back to Table of Contents
              </Link>
            </div>
          </article>
        </main>
      </div>

      {/* Bottom navigation bar */}
      <div className="fixed inset-x-0 bottom-0 z-40" style={{ backgroundColor: siteTheme.card, borderTop: `1px solid ${siteTheme.border}` }}>
        <nav>
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-5">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    if (item.key === "read") {
                      contentRef.current?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex flex-col items-center gap-1 py-2.5 text-xs transition-colors hover:text-[#2193b0]"
                  style={{ color: activeTab === item.key ? "#2193b0" : siteTheme.muted }}
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

        {/* Panel content based on active tab */}
        {activeTab !== "read" && renderPanel()}
      </div>

      {/* Floating additional panel buttons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2">
        <button onClick={() => setShowToc(!showToc)} className="w-10 h-10 rounded-full flex items-center justify-center border text-xs transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: siteTheme.border, color: siteTheme.text, backgroundColor: siteTheme.card }} title="Table of Contents">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {novel.coverUrl && (
          <div className="w-24 rounded-lg overflow-hidden border shadow-lg" style={{ borderColor: siteTheme.border }}>
            <div className="aspect-[3/4] bg-[#1e1e3a] flex items-center justify-center text-gray-600 text-xs">
              {novel.coverUrl ? (
                <img src={novel.coverUrl} alt={novel.title} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              )}
            </div>
            <div className="p-2" style={{ backgroundColor: siteTheme.card }}>
              <p className="text-[10px] font-medium truncate" style={{ color: siteTheme.text }}>{novel.title}</p>
              {novel.category && <p className="text-[9px]" style={{ color: siteTheme.muted }}>{novel.category}</p>}
            </div>
          </div>
        )}
        <button className="w-full px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-[#1e1e3a]" style={{ borderColor: siteTheme.border, color: siteTheme.text, backgroundColor: siteTheme.card }} title="Edit Terms">
          Edit Terms
        </button>
        <button
          onClick={onAddToLibrary}
          className="w-full px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-[#1e1e3a]"
          style={{ borderColor: inLibrary ? "#10b981" : siteTheme.border, color: inLibrary ? "#10b981" : siteTheme.text, backgroundColor: siteTheme.card }}
          title={inLibrary ? "In Library" : "Add to Library"}
        >
          {inLibrary ? "In Library" : "+ Library"}
        </button>
      </div>
    </div>
  );
}
