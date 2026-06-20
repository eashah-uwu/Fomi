"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Folder,
  Heart,
  Home,
  ImageIcon,
  MoreVertical,
  Moon,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Video,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const imageUrl = (id: string, width = 900, height = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=90`;

const portraitImages = [
  imageUrl("photo-1438761681033-6461ffad8d80", 1100, 1400),
  imageUrl("photo-1494790108377-be9c29b29330", 700, 700),
  imageUrl("photo-1544005313-94ddf0286df2", 700, 700),
  imageUrl("photo-1534528741775-53994a69daeb", 700, 700),
];

const historyItems = [
  ["Redhead portrait", "photo-1438761681033-6461ffad8d80"],
  ["Mountain", "photo-1519681393784-d120267933ba"],
  ["Forest", "photo-1448375240586-882707db888b"],
  ["Editorial", "photo-1506794778202-cad84cf45f1d"],
  ["Neon", "photo-1519608487953-e999c86e7455"],
  ["Beauty", "photo-1524504388940-b1c1722653e1"],
  ["Studio", "photo-1544005313-94ddf0286df2"],
  ["Floral", "photo-1490750967868-88aa4486c946"],
  ["Paris", "photo-1502602898657-3e91760cbb34"],
  ["Noir", "photo-1500530855697-b586d89ba3ee"],
  ["Cinematic", "photo-1517841905240-472988babdf9"],
  ["Cat", "photo-1514888286974-6c03e2ca1dba"],
] as const;

type TimelineItem = {
  prompt: string;
  model: string;
  time: string;
  images: string[];
};

const timelineItems: TimelineItem[] = [
  {
    prompt:
      "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair...",
    model: "Real",
    time: "10:42 PM",
    images: portraitImages,
  },
  {
    prompt: "Cinematic low light portrait of a woman in a trench coat on a rainy city street, neon reflections, moody atmosphere",
    model: "Real",
    time: "9:58 PM",
    images: [
      imageUrl("photo-1517841905240-472988babdf9", 420, 320),
      imageUrl("photo-1502823403499-6ccfcf4fb453", 420, 320),
      imageUrl("photo-1487412720507-e7ab37603c6f", 420, 320),
      imageUrl("photo-1512316609839-ce289d3eba0a", 420, 320),
    ],
  },
  {
    prompt: "Minimal product shot of a perfume bottle on a stone pedestal, soft shadows, neutral beige tones",
    model: "Real",
    time: "9:31 PM",
    images: [
      imageUrl("photo-1541643600914-78b084683601", 420, 320),
      imageUrl("photo-1523293182086-7651a899d37f", 420, 320),
      imageUrl("photo-1594035910387-fea47794261f", 420, 320),
      imageUrl("photo-1592945403244-b3fbafd7f539", 420, 320),
    ],
  },
  {
    prompt: "Surreal scene of a floating island above the clouds, ancient tree, dreamy lighting",
    model: "Real",
    time: "8:50 PM",
    images: [
      imageUrl("photo-1500530855697-b586d89ba3ee", 420, 320),
      imageUrl("photo-1519681393784-d120267933ba", 420, 320),
      imageUrl("photo-1448375240586-882707db888b", 420, 320),
      imageUrl("photo-1501785888041-af3ef285b470", 420, 320),
    ],
  },
];

const initialPrompt =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting";

export default function BonusPage() {
  const [mode, setMode] = useState<"Image" | "Video">("Image");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [activeWorkspace, setActiveWorkspace] = useState("images");
  const [heroImage, setHeroImage] = useState(portraitImages[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExtra, setShowExtra] = useState(false);

  const displayedTimeline = useMemo(
    () =>
      showExtra
        ? [
            ...timelineItems,
            {
              prompt: "Editorial fashion portrait with sculptural light and a quiet, gallery-like composition",
              model: "Real",
              time: "8:16 PM",
              images: [
                imageUrl("photo-1496747611176-843222e1e57c", 420, 320),
                imageUrl("photo-1529139574466-a303027c1d8b", 420, 320),
                imageUrl("photo-1524250502761-1ac6f2e30d43", 420, 320),
                imageUrl("photo-1485968579580-b6d095142e6e", 420, 320),
              ],
            },
          ]
        : timelineItems,
    [showExtra],
  );

  const generate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    window.setTimeout(() => {
      setHeroImage(portraitImages[(portraitImages.indexOf(heroImage) + 1) % portraitImages.length]);
      setIsGenerating(false);
    }, 900);
  };

  return (
<main className="bonus-page min-h-[100dvh] overflow-x-clip bg-[#f8f1ed] p-2 text-[#11110f] sm:p-3 md:p-4 xl:min-h-[100dvh]">    
<div className="mx-auto grid min-h-[calc(100dvh-16px)] min-w-0 max-w-[1920px] grid-cols-1 gap-3 sm:min-h-[calc(100dvh-24px)] md:min-h-[calc(100dvh-32px)] md:grid-cols-[300px_minmax(0,1fr)] md:gap-4 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[minmax(280px,320px)_minmax(0,1fr)_minmax(300px,380px)] xl:grid-rows-[178px_minmax(0,1fr)]">
  <aside className="bonus-panel flex min-w-0 flex-col overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 md:row-span-2 md:max-h-[calc(100dvh-32px)] md:min-h-0 md:px-5 md:py-5 lg:px-6 xl:row-span-2 xl:pb-4 xl:pt-4">          <div className="flex items-center gap-2">
            <span className="text-[30px] font-black tracking-[-0.07em]">FOMI</span>
            <Sparkles className="size-5 fill-[#e56e4d] text-[#e56e4d]" strokeWidth={1.6} />
          </div>

          <h1 className="mt-6 max-w-[250px] text-[23px] font-black leading-[1.17] tracking-[-0.04em] sm:mt-8 sm:text-[25px] md:mt-5">
            Make the image you can’t stop <span className="text-[#e56e4d]">thinking about.</span>
          </h1>

          <nav className="mt-2 w-full px-1" aria-label="Workspace navigation">
            <div className="h-[3px] overflow-hidden rounded-full bg-[#fff3ee]">
              <span className="block h-full w-[16%] rounded-full bg-[#dc7d60]" />
            </div>
            <div className="mt-1 grid grid-cols-5">
              {[
                { id: "home", label: "Home", icon: Home },
                { id: "images", label: "Images", icon: ImageIcon },
                { id: "video", label: "Video", icon: Video },
                { id: "magic", label: "Magic", icon: WandSparkles },
                { id: "files", label: "Files", icon: Folder },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`mx-auto size-7 rounded-[8px] active:translate-y-0 ${
                    activeWorkspace === id
                      ? "bg-[#fbebe4] text-[#d86444]"
                      : "text-[#11110f] hover:bg-[#fff4ef]"
                  }`}
                  aria-label={label}
                  aria-pressed={activeWorkspace === id}
                  onClick={() => setActiveWorkspace(id)}
                >
                  <Icon className="size-[15px]" strokeWidth={1.9} />
                </Button>
              ))}
            </div>
          </nav>
          <div className="bonus-sidebar-scroll mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pr-1">
          <Tabs
            className="mt-2"
            value={mode}
            onValueChange={(value) => setMode(value as "Image" | "Video")}
          >
            <TabsList className="grid h-11 w-full grid-cols-2 rounded-[13px] bg-white p-1 shadow-[0_5px_24px_rgba(83,48,34,0.06)] sm:h-[48px] sm:p-[5px]">
              {(["Image", "Video"] as const).map((item) => (
                <TabsTrigger
                  key={item}
                  value={item}
                  className="h-full rounded-[10px] text-[12px] font-medium text-[#1e1b19] transition-[background,color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(.32,.72,0,1)] hover:bg-[#fbf5f2] data-[state=active]:bg-[#fbebe4] data-[state=active]:text-[#df5939] data-[state=active]:shadow-[inset_0_0_0_1px_rgba(227,111,77,0.16)]"
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-2 rounded-[24px] bg-[#eaded7] p-[5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <div className="relative h-[250px] rounded-[20px] bg-white shadow-[inset_0_0_0_1px_rgba(60,45,38,0.18)] sm:h-[290px] md:h-[clamp(190px,24vh,250px)] xl:h-[clamp(155px,17.5vh,185px)]">
              <textarea
                className="bonus-scrollbar absolute inset-0 h-full w-full resize-none rounded-[20px] bg-transparent px-4 pb-14 pt-5 text-[12px] leading-[1.65] outline-none"
                maxLength={1000}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                aria-label="Generation prompt"
              />
              <span className="pointer-events-none absolute bottom-4 left-4 text-[11px] text-[#85817d]">
                {prompt.length} / 1000
              </span>
        
            </div>
          </div>

          <div className="mt-2 grid min-w-0 grid-cols-[minmax(0,1.08fr)_minmax(0,.78fr)_minmax(0,1fr)] gap-1.5 sm:gap-2">
            <BonusSelect label="Image count" value="4 images" values={["1 image", "2 images", "4 images"]} />
            <BonusSelect label="Aspect ratio" value="1:1" values={["1:1", "4:5", "16:9"]} />
            <BonusSelect label="Model" value="Real" values={["Real", "Art", "Motion"]} />
          </div>

          <div className="mt-2 grid gap-2">
            <Button
              type="button"
              variant="white"
              radius="md"
              className="h-[42px] justify-between rounded-[14px] px-5 text-[13px] font-semibold shadow-[0_5px_22px_rgba(83,48,34,0.05)]"
            >
              Advance
              <SlidersHorizontal className="size-[17px]" strokeWidth={1.6} />
            </Button>
            <Button
              type="button"
              variant="white"
              radius="md"
              className="h-[42px] justify-between rounded-[14px] px-5 text-[13px] font-semibold shadow-[0_5px_22px_rgba(83,48,34,0.05)]"
            >
              Styles
              <Sparkles className="size-[17px]" strokeWidth={1.6} />
            </Button>
          </div>

          <Button
            type="button"
            className="group mb-0 mt-2 h-[52px] w-full shrink-0 rounded-[16px] bg-[#e66d4c] text-[18px] font-bold text-white shadow-[0_18px_38px_rgba(226,103,70,0.22)] hover:bg-[#dc6241] active:scale-[0.985] active:translate-y-0"
            disabled={isGenerating}
            onClick={generate}
          >
            <Sparkles
              className={`size-7 transition-transform duration-700 [transition-timing-function:cubic-bezier(.32,.72,0,1)] ${
                isGenerating ? "animate-spin" : "group-hover:rotate-12 group-hover:scale-110"
              }`}
              strokeWidth={1.8}
            />
            {isGenerating ? "Creating" : "Generate"}
          </Button>

          <div className="mt-4 flex min-h-8 shrink-0 items-end gap-3 pt-1 md:mt-auto md:pt-3">
            <span className="grid size-8 place-items-center rounded-full bg-[#191919] text-[12px] text-white">N</span>
            <div className="flex items-center rounded-full bg-white p-0.5 shadow-[0_5px_18px_rgba(83,48,34,0.07)]">
              <Button type="button" variant="ghost" size="icon" className="size-6 text-[#e56e4d]">
                <Sun className="size-3.5" strokeWidth={1.6} />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="size-6 text-[#b89689]">
                <Moon className="size-3" strokeWidth={1.6} />
              </Button>
            </div>
          </div>
          </div>
        </aside>

        <section className="bonus-panel min-w-0 px-4 py-4 sm:px-5 md:col-start-2 md:px-5 lg:px-6 xl:col-span-2 xl:col-start-2">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-[14px] font-bold">History</h2>
              <span className="grid gap-[3px]" aria-hidden="true">
                <i className="block h-px w-3 bg-black" />
                <i className="block h-px w-2 bg-black" />
                <i className="block h-px w-1 bg-black" />
              </span>
            </div>
          </div>
          <div className="bonus-history-scroll flex min-w-0 items-center gap-2.5 overflow-x-auto p-1 sm:gap-3 xl:gap-4">
            {historyItems.map(([label, imageId], index) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                size="nav"
                radius="none"
                aria-label={`Open ${label}`}
                className="relative size-16 min-h-0 shrink-0 overflow-hidden rounded-[8px] p-0 ring-1 ring-black/[0.03] active:translate-y-0 sm:size-[70px] xl:size-[78px] min-[1500px]:size-[82px]"
                onClick={() => {
                  setSelectedHistory(index);
                  setHeroImage(imageUrl(imageId, 1100, 1400));
                }}
              >
                <Image src={imageUrl(imageId, 240, 240)} alt={label} fill sizes="82px" />
                {selectedHistory === index ? (
                  <span
                    className="pointer-events-none absolute inset-0 z-10 rounded-[8px] border-[3px] border-[#e56e4d]"
                    aria-hidden="true"
                  />
                ) : null}
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-auto size-9 shrink-0 bg-[#fff2ec] text-[#d76545] hover:bg-[#fde8df] sm:size-10"
              aria-label="Next history items"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </Button>
          </div>
        </section>

        <section className="min-w-0 rounded-[22px] bg-white/70 p-1 shadow-[0_18px_60px_rgba(91,53,38,0.06),inset_0_0_0_1px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-[5px] md:col-start-2 md:row-start-2 md:min-h-0 xl:col-start-2 xl:row-start-2">
          <div className="flex h-full min-h-0 flex-col rounded-[19px] bg-[#fffdfc] p-3 shadow-[inset_0_0_0_1px_rgba(220,190,178,0.44)] sm:rounded-[24px] sm:p-4 lg:p-5">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-[minmax(0,2.25fr)_minmax(130px,.9fr)] xl:grid-cols-[minmax(0,2.65fr)_minmax(165px,1fr)]">
              <div className="group relative aspect-[4/5] min-h-0 overflow-hidden rounded-[11px] bg-[#ece4df] sm:aspect-[4/3] md:aspect-auto md:min-h-[470px] xl:min-h-0">
                <Image
                  key={heroImage}
                  src={heroImage}
                  alt="Selected generated portrait"
                  fill
                  priority
                  sizes="(max-width: 639px) 94vw, (max-width: 767px) 90vw, (max-width: 1279px) 62vw, 46vw"
                  className="animate-[bonus-fade_.55s_cubic-bezier(.32,.72,0,1)]"
                />
                <div className="absolute left-0 top-1/2 grid -translate-y-1/2 overflow-hidden rounded-r-xl bg-white/90 shadow-[0_12px_30px_rgba(48,31,24,0.12)]">
                  {[Heart, Download, MoreVertical].map((Icon, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="ghost"
                      size="icon"
                      radius="none"
                      className="size-12 rounded-none hover:bg-[#fff2ec]"
                    >
                      <Icon className="size-[19px]" strokeWidth={1.5} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid min-h-0 grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-1 md:grid-rows-3">
                {portraitImages.slice(1).map((src, index) => (
                  <Button
                    key={src}
                    type="button"
                    variant="ghost"
                    size="nav"
                    radius="none"
                    className="relative aspect-square min-h-0 overflow-hidden rounded-[11px] p-0 active:translate-y-0 md:aspect-auto"
                    onClick={() => setHeroImage(src)}
                    aria-label={`Select portrait variation ${index + 2}`}
                  >
                    <Image src={src} alt="" fill sizes="(max-width: 699px) 30vw, 210px" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[14px] bg-white px-4 py-3 text-[10px] shadow-[inset_0_0_0_1px_rgba(218,197,187,0.42)] sm:mt-4 sm:gap-x-5 sm:px-5 sm:py-4 sm:text-[11px] lg:mt-6 lg:px-6 lg:py-5">
              <span className="rounded-lg bg-[#fff0e9] px-3 py-1.5 font-medium text-[#d75e3c]">Real</span>
              <span>1:1</span>
              <span>•</span>
              <span>4 images</span>
              <span>•</span>
              <span>Today&nbsp; 10:42 PM</span>
            </div>
          </div>
        </section>

<aside className="bonus-panel flex min-w-0 flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:row-span-2 md:max-h-[calc(100dvh-32px)] md:min-h-0 md:px-5 md:py-5 lg:px-6 xl:row-span-2 xl:pb-4 xl:pt-4">
  <div className="bonus-timeline-scroll min-h-0 flex-1 overflow-visible pl-2 pr-0 sm:pl-3 xl:overflow-y-auto xl:overflow-x-hidden xl:pr-1">
              {displayedTimeline.map((item, index) => (
              <article
                key={`${item.time}-${index}`}
                className={`relative grid min-h-0 cursor-pointer grid-cols-1 gap-3 rounded-[16px] px-3 py-4 outline-none transition-[background,box-shadow,transform] duration-300 [transition-timing-function:cubic-bezier(.32,.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#e56e4d]/30 sm:grid-cols-[minmax(0,.9fr)_minmax(180px,1.22fr)] sm:gap-4 sm:rounded-[18px] sm:px-4 sm:py-3 md:min-h-[170px] xl:min-h-[185px] xl:grid-cols-[minmax(0,.9fr)_minmax(150px,1.22fr)] ${
                  selectedTimeline === index
                    ? "bg-[#fbebe4] shadow-[inset_0_0_0_1px_rgba(229,110,77,0.10)]"
                    : "hover:bg-[#fff8f5]"
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTimeline === index}
                onClick={() => {
                  setSelectedTimeline(index);
                  setHeroImage(item.images[0]);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedTimeline(index);
                    setHeroImage(item.images[0]);
                  }
                }}
              >
                <span
                  className={`absolute left-0 top-8 size-2.5 rounded-full border-2 border-white ${
                    selectedTimeline === index ? "bg-[#e56e4d]" : "bg-[#dcb5a5]"
                  }`}
                />
                {index < displayedTimeline.length - 1 ? (
                  <span className="absolute left-[4px] top-10 h-[calc(100%+2px)] w-px bg-[#efd9d0]" />
                ) : null}

                <div className="flex min-w-0 flex-col">
                  <p className="text-[11px] leading-[1.5]">{item.prompt}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-[10px]">
                    <span className="rounded-lg bg-[#f7dfd5] px-2 py-1.5">{item.model}</span>
                    <time className="whitespace-nowrap text-[#554e4a]">{item.time}</time>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-2">
                  {item.images.map((src, imageIndex) => (
                    <Button
                      key={`${src}-${imageIndex}`}
                      type="button"
                      variant="ghost"
                      size="nav"
                      radius="none"
                      className="relative aspect-square min-h-0 overflow-hidden rounded-[7px] p-0 active:translate-y-0 sm:aspect-auto sm:min-h-[72px]"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedTimeline(index);
                        setHeroImage(src);
                      }}
                      aria-label={`Open result ${imageIndex + 1}`}
                    >
                      <Image src={src} alt="" fill sizes="110px" />
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Button
            type="button"
            variant="white"
            radius="md"
            className="mt-3 h-11 w-full justify-center gap-10 rounded-[14px] text-[11px] font-medium shadow-[inset_0_0_0_1px_rgba(218,197,187,0.42)] sm:h-[50px] sm:gap-16"
            onClick={() => setShowExtra((value) => !value)}
          >
            {showExtra ? "Show less" : "Load more"}
            <ChevronDown
              className={`size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(.32,.72,0,1)] ${
                showExtra ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </Button>
        </aside>
      </div>

      <style jsx global>{`
        .bonus-page {
          font-family: Poppins, "Avenir Next", "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 42% 0%, rgba(255, 255, 255, 0.92), transparent 34rem),
            #f8f1ed;
        }

        .bonus-panel {
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.88);
          box-shadow:
            0 24px 70px rgba(87, 50, 35, 0.055),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

      .bonus-history-scroll,
.bonus-timeline-scroll,
.bonus-scrollbar,
.bonus-sidebar-scroll {
  scrollbar-width: none;
}

      .bonus-history-scroll::-webkit-scrollbar,
.bonus-timeline-scroll::-webkit-scrollbar,
.bonus-scrollbar::-webkit-scrollbar,
.bonus-sidebar-scroll::-webkit-scrollbar {
  display: none;
}

        @keyframes bonus-fade {
          from {
            opacity: 0.25;
            transform: scale(1.018);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 1279px) {
          .bonus-panel {
            border-radius: 22px;
          }
        }

        @media (max-width: 639px) {
          .bonus-panel {
            border-radius: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bonus-page *,
          .bonus-page *::before,
          .bonus-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

function BonusSelect({
  label,
  value,
  values,
}: {
  label: string;
  value: string;
  values: string[];
}) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger
        aria-label={label}
        className="h-10 w-full min-w-0 rounded-[12px] border-0 bg-white px-2 text-[10px] font-medium shadow-[0_5px_20px_rgba(83,48,34,0.05)] sm:h-[44px] sm:rounded-[13px] sm:px-3 sm:text-[11px]"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-[#edddd5] bg-white shadow-[0_18px_50px_rgba(83,48,34,0.14)]">
        {values.map((item) => (
          <SelectItem key={item} value={item} className="text-[11px]">
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
