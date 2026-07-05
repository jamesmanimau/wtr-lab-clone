"use client";

import { useEffect, useState } from "react";
import { novels, adminRequests } from "@/lib/api";
import Card from "@/components/ui/Card";

interface RequestItem {
  ID: number;
  UserID: number;
  NovelTitle: string;
  NovelURL: string;
  Source: string;
  Status: string;
  Votes: number;
  CreatedAt: string;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    setError("");
    try {
      const res = await novels.list({ limit: 100, sort: "created_at", order: "desc" });
      const allNovels = res.data || [];
      setRequests([]);
    } catch {
      setError("Could not load requests. Using mock data.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await novels.list({ limit: 1 });
        setRequests([]);
        const mockReqs: RequestItem[] = [
          { ID: 1, UserID: 1, NovelTitle: "Solo Leveling", NovelURL: "https://novelupdates.com/series/solo-leveling/", Source: "novelupdates", Status: "pending", Votes: 5, CreatedAt: new Date().toISOString() },
          { ID: 2, UserID: 2, NovelTitle: "Lord of the Mysteries", NovelURL: "", Source: "manual", Status: "pending", Votes: 3, CreatedAt: new Date().toISOString() },
        ];
        setRequests(mockReqs);
      } catch {
        setRequests([]);
      }
    }
    loadRequests();
  }, []);

  async function handleReview(id: number, status: string) {
    setActionMsg("");
    try {
      await adminRequests.review(id, status);
      setRequests((prev) => prev.map((r) => r.ID === id ? { ...r, Status: status } : r));
      setActionMsg(`Request #${id} ${status}.`);
    } catch (e: any) {
      setActionMsg(`Failed: ${e.message}`);
    }
  }

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8"><p className="text-accent">Loading...</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Review Requests</h1>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {actionMsg && <p className="text-sm text-accent-light mb-4">{actionMsg}</p>}

      <p className="text-xs text-gray-500 mb-4">
        Note: Requests currently display as mock data since there is no dedicated GET /requests endpoint.
        Approve/reject actions are functional via the API.
      </p>

      <div className="space-y-3">
        {requests.map((req) => (
          <Card key={req.ID}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white">{req.NovelTitle}</h3>
                {req.NovelURL && (
                  <a href={req.NovelURL} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline truncate block mt-0.5">
                    {req.NovelURL}
                  </a>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>Source: {req.Source || "manual"}</span>
                  <span>Votes: {req.Votes}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    req.Status === "pending" ? "bg-yellow-900/30 text-yellow-400" :
                    req.Status === "approved" ? "bg-green-900/30 text-green-400" :
                    req.Status === "rejected" ? "bg-red-900/30 text-red-400" :
                    "bg-blue-900/30 text-blue-400"
                  }`}>
                    {req.Status}
                  </span>
                </div>
              </div>
              {req.Status === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleReview(req.ID, "approved")}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(req.ID, "rejected")}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-red-700 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
              {req.Status !== "pending" && (
                <span className="text-xs text-gray-500 italic shrink-0">
                  {req.Status === "approved" ? "Approved" : req.Status === "rejected" ? "Rejected" : req.Status}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No requests found.</p>
        </div>
      )}
    </div>
  );
}
