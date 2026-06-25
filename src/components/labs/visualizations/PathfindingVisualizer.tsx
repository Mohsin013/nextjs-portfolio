"use client";

import { useState, useCallback } from "react";

const ROWS = 15;
const COLS = 25;

type Cell = "empty" | "wall" | "start" | "end" | "visited" | "path";

function createGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: ROWS }, () => Array(COLS).fill("empty"));
  grid[2][2] = "start";
  grid[ROWS - 3][COLS - 3] = "end";
  return grid;
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<Cell[][]>(createGrid);
  const [running, setRunning] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const reset = () => {
    setRunning(false);
    setGrid(createGrid());
  };

  const clearPath = () => {
    setGrid((g) => g.map((row) => row.map((cell) => (cell === "visited" || cell === "path" ? "empty" : cell))));
  };

  const handleCellClick = (r: number, c: number) => {
    if (running) return;
    setGrid((g) => {
      const newGrid = g.map((row) => [...row]);
      if (newGrid[r][c] === "empty") newGrid[r][c] = "wall";
      else if (newGrid[r][c] === "wall") newGrid[r][c] = "empty";
      return newGrid;
    });
  };

  const handleMouseDown = () => setDrawing(true);
  const handleMouseUp = () => setDrawing(false);
  const handleMouseEnter = (r: number, c: number) => {
    if (drawing && !running) handleCellClick(r, c);
  };

  const bfs = useCallback(async () => {
    clearPath();
    setRunning(true);
    const g = grid.map((row) => [...row]);
    let start: [number, number] | null = null;
    let end: [number, number] | null = null;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (g[r][c] === "start") start = [r, c];
        if (g[r][c] === "end") end = [r, c];
      }
    }
    if (!start || !end) { setRunning(false); return; }

    const queue: [number, number][] = [start];
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    visited.add(`${start[0]},${start[1]}`);

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      if (r === end[0] && c === end[1]) {
        let curr = `${end[0]},${end[1]}`;
        while (parent.has(curr)) {
          const [pr, pc] = curr.split(",").map(Number);
          if (g[pr][pc] !== "start" && g[pr][pc] !== "end") {
            g[pr][pc] = "path";
            setGrid(g.map((row) => [...row]));
            await delay(20);
          }
          curr = parent.get(curr)!;
        }
        setRunning(false);
        return;
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        const key = `${nr},${nc}`;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited.has(key) && g[nr][nc] !== "wall") {
          visited.add(key);
          parent.set(key, `${r},${c}`);
          queue.push([nr, nc]);
          if (g[nr][nc] !== "end") {
            g[nr][nc] = "visited";
            setGrid(g.map((row) => [...row]));
            await delay(15);
          }
        }
      }
    }
    setRunning(false);
  }, [grid]);

  const cellColor: Record<Cell, string> = {
    empty: "bg-white/5 hover:bg-white/10",
    wall: "bg-white/40",
    start: "bg-green-500",
    end: "bg-red-500",
    visited: "bg-accent-blue/30",
    path: "bg-yellow-400",
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Pathfinding (BFS)</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Click/drag to draw walls. Green = start, Red = end.</p>

      <div className="overflow-x-auto -mx-2 px-2 pb-2" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div className="inline-grid gap-[1px] p-2 glass rounded-xl" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }} onMouseDown={handleMouseDown}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm transition-colors cursor-pointer ${cellColor[cell]}`}
                onClick={() => handleCellClick(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={bfs} disabled={running} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
          {running ? "FINDING..." : "FIND PATH"}
        </button>
        <button onClick={reset} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
          RESET
        </button>
      </div>
    </div>
  );
}
