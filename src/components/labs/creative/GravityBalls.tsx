"use client";

import { useEffect, useRef, useState } from "react";

type Ball = { x: number; y: number; vx: number; vy: number; radius: number; color: string };

export default function GravityBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gravity, setGravity] = useState(0.5);
  const [bounce, setBounce] = useState(0.8);
  const [ballCount, setBallCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const balls: Ball[] = [];
    let animId: number;

    const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

    const addBall = (x: number, y: number) => {
      balls.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 2,
        radius: 8 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      setBallCount(balls.length);
    };

    const handleClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      addBall(e.clientX - r.left, e.clientY - r.top);
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) addBall(touch.clientX - r.left, touch.clientY - r.top);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const ball of balls) {
        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius;
          ball.vy *= -bounce;
          ball.vx *= 0.99;
        }
        if (ball.x - ball.radius < 0) { ball.x = ball.radius; ball.vx *= -bounce; }
        if (ball.x + ball.radius > canvas.width) { ball.x = canvas.width - ball.radius; ball.vx *= -bounce; }

        for (const other of balls) {
          if (other === ball) continue;
          const dx = other.x - ball.x;
          const dy = other.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + other.radius;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            ball.x -= nx * overlap * 0.5;
            ball.y -= ny * overlap * 0.5;
            other.x += nx * overlap * 0.5;
            other.y += ny * overlap * 0.5;
            const dvx = ball.vx - other.vx;
            const dvy = ball.vy - other.vy;
            const dvn = dvx * nx + dvy * ny;
            if (dvn > 0) {
              ball.vx -= dvn * nx * bounce;
              ball.vy -= dvn * ny * bounce;
              other.vx += dvn * nx * bounce;
              other.vy += dvn * ny * bounce;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouch, { passive: false });
    render();

    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(animId);
    };
  }, [gravity, bounce]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Physics Sandbox</h2>
      <p className="text-xs font-mono text-white/40 mb-4">Click/tap to drop balls — they collide, bounce, and stack</p>

      <canvas ref={canvasRef} className="w-full h-64 sm:h-80 rounded-xl border border-white/10 bg-black/50 cursor-crosshair" />

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">GRAVITY: {gravity.toFixed(1)}</label>
          <input type="range" min="0" max="20" value={gravity * 10} onChange={(e) => setGravity(Number(e.target.value) / 10)} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/50 block mb-1">BOUNCE: {bounce.toFixed(1)}</label>
          <input type="range" min="1" max="10" value={bounce * 10} onChange={(e) => setBounce(Number(e.target.value) / 10)} className="w-full accent-blue-500" />
        </div>
        <div className="flex items-end">
          <span className="text-xs font-mono text-white/40">BALLS: {ballCount}</span>
        </div>
      </div>
    </div>
  );
}
