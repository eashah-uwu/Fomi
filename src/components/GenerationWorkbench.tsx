"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { alternateImages, generatedImages, historyItems, promptCopy, type HistoryItem, type MediaItem } from "@/data/media";
import type { DropdownId } from "@/lib/dropdowns";
import { mockGenerate } from "@/lib/mockGenerate";
import { HistoryRail } from "./HistoryRail";
import { PromptContextCard, type PromptRecord } from "./PromptContextCard";
import { type GenerationMode, type GenerationSettings, PromptPanel } from "./PromptPanel";
import { type NavTab, TopNav } from "./TopNav";
import { Button } from "./ui/button";

type Session = {
  id: string;
  label: string;
  prompt: string;
  images: MediaItem[];
  mode: GenerationMode;
  model: string;
  style: string;
  createdAt: string;
  source: "sample" | "generated";
};

const defaultSettings: GenerationSettings = {
  count: "4",
  ratio: "1:1",
  model: "Fomi Real",
  style: "Portrait",
  quality: "Balanced",
};

const sampleImages = [...generatedImages, ...alternateImages];

const initialSessions: Session[] = historyItems.map((item, index) => ({
  id: item.id,
  label: item.label,
  prompt: index === 0 ? promptCopy : `${item.label} visual exploration with cinematic lighting and premium detail.`,
  images: Array.from({ length: 4 }, (_, imageIndex) => {
    const image = sampleImages[(index * 2 + imageIndex) % sampleImages.length];
    return {
      ...image,
      id: `${item.id}-${image.id}-${imageIndex}`,
    };
  }),
  mode: "image",
  model: "Fomi Real",
  style: index === 0 ? "Portrait" : item.label,
  createdAt: "Sample",
  source: "sample",
}));

export function GenerationWorkbench() {
  const [prompt, setPrompt] = useState(promptCopy);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [activeId, setActiveId] = useState(historyItems[0]?.id ?? "default");
  const [mode, setMode] = useState<GenerationMode>("image");
  const [settings, setSettings] = useState<GenerationSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<NavTab>("Home");
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  const mergedHistory = useMemo<HistoryItem[]>(
    () =>
      sessions.map((session) => ({
        id: session.id,
        label: session.source === "generated" ? session.prompt.slice(0, 28) : session.label,
        src: session.images[0]?.src ?? generatedImages[0].src,
        alt: `${session.label} thumbnail`,
      })),
    [sessions],
  );

  const promptRecords = useMemo<PromptRecord[]>(() => {
    const generatedRecords = sessions.filter((session) => session.source === "generated").reverse();
    const initialRecord = sessions.find((session) => session.id === historyItems[0]?.id);
    const records = initialRecord ? [initialRecord, ...generatedRecords] : generatedRecords;

    return records.map((session) => ({
      id: session.id,
      prompt: session.prompt,
      mode: session.mode,
      model: session.model,
      style: session.style,
      createdAt: session.createdAt,
      images: session.images,
    }));
  }, [sessions]);

  const handleSettingsChange = useCallback((nextSettings: Partial<GenerationSettings>) => {
    setSettings((current) => ({ ...current, ...nextSettings }));
  }, []);

  const handleDropdownChange = useCallback((dropdown: DropdownId | null) => {
    setActiveDropdown(dropdown);
    if (dropdown) setIsHistoryExpanded(false);
  }, []);

  const handleModeChange = useCallback((nextMode: GenerationMode) => {
    setMode(nextMode);
    setActiveTab(nextMode === "image" ? "Images" : "Video");
    setSettings((current) => ({
      ...current,
      count: nextMode === "video" && Number(current.count) > 2 ? "2" : current.count,
      model: nextMode === "video" ? "Fomi Motion" : current.model === "Fomi Motion" ? "Fomi Real" : current.model,
    }));
  }, []);

  const handleTabChange = useCallback((tab: NavTab) => {
    setActiveDropdown(null);
    if (tab === "Files") {
      setIsHistoryExpanded((current) => !current);
      return;
    }

    setActiveTab(tab);
    setIsHistoryExpanded(false);
    if (tab === "Images") handleModeChange("image");
    if (tab === "Video") handleModeChange("video");
  }, [handleModeChange]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const result = await mockGenerate(prompt, {
      count: Number(settings.count),
      mode,
    });
    const id = `prompt-${Date.now()}`;
    const session = {
      id,
      label: mode === "image" ? "Generated image" : "Generated video",
      prompt: result.prompt,
      images: result.images,
      mode,
      model: settings.model,
      style: settings.style,
      createdAt: new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
      source: "generated" as const,
    };

    setSessions((current) => [session, ...current]);
    setPrompt("");
    setActiveId(id);
    setActiveTab(mode === "image" ? "Images" : "Video");
    setIsHistoryExpanded(false);
    setIsGenerating(false);
  }, [isGenerating, mode, prompt, settings.count, settings.model, settings.style]);

  const handleHistorySelect = useCallback(
    (id: string) => {
      const nextSession = sessions.find((session) => session.id === id) ?? sessions[0];
      if (!nextSession) return;

      setActiveId(nextSession.id);
      setPrompt(nextSession.prompt);
      setMode(nextSession.mode);
      setActiveTab(nextSession.mode === "image" ? "Images" : "Video");
      setIsHistoryExpanded(false);
      setSettings((current) => ({
        ...current,
        model: nextSession.model,
        style: nextSession.style,
      }));
    },
    [sessions],
  );

  return (
    <main className="min-h-dvh w-full max-w-full overflow-x-hidden bg-[image:var(--app-shell-background)] text-foreground">
      <TopNav
        activeTab={activeTab}
        activeDropdown={activeDropdown}
        isHistoryExpanded={isHistoryExpanded}
        isDark={isDark}
        onTabChange={handleTabChange}
        onDropdownChange={handleDropdownChange}
        onThemeToggle={() => setIsDark((current) => !current)}
      />
      <HistoryRail
        items={mergedHistory}
        activeId={activeId}
        isExpanded={isHistoryExpanded}
        onSelect={handleHistorySelect}
        onExpandedChange={setIsHistoryExpanded}
      />

      <section
        className="grid min-w-0 grid-cols-1 items-start gap-6 px-3 pb-8 sm:px-4 md:gap-7 lg:grid-cols-[286px_minmax(0,1fr)] lg:gap-[18px] lg:px-5 xl:gap-6 xl:pb-[38px] xl:pl-[38px] xl:pr-[27px]"
        aria-label="AI content generator"
      >
        <PromptPanel
          prompt={prompt}
          mode={mode}
          settings={settings}
          activeDropdown={activeDropdown}
          isGenerating={isGenerating}
          onPromptChange={setPrompt}
          onModeChange={handleModeChange}
          onSettingsChange={handleSettingsChange}
          onDropdownChange={handleDropdownChange}
          onGenerate={handleGenerate}
        />
        <PromptContextCard
          records={promptRecords}
          activeId={activeId}
          isLoading={isGenerating}
          pendingPrompt={prompt}
          pendingMode={mode}
          pendingCount={Number(settings.count)}
          onSelect={handleHistorySelect}
          onItemSelect={setPreviewItem}
        />
      </section>

      {previewItem ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-foreground/35 p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-3xl rounded-3xl bg-surface p-3 shadow-select-content">
            <Button
              className="absolute right-4 top-4 z-10 bg-surface/90"
              variant="ghost"
              size="icon"
              type="button"
              aria-label="Close preview"
              onClick={() => setPreviewItem(null)}
            >
              <X className="size-4" strokeWidth={2.4} />
            </Button>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft">
              <Image src={previewItem.src} alt={previewItem.alt} fill sizes="(max-width: 900px) 90vw, 760px" />
            </div>
            <div className="flex items-center justify-between gap-3 px-2 pt-3 text-sm font-semibold text-copy">
              <span>{previewItem.title}</span>
              <Button size="pill" type="button" onClick={() => setPreviewItem(null)}>
                Use result
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
