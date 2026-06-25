"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");

  const process = () => {
    try {
      const parsed = JSON.parse(input);
      const result = mode === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      setOutput(result);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">JSON Formatter / Minifier</h2>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("format")} className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${mode === "format" ? "glass-heavy text-white" : "glass text-white/50"}`}>
          FORMAT
        </button>
        <button onClick={() => setMode("minify")} className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${mode === "minify" ? "glass-heavy text-white" : "glass text-white/50"}`}>
          MINIFY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your JSON here"}'
            className="w-full h-48 sm:h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">OUTPUT</label>
          <pre className="w-full h-48 sm:h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-accent-blue overflow-auto whitespace-pre-wrap">
            {error ? <span className="text-red-400">{error}</span> : output || "Result appears here..."}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={process} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          PROCESS
        </button>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
            COPY
          </button>
        )}
      </div>
    </div>
  );
}
