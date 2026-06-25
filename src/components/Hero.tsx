"use client";

import { useEffect, useRef } from "react";
import KineticText from "./KineticText";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;

    const isMobile = width < 768;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const count = isMobile ? 40 : Math.min(Math.floor((width * height) / 12000), 150);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        if (!isMobile) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.vx += (dx / dist) * force * 0.02;
            p.vy += (dy / dist) * force * 0.02;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        const connectionLimit = isMobile ? 80 : 120;
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const ox = p.x - other.x;
          const oy = p.y - other.y;
          const oDist = Math.sqrt(ox * ox + oy * oy);

          if (oDist < connectionLimit) {
            const alpha = (1 - oDist / connectionLimit) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      });

      if (!isMobile && mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.03)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - 150, my - 150, 300, 300);
      }

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col lg:flex-row items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden pt-20 pb-16 lg:py-0 gap-8 lg:gap-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Ambient gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-3xl space-y-5 sm:space-y-8 flex-1 order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-accent-blue border border-blue-900/50 bg-blue-900/10 rounded-full">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          SYSTEM_ONLINE
        </div>

        <KineticText
          text="Hi, I'm Mohsin Iqbal."
          className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white"
        />

        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white/30 leading-[1.1]">
          <span className="shimmer-text">Founding Engineer.</span>{" "}
          <span className="text-white/25">AI Architect.</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed">
          I build end-to-end systems that make complex problems feel straightforward. From production ML pipelines to payment-grade backend systems.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
          <button
            onClick={handleScroll("contact")}
            className="magnetic-btn group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold tracking-wide overflow-hidden cursor-pointer rounded-lg text-sm sm:text-base"
            data-cursor-label="Say Hi"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              INITIATE CONTACT
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
          </button>

          <button
            onClick={handleScroll("case-study")}
            className="magnetic-btn px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white hover:bg-white/5 transition-all font-mono text-xs sm:text-sm tracking-widest cursor-pointer glass rounded-lg"
            data-cursor-label="Explore"
          >
            VIEW CASE STUDIES
          </button>
        </div>
      </div>

      {/* Portrait with glassmorphism frame */}
      <div className="relative z-10 flex-shrink-0 order-1 lg:order-2 group perspective-container">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative perspective-card">
          <div className="absolute inset-0 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-2xl transform rotate-6 transition-transform duration-700 group-hover:rotate-2 hidden sm:block" />
          <div className="absolute inset-0 border border-white/5 rounded-2xl transform -rotate-3 scale-105 transition-transform duration-700 group-hover:-rotate-1 hidden sm:block" />

          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden glass border-glow shadow-2xl shadow-blue-900/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay z-10 pointer-events-none" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Mohsin Iqbal"
              className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
            />

            {/* Scanline effect */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent z-10" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-end z-20">
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] font-mono text-accent-blue tracking-widest">ID: MOHSIN_IQBAL</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-white/50">STATUS: ACTIVE</span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 border border-white/20 rounded-full flex items-center justify-center glass">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50 animate-float hidden sm:flex">
        <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">Scroll to explore</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-white/60">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill="currentColor" className="animate-bounce" />
        </svg>
      </div>
    </section>
  );
}
