import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Languages, Monitor, Moon, Sun } from "lucide-react";

export function SettingsPanel({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, isEnglish } = useLanguage();

  return (
    <div className={cn("flex w-56 flex-col gap-4 p-1", className)}>
      <section className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {theme === "system" ? (
            <Monitor size={14} />
          ) : theme === "dark" ? (
            <Moon size={14} />
          ) : (
            <Sun size={14} />
          )}
          {isEnglish ? "Appearance" : "Görünüm"}
        </p>
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/5">
          {(
            [
              ["light", isEnglish ? "Light" : "Açık"],
              ["dark", isEnglish ? "Dark" : "Koyu"],
              ["system", isEnglish ? "System" : "Sistem"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              aria-pressed={theme === value}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold transition",
                theme === value
                  ? "bg-white text-[#1e3a5f] shadow-sm dark:bg-[#243247] dark:text-white"
                  : "text-gray-500 hover:text-[#1e3a5f] dark:text-gray-400 dark:hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Languages size={14} />
          {isEnglish ? "Language" : "Dil"}
        </p>
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/5">
          {(
            [
              ["tr", "Türkçe"],
              ["en", "English"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLanguage(value)}
              aria-pressed={language === value}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold transition",
                language === value
                  ? "bg-white text-[#1e3a5f] shadow-sm dark:bg-[#243247] dark:text-white"
                  : "text-gray-500 hover:text-[#1e3a5f] dark:text-gray-400 dark:hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
