import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Home,
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

function useLiveClock(lang: "tr" | "en") {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return { dateStr: "", timeStr: "" };

  const day = time.getDate();
  const year = time.getFullYear();
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const timeStr = `${hours}:${minutes}:${seconds}`;

  const monthsTr = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const monthsEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthStr =
    lang === "en" ? monthsEn[time.getMonth()] : monthsTr[time.getMonth()];
  const dateStr =
    lang === "en" ? `${monthStr} ${day}, ${year}` : `${day} ${monthStr} ${year}`;

  return { dateStr, timeStr };
}

export function SinglePageDock({
  activeSection,
  onNavigate,
  lang,
  onLanguageChange,
}: SinglePageDockProps) {
  const { dateStr, timeStr } = useLiveClock(lang);

  return (
    <nav
      aria-label={lang === "en" ? "Page sections" : "Sayfa bölümleri"}
      className="fixed left-1/2 top-4 z-50 hidden max-w-max -translate-x-1/2 md:block"
    >
      <div className="flex items-center justify-center gap-0.5 rounded-full border border-white/60 bg-white/82 p-1.5 shadow-[0_14px_50px_rgba(15,32,55,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111a27]/85 dark:shadow-black/30 sm:gap-1 sm:p-2">
        {timeStr && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#1e3a5f] dark:text-gray-200 border-r border-[#1e3a5f]/10 dark:border-white/10 pr-3 mr-1">
            <span className="hidden lg:inline opacity-80">{dateStr}</span>
            <span className="font-mono font-semibold tracking-tight">{timeStr}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label={lang === "en" ? "Home" : "Ana Sayfa"}
          title={lang === "en" ? "Home" : "Ana Sayfa"}
          className="mr-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-sm transition hover:bg-[#c9a227] sm:mr-1 cursor-pointer"
        >
          <Home size={16} />
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

        <button
          type="button"
          onClick={() => onLanguageChange(lang === "tr" ? "en" : "tr")}
          aria-label={lang === "tr" ? "Switch to English" : "Türkçe'ye geç"}
          title={lang === "tr" ? "Switch to English" : "Türkçe'ye geç"}
          className="ml-1 flex h-9 items-center justify-center gap-1 rounded-full bg-[#1e3a5f]/10 px-3 text-xs font-bold text-[#1e3a5f] hover:bg-[#c9a227] hover:text-white transition-all dark:bg-white/10 dark:text-white dark:hover:bg-[#c9a227] cursor-pointer"
        >
          <span>{lang === "tr" ? "EN 🇬🇧" : "TR 🇹🇷"}</span>
        </button>

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
