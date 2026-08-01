"use client";

import { useState } from "react";

/** Lets a receiver who only has the backup code (e.g. ROSE-482) open their letter. */
export function RedeemCode({ accent = "#7B1F2E", gold = "#C9A227" }: { accent?: string; gold?: string }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const go = async () => {
    if (!code.trim()) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/lookup?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (res.ok && data.id) {
        window.location.href = `/card/${data.id}`;
        return;
      }
      setErr("No letter found with that code.");
    } catch {
      setErr("Something went wrong — try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="letterpress font-display" type="button"
        style={{ background: "transparent", color: accent, border: `1.5px solid ${accent}`, padding: "10px 26px", fontSize: 14, letterSpacing: 1, marginTop: 6 }}>
        I have a card code
      </button>
    );
  }

  return (
    <div style={{ maxWidth: 320, margin: "6px auto 0" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={code}
          autoFocus
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setErr("");
          }}
          onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="ROSE-482"
          className="font-display"
          style={{ flex: 1, padding: "12px 14px", border: `1.5px solid ${err ? "#C45C7A" : accent}`, background: "#FFF8EE", fontSize: 18, letterSpacing: 4, textAlign: "center", color: accent, outline: "none" }}
        />
        <button onClick={go} disabled={busy} className="letterpress font-display"
          style={{ background: accent, color: "#F5E8C0", border: `2px solid ${gold}`, padding: "0 18px", fontSize: 14 }}>
          Open
        </button>
      </div>
      {err && <p className="font-body" style={{ color: "#C45C7A", fontSize: 12, marginTop: 6, fontStyle: "italic" }}>{err}</p>}
    </div>
  );
}
