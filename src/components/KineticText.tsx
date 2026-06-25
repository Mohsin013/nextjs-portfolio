"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export default function KineticText({ text, className = "", as: Tag = "h1" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".kinetic-char");

    const handleMouseMove = (e: MouseEvent) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const dx = e.clientX - charX;
        const dy = e.clientY - charY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 8;
          const moveX = -(dx / dist) * force;
          const moveY = -(dy / dist) * force;
          (char as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (char as HTMLElement).style.color = "var(--accent-blue)";
        } else {
          (char as HTMLElement).style.transform = "translate(0, 0)";
          (char as HTMLElement).style.color = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <span
                key={ci}
                className="kinetic-char inline-block transition-all duration-200 ease-out"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </div>
  );
}
