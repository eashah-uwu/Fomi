import Image from "next/image";
import { Folder, Headphones, Home, ImageIcon, Images, Moon, Video, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Images", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Magic", icon: WandSparkles },
  { label: "Files", icon: Folder },
] as const;

export function TopNav() {
  return (
    <header className="grid h-auto grid-cols-[42px_minmax(0,1fr)] items-start gap-3 px-[18px] pb-3.5 pt-5 md:grid-cols-[80px_minmax(240px,1fr)] md:pb-[18px] lg:h-[90px] lg:grid-cols-[minmax(120px,1fr)_minmax(240px,420px)_minmax(220px,1fr)] lg:gap-[22px] lg:px-[39px] lg:pb-0 lg:pt-[30px]">
      <a
        className="w-7 skew-x-[-7deg] text-[35px] font-black leading-[0.78] tracking-[-0.11em] text-brand no-underline"
        href="#"
        aria-label="Fomi home"
      >
        F
      </a>

      <nav className="grid justify-stretch gap-2.5 md:justify-items-center" aria-label="Primary">
        <div
          className="h-[13px] w-full rounded-full border border-accent/20 bg-soft-light shadow-progress-inset md:w-[min(382px,100%)]"
          aria-hidden="true"
        >
          <span className="ml-[1.5px] mt-[1.5px] block h-2 w-[58px] rounded-full bg-accent" />
        </div>
        <div className="grid w-full grid-cols-5 items-center md:w-[min(390px,100%)]">
          {navItems.map(({ label, icon: Icon }) => (
            <Button className="text-foreground" variant="ghost" size="nav" type="button" key={label} aria-label={label}>
              <Icon className="size-[18px]" strokeWidth={2.7} />
            </Button>
          ))}
        </div>
      </nav>

      <div className="col-span-full flex items-center justify-start gap-[11px] md:justify-end lg:col-auto lg:pt-[9px]">
        <Button className="h-8 px-2.5 text-[10px] font-semibold" variant="soft" radius="sm" type="button">
          <Images className="size-[15px]" strokeWidth={2.4} />
          <span className="hidden sm:inline">Gallery</span>
        </Button>
        <Button className="h-8 px-2.5 text-[10px] font-semibold" variant="soft" radius="sm" type="button">
          <Headphones className="size-[15px]" strokeWidth={2.4} />
          <span className="hidden sm:inline">Support</span>
        </Button>
        <Button className="size-7 text-control-muted" variant="ghost" size="icon" type="button" aria-label="Toggle color mode">
          <Moon className="size-[17px]" strokeWidth={2.4} />
        </Button>
        <Button
          className="relative size-[29px] overflow-hidden p-0 shadow-avatar"
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Open profile"
        >
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80"
            alt="Profile"
            width={28}
            height={28}
            priority
          />
        </Button>
      </div>
    </header>
  );
}
