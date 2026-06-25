"use client";

import Link from "next/link";

export default function LabsNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      <div className="glass-heavy mx-5 sm:mx-auto mt-4 max-w-4xl rounded-full px-5 sm:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-mono font-bold text-white tracking-wider">
            MI<span className="text-accent-blue">.</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="text-[10px] sm:text-xs font-mono text-white/40 hover:text-white/70 transition-colors tracking-widest"
            >
              PORTFOLIO
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-[10px] sm:text-xs font-mono text-accent-blue tracking-widest">
              LABS
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
