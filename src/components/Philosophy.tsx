"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const philosophies = [
  { text: "Complexity is not a problem — it's an invitation.", icon: "◆" },
  { text: "Ownership is the highest form of engineering.", icon: "◈" },
  { text: "Calm under pressure; high stakes sharpen me.", icon: "◉" },
  { text: "Think like a trader, build like an engineer.", icon: "◎" },
  { text: "AI is leverage, and those who understand it will build the future.", icon: "◐" },
  { text: "I don't just write code — I own systems.", icon: "◑" },
];

export default function Philosophy() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let pos = 0;
    const speed = 0.5;
    let animId: number;

    const animate = () => {
      pos -= speed;
      if (pos <= -50) pos = 0;
      marquee.style.transform = `translateX(${pos}%)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="philosophy" className="py-20 sm:py-32 relative overflow-hidden border-t border-white/5">
      {/* Infinite scrolling marquee background text */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.03] pointer-events-none">
        <div ref={marqueeRef} className="whitespace-nowrap flex" style={{ width: "200%" }}>
          <span className="text-[15vw] sm:text-[12vw] font-bold tracking-tighter mr-8">
            BUILD • SHIP • OWN • BUILD • SHIP • OWN • BUILD • SHIP • OWN •
          </span>
          <span className="text-[15vw] sm:text-[12vw] font-bold tracking-tighter mr-8">
            BUILD • SHIP • OWN • BUILD • SHIP • OWN • BUILD • SHIP • OWN •
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <ScrollReveal>
          <h2 className="text-xs sm:text-sm font-mono tracking-widest text-white/50 mb-3 sm:mb-4 uppercase text-center">
            /// Core Kernel
          </h2>
          <p className="text-center text-xl sm:text-3xl md:text-4xl font-light text-white/80 mb-10 sm:mb-16 max-w-xl mx-auto">
            The principles that <span className="shimmer-text font-medium">drive</span> every system I build.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {philosophies.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="scale">
              <div className="glass rounded-xl p-6 sm:p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-500 group h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="text-xl sm:text-2xl text-accent-blue/40 group-hover:text-accent-blue transition-colors duration-300 mb-3 sm:mb-4 block">
                  {item.icon}
                </span>
                <p className="text-sm sm:text-base md:text-lg font-light text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed relative z-10">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
