"use client";

import { useState, useCallback } from "react";

const wordList = [
  { word: "typescript", hint: "JavaScript with types" },
  { word: "algorithm", hint: "Step-by-step procedure" },
  { word: "database", hint: "Organized data storage" },
  { word: "component", hint: "Reusable UI building block" },
  { word: "function", hint: "Reusable code block" },
  { word: "variable", hint: "Named data container" },
  { word: "interface", hint: "Contract for object shape" },
  { word: "pipeline", hint: "Sequence of data processing" },
  { word: "callback", hint: "Function passed as argument" },
  { word: "endpoint", hint: "API access point" },
  { word: "mutation", hint: "Data modification operation" },
  { word: "iterator", hint: "Sequential access pattern" },
  { word: "template", hint: "Reusable blueprint" },
  { word: "compiler", hint: "Code translator" },
  { word: "protocol", hint: "Communication rules" },
];

function scramble(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("") === word ? scramble(word) : arr.join("");
}

export default function WordScramble() {
  const [current, setCurrent] = useState(() => wordList[Math.floor(Math.random() * wordList.length)]);
  const [scrambled, setScrambled] = useState(() => scramble(current.word));
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const nextWord = useCallback(() => {
    const next = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrent(next);
    setScrambled(scramble(next.word));
    setGuess("");
    setResult(null);
    setShowHint(false);
  }, []);

  const checkGuess = () => {
    if (guess.toLowerCase().trim() === current.word) {
      setResult("correct");
      setScore((s) => s + 1);
      setTimeout(nextWord, 1200);
    } else {
      setResult("wrong");
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Word Scramble</h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-mono text-white/50">SCORE: <span className="text-white">{score}</span></span>
        <button onClick={nextWord} className="text-xs font-mono text-accent-blue hover:text-white transition-colors glass px-3 py-1.5 rounded">SKIP</button>
      </div>

      <div className="glass-heavy rounded-xl p-8 sm:p-12 text-center mb-6">
        <p className="text-[10px] font-mono text-white/40 mb-3 uppercase">Unscramble this word</p>
        <div className="text-3xl sm:text-5xl font-bold tracking-widest text-accent-blue font-mono">
          {scrambled.toUpperCase()}
        </div>
        {showHint && (
          <p className="text-sm text-white/50 mt-4 font-mono">Hint: {current.hint}</p>
        )}
        {!showHint && (
          <button onClick={() => setShowHint(true)} className="text-[10px] font-mono text-white/30 hover:text-white/50 mt-4">
            SHOW HINT
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <input
          value={guess}
          onChange={(e) => { setGuess(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && checkGuess()}
          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50"
          placeholder="Type your answer..."
          autoFocus
        />
        <button onClick={checkGuess} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          CHECK
        </button>
      </div>

      {result && (
        <p className={`text-sm font-mono mt-3 text-center ${result === "correct" ? "text-green-400" : "text-red-400"}`}>
          {result === "correct" ? "Correct!" : "Try again..."}
        </p>
      )}
    </div>
  );
}
