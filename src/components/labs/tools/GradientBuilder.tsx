"use client";

import { useState } from "react";

export default function GradientBuilder() {
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: "#3B82F6", position: 0 },
    { color: "#8B5CF6", position: 50 },
    { color: "#06B6D4", position: 100 },
  ]);

  const gradient = `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;
  const css = `background: ${gradient};`;

  const updateStop = (index: number, key: "color" | "position", value: string | number) => {
    setStops(stops.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const addStop = () => {
    setStops([...stops, { color: "#ffffff", position: 75 }]);
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Gradient Builder</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="rounded-xl h-48 sm:h-64 border border-white/10" style={{ background: gradient }} />

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-white/50 mb-2 block">ANGLE: {angle}°</label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>

          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3">
              <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} className="w-8 h-8 rounded border-0 cursor-pointer" />
              <input type="range" min="0" max="100" value={stop.position} onChange={(e) => updateStop(i, "position", Number(e.target.value))} className="flex-1 accent-blue-500" />
              <span className="text-xs font-mono text-white/40 w-8">{stop.position}%</span>
              {stops.length > 2 && (
                <button onClick={() => removeStop(i)} className="text-white/30 hover:text-red-400 text-sm">✕</button>
              )}
            </div>
          ))}

          <button onClick={addStop} className="text-xs font-mono text-accent-blue hover:text-white transition-colors">
            + Add Stop
          </button>
        </div>
      </div>

      {/* Code output */}
      <div className="mt-6 glass rounded-xl p-4 relative group">
        <code className="text-xs sm:text-sm font-mono text-accent-blue break-all">{css}</code>
        <button
          onClick={() => navigator.clipboard.writeText(css)}
          className="absolute top-3 right-3 text-[10px] font-mono text-white/30 hover:text-white transition-colors glass px-2 py-1 rounded"
        >
          COPY
        </button>
      </div>
    </div>
  );
}
