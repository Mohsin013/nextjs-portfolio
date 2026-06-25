"use client";

import { useState } from "react";

export default function GlassmorphismGenerator() {
  const [blurVal, setBlurVal] = useState(20);
  const [transparency, setTransparency] = useState(10);
  const [border, setBorder] = useState(8);
  const [bgColor, setBgColor] = useState("#ffffff");

  const css = `background: rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(bgColor.slice(5, 7), 16)}, ${(transparency / 100).toFixed(2)});
backdrop-filter: blur(${blurVal}px);
-webkit-backdrop-filter: blur(${blurVal}px);
border: 1px solid rgba(255, 255, 255, ${(border / 100).toFixed(2)});`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Glassmorphism Generator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div
              className="w-full max-w-[250px] h-32 rounded-xl"
              style={{
                background: `rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(bgColor.slice(5, 7), 16)}, ${transparency / 100})`,
                backdropFilter: `blur(${blurVal}px)`,
                WebkitBackdropFilter: `blur(${blurVal}px)`,
                border: `1px solid rgba(255, 255, 255, ${border / 100})`,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-white/50 mb-1 block">BLUR: {blurVal}px</label>
            <input type="range" min="0" max="50" value={blurVal} onChange={(e) => setBlurVal(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="text-xs font-mono text-white/50 mb-1 block">TRANSPARENCY: {transparency}%</label>
            <input type="range" min="0" max="100" value={transparency} onChange={(e) => setTransparency(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="text-xs font-mono text-white/50 mb-1 block">BORDER OPACITY: {border}%</label>
            <input type="range" min="0" max="100" value={border} onChange={(e) => setBorder(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <div className="flex items-center gap-3">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
            <span className="text-xs font-mono text-white/50">BG COLOR</span>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-xl p-4 relative">
        <pre className="text-xs sm:text-sm font-mono text-accent-blue whitespace-pre-wrap">{css}</pre>
        <button onClick={() => navigator.clipboard.writeText(css)} className="absolute top-3 right-3 text-[10px] font-mono text-white/30 hover:text-white transition-colors glass px-2 py-1 rounded">COPY</button>
      </div>
    </div>
  );
}
