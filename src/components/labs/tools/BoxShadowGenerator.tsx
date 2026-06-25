"use client";

import { useState } from "react";

export default function BoxShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#3B82F6");
  const [opacity, setOpacity] = useState(30);
  const [inset, setInset] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Box Shadow Generator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex items-center justify-center h-48 sm:h-64 glass rounded-xl">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl" style={{ boxShadow: shadow }} />
        </div>

        <div className="space-y-4">
          {[
            { label: "X Offset", value: x, set: setX, min: -50, max: 50 },
            { label: "Y Offset", value: y, set: setY, min: -50, max: 50 },
            { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
            { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
            { label: "Opacity", value: opacity, set: setOpacity, min: 0, max: 100 },
          ].map((s) => (
            <div key={s.label}>
              <label className="text-xs font-mono text-white/50 mb-1 block">{s.label}: {s.value}{s.label === "Opacity" ? "%" : "px"}</label>
              <input type="range" min={s.min} max={s.max} value={s.value} onChange={(e) => s.set(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          ))}

          <div className="flex items-center gap-4">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
            <label className="flex items-center gap-2 text-xs font-mono text-white/50 cursor-pointer">
              <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="accent-blue-500" />
              INSET
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-xl p-4 relative">
        <code className="text-xs sm:text-sm font-mono text-accent-blue break-all">{css}</code>
        <button onClick={() => navigator.clipboard.writeText(css)} className="absolute top-3 right-3 text-[10px] font-mono text-white/30 hover:text-white transition-colors glass px-2 py-1 rounded">COPY</button>
      </div>
    </div>
  );
}
