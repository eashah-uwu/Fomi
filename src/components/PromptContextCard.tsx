"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/utils";

export type PromptRecord = {
  id: string;
  prompt: string;
  mode: "image" | "video";
  model: string;
  style: string;
  createdAt: string;
  images: MediaItem[];
};

type PromptContextCardProps = {
  records: PromptRecord[];
  activeId: string;
  isLoading: boolean;
  pendingPrompt: string;
  pendingMode: "image" | "video";
  pendingCount: number;
  onSelect: (id: string) => void;
  onItemSelect: (item: MediaItem) => void;
};

export function PromptContextCard({
  records,
  activeId,
  isLoading,
  pendingPrompt,
  pendingMode,
  pendingCount,
  onSelect,
  onItemSelect,
}: PromptContextCardProps) {
  const timelineRef = useRef<HTMLElement>(null);
  const latestRecordRef = useRef<HTMLElement>(null);
  const previousRecordCountRef = useRef(records.length);

  useEffect(() => {
    if (records.length <= previousRecordCountRef.current) {
      previousRecordCountRef.current = records.length;
      return;
    }

    const latestRecord = latestRecordRef.current;
    if (latestRecord) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      latestRecord.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }

    previousRecordCountRef.current = records.length;
  }, [records.length]);

  return (
    <section
      ref={timelineRef}
      className="grid min-w-0 content-start gap-10 min-[821px]:h-[500px] min-[821px]:overflow-y-auto min-[821px]:pr-2"
      aria-label="Prompt results history"
    >
      {records.map((record, recordIndex) => (
        <article
          ref={recordIndex === records.length - 1 ? latestRecordRef : undefined}
          className="grid min-w-0 items-start gap-5 min-[1181px]:grid-cols-[220px_minmax(0,1fr)] min-[1181px]:gap-4"
          key={record.id}
        >
          <div
            className={cn(
              "grid h-[190px] overflow-hidden rounded-[15px] rounded-br-none bg-soft p-[10px] text-panel-copy transition-shadow duration-300",
              activeId === record.id && "shadow-history-thumb",
            )}
          >
            <Button
              className="grid h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] content-stretch justify-stretch gap-3 overflow-hidden whitespace-normal rounded-none pr-1 text-left font-normal hover:bg-transparent active:translate-y-0"
              variant="ghost"
              size="nav"
              radius="none"
              type="button"
              onClick={() => onSelect(record.id)}
            >
              <p className="prompt-copy-scrollbar h-full min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-contain whitespace-normal break-words [overflow-wrap:anywhere] pr-2 text-[11px] leading-[1.26]">
                {record.prompt}
              </p>
              <p className="shrink-0 text-[9px] font-bold text-muted">
                {record.mode === "image" ? "Image" : "Video"} / {record.style} / {record.createdAt}
              </p>
            </Button>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3 min-[821px]:grid-cols-3 min-[1181px]:grid-cols-4 min-[1181px]:gap-[13px]">
            {record.images.map((item, index) => (
              <Button
                className="relative block aspect-[1/0.95] min-h-[145px] w-full overflow-hidden rounded-[7px] border-0 bg-soft shadow-media transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-media-hover active:translate-y-px min-[821px]:min-h-40"
                variant="ghost"
                size="nav"
                radius="none"
                type="button"
                key={item.id}
                aria-label={item.title}
                onClick={() => onItemSelect(item)}
              >
                <Image
                  className="transition-[filter,transform] duration-500 hover:scale-[1.045] hover:saturate-[1.05] hover:contrast-[1.04]"
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index < 4 && record.id === activeId}
                  sizes="(max-width: 820px) 46vw, (max-width: 1180px) 28vw, 180px"
                />
                {record.mode === "video" ? (
                  <span className="absolute inset-0 grid place-items-center bg-foreground/10">
                    <span className="grid size-10 place-items-center rounded-full bg-surface/90 text-accent shadow-control">
                      <Play className="ml-0.5 size-5 fill-current" strokeWidth={2.2} />
                    </span>
                  </span>
                ) : null}
              </Button>
            ))}
          </div>
        </article>
      ))}

      {isLoading ? (
        <article className="grid min-w-0 items-start gap-5 min-[1181px]:grid-cols-[220px_minmax(0,1fr)] min-[1181px]:gap-4">
          <div className="h-[190px] rounded-[15px] rounded-br-none bg-soft p-[10px] text-panel-copy">
            <p className="max-h-[104px] overflow-hidden text-[11px] font-semibold leading-[1.26]">{pendingPrompt}</p>
            <p className="mt-2 text-[9px] font-bold text-muted">
              {pendingMode === "image" ? "Image" : "Video"} / Creating
            </p>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-3 min-[821px]:grid-cols-3 min-[1181px]:grid-cols-4 min-[1181px]:gap-[13px]">
            {Array.from({ length: pendingCount }).map((_, index) => (
              <div
                className="aspect-[1/0.95] min-h-[145px] animate-[skeleton-sheen_1s_ease-in-out_infinite] rounded-[7px] bg-soft-skeleton bg-[image:var(--skeleton-background)] bg-[length:220%_100%] min-[821px]:min-h-40"
                key={`pending-${index}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}
