import { alternateImages, generatedImages, type MediaItem } from "@/data/media";

export type GenerationResult = {
  prompt: string;
  images: MediaItem[];
};

export function mockGenerate(prompt: string): Promise<GenerationResult> {
  const normalizedPrompt = prompt.trim();
  const source = normalizedPrompt.length % 2 === 0 ? generatedImages : alternateImages;
  const images = [...source, ...generatedImages].slice(0, 8).map((image, index) => ({
    ...image,
    id: `${image.id}-${Date.now()}-${index}`,
  }));

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
