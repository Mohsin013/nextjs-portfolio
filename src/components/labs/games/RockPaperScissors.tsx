"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

const choices: { id: Choice; emoji: string; label: string }[] = [
  { id: "rock", emoji: "🪨", label: "Rock" },
  { id: "paper", emoji: "📄", label: "Paper" },
  { id: "scissors", emoji: "✂️", label: "Scissors" },
];

function getResult(player: Choice, ai: Choice): Result {
  if (player === ai) return "draw";
  if ((player === "rock" && ai === "scissors") || (player === "paper" && ai === "rock") || (player === "scissors" && ai === "paper")) return "win";
  return "lose";
}

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [animating, setAnimating] = useState(false);

  const play = (choice: Choice) => {
    setAnimating(true);
    setPlayerChoice(choice);
    setAiChoice(null);
    setResult(null);

    setTimeout(() => {
      const ai = choices[Math.floor(Math.random() * 3)].id;
      setAiChoice(ai);
      const r = getResult(choice, ai);
      setResult(r);
      setAnimating(false);

      setStats((s) => ({
        wins: s.wins + (r === "win" ? 1 : 0),
        losses: s.losses + (r === "lose" ? 1 : 0),
        draws: s.draws + (r === "draw" ? 1 : 0),
      }));

      if (r === "win") {
        setStreak((s) => { const n = s + 1; setBestStreak((b) => Math.max(b, n)); return n; });
      } else if (r === "lose") {
        setStreak(0);
      }
    }, 800);
  };

  const total = stats.wins + stats.losses + stats.draws;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Rock Paper Scissors</h2>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 text-xs font-mono">
          <span className="text-green-400">{stats.wins}W</span>
          <span className="text-red-400">{stats.losses}L</span>
          <span className="text-white/40">{stats.draws}D</span>
        </div>
        <div className="text-xs font-mono text-white/50">
          STREAK: <span className="text-accent-blue">{streak}</span> | BEST: {bestStreak}
        </div>
      </div>

      {/* Battle area */}
      <div className="glass-heavy rounded-xl p-6 sm:p-10 mb-6">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="text-center">
            <div className={`text-4xl sm:text-6xl mb-2 transition-transform ${animating ? "animate-bounce" : ""}`}>
              {playerChoice ? choices.find((c) => c.id === playerChoice)?.emoji : "❓"}
            </div>
            <span className="text-[10px] font-mono text-white/40">YOU</span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-white/20">VS</div>

          <div className="text-center">
            <div className={`text-4xl sm:text-6xl mb-2 transition-transform ${animating ? "animate-spin" : ""}`}>
              {animating ? "🤔" : aiChoice ? choices.find((c) => c.id === aiChoice)?.emoji : "❓"}
            </div>
            <span className="text-[10px] font-mono text-white/40">AI</span>
          </div>
        </div>

        {result && !animating && (
          <p className={`text-center mt-6 text-lg font-bold font-mono ${result === "win" ? "text-green-400" : result === "lose" ? "text-red-400" : "text-white/50"}`}>
            {result === "win" ? "YOU WIN!" : result === "lose" ? "YOU LOSE!" : "DRAW!"}
          </p>
        )}
      </div>

      {/* Choice buttons */}
      <div className="flex justify-center gap-3 sm:gap-4">
        {choices.map((c) => (
          <button
            key={c.id}
            onClick={() => !animating && play(c.id)}
            disabled={animating}
            className="glass rounded-xl p-4 sm:p-6 hover:bg-white/[0.06] transition-all active:scale-95 disabled:opacity-50"
          >
            <div className="text-3xl sm:text-4xl mb-1">{c.emoji}</div>
            <span className="text-[10px] font-mono text-white/40">{c.label}</span>
          </button>
        ))}
      </div>

      {total > 0 && (
        <p className="text-center text-[10px] font-mono text-white/30 mt-4">
          Win rate: {Math.round((stats.wins / total) * 100)}%
        </p>
      )}
    </div>
  );
}
