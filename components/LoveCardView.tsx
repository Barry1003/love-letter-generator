import { CSSProperties } from "react";
import { LoveCard } from "@/lib/types";
import { BotanicalSprig } from "./CraftArt";
import { DefaultArt } from "./DefaultArt";
import { tonePreset } from "@/lib/tone";

/**
 * The message card itself, in the Figma Make craft style.
 * `animate` turns on the staggered entrance used on the reveal screen.
 */
export function LoveCardView({ card, animate = false }: { card: LoveCard; animate?: boolean }) {
  const t = card.colors;
  const tone = tonePreset(card.tone);
  const anim = (a: string): CSSProperties => (animate ? { animation: a } : {});

  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, boxShadow: "4px 8px 48px rgba(0,0,0,0.18)" }}>
      <div style={{ height: 4, background: t.accent }} />

      <div style={{ padding: "36px 26px 44px" }}>
        {/* Botanical flanks + photo / illustration */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 26 }}>
          <div style={anim("fade-in-left 0.7s ease 0.5s both")} className="hidden sm:block">
            <BotanicalSprig color={t.accent} side="left" w={46} h={210} />
          </div>

          <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center", ...anim("fade-in-up 0.6s ease 0.35s both") }}>
            {/* one shared frame for photo OR fallback art — clips to fit, never overflows */}
            <div
              style={{
                width: "100%", maxWidth: 340, height: 210, overflow: "hidden",
                border: `3px solid ${t.gold}`, boxShadow: "3px 3px 0 rgba(0,0,0,0.13)", background: t.card,
              }}
            >
              {card.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.photo}
                  alt="a shared memory"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <DefaultArt theme={card.theme} colors={t} />
              )}
            </div>
          </div>

          <div style={anim("fade-in-right 0.7s ease 0.5s both")} className="hidden sm:block">
            <BotanicalSprig color={t.accent} side="right" w={46} h={210} />
          </div>
        </div>

        {/* divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, ...anim("fade-in-up 0.5s ease 0.55s both") }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${t.gold})` }} />
          <span className="font-display" style={{ color: t.gold, fontSize: 14, letterSpacing: 6 }}>✦ ♥ ✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${t.gold})` }} />
        </div>

        {/* greeting */}
        {card.to && (
          <p className="font-script" style={{ fontSize: 28, color: t.muted, margin: "0 0 8px", lineHeight: 1.3, ...anim("fade-in-up 0.5s ease 0.6s both") }}>
            {tone.greeting} {card.to},
          </p>
        )}

        {/* headline */}
        {card.headline && (
          <h2
            className="font-script"
            style={{ fontSize: "clamp(26px, 5vw, 44px)", color: t.accent, lineHeight: 1.2, margin: "0 0 20px", textAlign: "center", ...anim("fade-in-up 0.5s ease 0.65s both") }}
          >
            &ldquo;{card.headline}&rdquo;
          </h2>
        )}

        <div style={{ borderTop: `1px solid ${t.border}`, marginBottom: 20, ...anim("fade-in-up 0.4s ease 0.7s both") }} />

        {/* body */}
        {card.message && (
          <p
            className="font-script"
            style={{ fontSize: 24, color: t.text, lineHeight: 1.7, margin: "0 0 32px", whiteSpace: "pre-wrap", overflowWrap: "break-word", ...anim("fade-in-up 0.6s ease 0.75s both") }}
          >
            {card.message}
          </p>
        )}

        {/* sign-off */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14, ...anim("fade-in-up 0.5s ease 0.9s both") }}>
          <div style={{ height: 1, width: 48, background: t.border }} />
          <p className="font-script" style={{ fontSize: 28, color: t.accent, margin: 0 }}>
            {card.from?.trim() ? card.from : tone.signoff}
          </p>
        </div>
      </div>

      <div style={{ height: 4, background: t.accent }} />
    </div>
  );
}
