"use client";

import { useState, useEffect, useCallback } from "react";

type Board = number[][];

function createBoard(): Board {
  const b = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandom(b);
  addRandom(b);
  return b;
}

function addRandom(board: Board) {
  const empty: [number, number][] = [];
  board.forEach((row, r) => row.forEach((cell, c) => { if (cell === 0) empty.push([r, c]); }));
  if (empty.length === 0) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row: number[]): { result: number[]; score: number } {
  let score = 0;
  const filtered = row.filter((x) => x !== 0);
  const result: number[] = [];
  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      score += filtered[i] * 2;
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < 4) result.push(0);
  return { result, score };
}

function moveLeft(board: Board): { board: Board; score: number; moved: boolean } {
  let totalScore = 0;
  let moved = false;
  const newBoard = board.map((row) => {
    const { result, score } = slide(row);
    totalScore += score;
    if (result.some((v, i) => v !== row[i])) moved = true;
    return result;
  });
  return { board: newBoard, score: totalScore, moved };
}

function rotate90(board: Board): Board {
  return board[0].map((_, i) => board.map((row) => row[i]).reverse());
}

function move(board: Board, dir: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
  let rotations = { left: 0, down: 1, right: 2, up: 3 }[dir];
  let b = board.map((r) => [...r]);
  for (let i = 0; i < rotations; i++) b = rotate90(b);
  const result = moveLeft(b);
  let nb = result.board;
  for (let i = 0; i < (4 - rotations) % 4; i++) nb = rotate90(nb);
  return { board: nb, score: result.score, moved: result.moved };
}

function isGameOver(board: Board): boolean {
  for (const dir of ["left", "right", "up", "down"] as const) {
    if (move(board, dir).moved) return false;
  }
  return true;
}

const tileColors: Record<number, string> = {
  0: "bg-white/5",
  2: "bg-white/10 text-white",
  4: "bg-white/15 text-white",
  8: "bg-orange-500/60 text-white",
  16: "bg-orange-600/70 text-white",
  32: "bg-red-500/60 text-white",
  64: "bg-red-600/70 text-white",
  128: "bg-yellow-500/60 text-white",
  256: "bg-yellow-500/70 text-white",
  512: "bg-yellow-400/80 text-white",
  1024: "bg-yellow-300/80 text-black",
  2048: "bg-yellow-200/90 text-black font-bold",
};

export default function TwentyFortyEight() {
  const [board, setBoard] = useState<Board>(createBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    if (gameOver) return;
    const result = move(board, dir);
    if (!result.moved) return;
    addRandom(result.board);
    setBoard(result.board);
    const newScore = score + result.score;
    setScore(newScore);
    setBest((b) => Math.max(b, newScore));
    if (isGameOver(result.board)) setGameOver(true);
  }, [board, score, gameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
        a: "left", d: "right", w: "up", s: "down",
      };
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key]); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleMove]);

  const reset = () => { setBoard(createBoard()); setScore(0); setGameOver(false); };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">2048</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <span className="text-sm font-mono text-white/50">SCORE: <span className="text-white">{score}</span></span>
          <span className="text-sm font-mono text-white/50">BEST: <span className="text-accent-blue">{best}</span></span>
        </div>
        <button onClick={reset} className="text-xs font-mono text-accent-blue hover:text-white transition-colors glass px-3 py-1.5 rounded">NEW</button>
      </div>

      <div className="glass rounded-xl p-2 sm:p-3 max-w-xs mx-auto">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {board.flat().map((val, i) => (
            <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-sm sm:text-lg font-bold transition-all ${tileColors[val] || "bg-purple-500/80 text-white"}`}>
              {val > 0 ? val : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto mt-4 sm:hidden">
        <div />
        <button onClick={() => handleMove("up")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">↑</button>
        <div />
        <button onClick={() => handleMove("left")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">←</button>
        <button onClick={() => handleMove("down")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">↓</button>
        <button onClick={() => handleMove("right")} className="glass rounded-lg p-3 text-center text-white/60 active:bg-white/10">→</button>
      </div>

      {gameOver && <p className="text-center text-sm font-mono text-red-400 mt-4">Game Over! Final Score: {score}</p>}
      <p className="text-[10px] font-mono text-white/30 mt-3 text-center hidden sm:block">Arrow keys or WASD</p>
    </div>
  );
}
