"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [density, setDensity] = useState(3);
  const [gravity, setGravity] = useState(0.1);
  const [color, setColor] = useState("#3B82F6");
  const [size, setSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let animId: number;

    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;

      for (let i = 0; i < density; i++) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          size: Math.random() * size + 1,
        });
      }
    };

    const handleTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      mouseX = touch.clientX - r.left;
      mouseY = touch.clientY - r.top;

      for (let i = 0; i < density; i++) {
        particles.push({
          x: mouseX, y: mouseY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          size: Math.random() * size + 1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.life * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });
    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("touchmove", handleTouch);
      cancelAnimationFrame(animId);
    };
  }, [density, gravity, color, size]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Particle Playground</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Move your mouse/finger across the canvas</p>

      <canvas ref={canvasRef} className="w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black/50 cursor-crosshair touch-none" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">DENSITY: {density}</label>
          <input type="range" min="1" max="10" value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">GRAVITY: {gravity.toFixed(2)}</label>
          <input type="range" min="0" max="50" value={gravity * 100} onChange={(e) => setGravity(Number(e.target.value) / 100)} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">SIZE: {size}</label>
          <input type="range" min="1" max="12" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">COLOR</span>
        </div>
      </div>
    </div>
  );
}
