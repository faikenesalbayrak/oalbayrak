import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Radio, ExternalLink, Maximize2, Sparkles, X } from "lucide-react";

interface RadioGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "tr" | "en";
}

export function RadioGardenModal({ isOpen, onClose, lang }: RadioGardenModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`p-0 gap-0 overflow-hidden border border-white/20 dark:border-white/10 bg-[#0b131e]/95 backdrop-blur-2xl text-white shadow-2xl transition-all duration-300 ${
          isFullscreen
            ? "w-screen h-screen max-w-none m-0 rounded-none"
            : "w-[95vw] max-w-5xl h-[88vh] rounded-3xl"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#111c2d]/80">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#c9a227]/20 text-[#c9a227] ring-1 ring-[#c9a227]/30">
              <Radio className="size-5 animate-pulse" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-white flex items-center gap-2">
                {lang === "en" ? "World Radio & 3D Globe" : "Dünya Radyoları & 3D Küre"}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#7a2948]/40 text-[#f4a2b9] border border-[#7a2948]/60">
                  <Sparkles size={11} />
                  Radio Garden
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-300">
                {lang === "en"
                  ? "Spin the 3D globe, pick any country, and listen to live stations around the world."
                  : "3D küreyi döndürün, istediğiniz ülkeyi seçin ve dünya radyolarını canlı dinleyin."}
              </DialogDescription>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://radio.garden", "_blank")}
              className="hidden sm:flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/15"
              title={lang === "en" ? "Open in new tab" : "Yeni sekmede aç"}
            >
              <ExternalLink size={14} />
              <span>{lang === "en" ? "Full Site" : "Tam Ekran Aç"}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full"
              title={isFullscreen ? "Küçült" : "Genişlet"}
            >
              <Maximize2 size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Embedded 3D Radio Globe iFrame */}
        <div className="relative flex-1 w-full h-full min-h-0 bg-black">
          <iframe
            src="https://radio.garden/listen/istanbul/pBKGw1mG"
            title="Radio Garden 3D Globe Player"
            className="w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            loading="lazy"
          />

          {/* Bottom Overlay Hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-gray-300 flex items-center gap-2 pointer-events-none">
            <span className="inline-block size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {lang === "en"
                ? "Click green dots on the globe to change stations"
                : "Canlı dinlemek için küre üzerindeki yeşil noktalara tıklayın"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
