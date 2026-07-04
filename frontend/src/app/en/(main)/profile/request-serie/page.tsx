"use client";

import { useState } from "react";
import { requests } from "@/lib/api";

interface RequestItem {
  id: number;
  title: string;
  source: string;
  status: string;
  votes: number;
  date: string;
}

const mockRequests: RequestItem[] = [
  { id: 1, title: "Solo Leveling: Ragnarok", source: "kakao.com", status: "pending", votes: 45, date: "2 days ago" },
  { id: 2, title: "The Beginning After The End", source: "tapas.io", status: "approved", votes: 123, date: "1 week ago" },
  { id: 3, title: "Omniscient Reader's Viewpoint", source: "munpia.com", status: "completed", votes: 89, date: "2 weeks ago" },
];

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-900/40 text-yellow-400 border-yellow-800/30",
    approved: "bg-green-900/40 text-green-400 border-green-800/30",
    completed: "bg-blue-900/40 text-blue-400 border-blue-800/30",
    rejected: "bg-red-900/40 text-red-400 border-red-800/30",
  };
  return `text-xs px-2 py-0.5 rounded border ${styles[status] || styles.pending}`;
}

export default function RequestSeriePage() {
  const [showForm, setShowForm] = useState(false);
  const [novelTitle, setNovelTitle] = useState("");
  const [novelURL, setNovelURL] = useState("");
  const [source, setSource] = useState("");
  const [items, setItems] = useState(mockRequests);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await requests.create({ novel_title: novelTitle, novel_url: novelURL, source });
      setItems([{ id: Date.now(), title: novelTitle, source: source || "manual", status: "pending", votes: 0, date: "Just now" }, ...items]);
      setNovelTitle("");
      setNovelURL("");
      setSource("");
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Request Novels</h1>
          <p className="text-sm text-gray-500 mt-1">Can&apos;t find a novel? Request it and the community can vote on it.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg transition-colors">
          {showForm ? "Cancel" : "+ New Request"}
        </button>
      </div>

      {submitted && <div className="mb-6 p-3 rounded-lg bg-green-900/30 border border-green-800/30 text-sm text-green-400">Request submitted!</div>}
      {error && <div className="mb-6 p-3 rounded-lg bg-red-900/30 border border-red-800/30 text-sm text-red-400">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Novel Title *</label>
            <input value={novelTitle} onChange={(e) => setNovelTitle(e.target.value)} required placeholder="Enter the novel title"
              className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Novel URL (optional)</label>
            <input value={novelURL} onChange={(e) => setNovelURL(e.target.value)} placeholder="https://..."
              className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Source (optional)</label>
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. kakao.com, munpia.com"
              className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600" />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">Submit Request</button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((req) => (
          <div key={req.id} className="flex items-center gap-4 p-4 bg-[#12122a] border border-[#1e1e3a] rounded-xl">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-200 font-medium">{req.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">{req.source}</span>
                <span className={statusBadge(req.status)}>{req.status}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-violet-400 font-medium">{req.votes} votes</p>
              <p className="text-xs text-gray-600">{req.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
