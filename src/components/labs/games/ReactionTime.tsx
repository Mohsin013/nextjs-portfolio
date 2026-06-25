"use client";

import { useState, useRef } from "react";

type Phase = "waiting" | "ready" | "go" | "result" | "too-early";

export default function ReactionTime() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [time, setTime] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const startRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setPhase("ready");
    const delay = 1000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      setPhase("go");
      startRef.current = performance.now();
    }, delay);
  };

  const handleClick = () => {
    if (phase === "waiting" || phase === "result" || phase === "too-early") {
      start();
    } else if (phase === "ready") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("too-early");
    } else if (phase === "go") {
      const elapsed = Math.round(performance.now() - startRef.current);
      setTime(elapsed);
      setTimes((t) => [...t, elapsed]);
      setPhase("result");
    }
  };

  const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const best = times.length > 0 ? Math.min(...times) : 0;

  const bgColor = {
    waiting: "bg-black/30",
    ready: "bg-red-900/30",
    go: "bg-green-900/30",
    result: "bg-accent-blue/10",
    "too-early": "bg-yellow-900/30",
  }[phase];

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Reaction Time Tester</h2>

      <button
        onClick={handleClick}
        className={`w-full h-48 sm:h-64 rounded-xl border border-white/10 flex flex-col items-center justify-center transition-colors cursor-pointer ${bgColor}`}
      >
        {phase === "waiting" && (
          <><span className="text-xl sm:text-2xl font-medium text-white/70">Click to Start</span><span className="text-xs font-mono text-white/30 mt-2">Test your reflexes</span></>
        )}
        {phase === "ready" && (
          <span className="text-xl sm:text-2xl font-medium text-red-400">Wait for green...</span>
        )}
        {phase === "go" && (
          <span className="text-xl sm:text-2xl font-bold text-green-400">CLICK NOW!</span>
        )}
        {phase === "result" && (
          <><span className="text-4xl sm:text-5xl font-bold text-accent-blue">{time}ms</span><span className="text-xs font-mono text-white/40 mt-2">Click to try again</span></>
        )}
        {phase === "too-early" && (
          <><span className="text-xl sm:text-2xl font-medium text-yellow-400">Too early!</span><span className="text-xs font-mono text-white/40 mt-2">Click to try again</span></>
        )}
      </button>

      {times.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{time}ms</div>
            <div className="text-[10px] font-mono text-white/40">LAST</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-accent-blue">{avg}ms</div>
            <div className="text-[10px] font-mono text-white/40">AVERAGE</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">{best}ms</div>
            <div className="text-[10px] font-mono text-white/40">BEST</div>
          </div>
        </div>
      )}
    </div>
  );
}
