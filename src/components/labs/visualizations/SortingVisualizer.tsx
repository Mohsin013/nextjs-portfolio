"use client";

import { useState, useRef, useCallback } from "react";

type Algorithm = "bubble" | "selection" | "insertion" | "quick";

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>(() => generateArray(40));
  const [sorting, setSorting] = useState(false);
  const [algo, setAlgo] = useState<Algorithm>("bubble");
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const stopRef = useRef(false);

  function generateArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  }

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const reset = () => {
    stopRef.current = true;
    setSorting(false);
    setHighlighted([]);
    setSorted([]);
    setArray(generateArray(40));
  };

  const sort = useCallback(async () => {
    stopRef.current = false;
    setSorting(true);
    setSorted([]);
    const arr = [...array];

    const update = async (hl: number[]) => {
      if (stopRef.current) throw new Error("stopped");
      setArray([...arr]);
      setHighlighted(hl);
      await delay(30);
    };

    try {
      if (algo === "bubble") {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            await update([j, j + 1]);
            if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
          setSorted((s) => [...s, arr.length - 1 - i]);
        }
      } else if (algo === "selection") {
        for (let i = 0; i < arr.length; i++) {
          let min = i;
          for (let j = i + 1; j < arr.length; j++) {
            await update([min, j]);
            if (arr[j] < arr[min]) min = j;
          }
          [arr[i], arr[min]] = [arr[min], arr[i]];
          setSorted((s) => [...s, i]);
        }
      } else if (algo === "insertion") {
        for (let i = 1; i < arr.length; i++) {
          const key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            await update([j, j + 1]);
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = key;
          setSorted((s) => [...s, i]);
        }
      } else if (algo === "quick") {
        const quickSort = async (low: number, high: number) => {
          if (low >= high) return;
          const pivot = arr[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
            await update([j, high]);
            if (arr[j] < pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
          }
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          setSorted((s) => [...s, i + 1]);
          await quickSort(low, i);
          await quickSort(i + 2, high);
        };
        await quickSort(0, arr.length - 1);
      }

      setArray([...arr]);
      setHighlighted([]);
      setSorted(arr.map((_, i) => i));
    } catch {
      /* stopped */
    }
    setSorting(false);
  }, [array, algo]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Sorting Visualizer</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {(["bubble", "selection", "insertion", "quick"] as Algorithm[]).map((a) => (
          <button key={a} onClick={() => !sorting && setAlgo(a)} disabled={sorting} className={`px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-mono capitalize transition-all ${algo === a ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"} disabled:opacity-50`}>
            {a} sort
          </button>
        ))}
      </div>

      <div className="glass rounded-xl p-4 mb-4 flex items-end gap-[2px] h-48 sm:h-64">
        {array.map((val, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-all duration-75 ${
              sorted.includes(i) ? "bg-green-500" : highlighted.includes(i) ? "bg-accent-blue" : "bg-white/30"
            }`}
            style={{ height: `${val}%` }}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={sort} disabled={sorting} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
          {sorting ? "SORTING..." : "START"}
        </button>
        <button onClick={reset} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
          RESET
        </button>
      </div>
    </div>
  );
}
