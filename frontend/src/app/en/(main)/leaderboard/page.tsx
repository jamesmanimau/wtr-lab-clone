"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { leaderboard } from "@/lib/api";

interface User {
  ID: number;
  Username: string;
  DisplayName: string;
  Tickets: number;
}

const MOCK_USERS: User[] = [
  { ID: 1, Username: "Mega_bells", DisplayName: "Mega_bells", Tickets: 3569.76 },
  { ID: 2, Username: "StandardCrystal", DisplayName: "StandardCrystal", Tickets: 2907.17 },
  { ID: 3, Username: "Alpha2", DisplayName: "Alpha2", Tickets: 2693.07 },
  { ID: 4, Username: "WhisperWind", DisplayName: "WhisperWind", Tickets: 1845.50 },
  { ID: 5, Username: "NightOwl", DisplayName: "NightOwl", Tickets: 1623.80 },
  { ID: 6, Username: "SilverFox", DisplayName: "SilverFox", Tickets: 1412.25 },
  { ID: 7, Username: "CrimsonTide", DisplayName: "CrimsonTide", Tickets: 1234.00 },
  { ID: 8, Username: "GoldenEagle", DisplayName: "GoldenEagle", Tickets: 1112.90 },
  { ID: 9, Username: "StormChaser", DisplayName: "StormChaser", Tickets: 987.65 },
  { ID: 10, Username: "MoonlitPath", DisplayName: "MoonlitPath", Tickets: 876.54 },
];

const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    leaderboard.get()
      .then((res) => {
        if (res.data?.length) setUsers(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Leaderboard</h1>
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl divide-y divide-[#1e1e3a]">
        {users.map((user, i) => (
          <Link
            key={user.ID}
            href={`/en/profile/${user.ID}`}
            className="flex items-center gap-4 p-4 hover:bg-[#1a1a3a] transition-colors group"
          >
            <span className={`text-lg font-bold w-8 text-center shrink-0 ${
              i < 3 ? medalColors[i] : "text-gray-600"
            }`}>#{i + 1}</span>
            <div className="w-10 h-10 rounded-full bg-[#1e1e3a] flex items-center justify-center text-sm text-gray-500 shrink-0">
              {user.Username[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-200 group-hover:text-violet-400 transition-colors font-medium">{user.Username}</p>
            </div>
            <span className="text-sm text-violet-400 font-medium">{user.Tickets.toLocaleString()} Tickets</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
