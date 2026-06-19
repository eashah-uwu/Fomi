import type { KeyboardEvent } from "react";
import { Check, ChevronDown, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DropdownId } from "@/lib/dropdowns";
import { cn } from "@/lib/utils";

export type GenerationMode = "image" | "video";

export type GenerationSettings = {
  count: string;
  ratio: string;
  model: string;
  style: string;
  quality: string;
};

type PromptPanelProps = {
  prompt: string;
  mode: GenerationMode;
  settings: GenerationSettings;
  activeDropdown: DropdownId | null;
  isGenerating: boolean;
  onPromptChange: (value: string) => void;
  onModeChange: (mode: GenerationMode) => void;
  onSettingsChange: (settings: Partial<GenerationSettings>) => void;
  onDropdownChange: (dropdown: DropdownId | null) => void;
  onGenerate: () => void;
};

export function PromptPanel({
  prompt,
  mode,
  settings,
  activeDropdown,
  isGenerating,
  onPromptChange,
  onModeChange,
  onSettingsChange,
  onDropdownChange,
  onGenerate,
}: PromptPanelProps) {
  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onGenerate();
    }
  };

  const handleOpenChange = (dropdown: DropdownId) => (open: boolean) => {
    if (open) {
      onDropdownChange(dropdown);
    } else if (activeDropdown === dropdown) {
      onDropdownChange(null);
    }
  };

  return (
    <aside
      className="w-full min-w-0 rounded-[17px] border border-accent/10 bg-soft p-4 shadow-panel-inset sm:p-[17px] lg:min-h-[500px]"
      aria-label="Generation controls"
    >
      <div
        className="mx-1.5 mb-4 grid h-7 grid-cols-2 gap-1 overflow-hidden rounded-full bg-surface p-1"
        role="tablist"
        aria-label="Generation mode"
      >
        <Button
          className={cn(
            "h-full min-h-0 rounded-full px-3 text-[10px] font-bold transition-colors active:translate-y-0",
            mode === "image" ? "bg-soft-strong text-toggle-copy shadow-control" : "bg-transparent text-toggle-muted hover:bg-soft",
          )}
          variant="ghost"
          size="nav"
          type="button"
          role="tab"
          aria-selected={mode === "image"}
          onClick={() => onModeChange("image")}
        >
          Image
        </Button>
        <Button
          className={cn(
            "h-full min-h-0 rounded-full px-3 text-[10px] font-bold transition-colors active:translate-y-0",
            mode === "video" ? "bg-soft-strong text-toggle-copy shadow-control" : "bg-transparent text-toggle-muted hover:bg-soft",
          )}
          variant="ghost"
          size="nav"
          type="button"
          role="tab"
          aria-selected={mode === "video"}
          onClick={() => onModeChange("video")}
        >
          Video
        </Button>
      </div>

      <label className="sr-only" htmlFor="prompt-input">
        Describe the image to generate
      </label>
      <div className="relative mb-5 min-h-[225px] rounded-2xl border border-border bg-surface shadow-field transition-[border-color,box-shadow] focus-within:border-accent/50 focus-within:ring-4 focus-within:ring-accent/15">
        <textarea
          className="prompt-input-scrollbar absolute inset-y-1.5 left-1.5 right-2.5 w-auto resize-none rounded-xl border-0 bg-transparent pb-[58px] pl-[7px] pr-2 pt-[14px] text-[11px] leading-[1.45] text-foreground outline-none placeholder:text-placeholder"
          id="prompt-input"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          onKeyDown={handlePromptKeyDown}
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

      <div className="mb-5 grid min-w-0 grid-cols-[minmax(0,1.15fr)_minmax(0,.8fr)_minmax(0,1fr)] gap-1.5" aria-label="Generation settings">
        <Select
          open={activeDropdown === "count"}
          value={settings.count}
          onOpenChange={handleOpenChange("count")}
          onValueChange={(count) => onSettingsChange({ count })}
        >
          <SelectTrigger className="w-full min-w-0 px-2 text-center text-[11px] sm:text-xs" aria-label={mode === "image" ? "Number of images" : "Number of videos"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{mode === "image" ? "1 image" : "1 video"}</SelectItem>
            <SelectItem value="2">{mode === "image" ? "2 images" : "2 videos"}</SelectItem>
            <SelectItem value="4">{mode === "image" ? "4 images" : "4 videos"}</SelectItem>
          </SelectContent>
        </Select>
        <Select
          open={activeDropdown === "ratio"}
          value={settings.ratio}
          onOpenChange={handleOpenChange("ratio")}
          onValueChange={(ratio) => onSettingsChange({ ratio })}
        >
          <SelectTrigger className="w-full min-w-0 px-2 text-center text-[11px] sm:text-xs" aria-label="Aspect ratio">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">1:1</SelectItem>
            <SelectItem value="4:5">4:5</SelectItem>
            <SelectItem value="16:9">16:9</SelectItem>
          </SelectContent>
        </Select>
        <Select
          open={activeDropdown === "model"}
          value={settings.model}
          onOpenChange={handleOpenChange("model")}
          onValueChange={(model) => onSettingsChange({ model })}
        >
          <SelectTrigger className="w-full min-w-0 px-2 text-center text-[11px] sm:text-xs" aria-label="Model">
            <SelectValue>{settings.model.replace("Fomi ", "")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fomi Real">Real</SelectItem>
            <SelectItem value="Fomi Art">Art</SelectItem>
            <SelectItem value="Fomi Motion">Motion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <DropdownMenu
          modal={false}
          open={activeDropdown === "advance"}
          onOpenChange={handleOpenChange("advance")}
        >
          <DropdownMenuTrigger asChild>
            <Button
              className="h-[33px] w-full justify-center gap-[53px] text-sm font-normal"
              variant="white"
              size="pill"
              type="button"
            >
              <span>Advance</span>
              <span
                className="grid size-[17px] place-items-center rounded-full bg-control-chip text-control-chip-copy"
                aria-hidden="true"
              >
                <ChevronDown
                  className={cn("size-3 transition-transform", activeDropdown === "advance" && "rotate-180")}
                  strokeWidth={2.4}
                />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={8}
            className="grid grid-cols-2 gap-2 rounded-2xl border-border bg-surface p-2 shadow-select-content"
          >
            {["Balanced", "Detailed"].map((quality) => (
              <DropdownMenuItem
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-center gap-1 rounded-full text-[10px] font-bold",
                  settings.quality === quality
                    ? "bg-accent text-surface focus:bg-accent focus:text-surface"
                    : "bg-soft-light text-control-text focus:bg-soft focus:text-control-text",
                )}
                key={quality}
                onSelect={() => onSettingsChange({ quality })}
              >
                {settings.quality === quality ? (
                  <Check className="size-3" strokeWidth={2.4} />
                ) : (
                  <SlidersHorizontal className="size-3" strokeWidth={2.4} />
                )}
                {quality}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu
          modal={false}
          open={activeDropdown === "styles"}
          onOpenChange={handleOpenChange("styles")}
        >
          <DropdownMenuTrigger asChild>
            <Button
              className="h-[33px] w-full justify-center gap-[53px] text-sm font-normal"
              variant="white"
              size="pill"
              type="button"
            >
              <span>Styles</span>
              <span
                className="grid size-[17px] place-items-center rounded-full bg-control-chip text-control-chip-copy"
                aria-hidden="true"
              >
                <ChevronDown
                  className={cn("size-3 transition-transform", activeDropdown === "styles" && "rotate-180")}
                  strokeWidth={2.4}
                />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={8}
            className="grid grid-cols-2 gap-2 rounded-2xl border-border bg-surface p-2 shadow-select-content"
          >
            {["Portrait", "Cinematic", "Editorial", "Anime"].map((style) => (
              <DropdownMenuItem
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-center rounded-full text-[10px] font-bold",
                  settings.style === style
                    ? "bg-accent text-surface focus:bg-accent focus:text-surface"
                    : "bg-soft-light text-control-text focus:bg-soft focus:text-control-text",
                )}
                key={style}
                onSelect={() => onSettingsChange({ style })}
              >
                {style}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
