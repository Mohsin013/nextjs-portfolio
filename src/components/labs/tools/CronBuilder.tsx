"use client";

import { useState } from "react";

const presets = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday 9am", value: "0 9 * * 1" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every 30 minutes", value: "*/30 * * * *" },
  { label: "Weekdays at 9am", value: "0 9 * * 1-5" },
  { label: "1st of every month", value: "0 0 1 * *" },
];

function describeCron(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (need 5 fields)";

  const [min, hour, dom, month, dow] = parts;

  const descParts: string[] = [];

  if (min === "*" && hour === "*") descParts.push("Every minute");
  else if (min.startsWith("*/")) descParts.push(`Every ${min.slice(2)} minutes`);
  else if (hour === "*") descParts.push(`At minute ${min} of every hour`);
  else if (min === "0" && !hour.includes("*")) descParts.push(`At ${hour}:00`);
  else if (!min.includes("*") && !hour.includes("*")) descParts.push(`At ${hour}:${min.padStart(2, "0")}`);
  else descParts.push(`Minute: ${min}, Hour: ${hour}`);

  if (dom !== "*") {
    if (dom.includes(",")) descParts.push(`on days ${dom}`);
    else descParts.push(`on day ${dom} of the month`);
  }

  if (month !== "*") {
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (month.includes("-")) descParts.push(`in months ${month}`);
    else descParts.push(`in ${months[parseInt(month)] || month}`);
  }

  if (dow !== "*") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (dow.includes("-")) {
      const [start, end] = dow.split("-").map(Number);
      descParts.push(`on ${days[start]}–${days[end]}`);
    } else if (dow.includes(",")) {
      descParts.push(`on ${dow.split(",").map((d) => days[parseInt(d)] || d).join(", ")}`);
    } else {
      descParts.push(`on ${days[parseInt(dow)] || dow}`);
    }
  }

  return descParts.join(", ");
}

export default function CronBuilder() {
  const [cron, setCron] = useState("0 9 * * 1-5");
  const parts = cron.trim().split(/\s+/);

  const updatePart = (index: number, value: string) => {
    const newParts = [...parts];
    while (newParts.length < 5) newParts.push("*");
    newParts[index] = value;
    setCron(newParts.join(" "));
  };

  const fields = [
    { label: "Minute", index: 0, placeholder: "0-59 or *" },
    { label: "Hour", index: 1, placeholder: "0-23 or *" },
    { label: "Day of Month", index: 2, placeholder: "1-31 or *" },
    { label: "Month", index: 3, placeholder: "1-12 or *" },
    { label: "Day of Week", index: 4, placeholder: "0-6 or *" },
  ];

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Cron Expression Builder</h2>

      {/* Expression display */}
      <div className="glass-heavy rounded-xl p-4 sm:p-6 mb-6 text-center">
        <div className="text-2xl sm:text-3xl font-mono text-accent-blue mb-3 tracking-wider">{cron}</div>
        <p className="text-sm text-white/60 font-mono">{describeCron(cron)}</p>
      </div>

      {/* Field editors */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
        {fields.map((field) => (
          <div key={field.index}>
            <label className="text-[9px] sm:text-[10px] font-mono text-white/40 block mb-1 text-center truncate">{field.label}</label>
            <input
              value={parts[field.index] || "*"}
              onChange={(e) => updatePart(field.index, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-2 text-xs sm:text-sm font-mono text-white text-center focus:outline-none focus:border-accent-blue/50"
            />
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <label className="text-[10px] font-mono text-white/40 block mb-2 uppercase">PRESETS</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => setCron(p.value)}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${cron === p.value ? "glass-heavy text-white border border-accent-blue/30" : "glass text-white/50 hover:text-white/70"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Copy */}
      <div className="mt-6">
        <button onClick={() => navigator.clipboard.writeText(cron)} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
          COPY EXPRESSION
        </button>
      </div>
    </div>
  );
}
