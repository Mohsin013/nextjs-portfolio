"use client";

import { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(5);
  const [density, setDensity] = useState(20);
  const [color, setColor] = useState("#00ff41");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

    let animId: number;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      if (frameCount % (11 - speed) !== 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        if (Math.random() * 100 > density) continue;

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fillText(char, x, y);

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [speed, density, color]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Matrix Rain</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Digital rain effect with adjustable parameters</p>

      <canvas ref={canvasRef} className="w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black" />

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">SPEED: {speed}</label>
          <input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">DENSITY: {density}</label>
          <input type="range" min="5" max="50" value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">COLOR</span>
        </div>
      </div>
    </div>
  );
}
