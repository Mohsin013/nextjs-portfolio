"use client";

import { useState, useCallback } from "react";

export default function NumberGuess() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState<{ value: number; hint: string }[]>([]);
  const [won, setWon] = useState(false);
  const [range] = useState({ min: 1, max: 100 });

  const newGame = useCallback(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts([]);
    setWon(false);
  }, []);

  const submitGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < range.min || num > range.max) return;

    let hint: string;
    if (num === target) {
      hint = "correct";
      setWon(true);
    } else if (num < target) {
      hint = "higher";
    } else {
      hint = "lower";
    }

    setAttempts((a) => [...a, { value: num, hint }]);
    setGuess("");
  };

  const getHintColor = (hint: string) => {
    if (hint === "correct") return "text-green-400 bg-green-500/10 border-green-500/30";
    if (hint === "higher") return "text-blue-400 bg-blue-500/10 border-blue-500/30";
    return "text-orange-400 bg-orange-500/10 border-orange-500/30";
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Number Guessing Game</h2>
      <p className="text-xs font-mono text-white/40 mb-6">I&apos;m thinking of a number between 1 and 100...</p>

      <div className="flex gap-3 mb-6">
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitGuess()}
          disabled={won}
          placeholder="Your guess..."
          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50 disabled:opacity-50"
        />
        <button
          onClick={submitGuess}
          disabled={won}
          className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          GUESS
        </button>
      </div>

      {/* Attempts */}
      <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
        {attempts.map((a, i) => (
          <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-lg border text-sm font-mono ${getHintColor(a.hint)}`}>
            <span>#{i + 1}: {a.value}</span>
            <span className="text-xs uppercase">
              {a.hint === "correct" ? "CORRECT!" : a.hint === "higher" ? "↑ Higher" : "↓ Lower"}
            </span>
          </div>
        ))}
      </div>

      {won && (
        <div className="glass-heavy rounded-xl p-6 text-center mb-4">
          <div className="text-2xl font-bold text-green-400 mb-2">You got it!</div>
          <div className="text-sm font-mono text-white/50">The number was {target}. Solved in {attempts.length} attempt{attempts.length !== 1 ? "s" : ""}.</div>
        </div>
      )}

      <button onClick={newGame} className="text-xs font-mono text-accent-blue hover:text-white transition-colors glass px-3 py-1.5 rounded">
        NEW GAME
      </button>
    </div>
  );
}
