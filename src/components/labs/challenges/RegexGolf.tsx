"use client";

import { useState } from "react";

const levels = [
  { match: ["foo", "foobar", "foobaz"], reject: ["bar", "baz", "qux"], hint: "Starts with 'foo'" },
  { match: ["cat", "car", "can"], reject: ["dog", "bat", "cap"], hint: "Starts with 'ca' but not 'cap'" },
  { match: ["test@email.com", "a@b.co", "user@domain.org"], reject: ["noatsign", "@missing", "no.at"], hint: "Contains @ and a dot after it" },
  { match: ["2024", "1999", "2000"], reject: ["abc", "12.5", "year"], hint: "Exactly 4 digits" },
  { match: ["hello world", "foo bar", "one two"], reject: ["nospace", "123", "x"], hint: "Contains a space" },
  { match: ["#ff0000", "#00ff00", "#0000ff"], reject: ["ff0000", "#xyz", "#12"], hint: "Hex color code format" },
  { match: ["192.168.1.1", "10.0.0.1", "0.0.0.0"], reject: ["999.1.1.1", "abc", "1.2.3"], hint: "Looks like an IP address (4 dot-separated groups)" },
];

export default function RegexGolf() {
  const [level, setLevel] = useState(0);
  const [pattern, setPattern] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const current = levels[level];

  const check = () => {
    if (!pattern) return;
    try {
      const regex = new RegExp(pattern);
      const allMatch = current.match.every((s) => regex.test(s));
      const noneReject = current.reject.every((s) => !regex.test(s));

      if (allMatch && noneReject) {
        setResult("correct");
        setScore((s) => s + Math.max(1, 10 - pattern.length));
        setTimeout(() => {
          if (level < levels.length - 1) {
            setLevel((l) => l + 1);
            setPattern("");
            setResult(null);
            setShowHint(false);
          }
        }, 1200);
      } else {
        setResult("wrong");
      }
    } catch {
      setResult("wrong");
    }
  };

  const matchResults = (() => {
    if (!pattern) return null;
    try {
      const regex = new RegExp(pattern);
      return {
        matches: current.match.map((s) => ({ s, ok: regex.test(s) })),
        rejects: current.reject.map((s) => ({ s, ok: !regex.test(s) })),
      };
    } catch {
      return null;
    }
  })();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Regex Golf</h2>
      <p className="text-xs font-mono text-white/40 mb-6">Write the shortest regex that matches all green strings but none of the red ones.</p>

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono text-white/50">LEVEL {level + 1}/{levels.length}</span>
        <span className="text-xs font-mono text-white/50">SCORE: <span className="text-accent-blue">{score}</span> <span className="text-white/30">(shorter = more points)</span></span>
      </div>

      {/* Strings to match / reject */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-[10px] font-mono text-green-400 mb-2 block">MUST MATCH</label>
          <div className="space-y-1.5">
            {current.match.map((s, i) => (
              <div key={i} className={`glass rounded-lg px-3 py-2 text-xs sm:text-sm font-mono border ${matchResults?.matches[i].ok === false ? "border-red-500/50 text-red-400" : matchResults?.matches[i].ok === true ? "border-green-500/50 text-green-400" : "border-green-500/20 text-white/70"}`}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-mono text-red-400 mb-2 block">MUST REJECT</label>
          <div className="space-y-1.5">
            {current.reject.map((s, i) => (
              <div key={i} className={`glass rounded-lg px-3 py-2 text-xs sm:text-sm font-mono border ${matchResults?.rejects[i].ok === false ? "border-red-500/50 text-red-400" : matchResults?.rejects[i].ok === true ? "border-green-500/50 text-green-400" : "border-red-500/20 text-white/70"}`}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center glass rounded-lg overflow-hidden">
          <span className="text-xs font-mono text-white/30 px-3">/</span>
          <input
            value={pattern}
            onChange={(e) => { setPattern(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            className="flex-1 bg-transparent py-3 text-sm font-mono text-white focus:outline-none"
            placeholder="your regex here"
          />
          <span className="text-xs font-mono text-white/30 px-3">/</span>
        </div>
        <button onClick={check} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          TEST
        </button>
      </div>

      {result === "correct" && <p className="text-sm font-mono text-green-400 mb-2">Correct! +{Math.max(1, 10 - pattern.length)} points</p>}
      {result === "wrong" && <p className="text-sm font-mono text-red-400 mb-2">Not quite — check the highlighted strings above</p>}

      {!showHint ? (
        <button onClick={() => setShowHint(true)} className="text-[10px] font-mono text-white/30 hover:text-white/50">SHOW HINT</button>
      ) : (
        <p className="text-xs font-mono text-white/40">Hint: {current.hint}</p>
      )}
    </div>
  );
}
