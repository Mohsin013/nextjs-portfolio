"use client";

import { useState } from "react";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setOutput("Error: Invalid input");
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Base64 Encoder / Decoder</h2>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("encode")} className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${mode === "encode" ? "glass-heavy text-white" : "glass text-white/50"}`}>ENCODE</button>
        <button onClick={() => setMode("decode")} className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${mode === "decode" ? "glass-heavy text-white" : "glass text-white/50"}`}>DECODE</button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
        className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50 mb-4"
      />

      <button onClick={convert} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors mb-4">
        {mode === "encode" ? "ENCODE" : "DECODE"}
      </button>

      {output && (
        <div className="glass rounded-xl p-4 relative">
          <pre className="text-sm font-mono text-accent-blue whitespace-pre-wrap break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 text-[10px] font-mono text-white/30 hover:text-white transition-colors glass px-2 py-1 rounded">COPY</button>
        </div>
      )}
    </div>
  );
}
