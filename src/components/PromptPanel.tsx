import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PromptPanelProps = {
  prompt: string;
  isGenerating: boolean;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
};

export function PromptPanel({ prompt, isGenerating, onPromptChange, onGenerate }: PromptPanelProps) {
  return (
    <aside
      className="min-h-[451px] rounded-[17px] border border-accent/10 bg-soft px-[13px] pb-[18px] pt-4 shadow-panel-inset md:min-h-0 lg:min-h-[451px]"
      aria-label="Generation controls"
    >
      <div
        className="mx-1.5 mb-3 grid h-5 grid-cols-2 overflow-hidden rounded-full bg-surface"
        role="tablist"
        aria-label="Generation mode"
      >
        <button
          className="rounded-full bg-soft-strong text-[8px] font-bold text-toggle-copy transition-colors"
          type="button"
          role="tab"
          aria-selected="true"
        >
          Image
        </button>
        <button
          className="rounded-full bg-transparent text-[8px] font-bold text-toggle-muted transition-colors hover:bg-soft"
          type="button"
          role="tab"
          aria-selected="false"
        >
          Video
        </button>
      </div>

      <label className="sr-only" htmlFor="prompt-input">
        Describe the image to generate
      </label>
      <div className="relative mb-[19px] min-h-[170px]">
        <textarea
          className="min-h-[170px] w-full resize-none rounded-2xl border-[1.5px] border-input-border bg-surface px-[11px] pb-[58px] pt-5 text-[11px] font-semibold leading-[1.45] text-foreground shadow-field outline-none placeholder:text-placeholder focus:border-accent focus:ring-4 focus:ring-accent/15"
          id="prompt-input"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe you imaginations to be converted to piece of art ...."
          rows={7}
        />
        <Button
          className="absolute bottom-3 right-2.5 h-[33px] min-w-[118px] px-4 text-sm font-bold"
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
        >
          <Sparkles className="size-[18px]" strokeWidth={2.4} />
          <span>{isGenerating ? "Creating" : "Generate"}</span>
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-[76px_48px_1fr] gap-[5px]" aria-label="Generation settings">
        <Button variant="white" size="chip" type="button">
          # Images
        </Button>
        <Select defaultValue="1:1">
          <SelectTrigger aria-label="Number of images">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">1:1</SelectItem>
            <SelectItem value="4:5">4:5</SelectItem>
            <SelectItem value="16:9">16:9</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="white" size="chip" type="button">
          <span>Model: </span>
          <strong>Name</strong>
          <ChevronDown className="size-3" strokeWidth={2.4} />
        </Button>
      </div>

      <div className="grid gap-6">
        <Button className="h-[33px] justify-center gap-[53px] text-sm font-semibold" variant="white" size="pill" type="button">
          <span>Advance</span>
          <span className="grid size-[17px] place-items-center rounded-full bg-control-chip text-control-chip-copy" aria-hidden="true">
            <ChevronDown className="size-3" strokeWidth={2.4} />
          </span>
        </Button>
        <Button className="h-[33px] justify-center gap-[53px] text-sm font-semibold" variant="white" size="pill" type="button">
          <span>Styles</span>
          <span className="grid size-[17px] place-items-center rounded-full bg-control-chip text-control-chip-copy" aria-hidden="true">
            <ChevronDown className="size-3" strokeWidth={2.4} />
          </span>
        </Button>
      </div>
    </aside>
  );
}
