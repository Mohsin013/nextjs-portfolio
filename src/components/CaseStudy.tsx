"use client";

import { useState, useEffect, useRef } from "react";
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

type TopoNode = {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  glow: string;
  tooltip: string;
};

type TopoEdge = {
  from: string;
  to: string;
  path: string;
  color: string;
  dashed?: boolean;
  label: string;
};

const topoNodes: TopoNode[] = [
  { id: "mobile", label: "MOBILE APP", sublabel: "EXPO · iOS / ANDROID", x: 40, y: 40, w: 150, h: 55, color: "#3B82F6", glow: "rgba(59,130,246,0.3)", tooltip: "React Native + Expo cross-platform app with 20+ reusable UI components" },
  { id: "pwa", label: "CLIENT PWA", sublabel: "REACT 19 · WEB", x: 40, y: 125, w: 150, h: 55, color: "#3B82F6", glow: "rgba(59,130,246,0.3)", tooltip: "Progressive Web App with real-time booking engine and 4-tier RBAC" },
  { id: "expert", label: "EXPERT PORTAL", sublabel: "ADMIN DASHBOARD", x: 40, y: 210, w: 150, h: 55, color: "#3B82F6", glow: "rgba(59,130,246,0.3)", tooltip: "Expert management portal with scheduling, analytics & session tracking" },
  { id: "api", label: "BACKEND API", sublabel: "NODE.JS · EXPRESS · TS", x: 310, y: 40, w: 170, h: 225, color: "#3B82F6", glow: "rgba(59,130,246,0.4)", tooltip: "Modular monolith backend — RESTful APIs, auth, RBAC, real-time events" },
  { id: "redis", label: "REDIS", sublabel: "CACHE · QUEUES", x: 590, y: 55, w: 130, h: 65, color: "#A855F7", glow: "rgba(168,85,247,0.3)", tooltip: "In-memory caching + BullMQ job queues — 40% faster API response times" },
  { id: "mongo", label: "MONGODB", sublabel: "PRIMARY DATA", x: 590, y: 180, w: 130, h: 65, color: "#10B981", glow: "rgba(16,185,129,0.3)", tooltip: "Document store with compound indexes — 78K+ LOC data layer" },
];

const topoEdges: TopoEdge[] = [
  { from: "mobile", to: "api", path: "M190 67 C 250 67, 270 110, 310 120", color: "url(#topoGrad)", label: "REST / WS" },
  { from: "pwa", to: "api", path: "M190 152 L 310 152", color: "url(#topoGrad)", label: "REST / WS" },
  { from: "expert", to: "api", path: "M190 237 C 250 237, 270 195, 310 185", color: "url(#topoGrad)", label: "REST / WS" },
  { from: "api", to: "redis", path: "M480 100 L 590 88", color: "rgba(168, 85, 247, 0.4)", dashed: true, label: "CACHE HIT" },
  { from: "api", to: "mongo", path: "M480 200 L 590 210", color: "rgba(16, 185, 129, 0.4)", label: "READ / WRITE" },
];

function InteractiveTopology() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [flowOffset, setFlowOffset] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setFlowOffset((prev) => (prev + 0.5) % 20);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleNodeHover = (node: TopoNode, e: React.MouseEvent) => {
    setHoveredNode(node.id);
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;
      setTooltip({ text: node.tooltip, x, y });
    }
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    setTooltip(null);
  };

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    return topoEdges.some(
      (e) => (e.from === hoveredNode && e.to === nodeId) || (e.to === hoveredNode && e.from === nodeId),
    );
  };

  const isEdgeActive = (edge: TopoEdge) => {
    if (!hoveredNode) return true;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  };

  return (
    <div className="mt-12 sm:mt-20 glass-heavy rounded-2xl p-4 sm:p-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-mono text-white/30 mb-4 sm:mb-8 uppercase tracking-widest gap-1">
        <span>System Topology</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          LIVE · HOVER TO EXPLORE
        </span>
      </div>

      <div className="overflow-x-auto -mx-2 px-2 pb-2 relative">
        <svg
          ref={svgRef}
          viewBox="0 0 800 300"
          className="w-full min-w-[500px] h-auto"
          strokeWidth="1"
        >
          <defs>
            <linearGradient id="topoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.5)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges with animated flow */}
          {topoEdges.map((edge) => (
            <g key={`${edge.from}-${edge.to}`} className="transition-opacity duration-300" style={{ opacity: isEdgeActive(edge) ? 1 : 0.15 }}>
              <path
                d={edge.path}
                stroke={edge.color}
                fill="none"
                strokeWidth={isEdgeActive(edge) && hoveredNode ? 2 : 1.5}
                strokeDasharray={edge.dashed ? "6 4" : undefined}
                className="transition-all duration-300"
              />
              {/* Animated flow particles */}
              <path
                d={edge.path}
                stroke={edge.color}
                fill="none"
                strokeWidth={3}
                strokeDasharray="3 17"
                strokeDashoffset={-flowOffset}
                strokeLinecap="round"
                className="transition-opacity duration-300"
                style={{ opacity: isEdgeActive(edge) ? 0.8 : 0 }}
              />
            </g>
          ))}

          {/* Nodes */}
          {topoNodes.map((node) => {
            const active = hoveredNode === node.id;
            const connected = isConnected(node.id);
            const dimmed = hoveredNode && !active && !connected;

            return (
              <g
                key={node.id}
                onMouseEnter={(e) => handleNodeHover(node, e)}
                onMouseLeave={handleNodeLeave}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: dimmed ? 0.25 : 1 }}
              >
                {/* Glow effect on hover */}
                {active && (
                  <rect
                    x={node.x - 4}
                    y={node.y - 4}
                    width={node.w + 8}
                    height={node.h + 8}
                    rx={12}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    filter="url(#glow)"
                    className="animate-pulse"
                    style={{ opacity: 0.6 }}
                  />
                )}

                {/* Node background */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={8}
                  fill={active ? `${node.color}10` : "rgba(255,255,255,0.02)"}
                  stroke={active ? node.color : "rgba(255,255,255,0.15)"}
                  strokeWidth={active ? 1.5 : 1}
                  className="transition-all duration-300"
                />

                {/* Pulse indicator */}
                <circle
                  cx={node.x + node.w - 12}
                  cy={node.y + 12}
                  r={3}
                  fill={node.color}
                  className="animate-pulse"
                  style={{ opacity: active ? 1 : 0.4 }}
                />

                {/* Label */}
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 - (node.sublabel ? 4 : 0)}
                  textAnchor="middle"
                  fill={active ? node.color : "white"}
                  className="text-[10px] font-mono stroke-none transition-colors duration-300"
                  style={{ opacity: active ? 1 : 0.7 }}
                >
                  {node.label}
                </text>
                {node.sublabel && (
                  <text
                    x={node.x + node.w / 2}
                    y={node.y + node.h / 2 + 12}
                    textAnchor="middle"
                    fill={active ? node.color : "white"}
                    className="text-[7px] font-mono stroke-none"
                    style={{ opacity: active ? 0.7 : 0.35 }}
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-50 glass-heavy rounded-lg px-3 py-2 text-[10px] sm:text-xs font-mono text-white/80 max-w-[200px] pointer-events-none border border-white/10 shadow-xl"
            style={{
              left: Math.min(tooltip.x, 550),
              top: tooltip.y - 50,
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}

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

        {/* Interactive System Topology */}
        <ScrollReveal delay={300}>
          <InteractiveTopology />
        </ScrollReveal>
      </div>
    </section>
  );
}
