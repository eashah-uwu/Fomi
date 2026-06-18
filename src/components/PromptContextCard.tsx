import { Button } from "@/components/ui/button";

type PromptContextCardProps = {
  prompt: string;
};

export function PromptContextCard({ prompt }: PromptContextCardProps) {
  return (
    <div className="hidden gap-[161px] min-[1181px]:grid">
      <div
        className="h-[113px] rounded-b-[17px] border border-accent/35 bg-soft-canvas"
        aria-hidden="true"
      />
      <article className="grid min-h-[197px] content-between rounded-[15px] bg-soft py-[10px] pl-[10px] text-panel-copy">
        <p className="max-h-[142px] overflow-hidden pr-3 text-[11px] font-semibold leading-[1.26]">{prompt}</p>
        <Button
          className="h-[29px] w-12 justify-self-end rounded-l-lg rounded-r-none p-0 text-xs font-bold"
          variant="white"
          type="button"
        >
          Model
        </Button>
      </article>
    </div>
  );
}
