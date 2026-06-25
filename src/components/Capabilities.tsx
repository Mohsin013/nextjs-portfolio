"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

const categories = [
  {
    id: 1,
    title: "AI & Machine Learning",
    desc: "Production-ready AI systems that deliver real value.",
    examples: [
      "Anthropic Claude & Google Gemini",
      "OpenAI GPT-4 Integration",
      "Generative AI Pipelines",
      "RAG with Pinecone",
      "Multi-Agent LLM Systems",
      "Vector Embeddings",
      "Voice Cloning (RVC)",
      "Avatar Animation (SADTalker)",
      "AWS Rekognition & Textract",
      "Vercel AI SDK",
    ],
    icon: "AI",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Backend Development",
    desc: "High-performance, scalable server architectures.",
    examples: [
      "Node.js & Bun.js Runtime",
      "Elysia.js & Express.js",
      "TypeScript & Python",
      "GraphQL & tRPC",
      "Microservices Architecture",
      "Async Job Processing (BullMQ)",
      "Real-time WebSocket Systems",
      "WebRTC Streaming",
    ],
    icon: "BE",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Frontend & Mobile",
    desc: "Modern, responsive interfaces with excellent UX.",
    examples: [
      "React 19 & TypeScript",
      "React Native & Expo",
      "Lexical Editor Integration",
      "Tailwind CSS Styling",
      "Zustand State Management",
      "React Query Data Fetching",
      "Recharts & Radix UI",
      "Progressive Web Apps (PWA)",
    ],
    icon: "FE",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 4,
    title: "Databases & Caching",
    desc: "Optimized data storage and retrieval solutions.",
    examples: [
      "MongoDB Document Storage",
      "Mongoose ODM",
      "SQL with Prisma ORM",
      "Redis Caching & Queues",
      "Pinecone Vector Database",
      "Database Optimization",
      "Query Performance Tuning",
    ],
    icon: "DB",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    desc: "Enterprise-grade infrastructure and deployment.",
    examples: [
      "AWS (S3, EC2, ASG, CloudFront)",
      "Route 53 & CDN",
      "Load Balancer Config",
      "CI/CD with CodePipeline",
      "Distributed Systems Design",
      "Stripe & Razorpay",
      "OAuth 2.0 Authentication",
      "Monitoring & Observability",
    ],
    icon: "CD",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 6,
    title: "System Architecture",
    desc: "End-to-end solution design and implementation.",
    examples: [
      "Distributed Queue Systems",
      "Auto-scaling Strategies",
      "Fault-tolerant Design",
      "Real-time Streaming Arch",
      "Modular Monolith Design",
      "Microservices Migration",
      "Performance Optimization",
    ],
    icon: "SA",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

export default function Capabilities() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    const grid = gridRef.current;
    grid?.addEventListener("mousemove", handleMouse);
    return () => grid?.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section id="capabilities" className="py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 sm:mb-20">
            <h2 className="text-xs sm:text-sm font-mono tracking-widest text-accent-blue mb-4 uppercase">
              /// Capability Matrix
            </h2>
            <p className="text-2xl sm:text-4xl md:text-5xl max-w-3xl font-light text-white/90 leading-tight">
              I don&apos;t just write code. I build{" "}
              <span className="shimmer-text font-medium">ecosystem capabilities</span>{" "}
              that turn abstract requirements into shipping products.
            </p>
          </div>
        </ScrollReveal>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 relative">
          {/* Grid spotlight effect - desktop only */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-300 z-0 hidden md:block"
            style={{
              left: mousePos.x - 150,
              top: mousePos.y - 150,
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
              opacity: activeId ? 1 : 0,
            }}
          />

          {categories.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 80}>
              <div
                className={`
                  group relative min-h-[200px] sm:min-h-[280px] md:h-[320px] border border-white/8 rounded-xl overflow-hidden
                  transition-all duration-500 ease-out cursor-crosshair
                  ${activeId === cat.id ? "glass-heavy border-accent-blue/30 md:scale-[1.02]" : "glass hover:border-white/15"}
                  ${activeId && activeId !== cat.id ? "md:opacity-40 md:scale-[0.98]" : ""}
                `}
                onMouseEnter={() => setActiveId(cat.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                data-cursor-label={cat.title}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 md:p-8">
                  <div>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-accent-blue/60 group-hover:text-accent-blue transition-colors block mb-3 sm:mb-4">
                      {cat.icon}
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">{cat.title}</h3>
                    <p className="text-xs sm:text-sm text-white/40 group-hover:text-white/60 transition-colors">{cat.desc}</p>
                  </div>

                  <div className={`space-y-1 sm:space-y-1.5 transform transition-all duration-500 ${activeId === cat.id ? "translate-y-0 opacity-100 mt-4" : "translate-y-6 opacity-0 h-0 overflow-hidden md:h-auto"}`}>
                    <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/50 to-transparent mb-2 sm:mb-3" />
                    {cat.examples.slice(0, 5).map((ex, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-accent-blue/80">
                        <span className="w-1 h-1 rounded-full bg-accent-blue/60 flex-shrink-0" />
                        <span className="truncate">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
