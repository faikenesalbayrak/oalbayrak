import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DOCK_ITEMS, type SectionId } from "./SinglePageDock";
import { SettingsPanel } from "./SettingsPanel";

type MobileSidebarProps = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenCvRequest?: () => void;
  lang: "tr" | "en";
  onLanguageChange: (lang: "tr" | "en") => void;
};

export function MobileSidebar({
  activeSection,
  onNavigate,
  lang,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const navigate = (id: SectionId) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        aria-label={
          isOpen
            ? lang === "en"
              ? "Close menu"
              : "Menüyü kapat"
            : lang === "en"
              ? "Open menu"
              : "Menüyü aç"
        }
        aria-expanded={isOpen}
        aria-controls="mobile-site-menu"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.24, ease: "easeOut" }}
        onClick={() => setIsOpen(open => !open)}
        className="fixed left-4 top-4 z-[70] flex size-11 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-[#1e3a5f] shadow-[0_18px_45px_rgba(20,36,59,0.16)] backdrop-blur-2xl transition active:scale-95 dark:border-white/10 dark:bg-[#111a27]/80 dark:text-white md:hidden"
      >
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
              isOpen && "top-1/2 -translate-y-1/2 rotate-45"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
              isOpen && "w-0 opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
              isOpen && "bottom-1/2 translate-y-1/2 -rotate-45"
            )}
          />
        </span>
      </motion.button>

      <aside
        id="mobile-site-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed inset-0 z-[60] overflow-y-auto bg-[#f5f2eb] text-[#14243b] transition-[transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] dark:bg-[#090f18] dark:text-white md:hidden",
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        )}
      >
        <div
          className="hero-grid absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute -left-28 top-16 size-72 rounded-full bg-[#c9a227]/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 bottom-10 size-80 rounded-full bg-[#7a2948]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex min-h-[100dvh] flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+5.5rem)]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#7a2948] dark:text-[#d989a7]">
              {lang === "en" ? "Assoc. Prof. Dr." : "Doç. Dr."}
            </p>
            <p
              className="mt-1 text-xl font-semibold text-[#1e3a5f] dark:text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Orhan Albayrak
            </p>
          </div>

          <nav
            aria-label={
              lang === "en" ? "Mobile page sections" : "Mobil sayfa bölümleri"
            }
            className="my-auto py-8"
          >
            <div className="flex flex-col gap-2">
              {DOCK_ITEMS.map(({ id, label }, index) => {
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => navigate(id)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={
                      isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }
                    }
                    transition={{
                      delay: isOpen ? 0.08 + index * 0.045 : 0,
                      duration: 0.26,
                      ease: "easeOut",
                    }}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group flex min-h-14 items-center gap-4 border-b border-[#1e3a5f]/10 py-2 text-left transition-colors dark:border-white/10",
                      isActive
                        ? "text-[#7a2948] dark:text-[#d989a7]"
                        : "text-[#14243b] hover:text-[#7a2948] dark:text-white dark:hover:text-[#d989a7]"
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 text-xs font-bold tabular-nums",
                        isActive
                          ? "text-[#c9a227]"
                          : "text-[#1e3a5f]/35 dark:text-white/30"
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className="text-[clamp(2rem,10vw,3.15rem)] font-medium leading-none"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {label[lang]}
                    </span>
                    <span
                      className={cn(
                        "ml-auto h-px transition-all",
                        isActive
                          ? "w-8 bg-[#c9a227]"
                          : "w-0 bg-[#1e3a5f]/30 group-hover:w-5 dark:bg-white/30"
                      )}
                    />
                  </motion.button>
                );
              })}
            </div>
          </nav>

          <SettingsPanel className="mb-6 w-full border-t border-[#1e3a5f]/10 pt-5 dark:border-white/10" />

          <div className="flex items-center border-t border-[#1e3a5f]/10 pt-5 dark:border-white/10">
            <a
              href="mailto:orhan.albayrak@bezmialem.edu.tr"
              className="flex min-w-0 items-center gap-2 text-sm font-medium text-[#1e3a5f] dark:text-white"
            >
              <Mail size={16} className="shrink-0 text-[#7a2948]" />
              <span className="truncate">orhan.albayrak@bezmialem.edu.tr</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
