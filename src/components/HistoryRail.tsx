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
    <section className="relative z-[2] mx-3 mb-5 sm:mx-4 md:mb-6 lg:mx-[39px] lg:mb-3 lg:ml-[43px]" aria-label="Prompt history">
      <Popover open={isExpanded} onOpenChange={onExpandedChange}>
        <div
          className="grid min-h-[82px] min-w-0 grid-cols-1 rounded-[12px] bg-surface/95 p-3 shadow-history sm:grid-cols-[76px_6px_minmax(0,1fr)] sm:items-center sm:rounded-[9px] sm:p-0"
        >
          <PopoverTrigger asChild>
            <Button
              className="mb-3 flex h-11 w-full items-center justify-between rounded-xl bg-soft px-4 text-history-copy hover:bg-soft-strong sm:mb-0 sm:ml-3 sm:grid sm:size-auto sm:h-[62px] sm:w-[56px] sm:place-items-center sm:content-center sm:gap-0 sm:rounded-[3px] sm:bg-surface-raised sm:p-0 sm:hover:bg-surface"
              variant="ghost"
              type="button"
              aria-expanded={isExpanded}
            >
              <strong className="block text-[13px] leading-none">History</strong>
              <span className="block text-[9px] font-bold text-history-muted sm:mt-[5px] sm:text-[8px]">
                {isExpanded ? "Close" : "View All"}
              </span>
            </Button>
          </PopoverTrigger>
          <div
            className="relative hidden h-12 w-1 overflow-hidden rounded-full bg-history-divider sm:block"
            aria-hidden="true"
          >
            <span
              className="absolute left-0 top-0 h-[18px] w-full rounded-full bg-accent transition-transform duration-150"
              style={{ transform: `translateY(${scrollProgress * 38}px)` }}
            />
          </div>
          <div className="relative min-w-0">
            <div
              className="grid auto-cols-[62px] grid-flow-col gap-2.5 overflow-x-auto overflow-y-hidden px-1 pb-1 pt-0 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[64px] sm:gap-3 sm:py-[9px] sm:pl-3 sm:pr-8 lg:auto-cols-[67px] lg:gap-3.5 lg:py-[11px]"
              onScroll={(event) => {
                const rail = event.currentTarget;
                const maxScroll = rail.scrollWidth - rail.clientWidth;
                setScrollProgress(maxScroll > 0 ? rail.scrollLeft / maxScroll : 0);
              }}
            >
              {items.map((item) => (
                <Button
                  className={cn(
                    "relative size-[62px] snap-start snap-always overflow-hidden rounded p-0 hover:shadow-history-thumb sm:size-16 lg:size-[67px]",
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
