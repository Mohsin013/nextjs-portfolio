"use client";

import { useState } from "react";

const challenges = [
  {
    title: "Centered Square",
    desc: "Create a 100x100 blue square centered in the frame",
    target: "display:flex;align-items:center;justify-content:center;height:200px;background:#1a1a2e;",
    targetInner: "width:100px;height:100px;background:#3B82F6;",
    defaultCss: "width: 100px;\nheight: 100px;\nbackground: #3B82F6;",
  },
  {
    title: "Circle",
    desc: "Create a 80px green circle centered",
    target: "display:flex;align-items:center;justify-content:center;height:200px;background:#1a1a2e;",
    targetInner: "width:80px;height:80px;background:#10B981;border-radius:50%;",
    defaultCss: "width: 80px;\nheight: 80px;\nbackground: #10B981;\nborder-radius: 50%;",
  },
  {
    title: "Bullseye",
    desc: "Create concentric circles (blue outer, dark inner)",
    target: "display:flex;align-items:center;justify-content:center;height:200px;background:#1a1a2e;",
    targetInner: "width:100px;height:100px;background:#3B82F6;border-radius:50%;display:flex;align-items:center;justify-content:center;",
    defaultCss: "width: 100px;\nheight: 100px;\nbackground: #3B82F6;\nborder-radius: 50%;\nborder: 20px solid #3B82F6;\nbox-shadow: inset 0 0 0 20px #1a1a2e;",
  },
  {
    title: "Triangle",
    desc: "Create a CSS-only triangle pointing up",
    target: "display:flex;align-items:center;justify-content:center;height:200px;background:#1a1a2e;",
    targetInner: "width:0;height:0;border-left:50px solid transparent;border-right:50px solid transparent;border-bottom:80px solid #8B5CF6;",
    defaultCss: "width: 0;\nheight: 0;\nborder-left: 50px solid transparent;\nborder-right: 50px solid transparent;\nborder-bottom: 80px solid #8B5CF6;",
  },
];

export default function CssBattle() {
  const [level, setLevel] = useState(0);
  const [css, setCss] = useState(challenges[0].defaultCss);

  const current = challenges[level];

  const switchLevel = (i: number) => {
    setLevel(i);
    setCss(challenges[i].defaultCss);
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">CSS Battle</h2>
      <p className="text-xs font-mono text-white/40 mb-6">{current.desc}</p>

      {/* Level selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {challenges.map((c, i) => (
          <button key={i} onClick={() => switchLevel(i)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all ${level === i ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50"}`}>
            #{i + 1} {c.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Target */}
        <div>
          <label className="text-[10px] font-mono text-white/40 mb-2 block">TARGET</label>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div ref={(el) => { if (el) el.setAttribute("style", current.target); }} className="flex items-center justify-center">
              <div ref={(el) => { if (el) el.setAttribute("style", current.targetInner); }} />
            </div>
          </div>
        </div>

        {/* Your output */}
        <div>
          <label className="text-[10px] font-mono text-white/40 mb-2 block">YOUR OUTPUT</label>
          <div className="rounded-xl border border-accent-blue/20 overflow-hidden flex items-center justify-center h-[200px]" style={{ background: "#1a1a2e" }}>
            <div ref={(el) => { if (el) el.setAttribute("style", css.replace(/\n/g, "")); }} key={css} />
          </div>
        </div>
      </div>

      {/* CSS editor */}
      <div className="mt-4">
        <label className="text-[10px] font-mono text-white/40 mb-2 block">YOUR CSS</label>
        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          className="w-full h-32 sm:h-40 bg-black/30 border border-white/10 rounded-xl p-4 text-xs sm:text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50"
          spellCheck={false}
        />
      </div>

      <p className="text-[10px] font-mono text-white/30 mt-3">Edit the CSS above and watch your output update in real-time</p>
    </div>
  );
}
