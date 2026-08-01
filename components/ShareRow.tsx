"use client";

import { useState } from "react";
import { Linkedin, MessageCircle, Link2, Check } from "lucide-react";
import { shareCaption } from "@/lib/creator";
import { CardColors } from "@/lib/types";

/**
 * Viral share row. Shares the app's homepage (so recipients make their own),
 * and pre-fills a caption that credits the creator. LinkedIn's composer no
 * longer accepts pre-filled text, so we copy the caption to the clipboard and
 * open the composer for the user to paste.
 */
export function ShareRow({ colors }: { colors: CardColors }) {
  const t = colors;
  const [copied, setCopied] = useState<"caption" | "link" | null>(null);

  const home = typeof window !== "undefined" ? window.location.origin : "";
  const caption = shareCaption();

  const btn = (bg: string, fg: string, border: string) =>
    ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 16px",
      fontSize: 13,
      letterSpacing: 0.5,
      background: bg,
      color: fg,
      border,
      cursor: "pointer",
    }) as const;

  const shareLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(`${caption} ${home}`);
      setCopied("caption");
      setTimeout(() => setCopied(null), 4000);
    } catch {}
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(home)}`, "_blank", "noopener");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${caption} ${home}`)}`, "_blank", "noopener");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(home);
      setCopied("link");
      setTimeout(() => setCopied(null), 2500);
    } catch {}
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
        <button onClick={shareLinkedIn} className="letterpress font-display" style={btn(t.accent, t.card, `2px solid ${t.gold}`)}>
          <Linkedin className="h-4 w-4" /> Share on LinkedIn
        </button>
        <button onClick={shareWhatsApp} className="letterpress font-display" style={btn("transparent", t.accent, `1.5px solid ${t.accent}`)}>
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </button>
        <button onClick={copyLink} className="letterpress font-display" style={btn("transparent", t.accent, `1.5px solid ${t.accent}`)}>
          {copied === "link" ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied === "link" ? "Copied" : "Copy link"}
        </button>
      </div>
      {copied === "caption" && (
        <p className="font-body" style={{ fontSize: 12, fontStyle: "italic", color: t.muted }}>
          ✓ Caption copied — just paste it into your LinkedIn post.
        </p>
      )}
    </div>
  );
}
