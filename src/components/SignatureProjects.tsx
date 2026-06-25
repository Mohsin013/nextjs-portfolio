"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

type Project = {
  id: string;
  title: string;
  thesis: string;
  bullets: string[];
  tech: string[];
  archHighlight: string;
  color: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "NorthPeak Technologies",
    thesis: "AI-native products and scalable software systems focused on automation, multi-agent workflows, and real-world business applications.",
    bullets: [
      "Leading end-to-end product engineering, architecture, and technical strategy",
      "Building production-grade AI systems with LLMs, agent orchestration, and workflow automation",
      "Designing scalable backend infrastructure for performance, reliability, and cost efficiency",
      "Working across AI integrations, distributed systems, real-time applications, and cloud architecture",
      "Driving product direction, engineering culture, and execution from 0 → 1",
    ],
    tech: ["Multi-Agent AI", "LLMs", "TypeScript", "Node.js", "Cloud Architecture", "Distributed Systems", "Workflow Automation"],
    archHighlight: "AI_NATIVE_PRODUCTS",
    color: "from-emerald-400 to-cyan-500",
  },
  {
    id: "02",
    title: "DevMinds Learning",
    thesis: "AI-powered adaptive learning platform with multi-AI architecture serving 4 distinct user roles with personalized curriculum planning.",
    bullets: [
      "Architected AI-powered adaptive learning platform from scratch using React 19, TypeScript, Node.js, and MongoDB",
      "Designed multi-AI architecture integrating Anthropic Claude, Google Gemini, and OpenAI for automated content analysis",
      "Built smart adaptive learning algorithm with dynamic difficulty calculation (4 levels)",
      "Engineered scalable background processing with BullMQ — 5 specialized workers, 1,000+ modules daily",
      "Implemented real-time modules with Web Speech API and per-question timing analytics",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "Claude", "Gemini", "OpenAI", "BullMQ", "Redis", "AWS"],
    archHighlight: "MULTI_AI_ADAPTIVE",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "03",
    title: "Feel You Best",
    thesis: "Comprehensive wellness platform with 78,000+ LOC monorepo serving 4 client applications with real-time booking engine.",
    bullets: [
      "Led full-stack development of 78,000+ LOC monorepo wellness platform",
      "Designed complex real-time booking engine with 4-tier RBAC system",
      "Built cross-platform mobile app with React Native/Expo — 20+ reusable UI components",
      "Integrated Razorpay gateway: one-time, EMI, installments — 99.9% success rate",
      "Optimized with Redis caching, compression, MongoDB indexing — 40% faster API response",
    ],
    tech: ["React Native", "Expo", "React 19", "Node.js", "TypeScript", "MongoDB", "Redis", "Razorpay", "AWS"],
    archHighlight: "WELLNESS_MONOREPO",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "04",
    title: "Blended Learning (AI Lectures)",
    thesis: "Automated lecture generation pipeline delivering AI-powered educational content to 10,000+ students.",
    bullets: [
      "Automated lecture generation using AI, reducing instructor dependency by 80%",
      "Scalable delivery to 10,000+ students with AI-generated content",
      "End-to-end pipeline: Whisper (TTS) → OpenAI LLM → RVC (voice cloning) → SADTalker (avatar)",
      "Automated presentations using Reveal.js with dynamic styling",
      "Leveraged OpenAI APIs and open-source models for personalized lecture creation",
    ],
    tech: ["React", "Node.js", "OpenAI", "SADTalker", "RVC", "AWS", "Prisma", "GraphQL", "Reveal.js"],
    archHighlight: "AI_CONTENT_GEN",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "05",
    title: "Smart LMS Platform",
    thesis: "Enterprise LMS scaling from 4,000 to 50,000+ concurrent students.",
    bullets: [
      "Scaled from 4,000 → 50,000+ students using AWS autoscaling and Redis caching",
      "Integrated production-grade Lexical Editor with tagging, markdown, HTML, image uploads",
      "Threaded discussions with user mentions and real-time collaboration",
      "Firebase Notification Service for unlimited, cost-effective cross-platform notifications",
      "Service Worker architecture for foreground and background delivery",
    ],
    tech: ["React", "Node.js", "tRPC", "MongoDB", "AWS", "Firebase", "Lexical", "Redis"],
    archHighlight: "LMS_SCALING",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "06",
    title: "Copper (Online Proctoring)",
    thesis: "Real-time AI-powered exam monitoring with multi-device surveillance and automated cheating detection.",
    bullets: [
      "Real-time exam monitoring: video/screen capture, facial recognition, behavioral analytics",
      "Plagiarism detection using code similarity (70%+ accuracy) and AI tool usage detection via OCR",
      "Reduced manual review time by 80% through automated flagging on 50+ data points",
      "Distributed system supporting 1,000+ concurrent users with multi-angle surveillance",
      "Comprehensive dashboards with suspect scoring and behavioral pattern analysis",
    ],
    tech: ["React", "Bun", "TypeScript", "AWS", "MongoDB", "WebRTC", "Rekognition", "Textract", "OpenAI", "Redis"],
    archHighlight: "REALTIME_PROCTOR",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "07",
    title: "Veda (AI Recruitment)",
    thesis: "AI recruitment agent with 12+ specialized sub-agents automating job creation, screening, and interview scheduling.",
    bullets: [
      "AI-powered recruitment automating job creation, screening, and scheduling",
      "Cut manual hiring workload by 80% through intelligent automation",
      "Multi-agent LLM system with 12+ specialized sub-agents for candidate matching",
      "LLM-based evaluation providing fit scores, match reasons, and hiring transparency",
      "Real-time communication: Slack, email, and phone integration",
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "OpenAI", "Claude", "Plivo", "Slack", "BullMQ", "Socket.io"],
    archHighlight: "MULTI_AGENT_RECRUIT",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "08",
    title: "AI Counsellor",
    thesis: "AI-powered counselling system with GPT-4 and real-time speech recognition, reducing human workload by 70%.",
    bullets: [
      "AI counselling system with GPT-4 and real-time speech recognition",
      "Reduced human counsellor workload by 70% through intelligent automation",
      "Low-latency streaming with WebSocket — sub-second response times",
      "RAG using Pinecone and OpenAI embeddings for contextual precision",
      "77% cost reduction in counselling operations through AI automation",
    ],
    tech: ["React", "Bun", "Elysia.js", "GPT-4", "Azure", "Pinecone", "MongoDB", "Redis", "WebSocket"],
    archHighlight: "AI_RAG_COUNSEL",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "09",
    title: "Insta Insights",
    thesis: "Instagram Reels analysis platform providing creators with deep engagement insights using GPT-4 and custom ML.",
    bullets: [
      "Analyzed Reels using GPT-4, AWS Transcribe, and custom ML models",
      "Video processing pipeline handling 25+ reels per session at 95%+ accuracy",
      "AI identifies niche topics, hook styles, content patterns, and promotional strategies",
      "Robust async job architecture with Redis and BullMQ for concurrent processing",
      "Script generation mimicking influencers' tone and content style",
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "OpenAI", "AWS S3", "Transcribe", "Redis", "BullMQ"],
    archHighlight: "INSTA_ANALYTICS",
    color: "from-pink-500 to-rose-500",
  },
];

export default function SignatureProjects() {
  const [activeProject, setActiveProject] = useState<string>("01");
  const detailRef = useRef<HTMLDivElement>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!detailRef.current) return;
      const rect = detailRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCardTilt({ x: y * 5, y: -x * 5 });
    };
    const handleLeave = () => setCardTilt({ x: 0, y: 0 });

    const el = detailRef.current;
    el?.addEventListener("mousemove", handleMouse);
    el?.addEventListener("mouseleave", handleLeave);
    return () => {
      el?.removeEventListener("mousemove", handleMouse);
      el?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const current = projects.find((p) => p.id === activeProject) || projects[0];

  return (
    <section id="projects" className="py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-xs sm:text-sm font-mono tracking-widest text-white/50 mb-3 sm:mb-4 uppercase">
            /// Signature Exhibits
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white/80 mb-10 sm:mb-16 max-w-2xl">
            Full-screen project deep dives with <span className="shimmer-text font-medium">architecture-level detail</span>.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Project list sidebar - horizontal scroll on mobile */}
          <div className="w-full lg:w-1/3">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 -mx-1 px-1 snap-x snap-mandatory lg:snap-none">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p.id)}
                  className={`flex-shrink-0 lg:flex-shrink w-[160px] sm:w-[200px] lg:w-full text-left group transition-all duration-300 rounded-xl p-3 sm:p-4 snap-start ${
                    activeProject === p.id
                      ? "glass-heavy border border-white/10"
                      : "hover:bg-white/[0.02] border border-transparent glass"
                  }`}
                  data-cursor-label={p.archHighlight}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className={`text-[10px] sm:text-xs font-mono ${activeProject === p.id ? "text-accent-blue" : "text-white/20"}`}>
                      {p.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xs sm:text-base font-medium transition-colors truncate ${activeProject === p.id ? "text-white" : "text-white/50"}`}>
                        {p.title}
                      </h3>
                    </div>
                    {activeProject === p.id && (
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${p.color} flex-shrink-0`} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Project detail panel with 3D tilt */}
          <div
            ref={detailRef}
            className="w-full lg:w-2/3 perspective-container"
          >
            <div
              className="glass-heavy rounded-2xl border border-white/10 p-5 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative overflow-hidden perspective-card"
              style={{ transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)` }}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${current.color}`} />

              {/* Architecture label */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] font-mono text-white/20 text-right">
                <div>ARCH: {current.archHighlight}</div>
                <div className="hidden sm:block">STATUS: DEPLOYED</div>
              </div>

              <div className="relative z-10 pt-4 sm:pt-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 tracking-tight text-white pr-16 sm:pr-0">
                  {current.title}
                </h2>

                <p className="text-sm sm:text-base text-white/60 font-light border-l-2 border-accent-blue/50 pl-3 sm:pl-4 mb-5 sm:mb-8 leading-relaxed">
                  {current.thesis}
                </p>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {current.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-white/50">
                      <span className={`mt-1 sm:mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${current.color} flex-shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="pt-4 sm:pt-6 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-2 sm:mb-3">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {current.tech.map((t, i) => (
                      <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono glass rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
