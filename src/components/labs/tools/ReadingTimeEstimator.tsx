"use client";

import { useState } from "react";

export default function ReadingTimeEstimator() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 130);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Reading Time Estimator</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to get reading time and stats..."
        className="w-full h-48 sm:h-56 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50 mb-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Read Time", value: `${readingTime} min`, color: "text-accent-blue" },
          { label: "Speak Time", value: `${speakingTime} min`, color: "text-accent-purple" },
          { label: "Words", value: words.toLocaleString(), color: "text-white" },
          { label: "Characters", value: chars.toLocaleString(), color: "text-white" },
          { label: "Sentences", value: sentences.toString(), color: "text-white" },
          { label: "Paragraphs", value: paragraphs.toString(), color: "text-white" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <div className={`text-lg sm:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[10px] font-mono text-white/40 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-white/30 mt-4">
        Based on average reading speed of 200 WPM and speaking speed of 130 WPM
      </p>
    </div>
  );
}
