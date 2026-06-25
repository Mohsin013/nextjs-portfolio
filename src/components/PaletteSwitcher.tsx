"use client";

import { useState } from "react";

const palettes = [
  { id: "default", label: "Midnight", colors: ["#3B82F6", "#8B5CF6", "#06B6D4"] },
  { id: "cyber", label: "Cyber", colors: ["#00F0FF", "#FF00E5", "#00FF88"] },
  { id: "sunset", label: "Sunset", colors: ["#FF6B35", "#F7C948", "#E84855"] },
  { id: "aurora", label: "Aurora", colors: ["#4ECDC4", "#A78BFA", "#34D399"] },
];

export default function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [activePalette, setActivePalette] = useState("default");

  const switchPalette = (id: string) => {
    setActivePalette(id);
    document.documentElement.setAttribute("data-palette", id === "default" ? "" : id);
  };

  return (
    <div className="fixed bottom-14 sm:bottom-6 right-4 sm:right-6 z-[100]">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        data-cursor-label="Colors"
        aria-label="Switch color palette"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70 sm:w-[18px] sm:h-[18px]">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="var(--accent-blue)" opacity="0.5" />
          <circle cx="12" cy="8" r="2" fill="var(--accent-purple)" />
          <circle cx="8" cy="14" r="2" fill="var(--accent-blue)" />
          <circle cx="16" cy="14" r="2" fill="var(--accent-cyan)" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-12 sm:bottom-14 right-0 glass rounded-xl p-2 sm:p-3 space-y-1.5 sm:space-y-2 min-w-[130px] sm:min-w-[140px]">
          {palettes.map((p) => (
            <button
              key={p.id}
              onClick={() => switchPalette(p.id)}
              className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all text-[10px] sm:text-xs font-mono ${
                activePalette === p.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <div className="flex gap-0.5 sm:gap-1">
                {p.colors.map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
