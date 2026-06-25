"use client";

import { useState } from "react";

const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentences }, generateSentence).join(" ");
}

export default function LoremGenerator() {
  const [count, setCount] = useState(3);
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (mode === "paragraphs") {
      setOutput(Array.from({ length: count }, generateParagraph).join("\n\n"));
    } else if (mode === "sentences") {
      setOutput(Array.from({ length: count }, generateSentence).join(" "));
    } else {
      setOutput(Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(" "));
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Lorem Ipsum Generator</h2>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-xs font-mono text-white/50">GENERATE</span>
        <input
          type="number"
          min="1"
          max="50"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-16 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-accent-blue/50"
        />
        <div className="flex gap-1">
          {(["paragraphs", "sentences", "words"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-2 rounded-lg text-xs font-mono transition-all capitalize ${mode === m ? "glass-heavy text-white" : "glass text-white/50"}`}>
              {m}
            </button>
          ))}
        </div>
        <button onClick={generate} className="px-5 py-2 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          GO
        </button>
      </div>

      {output && (
        <div className="glass rounded-xl p-4 sm:p-6 relative">
          <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{output}</p>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-3 right-3 text-[10px] font-mono text-white/30 hover:text-white transition-colors glass px-2 py-1 rounded"
          >
            COPY
          </button>
        </div>
      )}
    </div>
  );
}
