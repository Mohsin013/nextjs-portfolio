"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function FlappyDev() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef({ bird: { y: 150, vy: 0 }, pipes: [] as { x: number; gap: number; scored: boolean }[], running: false, score: 0 });

  const BIRD_SIZE = 16;
  const PIPE_WIDTH = 40;
  const GAP_SIZE = 120;
  const GRAVITY = 0.4;
  const FLAP = -7;

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.bird = { y: 150, vy: 0 };
    g.pipes = [];
    g.running = true;
    g.score = 0;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const flap = useCallback(() => {
    if (!started) { startGame(); return; }
    if (gameOver) { startGame(); return; }
    gameRef.current.bird.vy = FLAP;
  }, [started, gameOver, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 320;
    let animId: number;
    let frameCount = 0;

    const render = () => {
      const g = gameRef.current;
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid bg
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let x = 0; x < canvas.width; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

      if (!g.running) {
        // Draw idle bird
        ctx.fillStyle = "#3B82F6";
        ctx.fillRect(60 - BIRD_SIZE / 2, 150 - BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(gameOver ? "TAP TO RETRY" : "TAP TO START", canvas.width / 2, canvas.height / 2 + 40);
        animId = requestAnimationFrame(render);
        return;
      }

      frameCount++;

      // Bird physics
      g.bird.vy += GRAVITY;
      g.bird.y += g.bird.vy;

      // Spawn pipes
      if (frameCount % 90 === 0) {
        const gap = 60 + Math.random() * (canvas.height - GAP_SIZE - 120);
        g.pipes.push({ x: canvas.width, gap, scored: false });
      }

      // Move & draw pipes
      for (let i = g.pipes.length - 1; i >= 0; i--) {
        const pipe = g.pipes[i];
        pipe.x -= 2.5;

        // Top pipe
        ctx.fillStyle = "rgba(139, 92, 246, 0.6)";
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gap);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.gap + GAP_SIZE, PIPE_WIDTH, canvas.height - pipe.gap - GAP_SIZE);
        // Pipe edges
        ctx.fillStyle = "rgba(139, 92, 246, 0.9)";
        ctx.fillRect(pipe.x - 3, pipe.gap - 10, PIPE_WIDTH + 6, 10);
        ctx.fillRect(pipe.x - 3, pipe.gap + GAP_SIZE, PIPE_WIDTH + 6, 10);

        // Score
        if (!pipe.scored && pipe.x + PIPE_WIDTH < 60) {
          pipe.scored = true;
          g.score++;
          setScore(g.score);
        }

        // Collision
        const bx = 60;
        const by = g.bird.y;
        if (bx + BIRD_SIZE / 2 > pipe.x && bx - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH) {
          if (by - BIRD_SIZE / 2 < pipe.gap || by + BIRD_SIZE / 2 > pipe.gap + GAP_SIZE) {
            g.running = false;
            setGameOver(true);
            setBest((b) => Math.max(b, g.score));
          }
        }

        if (pipe.x + PIPE_WIDTH < 0) g.pipes.splice(i, 1);
      }

      // Floor/ceiling collision
      if (g.bird.y + BIRD_SIZE / 2 > canvas.height || g.bird.y - BIRD_SIZE / 2 < 0) {
        g.running = false;
        setGameOver(true);
        setBest((b) => Math.max(b, g.score));
      }

      // Draw bird
      ctx.fillStyle = "#3B82F6";
      ctx.shadowColor = "#3B82F6";
      ctx.shadowBlur = 10;
      ctx.fillRect(60 - BIRD_SIZE / 2, g.bird.y - BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
      ctx.shadowBlur = 0;

      // Eye
      ctx.fillStyle = "#fff";
      ctx.fillRect(60 + 2, g.bird.y - 4, 4, 4);

      animId = requestAnimationFrame(render);
    };

    const handleKey = (e: KeyboardEvent) => { if (e.key === " " || e.key === "ArrowUp") { e.preventDefault(); flap(); } };
    const handleClick = () => flap();

    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", (e) => { e.preventDefault(); flap(); }, { passive: false });
    render();

    return () => {
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [flap]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Flappy Dev</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-mono text-white/50">SCORE: <span className="text-white">{score}</span></span>
        <span className="text-sm font-mono text-white/50">BEST: <span className="text-accent-blue">{best}</span></span>
      </div>
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-xl border border-white/10 cursor-pointer" />
      </div>
      <p className="text-[10px] font-mono text-white/30 mt-3 text-center">Space / Click / Tap to flap</p>
    </div>
  );
}
