"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    let frameCount = 0;
    let lastTime = performance.now();
    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(measureFps);
    };
    requestAnimationFrame(measureFps);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-6 py-2 hidden md:flex justify-between items-center text-[10px] font-mono text-white/30 tracking-wider">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          SYSTEM_ONLINE
        </span>
        <span>{fps} FPS</span>
        <span>VER 2.1.0</span>
      </div>

      <div className="flex items-center gap-6">
        <span>NEXT.JS 16 + GSAP</span>
        <span>{time}</span>
        <span className="text-white/20">⌘K</span>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-accent-blue hover:text-white transition-colors cursor-pointer uppercase"
        >
          [CONTACT]
        </a>
      </div>
    </div>
  );
}
