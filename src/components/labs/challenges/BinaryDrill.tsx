"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "bin-to-dec" | "dec-to-bin" | "hex-to-dec" | "dec-to-hex";

function generateQuestion(mode: Mode): { question: string; answer: string } {
  const num = Math.floor(Math.random() * 256);
  switch (mode) {
    case "bin-to-dec": return { question: num.toString(2).padStart(8, "0"), answer: num.toString() };
    case "dec-to-bin": return { question: num.toString(), answer: num.toString(2) };
    case "hex-to-dec": return { question: "0x" + num.toString(16).toUpperCase(), answer: num.toString() };
    case "dec-to-hex": return { question: num.toString(), answer: num.toString(16).toUpperCase() };
  }
}

export default function BinaryDrill() {
  const [mode, setMode] = useState<Mode>("bin-to-dec");
  const [question, setQuestion] = useState(() => generateQuestion("bin-to-dec"));
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setRunning(true);
    setResult(null);
    setQuestion(generateQuestion(mode));
    setInput("");
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const submit = () => {
    if (!running) return;
    const correct = input.trim().toUpperCase() === question.answer.toUpperCase() || input.trim() === parseInt(question.answer, 10).toString();

    if (correct) {
      setResult("correct");
      setScore((s) => s + 1 + streak);
      setStreak((s) => s + 1);
    } else {
      setResult("wrong");
      setStreak(0);
    }

    setTimeout(() => {
      setQuestion(generateQuestion(mode));
      setInput("");
      setResult(null);
    }, 600);
  };

  const modeLabels: Record<Mode, string> = {
    "bin-to-dec": "BIN → DEC",
    "dec-to-bin": "DEC → BIN",
    "hex-to-dec": "HEX → DEC",
    "dec-to-hex": "DEC → HEX",
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Binary / Hex Speed Drill</h2>
      <p className="text-xs font-mono text-white/40 mb-6">Convert as many numbers as you can in 60 seconds. Streak bonus!</p>

      {/* Mode selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(modeLabels) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); if (!running) setQuestion(generateQuestion(m)); }}
            className={`px-3 py-2 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${mode === m ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"}`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-white/50">SCORE: <span className="text-white">{score}</span></span>
          <span className="text-white/50">STREAK: <span className="text-accent-blue">{streak}</span></span>
        </div>
        <span className={`text-sm font-mono font-bold ${timeLeft < 10 ? "text-red-400" : "text-white"}`}>{timeLeft}s</span>
      </div>

      {/* Question */}
      <div className={`glass-heavy rounded-xl p-8 text-center mb-6 border ${result === "correct" ? "border-green-500/30" : result === "wrong" ? "border-red-500/30" : "border-transparent"}`}>
        <p className="text-[10px] font-mono text-white/40 mb-2">CONVERT THIS:</p>
        <div className="text-3xl sm:text-4xl font-bold font-mono text-accent-blue">{question.question}</div>
      </div>

      {running ? (
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-lg font-mono text-white text-center focus:outline-none focus:border-accent-blue/50"
            placeholder="Your answer..."
            autoFocus
          />
          <button onClick={submit} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            SUBMIT
          </button>
        </div>
      ) : (
        <div className="text-center">
          {timeLeft === 0 && <p className="text-sm font-mono text-white/50 mb-4">Final score: {score}</p>}
          <button onClick={start} className="px-8 py-4 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            {timeLeft === 0 ? "PLAY AGAIN" : "START (60s)"}
          </button>
        </div>
      )}
    </div>
  );
}
