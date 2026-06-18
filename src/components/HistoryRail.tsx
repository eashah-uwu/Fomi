import Image from "next/image";
import type { HistoryItem } from "@/data/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type HistoryRailProps = {
  items: HistoryItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function HistoryRail({ items, activeId, onSelect }: HistoryRailProps) {
  return (
    <section
      className="relative z-[2] mx-3.5 mb-[18px] grid min-h-[86px] grid-cols-[70px_minmax(0,1fr)] items-center rounded-[9px] bg-surface/95 shadow-history min-[520px]:grid-cols-[74px_1px_minmax(0,1fr)] lg:mx-[39px] lg:mb-3 lg:ml-[43px]"
      aria-label="Prompt history"
    >
      <Button
        className="ml-4 grid size-auto h-[66px] w-[59px] place-items-center content-center gap-0 rounded-[3px] bg-surface-raised p-0 text-history-copy hover:bg-surface"
        variant="ghost"
        type="button"
        onClick={() => onSelect("default")}
      >
        <strong className="block text-[13px] leading-none">History</strong>
        <span className="mt-[5px] block text-[8px] font-bold text-history-muted">View All</span>
      </Button>
      <div className="hidden h-[29px] w-1 rounded-full bg-history-divider min-[520px]:block" aria-hidden="true" />
      <div className="grid auto-cols-[67px] grid-flow-col gap-2.5 overflow-x-auto overflow-y-hidden py-[11px] pl-2 pr-[15px] [scroll-snap-type:x_proximity] min-[520px]:gap-3.5 min-[520px]:pl-[13px]">
        {items.map((item) => (
          <Button
            className={cn(
              "relative size-[67px] overflow-hidden rounded p-0 [scroll-snap-align:start] hover:shadow-history-thumb",
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
    </section>
  );
}
