"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);

  const attachListeners = useCallback(() => {
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover], [data-cursor-label], input, textarea, select"
    );

    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const label = target.dataset.cursorLabel || "";
      setIsHovering(true);
      setCursorLabel(label);
    };

    const onMouseLeave = () => {
      setIsHovering(false);
      setCursorLabel("");
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 20}px`;
        ringRef.current.style.top = `${ringPos.current.y - 20}px`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animRef.current = requestAnimationFrame(animate);

    const cleanupListeners = attachListeners();

    const observer = new MutationObserver(() => {
      cleanupListeners();
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animRef.current);
      cleanupListeners();
      observer.disconnect();
    };
  }, [attachListeners]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{
          transform: isHovering ? "scale(2.5)" : "scale(1)",
          background: isHovering ? "var(--accent-purple)" : "var(--accent-blue)",
          boxShadow: isHovering
            ? "0 0 8px var(--accent-purple), 0 0 16px rgba(139, 92, 246, 0.4)"
            : "0 0 6px var(--accent-blue), 0 0 12px rgba(59, 130, 246, 0.3)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{
          transform: isHovering ? "scale(1.6)" : "scale(1)",
          borderColor: isHovering ? "rgba(139, 92, 246, 0.7)" : "rgba(255,255,255,0.6)",
          opacity: isHovering ? 0.9 : 0.6,
        }}
      >
        {cursorLabel && (
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-mono text-white whitespace-nowrap bg-black/80 px-2 py-0.5 rounded">
            {cursorLabel}
          </span>
        )}
      </div>
      <div ref={glowRef} className="cursor-glow hidden md:block" />
    </>
  );
}
