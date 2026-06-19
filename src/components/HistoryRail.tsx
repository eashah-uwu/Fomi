"use client";

import Image from "next/image";
import { useState } from "react";
import type { HistoryItem } from "@/data/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type HistoryRailProps = {
  items: HistoryItem[];
  activeId: string;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onExpandedChange: (open: boolean) => void;
};

export function HistoryRail({ items, activeId, isExpanded, onSelect, onExpandedChange }: HistoryRailProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <section className="relative z-[2] mx-4 mb-6 lg:mx-[39px] lg:mb-3 lg:ml-[43px]" aria-label="Prompt history">
      <Popover open={isExpanded} onOpenChange={onExpandedChange}>
        <div
          className="grid min-h-[86px] grid-cols-1 rounded-[12px] bg-surface/95 p-3 shadow-history min-[520px]:grid-cols-[82px_8px_minmax(0,1fr)] min-[520px]:items-center min-[520px]:rounded-[9px] min-[520px]:p-0"
        >
          <PopoverTrigger asChild>
            <Button
              className="mb-3 flex h-11 w-full items-center justify-between rounded-xl bg-soft px-4 text-history-copy hover:bg-soft-strong min-[520px]:mb-0 min-[520px]:ml-4 min-[520px]:grid min-[520px]:size-auto min-[520px]:h-[66px] min-[520px]:w-[59px] min-[520px]:place-items-center min-[520px]:content-center min-[520px]:gap-0 min-[520px]:rounded-[3px] min-[520px]:bg-surface-raised min-[520px]:p-0 min-[520px]:hover:bg-surface"
              variant="ghost"
              type="button"
              aria-expanded={isExpanded}
            >
              <strong className="block text-[13px] leading-none">History</strong>
              <span className="block text-[9px] font-bold text-history-muted min-[520px]:mt-[5px] min-[520px]:text-[8px]">
                {isExpanded ? "Close" : "View All"}
              </span>
            </Button>
          </PopoverTrigger>
          <div
            className="relative hidden h-14 w-1 overflow-hidden rounded-full bg-history-divider min-[520px]:block"
            aria-hidden="true"
          >
            <span
              className="absolute left-0 top-0 h-[18px] w-full rounded-full bg-accent transition-transform duration-150"
              style={{ transform: `translateY(${scrollProgress * 38}px)` }}
            />
          </div>
          <div className="relative min-w-0">
            <div
              className="grid auto-cols-[67px] grid-flow-col gap-3 overflow-x-auto overflow-y-hidden px-1 pb-1 pt-0 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[520px]:gap-3.5 min-[520px]:py-[11px] min-[520px]:pl-[13px] min-[520px]:pr-8"
              onScroll={(event) => {
                const rail = event.currentTarget;
                const maxScroll = rail.scrollWidth - rail.clientWidth;
                setScrollProgress(maxScroll > 0 ? rail.scrollLeft / maxScroll : 0);
              }}
            >
              {items.map((item) => (
                <Button
                  className={cn(
                    "relative size-[67px] snap-start snap-always overflow-hidden rounded p-0 hover:shadow-history-thumb",
                    activeId === item.id && "-translate-y-0.5 shadow-history-thumb",
                  )}
                  variant="ghost"
                  type="button"
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  aria-label={`Open ${item.label} prompt`}
                >
                  <Image className="transition-transform duration-300 hover:scale-[1.06]" src={item.src} alt={item.alt} fill sizes="76px" />
                </Button>
              ))}
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface via-surface/75 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        <PopoverContent
          align="start"
          alignOffset={-16}
          sideOffset={8}
          className="grid max-h-[260px] w-[calc(100vw-28px)] grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-border bg-surface p-3 shadow-select-content sm:grid-cols-3 lg:w-[calc(100vw-82px)] lg:grid-cols-5"
        >
          {items.map((item) => (
            <Button
              className={cn(
                "h-12 justify-start overflow-hidden rounded-xl px-2 text-left text-[11px]",
                activeId === item.id && "bg-accent/10 text-accent",
              )}
              variant="white"
              type="button"
              key={item.id}
              onClick={() => onSelect(item.id)}
            >
              <span className="relative size-8 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.src} alt={item.alt} fill sizes="32px" />
              </span>
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </section>
  );
}
