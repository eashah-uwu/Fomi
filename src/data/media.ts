export type MediaItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  ratio: "portrait" | "square" | "wide";
};

export type HistoryItem = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

const unsplash = (id: string, width = 720, height = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=88`;

export const promptCopy =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting";

export const generatedImages: MediaItem[] = [
  {
    id: "portrait-1",
    title: "Auburn portrait study",
    src: unsplash("photo-1438761681033-6461ffad8d80"),
    alt: "Smiling woman portrait with soft gallery lighting",
    ratio: "portrait",
  },
  {
    id: "portrait-2",
    title: "Cream sweater front view",
    src: unsplash("photo-1544005313-94ddf0286df2"),
    alt: "Woman in a cream sweater facing the camera",
    ratio: "portrait",
  },
  {
    id: "portrait-3",
    title: "Three-quarter studio pose",
    src: unsplash("photo-1534528741775-53994a69daeb"),
    alt: "Woman posed in three-quarter profile",
    ratio: "portrait",
  },
  {
    id: "portrait-4",
    title: "Warm close portrait",
    src: unsplash("photo-1494790108377-be9c29b29330"),
    alt: "Close portrait of a smiling woman with warm lighting",
    ratio: "portrait",
  },
  {
    id: "portrait-5",
    title: "Soft auburn smile",
    src: unsplash("photo-1508214751196-bcfd4ca60f91"),
    alt: "Smiling woman with auburn hair in soft light",
    ratio: "portrait",
  },
  {
    id: "portrait-6",
    title: "Natural gallery portrait",
    src: unsplash("photo-1517841905240-472988babdf9"),
    alt: "Natural portrait of a woman against a muted backdrop",
    ratio: "portrait",
  },
  {
    id: "portrait-7",
    title: "Side-lit shoulder pose",
    src: unsplash("photo-1524504388940-b1c1722653e1"),
    alt: "Side-lit portrait with gentle shoulder pose",
    ratio: "portrait",
  },
  {
    id: "portrait-8",
    title: "Bright editorial smile",
    src: unsplash("photo-1520813792240-56fc4a3765a7"),
    alt: "Bright editorial portrait with relaxed smile",
    ratio: "portrait",
  },
];

export const alternateImages: MediaItem[] = [
  {
    id: "alt-1",
    title: "Soft studio face",
    src: unsplash("photo-1502823403499-6ccfcf4fb453"),
    alt: "Soft studio portrait of a woman",
    ratio: "portrait",
  },
  {
    id: "alt-2",
    title: "Fine art closeup",
    src: unsplash("photo-1529626455594-4ff0802cfb7e"),
    alt: "Fine art portrait closeup",
    ratio: "portrait",
  },
  {
    id: "alt-3",
    title: "Natural light pose",
    src: unsplash("photo-1487412720507-e7ab37603c6f"),
    alt: "Natural light portrait pose",
    ratio: "portrait",
  },
  {
    id: "alt-4",
    title: "Modern profile",
    src: unsplash("photo-1512316609839-ce289d3eba0a"),
    alt: "Modern profile portrait",
    ratio: "portrait",
  },
];

export const historyItems: HistoryItem[] = [
  {
    id: "history",
    label: "History",
    src: unsplash("photo-1512316609839-ce289d3eba0a", 240, 240),
    alt: "Recent history thumbnail",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    src: unsplash("photo-1519681393784-d120267933ba", 240, 240),
    alt: "Cinematic mountain thumbnail",
  },
  {
    id: "forest",
    label: "Forest",
    src: unsplash("photo-1448375240586-882707db888b", 240, 240),
    alt: "Moody forest thumbnail",
  },
  {
    id: "editorial",
    label: "Editorial",
    src: unsplash("photo-1506794778202-cad84cf45f1d", 240, 240),
    alt: "Editorial portrait thumbnail",
  },
  {
    id: "neon",
    label: "Neon",
    src: unsplash("photo-1519608487953-e999c86e7455", 240, 240),
    alt: "Neon light thumbnail",
  },
  {
    id: "beauty",
    label: "Beauty",
    src: unsplash("photo-1524504388940-b1c1722653e1", 240, 240),
    alt: "Beauty portrait thumbnail",
  },
  {
    id: "studio",
    label: "Studio",
    src: unsplash("photo-1544005313-94ddf0286df2", 240, 240),
    alt: "Studio portrait thumbnail",
  },
  {
    id: "floral",
    label: "Floral",
    src: unsplash("photo-1490750967868-88aa4486c946", 240, 240),
    alt: "Floral arrangement thumbnail",
  },
  {
    id: "paris",
    label: "Paris",
    src: unsplash("photo-1502602898657-3e91760cbb34", 240, 240),
    alt: "Paris scene thumbnail",
  },
  {
    id: "noir",
    label: "Noir",
    src: unsplash("photo-1500530855697-b586d89ba3ee", 240, 240),
    alt: "Noir interior thumbnail",
  },
  {
    id: "anime",
    label: "Anime",
    src: unsplash("photo-1522098543979-ffc7f79dc7e7", 240, 240),
    alt: "Warm illustrated style thumbnail",
  },
  {
    id: "pet",
    label: "Pet",
    src: unsplash("photo-1514888286974-6c03e2ca1dba", 240, 240),
    alt: "Cat thumbnail",
  },
  {
    id: "fashion",
    label: "Fashion",
    src: unsplash("photo-1496747611176-843222e1e57c", 240, 240),
    alt: "Fashion portrait thumbnail",
  },
];
