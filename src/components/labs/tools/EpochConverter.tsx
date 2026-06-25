"use client";

import { useState, useEffect } from "react";

export default function EpochConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [input, setInput] = useState(now.toString());
  const [humanInput, setHumanInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const epochToHuman = (epoch: string) => {
    const num = parseInt(epoch);
    if (isNaN(num)) return "Invalid timestamp";
    const date = new Date(num * (epoch.length > 10 ? 1 : 1000));
    return date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "long" });
  };

  const humanToEpoch = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date";
    return Math.floor(date.getTime() / 1000).toString();
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Epoch / Timestamp Converter</h2>

      {/* Live clock */}
      <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
        <span className="text-xs font-mono text-white/40">CURRENT EPOCH</span>
        <span className="text-lg sm:text-xl font-mono text-accent-blue">{now}</span>
      </div>

      {/* Epoch → Human */}
      <div className="mb-8">
        <label className="text-xs font-mono text-white/40 block mb-2">EPOCH → HUMAN READABLE</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter epoch timestamp..."
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50 mb-2"
        />
        <div className="glass rounded-lg px-4 py-3 text-sm font-mono text-accent-blue">
          {epochToHuman(input)}
        </div>
      </div>

      {/* Human → Epoch */}
      <div>
        <label className="text-xs font-mono text-white/40 block mb-2">DATE → EPOCH</label>
        <input
          type="datetime-local"
          value={humanInput}
          onChange={(e) => setHumanInput(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50 mb-2"
        />
        {humanInput && (
          <div className="glass rounded-lg px-4 py-3 text-sm font-mono text-accent-blue flex items-center justify-between">
            <span>{humanToEpoch(humanInput)}</span>
            <button onClick={() => navigator.clipboard.writeText(humanToEpoch(humanInput))} className="text-[10px] text-white/30 hover:text-white">COPY</button>
          </div>
        )}
      </div>
    </div>
  );
}
