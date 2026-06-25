"use client";

import { useState } from "react";

const conversions = {
  "px → rem": { from: "px", to: "rem", convert: (v: number) => v / 16 },
  "rem → px": { from: "rem", to: "px", convert: (v: number) => v * 16 },
  "px → em": { from: "px", to: "em", convert: (v: number) => v / 16 },
  "ms → s": { from: "ms", to: "s", convert: (v: number) => v / 1000 },
  "s → ms": { from: "s", to: "ms", convert: (v: number) => v * 1000 },
  "deg → rad": { from: "deg", to: "rad", convert: (v: number) => v * (Math.PI / 180) },
  "rad → deg": { from: "rad", to: "deg", convert: (v: number) => v * (180 / Math.PI) },
  "kb → mb": { from: "KB", to: "MB", convert: (v: number) => v / 1024 },
  "mb → gb": { from: "MB", to: "GB", convert: (v: number) => v / 1024 },
  "vh → px (1080p)": { from: "vh", to: "px", convert: (v: number) => (v / 100) * 1080 },
};

export default function UnitConverter() {
  const [selected, setSelected] = useState(Object.keys(conversions)[0]);
  const [input, setInput] = useState("16");

  const conv = conversions[selected as keyof typeof conversions];
  const value = parseFloat(input);
  const result = isNaN(value) ? "—" : conv.convert(value).toFixed(4).replace(/\.?0+$/, "");

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">CSS Unit Converter</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(conversions).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${selected === key ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-[10px] font-mono text-white/40 block mb-1">{conv.from.toUpperCase()}</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-accent-blue/50"
          />
        </div>
        <span className="text-white/30 text-xl mt-5">→</span>
        <div className="flex-1">
          <label className="text-[10px] font-mono text-white/40 block mb-1">{conv.to.toUpperCase()}</label>
          <div className="w-full glass rounded-lg px-4 py-3 text-lg font-mono text-accent-blue">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
