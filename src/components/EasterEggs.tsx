"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];
const HIRE_SEQUENCE = ["h", "i", "r", "e"];

function playFireworkSound() {
  const ctx = new AudioContext();

  const playBurst = (delay: number) => {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
    }
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800 + Math.random() * 600;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(ctx.currentTime + delay);
    noise.stop(ctx.currentTime + delay + 0.3);
  };

  for (let i = 0; i < 6; i++) {
    playBurst(i * 0.4);
  }

  setTimeout(() => ctx.close(), 4000);
}

function playHireSound() {
  const ctx = new AudioContext();
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    const start = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.5);
  });

  setTimeout(() => ctx.close(), 2000);
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [hireActive, setHireActive] = useState(false);
  const konamiIndex = useRef(0);
  const hireIndex = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const launchFireworks = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = particlesRef.current;
    particles.length = 0;

    const burstCount = 6;
    let pendingBursts = burstCount;
    const startTime = performance.now();
    const totalDuration = 4000;

    const addBurst = () => {
      const cx = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      const cy = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
      const hue = Math.random() * 360;
      const count = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          size: 2 + Math.random() * 2,
          hue: hue + Math.random() * 30 - 15,
        });
      }
      pendingBursts--;
    };

    addBurst();
    for (let b = 1; b < burstCount; b++) {
      setTimeout(addBurst, b * 400);
    }

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.985;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life * 0.15})`;
        ctx.fill();
      }

      const elapsed = performance.now() - startTime;
      if (particles.length > 0 || (pendingBursts > 0 && elapsed < totalDuration)) {
        animRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setKonamiActive(false);
      }
    };

    animRef.current = requestAnimationFrame(render);
  }, []);

  const launchHireEffect = useCallback(() => {
    setHireActive(true);
    setTimeout(() => setHireActive(false), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Konami code detection
      if (e.key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          setKonamiActive(true);
          launchFireworks();
          playFireworkSound();
        }
      } else {
        konamiIndex.current = e.key === KONAMI[0] ? 1 : 0;
      }

      // "hire" sequence detection
      if (e.key.toLowerCase() === HIRE_SEQUENCE[hireIndex.current]) {
        hireIndex.current++;
        if (hireIndex.current === HIRE_SEQUENCE.length) {
          hireIndex.current = 0;
          launchHireEffect();
          playHireSound();
        }
      } else {
        hireIndex.current = e.key.toLowerCase() === HIRE_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animRef.current);
    };
  }, [launchFireworks, launchHireEffect]);

  return (
    <>
      {/* Fireworks canvas */}
      {konamiActive && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center animate-konami-text">
            <div className="text-center">
              <p className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter shimmer-text">
                +30 LIVES
              </p>
              <p className="text-sm sm:text-base font-mono text-white/60 mt-4 tracking-widest">
                KONAMI CODE ACTIVATED
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hire easter egg */}
      {hireActive && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
          <div className="animate-hire-card glass-heavy rounded-2xl border border-accent-blue/30 p-8 sm:p-12 text-center max-w-md mx-4 shadow-2xl shadow-accent-blue/20">
            <div className="text-4xl sm:text-5xl mb-4">&#x1F91D;</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              You typed <span className="shimmer-text">&quot;hire&quot;</span>!
            </h3>
            <p className="text-sm text-white/50 font-mono mb-6">
              Great instinct. Let&apos;s make it happen.
            </p>
            <a
              href="mailto:mohsiniqbal826635@gmail.com"
              className="inline-block px-6 py-3 bg-accent-blue text-white font-semibold rounded-lg text-sm pointer-events-auto hover:bg-accent-blue/80 transition-colors"
            >
              SEND EMAIL NOW
            </a>
          </div>
        </div>
      )}
    </>
  );
}
