import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaItem } from "@/data/media";

type MediaGridProps = {
  items: MediaItem[];
  isLoading: boolean;
  mode: "image" | "video";
  onItemSelect: (item: MediaItem) => void;
};

export function MediaGrid({ items, isLoading, mode, onItemSelect }: MediaGridProps) {
  return (
    <section
      className="grid min-w-0 w-full grid-flow-dense grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-[13px] xl:gap-y-5"
      aria-label="Generated media"
    >
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              className="aspect-square min-h-0 animate-[skeleton-sheen_1s_ease-in-out_infinite] rounded-[7px] bg-soft-skeleton bg-[image:var(--skeleton-background)] bg-[length:220%_100%] sm:aspect-[1/0.95] lg:min-h-36 xl:min-h-40"
              key={`skeleton-${index}`}
              aria-hidden="true"
            />
          ))
        : items.map((item, index) => (
            <Button
              className="relative block aspect-square min-h-0 w-full overflow-hidden rounded-[7px] border-0 bg-soft p-0 shadow-media transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-media-hover active:translate-y-px sm:aspect-[1/0.95] lg:min-h-36 xl:min-h-40"
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
                priority={index < 4}
                sizes="(max-width: 768px) 46vw, (max-width: 1200px) 22vw, 180px"
              />
              {mode === "video" ? (
                <span className="absolute inset-0 grid place-items-center bg-foreground/10">
                  <span className="grid size-10 place-items-center rounded-full bg-surface/90 text-accent shadow-control">
                    <Play className="ml-0.5 size-5 fill-current" strokeWidth={2.2} />
                  </span>
                </span>
              ) : null}
            </Button>
          ))}
    </section>
  );
}
