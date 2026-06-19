import Image from "next/image";
import {
  Check,
  Folder,
  Headphones,
  Home,
  ImageIcon,
  Images,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Video,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownId } from "@/lib/dropdowns";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Images", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Magic", icon: WandSparkles },
  { label: "Files", icon: Folder },
] as const;

export type NavTab = (typeof navItems)[number]["label"];

type TopNavProps = {
  activeTab: NavTab;
  activeDropdown: DropdownId | null;
  isHistoryExpanded: boolean;
  isDark: boolean;
  onTabChange: (tab: NavTab) => void;
  onDropdownChange: (dropdown: DropdownId | null) => void;
  onThemeToggle: () => void;
};

export function TopNav({
  activeTab,
  activeDropdown,
  isHistoryExpanded,
  isDark,
  onTabChange,
  onDropdownChange,
  onThemeToggle,
}: TopNavProps) {
  const activeIndex = navItems.findIndex((item) => item.label === activeTab);
  const handleOpenChange = (dropdown: DropdownId) => (open: boolean) => {
    if (open) {
      onDropdownChange(dropdown);
    } else if (activeDropdown === dropdown) {
      onDropdownChange(null);
    }
  };

  return (
    <header className="relative grid h-auto grid-cols-[42px_minmax(0,1fr)] items-start gap-3 px-[18px] pb-3.5 pt-5 md:grid-cols-[80px_minmax(240px,1fr)] md:pb-[18px] lg:h-[90px] lg:grid-cols-[minmax(120px,1fr)_minmax(240px,420px)_minmax(220px,1fr)] lg:gap-[22px] lg:px-[39px] lg:pb-0 lg:pt-[30px]">
      <a
        className="w-7 skew-x-[-7deg] text-[35px] font-black leading-[0.78] tracking-[-0.11em] text-brand no-underline"
        href="#"
        aria-label="Fomi home"
      >
        F
      </a>

      <DropdownMenu
        modal={false}
        open={activeDropdown === "nav-mobile"}
        onOpenChange={handleOpenChange("nav-mobile")}
      >
        <DropdownMenuTrigger asChild>
          <Button
            className="justify-self-end text-foreground md:hidden"
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Open navigation"
          >
            <Menu className="size-6" strokeWidth={2.2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-[min(280px,calc(100vw-32px))] rounded-2xl border-border bg-surface p-2 text-copy shadow-select-content md:hidden"
        >
          <DropdownMenuItem
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium focus:bg-soft focus:text-copy"
            onSelect={() => onTabChange("Images")}
          >
            <Images className="size-[18px]" strokeWidth={2.4} />
            Gallery
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium focus:bg-soft focus:text-copy"
            onSelect={() => onTabChange("Magic")}
          >
            <Headphones className="size-[18px]" strokeWidth={2.4} />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium focus:bg-soft focus:text-copy"
            onSelect={onThemeToggle}
          >
            {isDark ? <Sun className="size-[18px]" strokeWidth={2.4} /> : <Moon className="size-[18px]" strokeWidth={2.4} />}
            {isDark ? "Light mode" : "Dark mode"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium focus:bg-soft focus:text-copy"
          >
            <User className="size-[18px]" strokeWidth={2.4} />
            Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <nav className="col-span-full grid justify-stretch gap-2.5 md:col-auto md:justify-items-center" aria-label="Primary">
        <div
          className="hidden h-[13px] w-full rounded-full border border-accent/20 bg-soft-light shadow-progress-inset md:block md:w-[min(382px,100%)]"
          aria-hidden="true"
        >
          <span
            className="ml-[1.5px] mt-[1.5px] block h-2 w-[58px] rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              transform: `translateX(${Math.max(0, activeIndex) * 78}px)`,
            }}
          />
        </div>
        <div className="grid h-12 w-full grid-cols-5 items-center rounded-2xl bg-surface/90 px-2 shadow-history md:h-auto md:w-[min(390px,100%)] md:rounded-none md:bg-transparent md:px-0 md:shadow-none">
          {navItems.map(({ label, icon: Icon }) => (
            <Button
              className={cn(
                "text-foreground",
                (label === "Files" ? isHistoryExpanded : activeTab === label) && "bg-accent/10 text-accent",
              )}
              variant="ghost"
              size="nav"
              type="button"
              key={label}
              aria-label={label}
              aria-pressed={label === "Files" ? isHistoryExpanded : activeTab === label}
              onClick={() => onTabChange(label)}
            >
              <Icon className="size-[18px]" strokeWidth={2.7} />
            </Button>
          ))}
        </div>
      </nav>

      <div className="col-span-full hidden items-center justify-start gap-[11px] md:flex md:justify-end lg:col-auto lg:pt-[9px]">
        <DropdownMenu
          modal={false}
          open={activeDropdown === "nav-gallery"}
          onOpenChange={handleOpenChange("nav-gallery")}
        >
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(
                "h-8 px-2.5 text-[10px] font-semibold",
                activeDropdown === "nav-gallery" && "bg-accent/10 text-accent",
              )}
              variant="soft"
              radius="sm"
              type="button"
            >
              <Images className="size-[15px]" strokeWidth={2.4} />
              <span className="hidden sm:inline">Gallery</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[218px] rounded-2xl border-border bg-surface p-2 text-xs text-copy shadow-select-content"
          >
            {["Portraits", "Landscapes", "Saved prompts"].map((item) => (
              <DropdownMenuItem
                className="flex h-9 items-center justify-between rounded-xl px-3 focus:bg-soft focus:text-copy"
                key={item}
                onSelect={() => onTabChange("Images")}
              >
                {item}
                <Images className="size-3.5 text-accent" strokeWidth={2.4} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu
          modal={false}
          open={activeDropdown === "nav-support"}
          onOpenChange={handleOpenChange("nav-support")}
        >
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(
                "h-8 px-2.5 text-[10px] font-semibold",
                activeDropdown === "nav-support" && "bg-accent/10 text-accent",
              )}
              variant="soft"
              radius="sm"
              type="button"
            >
              <Headphones className="size-[15px]" strokeWidth={2.4} />
              <span className="hidden sm:inline">Support</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[218px] rounded-2xl border-border bg-surface p-2 text-xs text-copy shadow-select-content"
          >
            {["Contact support", "Keyboard help", "Generation guide"].map((item) => (
              <DropdownMenuItem
                className="flex h-9 items-center justify-between rounded-xl px-3  focus:bg-soft focus:text-copy"
                key={item}
                onSelect={() => onTabChange("Magic")}
              >
                {item}
                <Headphones className="size-3.5 text-accent" strokeWidth={2.4} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="size-7 text-control-muted"
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Toggle color mode"
          aria-pressed={isDark}
          onClick={onThemeToggle}
        >
          {isDark ? <Sun className="size-[17px]" strokeWidth={2.4} /> : <Moon className="size-[17px]" strokeWidth={2.4} />}
        </Button>
        <DropdownMenu
          modal={false}
          open={activeDropdown === "nav-profile"}
          onOpenChange={handleOpenChange("nav-profile")}
        >
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[210px] rounded-2xl border-border bg-surface p-2 text-xs text-copy shadow-select-content"
          >
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-soft p-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80"
                  alt="Profile"
                  fill
                  sizes="32px"
                />
              </div>
              <div>
                <p className="font-bold leading-tight">Creative User</p>
                <p className="text-[10px] font-semibold text-muted">Studio plan</p>
              </div>
            </div>
            {[
              { label: "Account", icon: User },
              { label: "Preferences", icon: Settings },
              { label: isDark ? "Dark enabled" : "Light enabled", icon: Check },
              { label: "Sign out", icon: LogOut },
            ].map(({ label, icon: Icon }) => (
              <DropdownMenuItem
                className="flex h-9 items-center gap-2 rounded-xl px-3 font-semibold focus:bg-soft focus:text-copy"
                key={label}
                onSelect={() => {
                  if (label.includes("enabled")) onThemeToggle();
                }}
              >
                <Icon className="size-3.5 text-accent" strokeWidth={2.4} />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
