"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAmbience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLDivElement>(".ambient-orb");
    let scrollY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const progress = scrollY / docHeight;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.1;
        const y = Math.sin(progress * Math.PI * 2 + i) * 30;
        orb.style.transform = `translate(${Math.sin(progress * Math.PI + i) * 20}px, ${y + scrollY * speed * 0.05}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div className="ambient-orb absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-900/8 blur-[140px] animate-pulse-slow" />
      <div className="ambient-orb absolute top-[30%] right-[-15%] w-[35%] h-[35%] rounded-full bg-purple-900/6 blur-[120px] animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="ambient-orb absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-900/5 blur-[130px] animate-pulse-slow" style={{ animationDelay: "6s" }} />
      <div className="ambient-orb absolute top-[60%] left-[-5%] w-[25%] h-[25%] rounded-full bg-indigo-900/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: "9s" }} />
    </div>
  );
}
