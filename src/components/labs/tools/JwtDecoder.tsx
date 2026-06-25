"use client";

import { useState } from "react";

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const final = pad ? padded + "=".repeat(4 - pad) : padded;
  return atob(final);
}

function decodeJwt(token: string) {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    const signature = parts[2];

    let expiry: string | null = null;
    if (payload.exp) {
      const date = new Date(payload.exp * 1000);
      const now = new Date();
      expiry = date < now ? `EXPIRED (${date.toLocaleString()})` : `Valid until ${date.toLocaleString()}`;
    }

    return { header, payload, signature, expiry };
  } catch {
    return null;
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const decoded = token ? decodeJwt(token) : null;

  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vaHNpbiBJcWJhbCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxOTMwMDAwMCwiZXhwIjoxNzUwODM2MDAwfQ.signature_placeholder";

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">JWT Decoder</h2>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono text-white/40">PASTE TOKEN</label>
          <button onClick={() => setToken(sampleToken)} className="text-[10px] font-mono text-accent-blue hover:text-white transition-colors">
            USE SAMPLE
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          className="w-full h-24 bg-black/30 border border-white/10 rounded-xl p-4 text-xs font-mono text-white resize-none focus:outline-none focus:border-accent-blue/50 break-all"
        />
      </div>

      {token && !decoded && (
        <div className="glass rounded-xl p-4 text-sm font-mono text-red-400">Invalid JWT format</div>
      )}

      {decoded && (
        <div className="space-y-4">
          {/* Expiry status */}
          {decoded.expiry && (
            <div className={`glass rounded-xl p-3 text-xs font-mono flex items-center gap-2 ${decoded.expiry.startsWith("EXPIRED") ? "text-red-400 border border-red-500/20" : "text-green-400 border border-green-500/20"}`}>
              <span className={`w-2 h-2 rounded-full ${decoded.expiry.startsWith("EXPIRED") ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
              {decoded.expiry}
            </div>
          )}

          {/* Header */}
          <div>
            <label className="text-[10px] font-mono text-accent-blue mb-2 block uppercase tracking-wider">Header</label>
            <pre className="glass rounded-xl p-4 text-xs sm:text-sm font-mono text-white/70 overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div>
            <label className="text-[10px] font-mono text-accent-purple mb-2 block uppercase tracking-wider">Payload</label>
            <pre className="glass rounded-xl p-4 text-xs sm:text-sm font-mono text-white/70 overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div>
            <label className="text-[10px] font-mono text-white/40 mb-2 block uppercase tracking-wider">Signature</label>
            <div className="glass rounded-xl p-4 text-xs font-mono text-white/30 break-all">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
