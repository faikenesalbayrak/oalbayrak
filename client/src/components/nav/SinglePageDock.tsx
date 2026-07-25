import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  Settings,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsPanel } from "./SettingsPanel";

export type SectionId =
  | "hakkinda"
  | "egitim"
  | "kariyer"
  | "yayinlar"
  | "iletisim";

type DockItem = {
  id: SectionId;
  label: { tr: string; en: string };
  icon: LucideIcon;
};

export const DOCK_ITEMS: DockItem[] = [
  { id: "hakkinda", label: { tr: "Hakkında", en: "About" }, icon: UserRound },
  {
    id: "egitim",
    label: { tr: "Eğitim", en: "Education" },
    icon: GraduationCap,
  },
  {
    id: "kariyer",
    label: { tr: "Kariyer", en: "Career" },
    icon: BriefcaseBusiness,
  },
  {
    id: "yayinlar",
    label: { tr: "Yayınlar", en: "Publications" },
    icon: BookOpen,
  },
  { id: "iletisim", label: { tr: "İletişim", en: "Contact" }, icon: Mail },
];

type SinglePageDockProps = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  lang: "tr" | "en";
  onLanguageChange: (lang: "tr" | "en") => void;
};

export function SinglePageDock({
  activeSection,
  onNavigate,
  lang,
}: SinglePageDockProps) {
  return (
    <nav
      aria-label={lang === "en" ? "Page sections" : "Sayfa bölümleri"}
      className="fixed left-1/2 top-4 z-50 hidden max-w-max -translate-x-1/2 md:block"
    >
      <div className="flex items-center justify-center gap-0.5 rounded-full border border-white/60 bg-white/82 p-1.5 shadow-[0_14px_50px_rgba(15,32,55,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111a27]/85 dark:shadow-black/30 sm:gap-1 sm:p-2">
        <button
          type="button"
          onClick={() => onNavigate("hakkinda")}
          aria-label={lang === "en" ? "Back to top" : "Sayfanın başına dön"}
          className="mr-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white shadow-sm sm:mr-1"
        >
          OA
        </button>

        {DOCK_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-label={label[lang]}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex h-9 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                isActive
                  ? "text-[#1e3a5f] dark:text-white"
                  : "text-gray-500 hover:text-[#1e3a5f] dark:text-gray-400 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="single-page-dock-active"
                  className="absolute inset-0 rounded-full bg-[#1e3a5f]/10 dark:bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={16}
                className="relative z-10 shrink-0"
                aria-hidden="true"
              />
              <span className="relative z-10 hidden md:inline">
                {label[lang]}
              </span>
            </button>
          );
        })}

        <span className="mx-1 h-5 w-px bg-[#1e3a5f]/10 dark:bg-white/10" />
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={lang === "en" ? "Open settings" : "Ayarları aç"}
              className="flex size-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#1e3a5f]/10 hover:text-[#1e3a5f] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Settings size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-auto rounded-2xl border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111a27]/95"
          >
            <SettingsPanel />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
