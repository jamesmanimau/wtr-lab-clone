"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NovelCard from "@/components/NovelCard";
import SectionHeader from "@/components/SectionHeader";
import NovelCardSmall from "@/components/NovelCardSmall";
import UpdateItem from "@/components/UpdateItem";
import { novels, ranking, updates as updatesApi } from "@/lib/api";

const MOCK_NEW = [
  { title: "Red Chamber: Saving the Falling Heavens", genre: "action", chapters: 1782, href: "/en/novel/1" },
  { title: "Traveling Simultaneously: Across the Heavens", genre: "action", chapters: 84, href: "/en/novel/2" },
  { title: "After He Remarrying a Wealthy Young Man from Beijing's Circle, My Childhood Sweethearts Were Furious", genre: "drama", chapters: 1051, href: "/en/novel/3" },
  { title: "Reborn in 1983: My Wife is a Heiress from Beijing's Elite Circle", genre: "action", chapters: 1758, href: "/en/novel/4" },
  { title: "Real Dolls: I Use Dolls to Create Perfect Accidents", genre: "action", chapters: 944, href: "/en/novel/5" },
  { title: "Attack on Titan: I'm an Ackerman", genre: "action", chapters: 93, href: "/en/novel/6" },
  { title: "The Background is So Invincible That the System Was Upgraded Overnight!", genre: "action", chapters: 998, href: "/en/novel/7" },
  { title: "Global Cultivation: The Salted-fish Undergraduate with an Alchemy Furnace", genre: "action", chapters: 470, href: "/en/novel/8" },
  { title: "Black Rock Shooter's Persona", genre: "action", chapters: 154, href: "/en/novel/9" },
  { title: "Reversing the Immortal Path", genre: "action", chapters: 261, href: "/en/novel/10" },
];

const MOCK_RANKING = [
  { rank: 1, title: "Douluo Continent: Soul Beasts Extinct, I Created My Own Soul Rings", views: "44,711", rating: "4.1", href: "/en/novel/11" },
  { rank: 2, title: "I Was Livestreaming in Douluo Continent, and My Audience Was Bibi Dong!", views: "41,392", rating: "2.0", href: "/en/novel/12" },
  { rank: 3, title: "Douluo Continent: The Plague God Descends, Tang San Gets Tricked", views: "35,947", rating: "3.9", href: "/en/novel/13" },
  { rank: 4, title: "Douluo Continent: Blue Silver Emperor, Hextech Five-choose-three!", views: "31,439", rating: "3.2", href: "/en/novel/14" },
  { rank: 5, title: "Douluo Continent: Martial Soul - Golden Lion Mastiff, All Soul Skills Amplified", views: "26,617", rating: "3.6", href: "/en/novel/15" },
];

const MOCK_UPDATES = [
  { title: "Online Game for Everyone: Why Did I Become a Beggar NPC?", chapter: "#649 Chapter 649: An Unchangeable Situation!", chapterHref: "/en/novel/16/chapter-649", novelHref: "/en/novel/16", hasImage: true },
  { title: "After Being Diagnosed with a Terminal Illness, the Fake Heiress Teams Up with a Rugged-looking Man to Prolong Her Life", chapter: "#172 Chapter 172: Don't worry, I'm not in a relationship.", chapterHref: "/en/novel/17/chapter-172", novelHref: "/en/novel/17", hasImage: true },
  { title: "Crossover Anime/manga Invasion Single-player Game: I Rely on the Ability to Copy Love and Kill", chapter: "#74 Chapter 74: Marrying a Person", chapterHref: "/en/novel/18/chapter-74", novelHref: "/en/novel/18", hasImage: true },
  { title: "Star Lord: My Summoning Pool is a Rice Pool", chapter: "#301 Chapter 301: Deep Sea Black Market", chapterHref: "/en/novel/19/chapter-301", novelHref: "/en/novel/19", hasImage: true },
  { title: "I've Become a God, and You're Telling Me This Isn't a Game?", chapter: "#228 Chapter 228: The Supreme Leader", chapterHref: "/en/novel/20/chapter-228", novelHref: "/en/novel/20", hasImage: true },
  { title: "Spirit Wizard", chapter: "#254 Chapter 254: Discovering a Strange Place", chapterHref: "/en/novel/21/chapter-254", novelHref: "/en/novel/21", hasImage: true },
];

const MOCK_RANDOM = [
  { title: "Binding the Shanhaijing Pearl at the Beginning, I Became the Global Treasure Hunt King", genre: "action", chapters: 122, rating: "3.1", href: "/en/novel/25" },
  { title: "Peninsula: Kpop Hit Maker", genre: "drama", chapters: 191, rating: "2.2", href: "/en/novel/26" },
  { title: "Wuxia Crossover: Sweeping the Heavens", genre: "action", chapters: 501, rating: "2.5", href: "/en/novel/27" },
  { title: "Invincible Heavenly Emperor", genre: "action", chapters: 3871, rating: "2.5", href: "/en/novel/28" },
  { title: "Naruto: I Was Spoiled by the Heavenly Curtain to Unify the Ninja World", genre: "action", chapters: 96, rating: "2.5", href: "/en/novel/29" },
  { title: "The Marvel World of Heroes", genre: "action", chapters: 469, rating: "2.5", href: "/en/novel/30" },
  { title: "Start with Uchiha to escape and sail", genre: "action", chapters: 434, rating: "3.3", href: "/en/novel/31" },
  { title: "There are No Ancestors. They are All Made Up by Me.", genre: "action", chapters: 328, rating: "3.4", href: "/en/novel/32" },
  { title: "Overthrow the Han Dynasty", genre: "action", chapters: 289, rating: "1.0", href: "/en/novel/33" },
  { title: "A Crossover Anime/manga Business, Starting with the Ten Holy Blades Saving Himeko", genre: "action", chapters: 158, rating: "4.1", href: "/en/novel/34" },
];

const MOCK_SPENDERS = [
  { name: "CadenF", tickets: "805.63", href: "/en/profile/1" },
  { name: "Ashley917", tickets: "675.7", href: "/en/profile/2" },
  { name: "zerokings", tickets: "87.83", href: "/en/profile/3" },
];

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
      <div className="bg-gradient-to-r from-[#2193b0]/20 to-[#6dd5ed]/10 border border-[#2193b0]/30 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">🎉 16th Giveaway Winners 🎉</h3>
        <Link href="/en/news/428" className="inline-block mt-2 px-4 py-2 bg-[#2193b0] hover:bg-[#1a7a94] text-white text-sm rounded-lg transition-colors">
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
          {MOCK_NEW.map((novel) => (
            <NovelCard key={novel.href} {...novel} />
          ))}
        </div>
      </section>

      {/* Novel Ranking + Community/Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <SectionHeader title="Novel Ranking" href="/en/ranking/daily" tabs={[{ label: "Daily", active: true }, { label: "Weekly" }, { label: "Monthly" }]} />
          <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-4 space-y-1">
            {MOCK_RANKING.map((novel) => (
              <NovelCardSmall key={novel.rank} {...novel} />
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="/en/profile/vote-serie" className="flex-1 text-center text-sm py-2.5 rounded-lg bg-[#1e1e3a] hover:bg-[#2a2a4a] text-gray-300 transition-colors">
              Vote Novels
            </Link>
            <Link href="/en/profile/request-serie" className="flex-1 text-center text-sm py-2.5 rounded-lg bg-[#1e1e3a] hover:bg-[#2a2a4a] text-gray-300 transition-colors">
              Request Novels
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <SectionHeader title="Community" tabs={[{ label: "Community Folders" }, { label: "Trending", active: true }]} />
          <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-5">
            <div className="flex gap-4">
              <div className="w-20 sm:w-28 aspect-[3/4] rounded-lg bg-[#1e1e3a] border border-[#2a2a4a] flex-shrink-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <Link href="/en/novel/11/qa-douluo" className="text-base font-semibold text-white hover:text-[#6dd5ed] transition-colors line-clamp-2">
                  Question and Answer Douluo: Tang San&apos;s Time Travel Revealed, Tang Hao Breaks Through Defense
                </Link>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                  <span>★ 1.7</span>
                  <span>📚 493</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["action", "adventure", "fan-fiction", "fantasy"].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#2193b0]/20 text-[#6dd5ed] border border-[#2193b0]/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  Transmigrating into Douluo Continent, Song Ye becomes a member of the Spirit Hall team. During the Soul Master Competition, a [Douluo Quiz Game] suddenly appears!
                </p>
                <Link
                  href="/en/novel/11/qa-douluo/continue"
                  className="inline-block mt-3 px-4 py-1.5 bg-[#2193b0] hover:bg-[#1a7a94] text-white text-sm rounded-lg transition-colors"
                >
                  START READING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section>
        <SectionHeader title="Recommendations" href="/en/recommendation" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_NEW.slice(0, 6).map((novel, i) => (
            <NovelCard key={i} {...novel} compact />
          ))}
        </div>
        <div className="mt-4 bg-[#12122a] border border-[#1e1e3a] rounded-xl p-5">
          <div className="flex gap-4">
            <div className="w-20 sm:w-28 aspect-[3/4] rounded-lg bg-[#1e1e3a] border border-[#2a2a4a] flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <Link href="/en/novel/featured-rec" className="text-base font-semibold text-white hover:text-[#6dd5ed] transition-colors line-clamp-2">
                Douluo Continent: Soul Beasts Extinct, I Created My Own Soul Rings
              </Link>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                <span>★ 4.1</span>
                <span>📚 398</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["fan-fiction", "fantasy", "romance"].map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#2193b0]/20 text-[#6dd5ed] border border-[#2193b0]/30">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                The sky collapsed on Douluo Continent! Overnight, all the soul beasts in the world were wiped out!
              </p>
              <Link
                href="/en/novel/featured-rec/continue"
                className="inline-block mt-3 px-4 py-1.5 bg-[#2193b0] hover:bg-[#1a7a94] text-white text-sm rounded-lg transition-colors"
              >
                START READING
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bug Reports / Patreon */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="https://discord.gg/wtrlab" className="flex items-center gap-2 px-5 py-2.5 bg-[#1e1e3a] hover:bg-[#2a2a4a] rounded-lg text-sm text-gray-300 transition-colors">
          <svg className="w-5 h-5 text-[#6dd5ed]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
          </svg>
          For bug reports please use our discord.
        </Link>
        <Link href="https://patreon.com/wtrlab" className="flex items-center gap-2 px-5 py-2.5 bg-[#1e1e3a] hover:bg-[#2a2a4a] rounded-lg text-sm text-gray-300 transition-colors">
          <svg className="w-5 h-5 text-[#6dd5ed]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.82 2.41C18.78 2.41 22 5.65 22 9.62C22 13.58 18.78 16.8 14.82 16.8C10.85 16.8 7.61 13.58 7.61 9.62C7.61 5.65 10.85 2.41 14.82 2.41M2 21.59H5.81V2.41H2V21.59Z" />
          </svg>
          Do you like this site? Support us.
        </Link>
      </div>

      {/* Recent Updates + Latest News + Top Spenders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionHeader title="Recent Updates" />
          <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-4 max-h-[600px] overflow-y-auto">
            {recentUpdates.map((item, i) => (
              <UpdateItem key={i} {...item} />
            ))}
            <button className="w-full text-center text-sm text-[#2193b0] hover:text-[#6dd5ed] py-3 transition-colors">
              Load More
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <SectionHeader title="Latest News" href="/en/news" />
            <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-4 space-y-3">
              <Link href="/en/news/428" className="block text-sm text-gray-200 hover:text-[#6dd5ed] transition-colors">🎉 16th Giveaway Winners 🎉</Link>
              <Link href="/en/news/427" className="block text-sm text-gray-200 hover:text-[#6dd5ed] transition-colors">🎉 Our 16th Giveaway is LIVE! 🎉</Link>
              <Link href="/en/news/426" className="block text-sm text-gray-200 hover:text-[#6dd5ed] transition-colors">Version 1.13.3 - New Source Management & Bug Fixes!</Link>
            </div>
          </div>

          <div>
            <SectionHeader title="Daily Top Spenders" href="/en/leaderboard" />
            <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-4 space-y-3">
              {MOCK_SPENDERS.map((spender, i) => (
                <Link key={i} href={spender.href} className="flex items-center justify-between group">
                  <span className="text-sm text-gray-200 group-hover:text-[#6dd5ed] transition-colors">{spender.name}</span>
                  <span className="text-xs text-gray-500">{spender.tickets} Tickets</span>
                </Link>
              ))}
            </div>
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
