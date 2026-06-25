"use client";

import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, (v) => chars[v % chars.length]).join("");
    setPassword(pw);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase && lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score <= 2) return { label: "Weak", color: "text-red-400 bg-red-500/20" };
    if (score <= 3) return { label: "Medium", color: "text-yellow-400 bg-yellow-500/20" };
    return { label: "Strong", color: "text-green-400 bg-green-500/20" };
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Password Generator</h2>

      <div className="space-y-6">
        {/* Output */}
        <div className="glass rounded-xl p-4 flex items-center gap-3 min-h-[60px]">
          <code className="flex-1 text-sm sm:text-lg font-mono text-white break-all">
            {password || "Click generate..."}
          </code>
          {password && (
            <button onClick={copy} className="text-xs font-mono text-accent-blue hover:text-white transition-colors flex-shrink-0 glass px-3 py-1.5 rounded">
              {copied ? "✓" : "COPY"}
            </button>
          )}
        </div>

        {/* Controls */}
        <div>
          <label className="text-xs font-mono text-white/50 mb-2 block">LENGTH: {length}</label>
          <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "A-Z", state: uppercase, set: setUppercase },
            { label: "a-z", state: lowercase, set: setLowercase },
            { label: "0-9", state: numbers, set: setNumbers },
            { label: "!@#", state: symbols, set: setSymbols },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => opt.set(!opt.state)}
              className={`glass rounded-lg p-3 text-sm font-mono transition-all ${opt.state ? "border border-accent-blue/50 text-white" : "text-white/30 border border-transparent"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={generate} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
            GENERATE
          </button>
          {password && (
            <span className={`text-xs font-mono px-3 py-1 rounded ${strength().color}`}>
              {strength().label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
