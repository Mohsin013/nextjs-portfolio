"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const metrics = [
  { label: "Lines of Code", value: "78,000+", color: "text-accent-blue" },
  { label: "Client Apps", value: "4", color: "text-accent-purple" },
  { label: "API Speed Gain", value: "40%", color: "text-accent-cyan" },
  { label: "Success Rate", value: "99.9%", color: "text-emerald-400" },
];

const phases = [
  {
    num: "01",
    title: "The Foundation",
    desc: "Built a comprehensive wellness platform from scratch with a 78,000+ LOC monorepo architecture serving 4 client applications.",
    code: [
      { label: "// CLIENT STACK", color: "text-purple-400" },
      { label: "+ React Native + Expo (Mobile)", color: "text-white/70" },
      { label: "+ React 19 + 20+ Custom UI", color: "text-white/70" },
      { label: "+ 4-Tier RBAC System", color: "text-white/70" },
      { label: "+ Real-time Booking Engine", color: "text-white/70" },
    ],
  },
  {
    num: "02",
    title: "The Architecture",
    desc: "Designed modular monolith backend with shared Node.js/TypeScript microservices. Optimized for 40% faster API response times.",
    code: [
      { label: "// CORE INFRA", color: "text-purple-400" },
      { label: "+ Node.js + Express + TypeScript", color: "text-white/70" },
      { label: "+ Redis Caching & Compression", color: "text-white/70" },
      { label: "+ MongoDB Indexing Strategy", color: "text-white/70" },
      { label: "+ Modular Monorepo Arch", color: "text-white/70" },
    ],
  },
  {
    num: "03",
    title: "The Integration",
    desc: "Integrated Razorpay payment gateway with 99.9% success rate. Full DevOps ownership with CI/CD and infrastructure optimization.",
    code: [
      { label: "// PAYMENTS & OPS", color: "text-purple-400" },
      { label: "+ Razorpay (One-time, EMI)", color: "text-white/70" },
      { label: "+ AWS CodePipeline (CI/CD)", color: "text-white/70" },
      { label: "+ CloudWatch Observability", color: "text-white/70" },
      { label: "+ 99.9% Transaction Success", color: "text-white/70" },
    ],
  },
];

export default function CaseStudy() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section id="case-study" className="py-20 sm:py-32 relative overflow-hidden bg-[#080810]">
      {/* Diagonal grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.015)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.015)_50%,rgba(255,255,255,0.015)_75%,transparent_75%)] bg-[size:60px_60px] opacity-50" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <ScrollReveal>
          <header className="mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-mono text-accent-purple tracking-widest uppercase glass inline-block px-3 py-1.5 rounded-full mb-4 sm:mb-6">
              DEEP DIVE: FEEL YOU BEST
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight mb-3 sm:mb-4">
              Building Mental<br />
              <span className="shimmer-text">Wellbeing Platform</span>
            </h2>
            <p className="text-base sm:text-xl text-white/50 max-w-2xl font-light">
              Founding Engineer journey — architecting a comprehensive wellness platform as a 78,000+ LOC monorepo.
            </p>
          </header>
        </ScrollReveal>

        {/* Metrics row */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-20">
            {metrics.map((m, i) => (
              <div key={i} className="glass rounded-xl p-4 sm:p-6 text-center group hover:bg-white/[0.04] transition-all">
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${m.color} mb-1 sm:mb-2`}>{m.value}</div>
                <div className="text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Phase selector + content */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-4 sm:gap-8">
          <ScrollReveal direction="left">
            <div className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 lg:sticky lg:top-32 -mx-1 px-1">
              {phases.map((phase, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className={`flex-shrink-0 lg:flex-shrink text-left p-3 sm:p-5 rounded-xl transition-all duration-300 min-w-[140px] sm:min-w-[160px] lg:min-w-0 w-full ${
                    activePhase === i
                      ? "glass-heavy border border-accent-blue/30"
                      : "glass hover:bg-white/[0.03] border border-transparent"
                  }`}
                  data-cursor-label={phase.title}
                >
                  <span className={`text-[10px] font-mono tracking-widest ${activePhase === i ? "text-accent-blue" : "text-white/30"}`}>
                    PHASE {phase.num}
                  </span>
                  <h3 className={`text-sm sm:text-lg font-medium mt-1 ${activePhase === i ? "text-white" : "text-white/60"}`}>
                    {phase.title}
                  </h3>
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative min-h-[300px] sm:min-h-[400px]">
              {phases.map((phase, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    activePhase === i ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 pointer-events-none absolute inset-0"
                  }`}
                >
                  <div className="glass-heavy rounded-2xl p-5 sm:p-8 md:p-12">
                    <p className="text-sm sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">{phase.desc}</p>

                    {/* IDE-style code block */}
                    <div className="ide-bg rounded-xl p-4 sm:p-6 border border-white/5">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
                        <span className="ml-2 sm:ml-3 text-[9px] sm:text-[10px] font-mono text-white/30">architecture.ts</span>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        {phase.code.map((line, li) => (
                          <div key={li} className={`text-xs sm:text-sm font-mono ${line.color}`}>
                            <span className="text-white/20 mr-2 sm:mr-4 select-none">{li + 1}</span>
                            {line.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* System topology - hidden on very small screens, shown as scrollable on mobile */}
        <ScrollReveal delay={300}>
          <div className="mt-12 sm:mt-20 glass-heavy rounded-2xl p-4 sm:p-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-mono text-white/30 mb-4 sm:mb-8 uppercase tracking-widest gap-1">
              <span>System Topology</span>
              <span>AWS / NODE / MONGO / REDIS</span>
            </div>

            <div className="overflow-x-auto -mx-2 px-2 pb-2">
              <svg viewBox="0 0 800 300" className="w-full min-w-[500px] h-auto stroke-white/20 fill-none" strokeWidth="1">
                <defs>
                  <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" fill="rgba(255,255,255,0.2)">
                    <path d="M0,0 L0,6 L6,3 z" className="stroke-none" />
                  </marker>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
                  </linearGradient>
                </defs>

                <rect x="40" y="40" width="140" height="50" rx="8" className="stroke-white/20 fill-white/[0.02]" />
                <text x="110" y="65" textAnchor="middle" fill="white" className="text-[10px] font-mono opacity-70 stroke-none">MOBILE APP (EXPO)</text>
                <text x="110" y="78" textAnchor="middle" fill="white" className="text-[8px] font-mono opacity-40 stroke-none">iOS / ANDROID</text>

                <rect x="40" y="125" width="140" height="50" rx="8" className="stroke-white/20 fill-white/[0.02]" />
                <text x="110" y="153" textAnchor="middle" fill="white" className="text-[10px] font-mono opacity-70 stroke-none">CLIENT PWA</text>

                <rect x="40" y="210" width="140" height="50" rx="8" className="stroke-white/20 fill-white/[0.02]" />
                <text x="110" y="238" textAnchor="middle" fill="white" className="text-[10px] font-mono opacity-70 stroke-none">EXPERT PORTAL</text>

                <rect x="320" y="40" width="160" height="220" rx="12" className="stroke-accent-blue/40 fill-accent-blue/[0.02]" />
                <text x="400" y="145" textAnchor="middle" fill="#3B82F6" className="text-[12px] font-mono opacity-90 stroke-none font-bold tracking-widest">BACKEND API</text>
                <text x="400" y="165" textAnchor="middle" fill="#3B82F6" className="text-[8px] font-mono opacity-50 stroke-none">NODE.JS / EXPRESS</text>

                <rect x="600" y="70" width="120" height="60" rx="8" className="stroke-purple-500/30 fill-purple-500/[0.02]" />
                <text x="660" y="100" textAnchor="middle" fill="#A855F7" className="text-[10px] font-mono opacity-80 stroke-none">REDIS</text>
                <text x="660" y="115" textAnchor="middle" fill="#A855F7" className="text-[8px] font-mono opacity-50 stroke-none">CACHE / QUEUES</text>

                <rect x="600" y="170" width="120" height="60" rx="8" className="stroke-green-500/30 fill-green-500/[0.02]" />
                <text x="660" y="200" textAnchor="middle" fill="#10B981" className="text-[10px] font-mono opacity-80 stroke-none">MONGODB</text>
                <text x="660" y="215" textAnchor="middle" fill="#10B981" className="text-[8px] font-mono opacity-50 stroke-none">PRIMARY DATA</text>

                <path d="M180 65 C 250 65, 280 120, 320 120" stroke="url(#lineGrad)" fill="none" markerEnd="url(#arrow)" />
                <path d="M180 150 L 320 150" stroke="url(#lineGrad)" fill="none" markerEnd="url(#arrow)" />
                <path d="M180 235 C 250 235, 280 180, 320 180" stroke="url(#lineGrad)" fill="none" markerEnd="url(#arrow)" />
                <path d="M480 120 L 600 100" stroke="rgba(168, 85, 247, 0.2)" strokeDasharray="4 4" fill="none" />
                <path d="M480 180 L 600 200" stroke="rgba(16, 185, 129, 0.2)" fill="none" />
              </svg>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
