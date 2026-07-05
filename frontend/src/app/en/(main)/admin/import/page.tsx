"use client";

import { useState } from "react";
import { importer } from "@/lib/api";
import Card from "@/components/ui/Card";

export default function AdminImportPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; title: string; url: string; image: string }[]>([]);
  const [searching, setSearching] = useState(false);
  const [importing, setImporting] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<{ id: number; title: string } | null>(null);
  const [error, setError] = useState("");
  const [withChapters, setWithChapters] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setError("");
    setImportResult(null);
    try {
      const res = await importer.search(query.trim());
      setResults(res.data || []);
    } catch {
      setError("Search failed. Consumet API may be unavailable.");
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  async function handleImport(sourceID: string) {
    setImporting(sourceID);
    setError("");
    setImportResult(null);
    try {
      const res = await importer.import(sourceID, withChapters);
      setImportResult({ id: res.data.ID, title: res.data.Title });
    } catch (e: any) {
      setError(e.message || "Import failed.");
    } finally {
      setImporting(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-2">Import Novel</h1>
      <p className="text-sm text-gray-500 mb-6">
        Search and import novels from NovelUpdates via the free Consumet API.
      </p>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search novel name..."
            className="w-full bg-card-hover border border-line-light rounded-xl pl-4 pr-12 py-3 text-sm text-gray-200 outline-none focus:border-accent"
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <input
          type="checkbox"
          checked={withChapters}
          onChange={(e) => setWithChapters(e.target.checked)}
          className="h-4 w-4 rounded border-line-light accent-accent"
        />
        Also import chapter list
      </label>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-900/50 text-sm text-red-400">
          {error}
        </div>
      )}

      {importResult && (
        <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-900/50 text-sm text-green-400">
          Successfully imported: <a href={`/en/novel/${importResult.id}/${importResult.title.toLowerCase().replace(/\s+/g, "-")}`} className="underline">{importResult.title}</a>
        </div>
      )}

      {/* Results */}
      {searching && <p className="text-sm text-accent mb-4">Searching...</p>}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <Card key={r.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {r.image ? (
                  <img src={r.image} alt="" className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg object-cover bg-card-hover shrink-0" />
                ) : (
                  <div className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg bg-card-hover flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0 sm:hidden">
                  <h3 className="text-sm font-semibold text-white line-clamp-2">{r.title}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{r.id}</p>
                </div>
              </div>
              <div className="hidden sm:block flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{r.title}</h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{r.id}</p>
              </div>
              <button
                onClick={() => handleImport(r.id)}
                disabled={importing === r.id}
                className="w-full sm:w-auto shrink-0 px-4 py-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
              >
                {importing === r.id ? "Importing..." : "Import"}
              </button>
            </Card>
          ))}
        </div>
      )}

      {!searching && results.length === 0 && !error && (
        <div className="text-center py-16 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Search for novels from NovelUpdates to import.</p>
        </div>
      )}
    </div>
  );
}
