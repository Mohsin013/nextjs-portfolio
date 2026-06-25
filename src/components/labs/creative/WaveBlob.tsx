"use client";

import { useEffect, useRef, useState } from "react";

export default function WaveBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [complexity, setComplexity] = useState(6);
  const [speed, setSpeed] = useState(2);
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let animId: number;

    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const baseRadius = Math.min(cx, cy) * 0.5;

      const distX = (mouseX - cx) / cx;
      const distY = (mouseY - cy) / cy;

      ctx.beginPath();
      for (let i = 0; i <= 360; i++) {
        const angle = (i * Math.PI) / 180;
        let r = baseRadius;

        for (let j = 1; j <= complexity; j++) {
          r += Math.sin(angle * j + time * (j * 0.5)) * (baseRadius / (j * 3));
        }

        r += Math.sin(angle * 2 + distX * 3) * 15;
        r += Math.cos(angle * 3 + distY * 3) * 10;

        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(cx + distX * 30, cy + distY * 30, 0, cx, cy, baseRadius * 1.5);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    canvas.addEventListener("mousemove", handleMouse);
    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [complexity, speed, color1, color2]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Interactive Wave Blob</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Push the blob with your cursor</p>

      <canvas ref={canvasRef} className="w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black/80 cursor-crosshair" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">COMPLEXITY: {complexity}</label>
          <input type="range" min="2" max="12" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">SPEED: {speed}</label>
          <input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">INNER</span>
        </div>
        <div className="flex items-end gap-2">
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
          <span className="text-[10px] font-mono text-white/40">OUTER</span>
        </div>
      </div>
    </div>
  );
}
