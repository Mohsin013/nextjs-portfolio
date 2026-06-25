"use client";

import { useState } from "react";

const statusCodes: { code: number; text: string; desc: string; category: string }[] = [
  { code: 100, text: "Continue", desc: "Server received request headers, client should proceed with body", category: "1xx" },
  { code: 101, text: "Switching Protocols", desc: "Server agrees to switch protocols (e.g., WebSocket upgrade)", category: "1xx" },
  { code: 200, text: "OK", desc: "Request succeeded. Standard response for successful HTTP requests", category: "2xx" },
  { code: 201, text: "Created", desc: "Request fulfilled, new resource created (common in POST)", category: "2xx" },
  { code: 204, text: "No Content", desc: "Request succeeded but no content to return (common in DELETE)", category: "2xx" },
  { code: 206, text: "Partial Content", desc: "Server delivers part of the resource (range requests)", category: "2xx" },
  { code: 301, text: "Moved Permanently", desc: "Resource has permanent new URL. All future requests should use it", category: "3xx" },
  { code: 302, text: "Found", desc: "Temporary redirect. Client should use original URL for future requests", category: "3xx" },
  { code: 304, text: "Not Modified", desc: "Resource not modified since last request. Use cached version", category: "3xx" },
  { code: 307, text: "Temporary Redirect", desc: "Like 302 but guarantees method won't change (POST stays POST)", category: "3xx" },
  { code: 308, text: "Permanent Redirect", desc: "Like 301 but guarantees method won't change", category: "3xx" },
  { code: 400, text: "Bad Request", desc: "Server cannot process due to client error (malformed syntax, invalid params)", category: "4xx" },
  { code: 401, text: "Unauthorized", desc: "Authentication required. Client must provide valid credentials", category: "4xx" },
  { code: 403, text: "Forbidden", desc: "Server understood but refuses to authorize. Authentication won't help", category: "4xx" },
  { code: 404, text: "Not Found", desc: "Server cannot find the requested resource. Most common error", category: "4xx" },
  { code: 405, text: "Method Not Allowed", desc: "Request method not supported for this resource (e.g., POST on GET-only)", category: "4xx" },
  { code: 408, text: "Request Timeout", desc: "Server timed out waiting for the request", category: "4xx" },
  { code: 409, text: "Conflict", desc: "Request conflicts with current state (e.g., duplicate resource)", category: "4xx" },
  { code: 413, text: "Payload Too Large", desc: "Request entity exceeds server-defined limits", category: "4xx" },
  { code: 422, text: "Unprocessable Entity", desc: "Request well-formed but semantically invalid (validation errors)", category: "4xx" },
  { code: 429, text: "Too Many Requests", desc: "Rate limit exceeded. Client sent too many requests", category: "4xx" },
  { code: 500, text: "Internal Server Error", desc: "Generic server error. Something unexpected went wrong", category: "5xx" },
  { code: 502, text: "Bad Gateway", desc: "Server acting as gateway received invalid response from upstream", category: "5xx" },
  { code: 503, text: "Service Unavailable", desc: "Server temporarily unable to handle request (overloaded/maintenance)", category: "5xx" },
  { code: 504, text: "Gateway Timeout", desc: "Gateway didn't receive timely response from upstream server", category: "5xx" },
];

const categoryColors: Record<string, string> = {
  "1xx": "text-blue-400 border-blue-500/20 bg-blue-500/5",
  "2xx": "text-green-400 border-green-500/20 bg-green-500/5",
  "3xx": "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
  "4xx": "text-orange-400 border-orange-500/20 bg-orange-500/5",
  "5xx": "text-red-400 border-red-500/20 bg-red-500/5",
};

export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = statusCodes.filter((s) => {
    const matchesSearch = search === "" || s.code.toString().includes(search) || s.text.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || s.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">HTTP Status Codes</h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code or name..."
          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-accent-blue/50"
        />
        <div className="flex gap-1.5">
          {["1xx", "2xx", "3xx", "4xx", "5xx"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border ${filter === cat ? categoryColors[cat] : "glass text-white/40 border-transparent"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {filtered.map((s) => (
          <div key={s.code} className={`glass rounded-lg p-3 sm:p-4 border ${categoryColors[s.category]} flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}>
            <span className="text-lg sm:text-xl font-bold font-mono w-12">{s.code}</span>
            <div className="flex-1">
              <span className="text-sm font-medium text-white">{s.text}</span>
              <p className="text-xs text-white/40 font-mono mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-white/30 mt-4">{filtered.length} of {statusCodes.length} codes shown</p>
    </div>
  );
}
