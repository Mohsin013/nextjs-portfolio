"use client";

import { useState } from "react";

const questions = [
  { code: "for (let i = 0; i < n; i++) { sum += i; }", answer: "O(n)", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"] },
  { code: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    matrix[i][j] = 0;", answer: "O(n²)", options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"] },
  { code: "while (n > 1) { n = Math.floor(n / 2); }", answer: "O(log n)", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"] },
  { code: "arr.sort((a, b) => a - b);", answer: "O(n log n)", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"] },
  { code: "return hashMap[key];", answer: "O(1)", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"] },
  { code: "for (let i = 0; i < n; i++)\n  for (let j = i; j < n; j++)\n    count++;", answer: "O(n²)", options: ["O(n)", "O(n²)", "O(n log n)", "O(n³)"] },
  { code: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}", answer: "O(2ⁿ)", options: ["O(n)", "O(n²)", "O(log n)", "O(2ⁿ)"] },
  { code: "let left = 0, right = n - 1;\nwhile (left <= right) {\n  let mid = Math.floor((left + right) / 2);\n  if (arr[mid] === target) return mid;\n  else if (arr[mid] < target) left = mid + 1;\n  else right = mid - 1;\n}", answer: "O(log n)", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"] },
  { code: "for (let i = 1; i < n; i *= 2)\n  for (let j = 0; j < n; j++)\n    sum++;", answer: "O(n log n)", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"] },
  { code: "const set = new Set(arr);\nreturn set.has(target);", answer: "O(1)", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"] },
];

export default function BigOQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const select = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Big-O Complexity Quiz</h2>
        <div className="glass-heavy rounded-xl p-8 sm:p-12 text-center">
          <div className="text-4xl font-bold text-accent-blue mb-2">{score}/{questions.length}</div>
          <p className="text-sm font-mono text-white/50 mb-6">
            {score === questions.length ? "Perfect! You're a complexity master." : score >= 7 ? "Great job! Solid understanding." : score >= 5 ? "Good effort. Keep practicing!" : "Time to review your algorithms."}
          </p>
          <button onClick={restart} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Big-O Complexity Quiz</h2>
      <p className="text-xs font-mono text-white/40 mb-6">What&apos;s the time complexity of this code?</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-white/50">QUESTION {current + 1}/{questions.length}</span>
        <span className="text-xs font-mono text-white/50">SCORE: <span className="text-accent-blue">{score}</span></span>
      </div>

      {/* Code block */}
      <div className="ide-bg rounded-xl p-4 sm:p-6 border border-white/5 mb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <pre className="text-xs sm:text-sm font-mono text-white/80 whitespace-pre-wrap">{q.code}</pre>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {q.options.map((opt) => {
          let style = "glass text-white/60 border-transparent hover:border-white/20";
          if (answered) {
            if (opt === q.answer) style = "bg-green-500/20 text-green-400 border-green-500/30";
            else if (opt === selected) style = "bg-red-500/20 text-red-400 border-red-500/30";
            else style = "glass text-white/30 border-transparent";
          }
          return (
            <button
              key={opt}
              onClick={() => select(opt)}
              className={`p-3 sm:p-4 rounded-xl font-mono text-sm sm:text-base font-bold border transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="flex items-center justify-between">
          <p className={`text-sm font-mono ${selected === q.answer ? "text-green-400" : "text-red-400"}`}>
            {selected === q.answer ? "Correct!" : `Wrong — answer is ${q.answer}`}
          </p>
          <button onClick={next} className="px-6 py-2 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            {current >= questions.length - 1 ? "FINISH" : "NEXT →"}
          </button>
        </div>
      )}
    </div>
  );
}
