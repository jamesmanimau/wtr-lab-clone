"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NovelCard from "@/components/NovelCard";
import SectionHeader from "@/components/SectionHeader";
import NovelCardSmall from "@/components/NovelCardSmall";
import UpdateItem from "@/components/UpdateItem";
import { updates as updatesApi } from "@/lib/api";
import Card from "@/components/ui/Card";
import GenreTag from "@/components/ui/GenreTag";
import { MOCK_NEW_NOVELS, MOCK_RANKING, MOCK_UPDATES, MOCK_RANDOM, MOCK_SPENDERS } from "@/lib/mockData";

export default function Home() {
  const [recentUpdates, setRecentUpdates] = useState(MOCK_UPDATES);

  useEffect(() => {
    updatesApi.recent(6)
      .then((res) => {
        if (res.data?.length) {
          setRecentUpdates(res.data.map((u: any) => ({
            title: u.Novel?.Title || "Unknown",
            chapter: `#${u.Number} ${u.Title || ""}`,
            chapterHref: `/en/novel/${u.NovelID}/${u.Novel?.Slug || ""}/chapter-${u.Number}`,
            novelHref: `/en/novel/${u.NovelID}/${u.Novel?.Slug || ""}`,
            hasImage: true,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Giveaway Banner */}
      <div className="bg-gradient-to-r from-accent/20 to-accent-light/10 border border-accent/30 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">🎉 16th Giveaway Winners 🎉</h3>
        <Link href="/en/news/428" className="inline-block mt-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm rounded-lg transition-colors">
          Check Results
        </Link>
      </div>

      {/* Login Prompt */}
      <div className="text-center text-sm text-gray-500">
        Login to keep track of where you left off in the novel.
      </div>

      {/* New Novels */}
      <section>
        <SectionHeader title="New Novels" href="/en/novel-list" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_NEW_NOVELS.map((novel) => (
            <NovelCard key={novel.href} {...novel} />
          ))}
        </div>
      </section>

      {/* Novel Ranking + Community/Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <SectionHeader title="Novel Ranking" href="/en/ranking/daily" tabs={[{ label: "Daily", active: true }, { label: "Weekly" }, { label: "Monthly" }]} />
          <Card className="space-y-1">
            {MOCK_RANKING.map((novel) => (
              <NovelCardSmall key={novel.rank} {...novel} />
            ))}
          </Card>
          <div className="flex gap-3 mt-4">
            <Link href="/en/profile/vote-serie" className="flex-1 text-center text-sm py-2.5 rounded-lg bg-card-hover hover:bg-line-light text-gray-300 transition-colors">
              Vote Novels
            </Link>
            <Link href="/en/profile/request-serie" className="flex-1 text-center text-sm py-2.5 rounded-lg bg-card-hover hover:bg-line-light text-gray-300 transition-colors">
              Request Novels
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <SectionHeader title="Community" tabs={[{ label: "Community Folders" }, { label: "Trending", active: true }]} />
          <Card className="p-5">
            <div className="flex gap-4">
              <div className="w-20 sm:w-28 aspect-[3/4] rounded-lg bg-card-hover border border-line-light flex-shrink-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <Link href="/en/novel/11/qa-douluo" className="text-base font-semibold text-white hover:text-accent-light transition-colors line-clamp-2">
                  Question and Answer Douluo: Tang San&apos;s Time Travel Revealed, Tang Hao Breaks Through Defense
                </Link>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                  <span>★ 1.7</span>
                  <span>📚 493</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["action", "adventure", "fan-fiction", "fantasy"].map((tag) => (
                    <GenreTag key={tag} label={tag} />
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  Transmigrating into Douluo Continent, Song Ye becomes a member of the Spirit Hall team. During the Soul Master Competition, a [Douluo Quiz Game] suddenly appears!
                </p>
                <Link
                  href="/en/novel/11/qa-douluo/continue"
                  className="inline-block mt-3 px-4 py-1.5 bg-accent hover:bg-accent-dark text-white text-sm rounded-lg transition-colors"
                >
                  START READING
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <section>
        <SectionHeader title="Recommendations" href="/en/recommendation" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_NEW_NOVELS.slice(0, 6).map((novel, i) => (
            <NovelCard key={i} {...novel} compact />
          ))}
        </div>
        <Card className="mt-4 p-5">
          <div className="flex gap-4">
            <div className="w-20 sm:w-28 aspect-[3/4] rounded-lg bg-card-hover border border-line-light flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <Link href="/en/novel/featured-rec" className="text-base font-semibold text-white hover:text-accent-light transition-colors line-clamp-2">
                Douluo Continent: Soul Beasts Extinct, I Created My Own Soul Rings
              </Link>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                <span>★ 4.1</span>
                <span>📚 398</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["fan-fiction", "fantasy", "romance"].map((tag) => (
                  <GenreTag key={tag} label={tag} />
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                The sky collapsed on Douluo Continent! Overnight, all the soul beasts in the world were wiped out!
              </p>
              <Link
                href="/en/novel/featured-rec/continue"
                className="inline-block mt-3 px-4 py-1.5 bg-accent hover:bg-accent-dark text-white text-sm rounded-lg transition-colors"
              >
                START READING
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Bug Reports / Patreon */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="https://discord.gg/wtrlab" className="flex items-center gap-2 px-5 py-2.5 bg-card-hover hover:bg-line-light rounded-lg text-sm text-gray-300 transition-colors">
          <svg className="w-5 h-5 text-accent-light" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
          </svg>
          For bug reports please use our discord.
        </Link>
        <Link href="https://patreon.com/wtrlab" className="flex items-center gap-2 px-5 py-2.5 bg-card-hover hover:bg-line-light rounded-lg text-sm text-gray-300 transition-colors">
          <svg className="w-5 h-5 text-accent-light" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.82 2.41C18.78 2.41 22 5.65 22 9.62C22 13.58 18.78 16.8 14.82 16.8C10.85 16.8 7.61 13.58 7.61 9.62C7.61 5.65 10.85 2.41 14.82 2.41M2 21.59H5.81V2.41H2V21.59Z" />
          </svg>
          Do you like this site? Support us.
        </Link>
      </div>

      {/* Recent Updates + Latest News + Top Spenders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionHeader title="Recent Updates" />
          <Card className="max-h-[600px] overflow-y-auto">
            {recentUpdates.map((item, i) => (
              <UpdateItem key={i} {...item} />
            ))}
            <button className="w-full text-center text-sm text-accent hover:text-accent-light py-3 transition-colors">
              Load More
            </button>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <SectionHeader title="Latest News" href="/en/news" />
            <Card className="space-y-3">
              <Link href="/en/news/428" className="block text-sm text-gray-200 hover:text-accent-light transition-colors">🎉 16th Giveaway Winners 🎉</Link>
              <Link href="/en/news/427" className="block text-sm text-gray-200 hover:text-accent-light transition-colors">🎉 Our 16th Giveaway is LIVE! 🎉</Link>
              <Link href="/en/news/426" className="block text-sm text-gray-200 hover:text-accent-light transition-colors">Version 1.13.3 - New Source Management & Bug Fixes!</Link>
            </Card>
          </div>

          <div>
            <SectionHeader title="Daily Top Spenders" href="/en/leaderboard" />
            <Card className="space-y-3">
              {MOCK_SPENDERS.map((spender, i) => (
                <Link key={i} href={spender.href} className="flex items-center justify-between group">
                  <span className="text-sm text-gray-200 group-hover:text-accent-light transition-colors">{spender.name}</span>
                  <span className="text-xs text-gray-500">{spender.tickets} Tickets</span>
                </Link>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* Random Novels */}
      <section>
        <SectionHeader title="Random Novels" href="/en/random-novels" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {MOCK_RANDOM.map((novel, i) => (
            <NovelCard key={i} {...novel} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
