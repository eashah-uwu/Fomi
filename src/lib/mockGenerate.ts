import { alternateImages, generatedImages, type MediaItem } from "@/data/media";

export type GenerationResult = {
  prompt: string;
  images: MediaItem[];
};

type MockGenerateOptions = {
  count?: number;
  mode?: "image" | "video";
};

export function mockGenerate(prompt: string, options: MockGenerateOptions = {}): Promise<GenerationResult> {
  const normalizedPrompt = prompt.trim();
  const source = normalizedPrompt.length % 2 === 0 ? generatedImages : alternateImages;
  const targetCount = options.mode === "video" ? Math.min(options.count ?? 1, 2) : options.count ?? 4;
  const images = [...source, ...generatedImages].slice(0, 8).map((image, index) => ({
    ...image,
    id: `${image.id}-${Date.now()}-${index}`,
  })).slice(0, targetCount);

  return new Promise((resolve) => {
    window.setTimeout(
      () =>
        resolve({
          prompt: normalizedPrompt,
          images,
        }),
      520,
    );
  });
}
