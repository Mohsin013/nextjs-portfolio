"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const timeline = [
  {
    role: "Founder",
    company: "NorthPeak Technologies",
    period: "Apr 2026 – Present",
    location: "Srinagar, India",
    current: true,
    desc: "Building AI-native products and scalable software systems focused on automation, multi-agent workflows, and real-world business applications.",
    highlights: [
      "Leading end-to-end product engineering, architecture, and technical strategy",
      "Building production-grade AI systems leveraging LLMs, agent orchestration, and workflow automation",
      "Designing scalable backend infrastructure optimized for performance, reliability, and cost efficiency",
      "Driving product direction, engineering culture, and execution from 0 → 1",
    ],
  },
  {
    role: "Founding Engineer",
    company: "DevMinds Learning",
    period: "Jan 2026 – Present",
    location: "California, US · Remote",
    current: true,
    desc: "Architecting AI-powered adaptive learning platform with multi-AI architecture serving 4 distinct user roles with personalized curriculum planning.",
    highlights: [
      "Multi-AI architecture integrating Anthropic Claude, Google Gemini, and OpenAI",
      "Adaptive learning algorithms with dynamic difficulty calculation",
      "Scalable background processing with BullMQ — 1,000+ modules daily",
      "Real-time interactive modules with speech synthesis and per-question analytics",
    ],
  },
  {
    role: "Founding Engineer",
    company: "Feel Your Best",
    period: "Sep 2025 – Mar 2026",
    location: "Bengaluru, India · Remote",
    current: false,
    desc: "Built comprehensive wellness platform — 78,000+ LOC monorepo serving 4 client applications with real-time booking engine and payment systems.",
    highlights: [
      "4-tier RBAC system with real-time booking engine",
      "Cross-platform mobile app with React Native/Expo",
      "Razorpay integration: 99.9% transaction success rate",
      "Redis caching & MongoDB indexing — 40% faster API response",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Masai School",
    period: "Dec 2023 – Aug 2025",
    location: "Bengaluru, India",
    current: false,
    desc: "Built AI systems, scalable learning infrastructure, real-time proctoring, and automation platforms serving 50,000+ concurrent users.",
    highlights: [
      "AI lecture generation engine delivering content to 10,000+ students",
      "Scaled LMS from 4K → 50K+ concurrent students with AWS autoscaling",
      "AI proctoring with WebRTC, OCR, plagiarism detection (1,000+ concurrent)",
      "AI recruitment system with 12+ specialized agents",
      "GPT-4 counselling platform — 77% cost reduction via RAG pipelines",
    ],
  },
  {
    role: "Curriculum Engineer",
    company: "Masai School",
    period: "Jul 2023 – Dec 2023",
    location: "Bengaluru, India",
    current: false,
    desc: "Led AI Labs team, delivered Blended Learning and InterviewStory AI projects. Worked across full-stack, Python, and AI engineering.",
    highlights: [],
  },
  {
    role: "Pedagogy Instructor",
    company: "Masai School",
    period: "Jan 2023 – Jun 2023",
    location: "Bengaluru, India · Remote",
    current: false,
    desc: "Led Generative AI course teaching prompt engineering and OpenAI integration to ~1,000 students. Ensured quality of DSA, React.js, and JavaScript courses.",
    highlights: [],
  },
  {
    role: "Instructional Associate",
    company: "Masai School",
    period: "Nov 2022 – Jan 2023",
    location: "Remote",
    current: false,
    desc: "Tutored 1,000+ students in DSA, JavaScript, and React.js. Assisted with placements, GitHub reviews, and MERN stack portfolio projects.",
    highlights: [],
  },
];

const expertise = [
  {
    title: "AI Systems",
    desc: "Multi-agent orchestration, RAG pipelines, voice synthesis, LLM integration",
    icon: "⬡",
  },
  {
    title: "Platform Scale",
    desc: "50K+ concurrent users, auto-scaling, distributed caching",
    icon: "◇",
  },
  {
    title: "Real-time Systems",
    desc: "WebRTC streaming, WebSocket architectures, sub-second latency",
    icon: "△",
  },
  {
    title: "Cloud Infra",
    desc: "AWS orchestration, CI/CD pipelines, observability stacks",
    icon: "○",
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)),
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      className="py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-12 sm:mb-20">
            <span className="text-[10px] sm:text-xs font-mono text-accent-blue tracking-widest uppercase">
              /// Career Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight mt-3 sm:mt-4 mb-3 sm:mb-4">
              Professional <span className="shimmer-text">Journey</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/40 max-w-2xl">
              From instructing 1,000+ students to founding companies and
              building AI-native products at scale.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline with animated progress line */}
        <div ref={timelineRef} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 sm:left-4 md:left-8 top-0 bottom-0 w-[2px] bg-white/5">
            <div
              className="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan transition-all duration-100"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="space-y-4 sm:space-y-6 pl-6 sm:pl-12 md:pl-20">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80} direction="left">
                <div className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 md:-left-12 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors duration-300 ${item.current ? "border-accent-blue bg-accent-blue/20 shadow-[0_0_12px_rgba(59,130,246,0.5)]" : "border-white/20 bg-background group-hover:border-accent-purple"}`}
                  />

                  <div className="glass rounded-xl p-4 sm:p-6 md:p-8 group-hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-white">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-green-400 border border-green-500/30 bg-green-500/10 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/50 mb-3 sm:mb-4">
                      <span className="text-accent-blue">{item.company}</span>
                      <span className="text-white/20 hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{item.period}</span>
                      <span className="text-white/20 hidden md:inline">•</span>
                      <span className="text-white/30 hidden md:inline">{item.location}</span>
                      <span className="sm:hidden text-white/30 text-[10px] w-full">{item.period} · {item.location}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-3 sm:mb-4">
                      {item.desc}
                    </p>
                    {item.highlights.length > 0 && (
                      <ul className="space-y-1 sm:space-y-1.5">
                        {item.highlights.map((h, hi) => (
                          <li
                            key={hi}
                            className="flex items-start gap-2 text-[10px] sm:text-xs text-white/40 font-mono"
                          >
                            <span className="text-accent-blue mt-0.5 flex-shrink-0">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Expertise grid */}
        <div className="mt-16 sm:mt-24">
          <ScrollReveal>
            <h3 className="text-xs sm:text-sm font-mono text-white/40 mb-6 sm:mb-10 uppercase tracking-widest">
              /// Core Expertise
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {expertise.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80} direction="scale">
                <div className="glass rounded-xl p-4 sm:p-6 hover:bg-white/[0.04] transition-all duration-300 group h-full">
                  <span className="text-xl sm:text-2xl text-accent-blue/60 group-hover:text-accent-blue transition-colors block mb-2 sm:mb-3">
                    {item.icon}
                  </span>
                  <h4 className="text-sm sm:text-lg font-medium text-white mb-1 sm:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-sm text-white/40 font-mono leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Awards with actual images */}
        <div className="mt-12 sm:mt-20">
          <ScrollReveal>
            <h3 className="text-xs sm:text-sm font-mono text-white/40 mb-6 sm:mb-10 uppercase tracking-widest">
              /// Awards & Recognition
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal delay={100}>
              <div className="glass rounded-xl sm:rounded-2xl overflow-hidden group hover:bg-white/[0.04] transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                <div className="relative bg-gradient-to-b from-yellow-900/10 to-black/20 p-4 sm:p-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/award_exceptional_achiever.png"
                    alt="Exceptional Achiever Award 2025 — Mohsin Iqbal, Masai School"
                    className="w-full max-w-[280px] sm:max-w-[320px] h-auto rounded-lg shadow-xl shadow-yellow-900/10 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-yellow-400/80 tracking-widest glass px-2 py-0.5 rounded">2025</span>
                    <span className="text-[10px] font-mono text-white/30">MASAI SCHOOL</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-yellow-400 mb-1 sm:mb-2">
                    Exceptional Achiever Award
                  </h4>
                  <p className="text-xs sm:text-sm text-white/50 font-mono leading-relaxed">
                    Outstanding contributions and technical leadership in AI platform development.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass rounded-xl sm:rounded-2xl overflow-hidden group hover:bg-white/[0.04] transition-all duration-300 border border-yellow-500/10 hover:border-yellow-500/30">
                <div className="relative bg-gradient-to-b from-yellow-900/10 to-black/20 p-4 sm:p-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/award_outstanding_performer.png"
                    alt="Outstanding Performer Award 2024 — Mohsin Iqbal, Masai School"
                    className="w-full max-w-[280px] sm:max-w-[320px] h-auto rounded-lg shadow-xl shadow-yellow-900/10 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-yellow-400/80 tracking-widest glass px-2 py-0.5 rounded">2024</span>
                    <span className="text-[10px] font-mono text-white/30">MASAI SCHOOL</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-yellow-400 mb-1 sm:mb-2">
                    Outstanding Performer Award
                  </h4>
                  <p className="text-xs sm:text-sm text-white/50 font-mono leading-relaxed">
                    Recognized for exceptional performance in building scalable systems and driving engineering excellence.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
