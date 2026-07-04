"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { profile as profileApi } from "@/lib/api";

interface ProfileData {
  id: number;
  username: string;
  display_name: string;
  avatar_url: string;
  tickets: number;
  created_at: string;
}

const tabs = ["overview", "library", "votes", "requests"];

export default function ProfilePage() {
  const params = useParams();
  const profileId = params?.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<ProfileData>({
    id: 0, username: "reader1", display_name: "Reader One", avatar_url: "", tickets: 150, created_at: "2025-01-01",
  });

  useEffect(() => {
    if (!profileId) return;
    profileApi.get(profileId)
      .then((res) => setProfile(res))
      .catch(() => {});
  }, [profileId]);

  const joined = (() => {
    try {
      return new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" });
    } catch { return "January 2025"; }
  })();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#1e1e3a] flex items-center justify-center text-2xl font-bold text-gray-500 shrink-0 border-2 border-violet-800/30">
            {profile.username[0]?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-white">{profile.display_name || profile.username}</h1>
            <p className="text-sm text-gray-500">@{profile.username}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
              <span>🎫 {profile.tickets.toFixed(2)} Tickets</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Joined {joined}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-[#1e1e3a] mb-6">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab ? "text-violet-400 border-violet-500" : "text-gray-500 border-transparent hover:text-gray-300"
            }`}>{tab}</button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/en/profile/vote-serie" className="p-4 bg-[#12122a] border border-[#1e1e3a] rounded-xl hover:border-violet-800/40 transition-colors group">
            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Vote Novels</p>
            <p className="text-xs text-gray-500 mt-1">Vote for your favorite novels</p>
          </Link>
          <Link href="/en/profile/request-serie" className="p-4 bg-[#12122a] border border-[#1e1e3a] rounded-xl hover:border-violet-800/40 transition-colors group">
            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Request Novels</p>
            <p className="text-xs text-gray-500 mt-1">Request new novels to be translated</p>
          </Link>
        </div>
      )}
      {activeTab === "library" && <div className="text-center py-8 text-sm text-gray-500"><Link href="/en/library" className="text-violet-400 hover:text-violet-300 underline">Go to Library →</Link></div>}
      {activeTab === "votes" && <div className="text-center py-8 text-sm text-gray-500"><Link href="/en/profile/vote-serie" className="text-violet-400 hover:text-violet-300 underline">View voted novels →</Link></div>}
      {activeTab === "requests" && <div className="text-center py-8 text-sm text-gray-500"><Link href="/en/profile/request-serie" className="text-violet-400 hover:text-violet-300 underline">View requests →</Link></div>}
    </div>
  );
}
