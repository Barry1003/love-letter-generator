import { LoveCard } from "@/lib/types";
import { HangingHearts, StitchedHeart } from "./CraftArt";

/** A little taped date note — "the day this was written". */
function DateStamp({ card, rotate = -6 }: { card: LoveCard; rotate?: number }) {
  const t = card.colors;
  const d = new Date(card.createdAt || Date.now());
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const year = d.getFullYear();
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, width: 104 }}>
      {/* strip of tape */}
      <div style={{ height: 14, width: 54, margin: "0 auto -7px", background: `${t.gold}66`, opacity: 0.8 }} />
      <div style={{ background: "#FFFDF6", border: `1px solid ${t.border}`, boxShadow: "2px 3px 0 rgba(0,0,0,0.1)", padding: 8, textAlign: "center" }}>
        <div className="font-display" style={{ background: t.accent, color: "#FFF8EE", fontSize: 11, letterSpacing: 2, padding: "2px 0" }}>{month}</div>
        <div className="font-display" style={{ color: t.accent, fontSize: 34, lineHeight: 1.05, marginTop: 2 }}>{day}</div>
        <div className="font-body" style={{ color: t.muted, fontSize: 11, letterSpacing: 1 }}>{year}</div>
        <div className="font-body" style={{ color: t.muted, fontStyle: "italic", fontSize: 9, marginTop: 3 }}>the day I wrote this ♥</div>
      </div>
    </div>
  );
}

/** A tied paper tag with a short handwritten line. */
function TiedNote({ card, text, rotate = 5 }: { card: LoveCard; text: string; rotate?: number }) {
  const t = card.colors;
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, width: 118, position: "relative" }}>
      <svg viewBox="0 0 40 26" width="40" height="26" style={{ display: "block", margin: "0 auto -2px" }}>
        <path d="M20 2 Q6 10 10 24" stroke={t.kraft} strokeWidth="1.5" fill="none" />
        <path d="M20 2 Q34 10 30 24" stroke={t.kraft} strokeWidth="1.5" fill="none" />
      </svg>
      <div style={{ background: "#FBF3E4", border: `1px solid ${t.border}`, boxShadow: "2px 3px 0 rgba(0,0,0,0.1)", padding: "12px 12px 14px", position: "relative" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${t.muted}`, margin: "0 auto 6px" }} />
        <p className="font-script" style={{ color: t.accent, fontSize: 19, lineHeight: 1.25, textAlign: "center", margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function nameLetters(to: string): string[] {
  const first = (to || "").trim().split(/\s+/)[0] || "";
  const alpha = first.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 5);
  return alpha.length >= 2 ? alpha.split("") : ["L", "O", "V", "E"];
}

/** Keepsakes floated to the left and right of the letter (desktop only). */
export function SideKeepsakes({ card }: { card: LoveCard }) {
  const t = card.colors;
  const letters = nameLetters(card.to);
  return (
    <>
      {/* LEFT */}
      <div className="pointer-events-none absolute -left-[150px] top-2 hidden xl:flex xl:flex-col xl:items-center xl:gap-2" style={{ animation: "fade-in-left 0.7s ease 1s both" }}>
        <DateStamp card={card} />
        <div style={{ marginTop: 18 }}>
          <HangingHearts letters={letters} heartColor={t.kraft} inkColor={t.accent} stringColor={t.muted} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="pointer-events-none absolute -right-[150px] top-6 hidden xl:flex xl:flex-col xl:items-center xl:gap-8" style={{ animation: "fade-in-right 0.7s ease 1.1s both" }}>
        <TiedNote card={card} text={card.music ? "our song, on repeat ♫" : "kept, always ♥"} />
        <div style={{ transform: "rotate(-5deg)" }}>
          <StitchedHeart kraft={t.kraft} thread={t.accent} />
        </div>
      </div>
    </>
  );
}

/** Compact keepsake row shown under the letter on smaller screens. */
export function MobileKeepsakes({ card }: { card: LoveCard }) {
  const t = card.colors;
  return (
    <div className="flex items-center justify-center gap-6 xl:hidden" style={{ animation: "fade-in-up 0.6s ease 1s both" }}>
      <DateStamp card={card} rotate={-5} />
      <div style={{ transform: "rotate(4deg)" }}>
        <StitchedHeart kraft={t.kraft} thread={t.accent} size={82} />
      </div>
    </div>
  );
}
