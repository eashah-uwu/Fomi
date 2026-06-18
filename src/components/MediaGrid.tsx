import Image from "next/image";
import type { MediaItem } from "@/data/media";

type MediaGridProps = {
  items: MediaItem[];
  isLoading: boolean;
};

export function MediaGrid({ items, isLoading }: MediaGridProps) {
  return (
    <section
      className="grid w-full grid-flow-dense grid-cols-2 gap-3 min-[821px]:grid-cols-3 min-[821px]:gap-3 min-[1181px]:grid-cols-4 min-[1181px]:gap-x-[13px] min-[1181px]:gap-y-5"
      aria-label="Generated media"
    >
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              className="min-h-[145px] animate-[skeleton-sheen_1s_ease-in-out_infinite] rounded-[7px] bg-soft-skeleton bg-[image:var(--skeleton-background)] bg-[length:220%_100%] min-[821px]:min-h-40"
              key={`skeleton-${index}`}
              aria-hidden="true"
            />
          ))
        : items.map((item, index) => (
            <button
              className="relative block aspect-[1/0.95] min-h-[145px] w-full overflow-hidden rounded-[7px] border-0 bg-soft shadow-media transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-media-hover active:translate-y-px min-[821px]:min-h-40"
              type="button"
              key={item.id}
              aria-label={item.title}
            >
              <Image
                className="transition-[filter,transform] duration-500 hover:scale-[1.045] hover:saturate-[1.05] hover:contrast-[1.04]"
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 4}
                sizes="(max-width: 768px) 46vw, (max-width: 1200px) 22vw, 180px"
              />
            </button>
          ))}
    </section>
  );
}
