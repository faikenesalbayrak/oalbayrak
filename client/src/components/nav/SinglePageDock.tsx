import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type SectionId =
  | "hakkinda"
  | "egitim"
  | "kariyer"
  | "yayinlar"
  | "iletisim";

type DockItem = { id: SectionId; label: string; icon: LucideIcon };

export const DOCK_ITEMS: DockItem[] = [
  { id: "hakkinda", label: "Hakkında", icon: UserRound },
  { id: "egitim", label: "Eğitim", icon: GraduationCap },
  { id: "kariyer", label: "Kariyer", icon: BriefcaseBusiness },
  { id: "yayinlar", label: "Yayınlar", icon: BookOpen },
  { id: "iletisim", label: "İletişim", icon: Mail },
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
  onLanguageChange,
}: SinglePageDockProps) {
  return (
    <nav
      aria-label="Sayfa bölümleri"
      className="fixed left-1/2 top-4 z-50 hidden max-w-max -translate-x-1/2 md:block"
    >
      <div className="flex items-center justify-center gap-0.5 rounded-full border border-white/60 bg-white/82 p-1.5 shadow-[0_14px_50px_rgba(15,32,55,0.16)] backdrop-blur-xl sm:gap-1 sm:p-2">
        <button
          type="button"
          onClick={() => onNavigate("hakkinda")}
          aria-label="Sayfanın başına dön"
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
              aria-label={label}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex h-9 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                isActive
                  ? "text-[#1e3a5f]"
                  : "text-gray-500 hover:text-[#1e3a5f]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="single-page-dock-active"
                  className="absolute inset-0 rounded-full bg-[#1e3a5f]/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={16}
                className="relative z-10 shrink-0"
                aria-hidden="true"
              />
              <span className="relative z-10 hidden md:inline">{label}</span>
            </button>
          );
        })}

        <div className="ml-1 flex items-center gap-1 border-l border-gray-200 pl-2">
          <button
            type="button"
            onClick={() => onLanguageChange("tr")}
            title="Türkçe"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-base transition-transform",
              lang === "tr"
                ? "scale-110 ring-2 ring-[#c9a227]"
                : "opacity-60 hover:opacity-100"
            )}
          >
            🇹🇷
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            title="English"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-base transition-transform",
              lang === "en"
                ? "scale-110 ring-2 ring-[#c9a227]"
                : "opacity-60 hover:opacity-100"
            )}
          >
            🇬🇧
          </button>
        </div>
      </div>
    </nav>
  );
}
