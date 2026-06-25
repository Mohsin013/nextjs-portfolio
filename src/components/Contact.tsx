"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouse);
    return () => section?.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("mohsiniqbal826635@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.05) 0%, transparent 50%)`,
      }}
    >
      {/* Decorative diagonal lines - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-12" />
        <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-6 sm:mb-8 leading-[0.9]">
            Let&apos;s build<br />something{" "}
            <span className="shimmer-text">extraordinary.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-sm sm:text-lg text-white/40 mb-10 sm:mb-16 max-w-lg mx-auto px-4">
            Got a project that needs architectural thinking, AI expertise, or just someone who ships? Let&apos;s talk.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="space-y-6 sm:space-y-8">
            {/* Email - opens mailbox on click, long press / right click to copy */}
            <a
              href="mailto:mohsiniqbal826635@gmail.com"
              onClick={(e) => { if (e.detail === 2) { e.preventDefault(); handleCopy(); } }}
              className="group cursor-pointer inline-block glass-heavy rounded-xl sm:rounded-2xl px-5 sm:px-10 py-4 sm:py-6 hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden max-w-full"
              data-cursor-label="Send Email"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm sm:text-xl md:text-2xl font-mono text-white/70 group-hover:text-white transition-colors relative z-10 break-all sm:break-normal">
                mohsiniqbal826635@gmail.com
              </span>
              <div className="mt-2 text-[10px] sm:text-xs font-mono text-accent-blue h-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity relative z-10">
                {copied ? "✓ COPIED TO CLIPBOARD" : "↗ CLICK TO EMAIL"}
              </div>
            </a>

            <a
              href="tel:+917006009596"
              className="block text-base sm:text-lg font-mono text-white/50 hover:text-white transition-colors"
              data-cursor-label="Call"
            >
              +91-7006009596
            </a>

            {/* Social links */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-4 sm:pt-8">
              <a
                href="https://www.linkedin.com/in/mohsin-iqbal-424336237/"
                target="_blank"
                rel="noreferrer"
                className="glass px-6 py-3 rounded-xl text-sm font-mono text-white/50 hover:text-white hover:bg-white/[0.06] transition-all text-center"
                data-cursor-label="LinkedIn"
              >
                LINKEDIN ↗
              </a>
              <a
                href="https://github.com/mohsin013"
                target="_blank"
                rel="noreferrer"
                className="glass px-6 py-3 rounded-xl text-sm font-mono text-white/50 hover:text-white hover:bg-white/[0.06] transition-all text-center"
                data-cursor-label="GitHub"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Education */}
        <ScrollReveal delay={400}>
          <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/5">
            <h3 className="text-xs sm:text-sm font-mono text-accent-blue mb-6 sm:mb-8 uppercase tracking-widest">
              /// Education
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="glass rounded-xl p-5 sm:p-6 text-left hover:bg-white/[0.03] transition-all">
                <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Full Stack Development</h4>
                <p className="text-white/40 text-xs sm:text-sm font-mono">Masai School</p>
                <span className="text-[10px] sm:text-xs text-white/30 font-mono">2022</span>
              </div>
              <div className="glass rounded-xl p-5 sm:p-6 text-left hover:bg-white/[0.03] transition-all">
                <h4 className="text-white font-medium mb-1 text-sm sm:text-base">BCA, Computer Science</h4>
                <p className="text-white/40 text-xs sm:text-sm font-mono">Vinayaka Missions Sikkim University</p>
                <span className="text-[10px] sm:text-xs text-white/30 font-mono">Jan 2022 – Jul 2025</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <footer className="mt-20 sm:mt-32 pb-16 sm:pb-8 text-[9px] sm:text-[10px] text-white/15 font-mono space-y-1">
          <p>BUILT WITH NEXT.JS • GSAP • FRAMER MOTION</p>
          <p>SYSTEM STATUS: OPERATIONAL</p>
          <p>&copy; 2026 MOHSIN IQBAL. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </section>
  );
}
