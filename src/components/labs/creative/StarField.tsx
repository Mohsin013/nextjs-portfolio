"use client";

import { useEffect, useRef, useState } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(3);
  const [starCount, setStarCount] = useState(300);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    type Star = { x: number; y: number; z: number; pz: number };
    let stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width,
      pz: 0,
    }));

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left - cx) / cx;
      mouseY = (e.clientY - r.top - cy) / cy;
    };

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed * 2;
        star.x += mouseX * speed * 0.5;
        star.y += mouseY * speed * 0.5;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = canvas.width;
          star.pz = canvas.width;
        }

        const sx = (star.x / star.z) * cx + cx;
        const sy = (star.y / star.z) * cy + cy;
        const px = (star.x / star.pz) * cx + cx;
        const py = (star.y / star.pz) * cy + cy;

        const size = (1 - star.z / canvas.width) * 3;
        const alpha = (1 - star.z / canvas.width);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = size;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    canvas.addEventListener("mousemove", handleMouse);
    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [speed, starCount]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Warp Speed Star Field</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Move your cursor to steer through space</p>

      <canvas ref={canvasRef} className="w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black cursor-crosshair" />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">SPEED: {speed}</label>
          <input type="range" min="1" max="15" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">STARS: {starCount}</label>
          <input type="range" min="50" max="800" step="50" value={starCount} onChange={(e) => setStarCount(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
      </div>
    </div>
  );
}
