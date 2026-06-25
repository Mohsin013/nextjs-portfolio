"use client";

import { useState, useMemo } from "react";

function parseMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-2">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-white/80">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-accent-blue text-xs font-mono">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 text-white/70 before:content-[\"•\"] before:mr-2 before:text-accent-blue">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-white/70 list-decimal">$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent-blue underline">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-accent-blue/50 pl-4 text-white/60 italic my-2">$1</blockquote>')
    .replace(/^---$/gm, '<hr class="border-white/10 my-4" />')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  return html;
}

export default function MarkdownPreview() {
  const [input, setInput] = useState(`# Hello World

This is a **markdown** preview tool.

## Features

- Live preview as you type
- Supports *italic* and **bold**
- Inline \`code\` highlighting
- [Links](https://example.com) too

> This is a blockquote

---

### Code Example

Write some \`TypeScript\` and see it rendered.

1. First item
2. Second item
3. Third item`);

  const html = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Markdown Preview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">MARKDOWN INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 bg-black/30 border border-white/10 rounded-xl p-4 text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">PREVIEW</label>
          <div
            className="w-full h-80 glass rounded-xl p-4 overflow-y-auto text-sm leading-relaxed text-white/70"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
