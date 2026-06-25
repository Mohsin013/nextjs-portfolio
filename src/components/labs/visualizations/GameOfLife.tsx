"use client";

import { useState, useRef, useCallback } from "react";

const ROWS = 25;
const COLS = 35;

function createEmpty(): boolean[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

function randomize(): boolean[][] {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => Math.random() > 0.7));
}

function countNeighbors(grid: boolean[][], r: number, c: number): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc]) count++;
    }
  }
  return count;
}

function nextGen(grid: boolean[][]): boolean[][] {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      const n = countNeighbors(grid, r, c);
      if (cell) return n === 2 || n === 3;
      return n === 3;
    })
  );
}

export default function GameOfLife() {
  const [grid, setGrid] = useState<boolean[][]>(randomize);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const run = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => nextGen(g));
    setGeneration((gen) => gen + 1);
  }, []);

  const toggle = () => {
    if (running) {
      runningRef.current = false;
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      runningRef.current = true;
      setRunning(true);
      intervalRef.current = setInterval(run, 100);
    }
  };

  const reset = () => {
    runningRef.current = false;
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setGrid(createEmpty());
    setGeneration(0);
  };

  const toggleCell = (r: number, c: number) => {
    if (running) return;
    setGrid((g) => g.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? !cell : cell))));
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Conway&apos;s Game of Life</h2>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-white/50">GEN: <span className="text-white">{generation}</span></span>
        <span className="text-xs font-mono text-white/50">
          ALIVE: <span className="text-green-400">{grid.flat().filter(Boolean).length}</span>
        </span>
      </div>

      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="inline-grid gap-[1px] glass rounded-xl p-1" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => toggleCell(r, c)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-colors cursor-pointer ${cell ? "bg-green-500" : "bg-white/5 hover:bg-white/10"}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button onClick={toggle} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          {running ? "PAUSE" : "START"}
        </button>
        <button onClick={reset} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
          CLEAR
        </button>
        <button onClick={() => { setGrid(randomize()); setGeneration(0); }} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
          RANDOM
        </button>
      </div>
    </div>
  );
}
