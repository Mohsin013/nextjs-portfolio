"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  direction?: "up" | "left" | "scale";
  delay?: number;
  className?: string;
};

export default function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("revealed");
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = direction === "up" ? "reveal-up" : direction === "left" ? "reveal-left" : "reveal-scale";

  return (
    <div ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </div>
  );
}
