"use client";

import { useState, useEffect, useRef } from "react";

type AnimStyle = "wave" | "glitch" | "fade" | "bounce";

export default function TypographyAnimator() {
  const [text, setText] = useState("Hello, World!");
  const [style, setStyle] = useState<AnimStyle>("wave");
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Typography Animator</h2>

      <div className="space-y-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50"
          placeholder="Type anything..."
        />

        <div className="flex flex-wrap gap-2">
          {(["wave", "glitch", "fade", "bounce"] as AnimStyle[]).map((s) => (
            <button key={s} onClick={() => { setStyle(s); replay(); }} className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${style === s ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"}`}>
              {s.toUpperCase()}
            </button>
          ))}
          <button onClick={replay} className="px-4 py-2 rounded-lg text-xs font-mono glass text-accent-blue">
            REPLAY
          </button>
        </div>

        <div className="glass rounded-xl p-8 sm:p-12 flex items-center justify-center min-h-[150px] sm:min-h-[200px] overflow-hidden">
          <AnimatedText key={key} text={text} style={style} />
        </div>
      </div>
    </div>
  );
}

function AnimatedText({ text, style }: { text: string; style: AnimStyle }) {
  const [visible, setVisible] = useState<boolean[]>([]);
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    setVisible(new Array(text.length).fill(false));
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    text.split("").forEach((_, i) => {
      const t = setTimeout(() => {
        setVisible((v) => { const n = [...v]; n[i] = true; return n; });
      }, i * 60);
      timeouts.current.push(t);
    });

    return () => timeouts.current.forEach(clearTimeout);
  }, [text]);

  const getStyle = (i: number): React.CSSProperties => {
    if (!visible[i]) return { opacity: 0, transform: "translateY(20px)" };

    switch (style) {
      case "wave":
        return { opacity: 1, transform: `translateY(${Math.sin(i * 0.5) * 10}px)`, transition: "all 0.4s ease" };
      case "glitch":
        return { opacity: 1, transform: `translate(${Math.random() > 0.8 ? (Math.random() - 0.5) * 4 : 0}px, 0)`, color: Math.random() > 0.9 ? "var(--accent-blue)" : undefined, transition: "all 0.2s ease" };
      case "fade":
        return { opacity: 1, transform: "translateY(0)", transition: `all 0.6s ease ${i * 0.05}s` };
      case "bounce":
        return { opacity: 1, transform: "translateY(0) scale(1)", transition: `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${i * 0.04}s` };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <div className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white flex flex-wrap justify-center">
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block" style={getStyle(i)}>
          {char === " " ? " " : char}
        </span>
      ))}
    </div>
  );
}
