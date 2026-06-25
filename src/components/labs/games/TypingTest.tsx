"use client";

import { useState, useEffect, useRef } from "react";

const sentences = [
  "The quick brown fox jumps over the lazy dog near the riverbank",
  "Building scalable systems requires understanding distributed architecture",
  "React hooks simplify state management in functional components",
  "TypeScript adds type safety making codebases more maintainable",
  "Cloud infrastructure enables applications to scale on demand globally",
];

export default function TypingTest() {
  const [text] = useState(sentences[Math.floor(Math.random() * sentences.length)]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.length === 1 && !started) {
      setStarted(true);
      setStartTime(performance.now());
    }

    if (input.length === text.length && started) {
      setFinished(true);
      const elapsed = (performance.now() - startTime) / 1000 / 60;
      const words = text.split(" ").length;
      setWpm(Math.round(words / elapsed));

      let correct = 0;
      for (let i = 0; i < text.length; i++) {
        if (input[i] === text[i]) correct++;
      }
      setAccuracy(Math.round((correct / text.length) * 100));
    }
  }, [input, text, started, startTime]);

  const reset = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Typing Speed Test</h2>

      <div className="glass rounded-xl p-6 sm:p-8 mb-6">
        <div className="text-base sm:text-lg font-mono leading-relaxed">
          {text.split("").map((char, i) => {
            let cls = "text-white/30";
            if (i < input.length) {
              cls = input[i] === char ? "text-green-400" : "text-red-400 bg-red-500/10";
            } else if (i === input.length) {
              cls = "text-white border-b-2 border-accent-blue";
            }
            return <span key={i} className={cls}>{char}</span>;
          })}
        </div>
      </div>

      <input
        ref={inputRef}
        value={input}
        onChange={(e) => !finished && setInput(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50 mb-6"
        placeholder={finished ? "Done! Click restart..." : "Start typing..."}
        autoFocus
        disabled={finished}
      />

      {finished && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent-blue">{wpm}</div>
            <div className="text-xs font-mono text-white/40">WPM</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent-purple">{accuracy}%</div>
            <div className="text-xs font-mono text-white/40">ACCURACY</div>
          </div>
        </div>
      )}

      <button onClick={reset} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
        RESTART
      </button>
    </div>
  );
}
