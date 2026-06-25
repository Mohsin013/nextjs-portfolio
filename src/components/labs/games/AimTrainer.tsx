"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function AimTrainer() {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [target, setTarget] = useState<{ x: number; y: number; size: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnTarget = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const size = 20 + Math.random() * 30;
    setTarget({
      x: size + Math.random() * (rect.width - size * 2),
      y: size + Math.random() * (rect.height - size * 2),
      size,
    });
  }, []);

  const start = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    setRunning(true);
    spawnTarget();
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setTarget(null);
          setBestScore((b) => Math.max(b, score));
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, score]);

  const hitTarget = () => {
    setScore((s) => s + 1);
    spawnTarget();
  };

  const missTarget = () => {
    if (!running) return;
    setMisses((m) => m + 1);
  };

  const accuracy = score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Aim Trainer</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-white/50">HITS: <span className="text-green-400">{score}</span></span>
          <span className="text-white/50">MISSES: <span className="text-red-400">{misses}</span></span>
          <span className="text-white/50">ACC: <span className="text-accent-blue">{accuracy}%</span></span>
        </div>
        <span className="text-sm font-mono text-white">{timeLeft}s</span>
      </div>

      <div
        ref={containerRef}
        onClick={missTarget}
        className="relative w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black/50 cursor-crosshair overflow-hidden"
      >
        {!running && !target && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {timeLeft === 0 ? (
              <>
                <div className="text-3xl font-bold text-accent-blue mb-2">{score} hits</div>
                <div className="text-xs font-mono text-white/40 mb-4">Accuracy: {accuracy}% | Best: {bestScore}</div>
                <button onClick={start} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
                  PLAY AGAIN
                </button>
              </>
            ) : (
              <button onClick={start} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
                START (30s)
              </button>
            )}
          </div>
        )}

        {target && running && (
          <button
            onClick={(e) => { e.stopPropagation(); hitTarget(); }}
            className="absolute rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-lg shadow-red-500/30 border-2 border-red-300/50"
            style={{ left: target.x - target.size / 2, top: target.y - target.size / 2, width: target.size, height: target.size }}
          />
        )}
      </div>
    </div>
  );
}
