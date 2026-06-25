"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Pos = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID = 20;
const CELL = 15;

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);

  const snakeRef = useRef<Pos[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Dir>("RIGHT");
  const foodRef = useRef<Pos>({ x: 5, y: 5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnFood = useCallback(() => {
    let pos: Pos;
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snakeRef.current.some((s) => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#3B82F6";
    snakeRef.current.forEach((seg, i) => {
      const alpha = 1 - (i / snakeRef.current.length) * 0.5;
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });

    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.arc(foodRef.current.x * CELL + CELL / 2, foodRef.current.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const tick = useCallback(() => {
    const snake = snakeRef.current;
    const head = { ...snake[0] };

    switch (dirRef.current) {
      case "UP": head.y--; break;
      case "DOWN": head.y++; break;
      case "LEFT": head.x--; break;
      case "RIGHT": head.x++; break;
    }

    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setHighScore((h) => Math.max(h, score));
      return;
    }

    snake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((s) => s + 1);
      spawnFood();
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
  }, [draw, score, spawnFood]);

  const startGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = "RIGHT";
    setScore(0);
    setGameOver(false);
    setRunning(true);
    spawnFood();
    draw();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, 120);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = { ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT", w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT" };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      const opposite: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
      if (dir !== opposite[dirRef.current]) dirRef.current = dir;
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(tick, 120);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, tick]);

  const handleSwipe = (dir: Dir) => {
    const opposite: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (dir !== opposite[dirRef.current]) dirRef.current = dir;
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Snake</h2>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-mono text-white/50">SCORE: <span className="text-white">{score}</span></span>
        <span className="text-sm font-mono text-white/50">BEST: <span className="text-accent-blue">{highScore}</span></span>
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="rounded-xl border border-white/10"
        />
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto sm:hidden mb-4">
        <div />
        <button onClick={() => handleSwipe("UP")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">↑</button>
        <div />
        <button onClick={() => handleSwipe("LEFT")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">←</button>
        <button onClick={() => handleSwipe("DOWN")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">↓</button>
        <button onClick={() => handleSwipe("RIGHT")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">→</button>
      </div>

      <div className="text-center">
        {(!running || gameOver) && (
          <button onClick={startGame} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            {gameOver ? "PLAY AGAIN" : "START"}
          </button>
        )}
        {gameOver && <p className="text-sm font-mono text-red-400 mt-3">Game Over!</p>}
        <p className="text-[10px] font-mono text-white/30 mt-3 hidden sm:block">Arrow keys or WASD to move</p>
      </div>
    </div>
  );
}
