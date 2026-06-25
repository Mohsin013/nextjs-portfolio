"use client";

import { useState, useCallback } from "react";

type Harmony = "analogous" | "complementary" | "triadic" | "split" | "random";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(harmony: Harmony): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 25);
  const l = 45 + Math.floor(Math.random() * 20);

  switch (harmony) {
    case "analogous":
      return [-30, -15, 0, 15, 30].map((offset) => hslToHex((baseHue + offset + 360) % 360, s, l));
    case "complementary":
      return [0, 0, 180, 180, 180].map((offset, i) => hslToHex((baseHue + offset) % 360, s, l + (i % 2 === 0 ? -10 : 10)));
    case "triadic":
      return [0, 0, 120, 120, 240].map((offset, i) => hslToHex((baseHue + offset) % 360, s, l + (i * 5 - 10)));
    case "split":
      return [0, 150, 150, 210, 210].map((offset, i) => hslToHex((baseHue + offset) % 360, s, l + (i * 4 - 8)));
    case "random":
    default:
      return Array.from({ length: 5 }, () => hslToHex(Math.floor(Math.random() * 360), s, l));
  }
}

export default function ColorPaletteGenerator() {
  const [harmony, setHarmony] = useState<Harmony>("analogous");
  const [palette, setPalette] = useState<string[]>(generatePalette("analogous"));
  const [copied, setCopied] = useState<number | null>(null);

  const regenerate = useCallback(() => {
    setPalette(generatePalette(harmony));
  }, [harmony]);

  const copyColor = (color: string, i: number) => {
    navigator.clipboard.writeText(color);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Color Palette Generator</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["analogous", "complementary", "triadic", "split", "random"] as Harmony[]).map((h) => (
          <button
            key={h}
            onClick={() => { setHarmony(h); setPalette(generatePalette(h)); }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-mono transition-all capitalize ${harmony === h ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"}`}
          >
            {h}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-xl overflow-hidden mb-6">
        {palette.map((color, i) => (
          <button
            key={i}
            onClick={() => copyColor(color, i)}
            className="flex-1 h-24 sm:h-40 flex items-end justify-center pb-3 transition-transform hover:scale-[1.02] relative group"
            style={{ backgroundColor: color }}
          >
            <span className="text-[10px] sm:text-xs font-mono text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
              {copied === i ? "COPIED!" : color.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={regenerate} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          REGENERATE
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(palette.join(", "))}
          className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors"
        >
          COPY ALL
        </button>
      </div>
    </div>
  );
}
