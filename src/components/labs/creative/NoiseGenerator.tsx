"use client";

import { useEffect, useRef, useState } from "react";

export default function NoiseGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(50);
  const [octaves, setOctaves] = useState(4);
  const [color1, setColor1] = useState("#0a0a0a");
  const [color2, setColor2] = useState("#3B82F6");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const permutation = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    const perm = [...permutation, ...permutation];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      const u = fade(xf);
      const v = fade(yf);
      const a = perm[X] + Y;
      const b = perm[X + 1] + Y;
      return lerp(
        lerp(grad(perm[a], xf, yf), grad(perm[b], xf - 1, yf), u),
        lerp(grad(perm[a + 1], xf, yf - 1), grad(perm[b + 1], xf - 1, yf - 1), u),
        v
      );
    };

    const fractalNoise = (x: number, y: number) => {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;
      for (let i = 0; i < octaves; i++) {
        value += noise(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      return value / maxValue;
    };

    const hexToRgb = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const nx = x / scale;
        const ny = y / scale;
        const v = (fractalNoise(nx, ny) + 1) / 2;
        const i = (y * canvas.width + x) * 4;
        imageData.data[i] = c1.r + (c2.r - c1.r) * v;
        imageData.data[i + 1] = c1.g + (c2.g - c1.g) * v;
        imageData.data[i + 2] = c1.b + (c2.b - c1.b) * v;
        imageData.data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [scale, octaves, color1, color2]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Noise Texture Generator</h2>

      <canvas ref={canvasRef} className="w-full h-auto rounded-xl border border-white/10" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">SCALE: {scale}</label>
          <input type="range" min="10" max="200" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">OCTAVES: {octaves}</label>
          <input type="range" min="1" max="8" value={octaves} onChange={(e) => setOctaves(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">LOW</span>
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">HIGH</span>
        </div>
      </div>
    </div>
  );
}
