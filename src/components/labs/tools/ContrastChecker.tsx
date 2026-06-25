"use client";

import { useState } from "react";

function getLuminance(hex: string) {
  const rgb = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrastRatio(fg: string, bg: string) {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#1a1a2e");

  const ratio = getContrastRatio(fg, bg);
  const aaLarge = ratio >= 3;
  const aaNormal = ratio >= 4.5;
  const aaaLarge = ratio >= 4.5;
  const aaaNormal = ratio >= 7;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Contrast Checker</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-8 flex items-center justify-center min-h-[200px]" style={{ backgroundColor: bg }}>
          <p className="text-2xl sm:text-4xl font-bold text-center" style={{ color: fg }}>
            Sample Text
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <div>
              <label className="text-xs font-mono text-white/50 block">FOREGROUND</label>
              <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm font-mono text-white w-24" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <div>
              <label className="text-xs font-mono text-white/50 block">BACKGROUND</label>
              <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm font-mono text-white w-24" />
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="text-3xl font-bold text-white mb-2">{ratio.toFixed(2)}:1</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className={`p-2 rounded ${aaNormal ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>AA Normal: {aaNormal ? "PASS" : "FAIL"}</div>
              <div className={`p-2 rounded ${aaLarge ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>AA Large: {aaLarge ? "PASS" : "FAIL"}</div>
              <div className={`p-2 rounded ${aaaNormal ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>AAA Normal: {aaaNormal ? "PASS" : "FAIL"}</div>
              <div className={`p-2 rounded ${aaaLarge ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>AAA Large: {aaaLarge ? "PASS" : "FAIL"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
