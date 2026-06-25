"use client";

import { useState, useMemo } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Contact us at hello@example.com or support@test.org for help.");

  const { matches, highlighted, error } = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: string[] = [];
      let match;
      const r = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((match = r.exec(text)) !== null) {
        allMatches.push(match[0]);
        if (!flags.includes("g")) break;
      }

      const parts = text.split(new RegExp(`(${pattern})`, flags));
      const hl = parts.map((part, i) => {
        const isMatch = regex.test(part);
        regex.lastIndex = 0;
        return { text: part, isMatch, key: i };
      });

      return { matches: allMatches, highlighted: hl, error: "" };
    } catch (e) {
      return { matches: [], highlighted: [{ text, isMatch: false, key: 0 }], error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Regex Tester</h2>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs font-mono text-white/40 mb-1 block">PATTERN</label>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50"
            />
          </div>
          <div className="w-20">
            <label className="text-xs font-mono text-white/40 mb-1 block">FLAGS</label>
            <input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50"
            />
          </div>
        </div>

        {error && <div className="text-xs font-mono text-red-400">{error}</div>}

        <div>
          <label className="text-xs font-mono text-white/40 mb-1 block">TEST STRING</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">HIGHLIGHTED MATCHES</label>
          <div className="glass rounded-xl p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap">
            {highlighted.map((part) => (
              <span key={part.key} className={part.isMatch ? "bg-accent-blue/30 text-accent-blue rounded px-0.5" : "text-white/70"}>
                {part.text}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-white/40">
          {matches.length} match{matches.length !== 1 ? "es" : ""} found
        </div>
      </div>
    </div>
  );
}
