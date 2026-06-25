"use client";

import { useState, useCallback } from "react";

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function generateOptions(correct: string): string[] {
  const options = [correct];
  while (options.length < 4) {
    const c = randomHex();
    if (!options.includes(c)) options.push(c);
  }
  return options.sort(() => Math.random() - 0.5);
}

export default function ColorGuessing() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const [correct, setCorrect] = useState(randomHex());
  const [options, setOptions] = useState(generateOptions(correct));

  const newRound = useCallback(() => {
    const c = randomHex();
    setCorrect(c);
    setOptions(generateOptions(c));
    setAnswer(null);
  }, []);

  const guess = (color: string) => {
    setAnswer(color);
    if (color === correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setTimeout(newRound, 800);
    } else {
      setStreak(0);
      setTimeout(newRound, 1500);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Color Guessing Game</h2>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <span className="text-sm font-mono text-white/50">SCORE: <span className="text-white">{score}</span></span>
          <span className="text-sm font-mono text-white/50">STREAK: <span className="text-accent-blue">{streak}</span></span>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xs font-mono text-white/40 mb-3">WHICH COLOR IS THIS?</p>
        <code className="text-2xl sm:text-4xl font-mono font-bold text-white">{correct}</code>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
        {options.map((color) => {
          let border = "border-white/10 hover:border-white/30";
          if (answer) {
            if (color === correct) border = "border-green-500 ring-2 ring-green-500/30";
            else if (color === answer) border = "border-red-500";
          }
          return (
            <button
              key={color}
              onClick={() => !answer && guess(color)}
              className={`aspect-square rounded-xl border-2 transition-all ${border}`}
              style={{ backgroundColor: color }}
              disabled={!!answer}
            />
          );
        })}
      </div>

      {answer && (
        <div className="mt-6 text-center text-sm font-mono">
          {answer === correct ? (
            <span className="text-green-400">Correct!</span>
          ) : (
            <span className="text-red-400">Wrong! It was the {correct} swatch</span>
          )}
        </div>
      )}
    </div>
  );
}
