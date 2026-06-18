"use client";

import { useCallback, useMemo, useState } from "react";
import { generatedImages, historyItems, promptCopy, type HistoryItem, type MediaItem } from "@/data/media";
import { mockGenerate } from "@/lib/mockGenerate";
import { HistoryRail } from "./HistoryRail";
import { MediaGrid } from "./MediaGrid";
import { PromptContextCard } from "./PromptContextCard";
import { PromptPanel } from "./PromptPanel";
import { TopNav } from "./TopNav";

type Session = {
  id: string;
  prompt: string;
  images: MediaItem[];
};

const initialSessions: Session[] = historyItems.map((item, index) => ({
  id: item.id,
  prompt: index === 0 ? promptCopy : `${item.label} visual exploration with cinematic lighting and premium detail.`,
  images: generatedImages.map((image, imageIndex) => ({
    ...image,
    id: `${item.id}-${image.id}-${imageIndex}`,
  })),
}));

export function GenerationWorkbench() {
  const [prompt, setPrompt] = useState(promptCopy);
  const [images, setImages] = useState<MediaItem[]>(generatedImages);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [customHistory, setCustomHistory] = useState<HistoryItem[]>([]);
  const [activeId, setActiveId] = useState(historyItems[0]?.id ?? "default");
  const [isGenerating, setIsGenerating] = useState(false);

  const mergedHistory = useMemo(() => [...customHistory, ...historyItems], [customHistory]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const result = await mockGenerate(prompt);
    const id = `prompt-${Date.now()}`;
    const session = {
      id,
      prompt: result.prompt,
      images: result.images,
    };

    setSessions((current) => [session, ...current]);
    setCustomHistory((current) => [
      {
        id,
        label: "Generated",
        src: result.images[0]?.src ?? generatedImages[0].src,
        alt: "Generated result thumbnail",
      },
      ...current.slice(0, 5),
    ]);
    setImages(result.images);
    setPrompt(result.prompt);
    setActiveId(id);
    setIsGenerating(false);
  }, [isGenerating, prompt]);

  const handleHistorySelect = useCallback(
    (id: string) => {
      const nextSession = sessions.find((session) => session.id === id) ?? sessions[0];
      if (!nextSession) return;

      setActiveId(nextSession.id);
      setPrompt(nextSession.prompt);
      setImages(nextSession.images);
    },
    [sessions],
  );

  return (
    <main className="min-h-dvh w-full max-w-full overflow-x-hidden bg-[image:var(--app-shell-background)] text-foreground">
      <TopNav />
      <HistoryRail items={mergedHistory} activeId={activeId} onSelect={handleHistorySelect} />

      <section
        className="grid grid-cols-1 items-start gap-[18px] px-3.5 pb-7 min-[821px]:grid-cols-[252px_minmax(0,1fr)] min-[821px]:px-3.5 min-[1181px]:grid-cols-[252px_220px_minmax(0,1fr)] min-[1181px]:gap-[21px] min-[1181px]:pb-[38px] min-[1181px]:pl-[38px] min-[1181px]:pr-[27px]"
        aria-label="AI content generator"
      >
        <PromptPanel
          prompt={prompt}
          isGenerating={isGenerating}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
        />
        <PromptContextCard prompt={prompt} />
        <MediaGrid items={images} isLoading={isGenerating} />
      </section>
    </main>
  );
}
