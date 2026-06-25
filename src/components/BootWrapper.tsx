"use client";

import { useState, useEffect } from "react";

const bootLines = [
  { text: "BIOS CHECK .............. OK", delay: 0 },
  { text: "MEMORY_ALLOCATION ....... 16GB", delay: 100 },
  { text: "GPU_INIT ................ WEBGL2", delay: 200 },
  { text: "LOADING_KERNEL .......... NEXT.JS", delay: 350 },
  { text: "NEURAL_NET_SYNC ......... ACTIVE", delay: 500 },
  { text: "PORTFOLIO_RENDER ........ READY", delay: 700 },
  { text: "", delay: 900 },
  { text: "> BOOTING MOHSIN.SYSTEM v2.1.0", delay: 1000 },
];

export default function BootWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setBooted(true);
      setShowContent(true);
      return;
    }

    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    const bootTimer = setTimeout(() => {
      setBooted(true);
      sessionStorage.setItem("booted", "true");
      setTimeout(() => setShowContent(true), 500);
    }, 1500);

    return () => clearTimeout(bootTimer);
  }, []);

  if (showContent && booted) {
    return (
      <div className="min-h-screen transition-opacity duration-700 opacity-100">
        {children}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center transition-opacity duration-500 ${booted ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="max-w-lg w-full px-8">
        <div className="mb-8">
          <div className="text-accent-blue font-mono text-lg font-bold tracking-widest mb-1">MI_SYSTEM</div>
          <div className="text-white/20 font-mono text-[10px] tracking-wider">PORTFOLIO BOOT SEQUENCE</div>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`${line.text.startsWith(">") ? "text-accent-blue mt-3" : "text-white/40"}`}>
              {line.text}
            </div>
          ))}
        </div>

        <div className="mt-8 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(visibleLines / bootLines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
