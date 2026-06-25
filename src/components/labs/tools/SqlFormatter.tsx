"use client";

import { useState } from "react";

function formatSql(sql: string): string {
  const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "AS", "DISTINCT", "UNION", "UNION ALL", "IN", "NOT IN", "EXISTS", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END"];

  let formatted = sql.trim().replace(/\s+/g, " ");

  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, `\n${kw.toUpperCase()}`);
  });

  formatted = formatted
    .replace(/,\s*/g, ",\n  ")
    .replace(/\(\s*/g, "(\n  ")
    .replace(/\s*\)/g, "\n)")
    .replace(/^\n/, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  return formatted;
}

export default function SqlFormatter() {
  const [input, setInput] = useState("SELECT users.id, users.name, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 AND users.active = true ORDER BY orders.total DESC LIMIT 10");
  const [output, setOutput] = useState("");

  const format = () => setOutput(formatSql(input));

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">SQL Formatter</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query..."
            className="w-full h-48 sm:h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-xs sm:text-sm font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-white/40 mb-2 block">FORMATTED</label>
          <pre className="w-full h-48 sm:h-64 glass rounded-xl p-4 text-xs sm:text-sm font-mono text-accent-blue overflow-auto whitespace-pre-wrap">
            {output || "Click FORMAT to see result..."}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={format} className="px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors">
          FORMAT
        </button>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} className="px-6 py-3 glass text-white/70 font-mono text-sm rounded-lg hover:text-white transition-colors">
            COPY
          </button>
        )}
      </div>
    </div>
  );
}
