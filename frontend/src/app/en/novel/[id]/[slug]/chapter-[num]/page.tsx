"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChapterReader from "@/components/ChapterReader";

function generateMockContent(chapterNum: number): string {
  const paragraphs = [
    "The morning sun filtered through the thin curtains, casting golden stripes across the wooden floor. Dust motes danced lazily in the warm light, and the distant sound of birds could be heard from the garden outside.",
    "She stood at the window, her reflection barely visible in the glass. The cup of tea in her hands had long gone cold, but she didn't notice. Her mind was elsewhere, wandering through memories that felt both distant and painfully close.",
    "He was running. His lungs burned with each breath, and his legs felt like lead. But he couldn't stop. Not now. Not when he was so close. The roaring of the wind in his ears drowned out everything else, leaving only the primal instinct to survive.",
    "The room was silent except for the ticking of the old grandfather clock. Each second stretched into an eternity as they sat across from each other, words hanging unspoken in the air between them. Someone had to break first.",
    "The city lights flickered to life as dusk settled over the skyline. From this height, everything below looked like a miniature world—cars threading through streets like beads on a string, people reduced to tiny specks hurrying home.",
  ];

  const content = [];
  for (let i = 0; i < 8 + (chapterNum % 5); i++) {
    content.push(paragraphs[i % paragraphs.length]);
  }
  content.push("", `--- End of Chapter ${chapterNum} ---`);
  return content.join("\n\n");
}

function generateMockChapters(total: number, current: number) {
  const list = [];
  for (let i = 1; i <= total; i++) {
    list.push({
      number: i,
      title: `Chapter ${i}`,
      createdAt: new Date(Date.now() - (total - i) * 86400000).toISOString(),
    });
  }
  return list;
}

export default function ChapterReaderPage() {
  const params = useParams();
  const id = params?.id as string;
  const slug = params?.slug as string;
  const numStr = params?.num as string;

  const [chapter, setChapter] = useState<{ number: number; title: string; content: string; isLocked: boolean } | null>(null);
  const [novel, setNovel] = useState<{ id: number; slug: string; title: string; totalChapters: number; coverUrl?: string; category?: string } | null>(null);
  const [chapters, setChapters] = useState<{ number: number; title: string; createdAt?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [inLibrary, setInLibrary] = useState(false);

  const chapterNum = parseInt(numStr?.replace("chapter-", "") || "1");
  const totalChapters = 135;

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const ch = {
      number: chapterNum,
      title: `Chapter ${chapterNum}`,
      content: generateMockContent(chapterNum),
      isLocked: chapterNum > 70,
    };

    const nv = {
      id: parseInt(id),
      slug: slug || "",
      title: slug ? slug.replace(/-/g, " ") : "Novel",
      totalChapters,
      coverUrl: "",
      category: "Fantasy",
    };

    const chList = generateMockChapters(totalChapters, chapterNum);

    setTimeout(() => {
      setChapter(ch);
      setNovel(nv);
      setChapters(chList);
      setLoading(false);
    }, 200);
  }, [id, chapterNum, slug]);

  const handleAddToLibrary = useCallback(() => {
    setInLibrary((prev) => !prev);
  }, []);

  const novelHref = `/en/novel/${id}/${slug}`;
  const prevHref = chapterNum > 1 ? `/en/novel/${id}/${slug}/chapter-${chapterNum - 1}` : undefined;
  const nextHref = chapterNum < totalChapters ? `/en/novel/${id}/${slug}/chapter-${chapterNum + 1}` : undefined;

  return (
    <ChapterReader
      chapter={chapter}
      novel={novel}
      chapters={chapters}
      loading={loading}
      prevHref={prevHref}
      nextHref={nextHref}
      novelHref={novelHref}
      onAddToLibrary={handleAddToLibrary}
      inLibrary={inLibrary}
    />
  );
}
