"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX, Download } from "lucide-react";
import { LoveCard } from "@/lib/types";
import { LoveCardView } from "./LoveCardView";
import { CornerBotanical, WaxSeal, TwineBow, BrokenSeal } from "./CraftArt";
import { SideKeepsakes, MobileKeepsakes } from "./Keepsakes";
import { ShareRow } from "./ShareRow";
import { playMelody, stopMelody } from "@/lib/audio";
import { youTubeId, DEFAULT_SONG_ID } from "@/lib/song";
import { CREATOR } from "@/lib/creator";
import { tonePreset } from "@/lib/tone";

/** Hidden, autoplaying YouTube player — uses YouTube's licensed stream for real songs. */
function SongPlayer({ id }: { id: string }) {
  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0`;
  return (
    <div aria-hidden style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
      <iframe width="320" height="180" src={src} allow="autoplay; encrypted-media" title="background song" />
    </div>
  );
}

type EnvState = "idle" | "opening" | "open" | "tampered";

export default function Reveal({
  card,
  alreadyOpened = false,
  preview = false,
}: {
  card: LoveCard;
  alreadyOpened?: boolean;
  preview?: boolean;
}) {
  const t = card.colors;
  const tone = tonePreset(card.tone);
  // A letter opened before shows a "broken seal" warning first — proof it was already read.
  const [env, setEnv] = useState<EnvState>(alreadyOpened ? "tampered" : "idle");
  const [muted, setMuted] = useState(alreadyOpened ? true : !card.music);

  // A real song (YouTube) when available; otherwise the built-in synth melody.
  const songId = card.music ? youTubeId(card.song) || DEFAULT_SONG_ID : null;

  useEffect(() => () => stopMelody(), []);

  const open = () => {
    if (env !== "idle") return;
    setEnv("opening");
    if (card.music && !songId) playMelody(); // synth fallback only
    if (!preview) fetch(`/api/cards/${card.id}`, { method: "POST" }).catch(() => {}); // burn the seal
    window.setTimeout(() => setEnv("open"), 1500);
  };


  const toggleMute = () => {
    if (songId) {
      setMuted((m) => !m); // mounts/unmounts the hidden player
      return;
    }
    if (muted) {
      playMelody();
      setMuted(false);
    } else {
      stopMelody();
      setMuted(true);
    }
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12"
      style={{
        background: t.bg,
        backgroundImage: `radial-gradient(ellipse at 15% 12%, ${t.gold}1f 0%, transparent 46%), radial-gradient(ellipse at 85% 88%, ${t.accent}14 0%, transparent 46%)`,
      }}
    >
      {/* background song via YouTube's licensed stream */}
      {songId && env !== "idle" && !muted && <SongPlayer id={songId} />}

      {card.music && env === "open" && (
        <button
          onClick={toggleMute}
          className="letterpress fixed right-4 top-4 z-30 flex h-10 w-10 items-center justify-center"
          style={{ background: t.card, color: t.accent, border: `1.5px solid ${t.border}` }}
          aria-label={muted ? "Play music" : "Mute music"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      {env === "tampered" ? (
        // ---------- ALREADY OPENED (BROKEN SEAL) ----------
        <div className="flex w-full max-w-md flex-col items-center text-center" style={{ animation: "fade-in-up 0.5s ease both" }}>
          <div style={{ animation: "art-bob 5s ease-in-out infinite" }}>
            <BrokenSeal fillColor={t.accent} heartColor={t.card} crackColor={t.bg} size={110} />
          </div>
          <div
            className="font-body mt-5 inline-flex items-center gap-2 rounded-sm px-3 py-1"
            style={{ background: `${t.accent}22`, color: t.accent, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}
          >
            Seal already broken
          </div>
          <h1 className="font-script mt-4" style={{ fontSize: 34, color: t.accent, lineHeight: 1.2 }}>
            This letter has been opened before
          </h1>
          <p className="font-body mt-3" style={{ fontStyle: "italic", fontSize: 15, color: t.muted, lineHeight: 1.6 }}>
            It was first opened on{" "}
            <strong style={{ color: t.text }}>
              {new Date(card.openedAt!).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
            </strong>
            . If that wasn&apos;t you, someone may have read it first — a sealed letter can only be opened once.
          </p>
          <button
            onClick={() => setEnv("open")}
            className="letterpress font-display mt-7 px-7 py-3"
            style={{ background: t.accent, color: t.card, border: `2px solid ${t.gold}`, letterSpacing: 1, fontSize: 15 }}
          >
            Read it anyway →
          </button>
        </div>
      ) : env !== "open" ? (
        // ---------- SEALED ENVELOPE ----------
        <div className="flex cursor-pointer flex-col items-center" onClick={open}>
          <div className="relative">
            {/* twine bow crowning the card */}
            <div className="absolute left-1/2 top-[-38px] z-20 -translate-x-1/2">
              <TwineBow color={t.kraft} untying={env === "opening"} />
            </div>

            <div
              style={{
                width: 320,
                background: t.card,
                border: `1.5px solid ${t.border}`,
                boxShadow: "5px 8px 32px rgba(0,0,0,0.22)",
                overflow: "hidden",
                transition: "opacity 0.4s ease 1.1s, transform 0.4s ease 1.1s",
                opacity: env === "opening" ? 0 : 1,
                transform: env === "opening" ? "scale(0.96) translateY(8px)" : "none",
              }}
            >
              <div style={{ padding: "54px 24px 22px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -8, left: -8, opacity: 0.3 }}>
                  <CornerBotanical color={t.accent} />
                </div>
                <div style={{ position: "absolute", top: -8, right: -8, opacity: 0.3 }}>
                  <CornerBotanical color={t.accent} flip />
                </div>
                <p className="font-script" style={{ fontSize: 38, color: t.accent, margin: 0, lineHeight: 1.15, position: "relative", zIndex: 1 }}>
                  For You, Always.
                </p>
                {card.to && (
                  <p className="font-body" style={{ fontStyle: "italic", fontSize: 14, color: t.muted, margin: "8px 0 0", position: "relative", zIndex: 1 }}>
                    For {card.to}
                  </p>
                )}
              </div>

              {/* kraft band that slides away */}
              <div
                style={{
                  background: t.kraft,
                  height: 66,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.5s ease 0.25s, opacity 0.4s ease 0.25s",
                  transform: env === "opening" ? "translateX(115%)" : "none",
                  opacity: env === "opening" ? 0 : 1,
                }}
              >
                <div
                  style={{
                    transition: "transform 0.3s ease 0.15s, opacity 0.3s ease 0.15s",
                    opacity: env === "opening" ? 0 : 1,
                    transform: env === "opening" ? "scale(0.8)" : "none",
                  }}
                >
                  <WaxSeal fillColor={t.accent} heartColor={t.card} size={70} />
                </div>
              </div>

              <div style={{ padding: "20px 24px 34px", textAlign: "center" }}>
                <p className="font-body" style={{ fontStyle: "italic", fontSize: 13, color: t.muted, margin: 0, opacity: 0.7 }}>
                  sealed for you ♥
                </p>
              </div>
            </div>
          </div>

          <p
            className={`font-body mt-8 ${env === "idle" ? "anim-pulse" : ""}`}
            style={{ fontStyle: "italic", fontSize: 16, color: t.muted, opacity: env === "opening" ? 0 : 0.9, transition: "opacity 0.3s ease" }}
          >
            {env === "idle"
              ? card.to
                ? `✦  ${card.to}, tap to open  ✦`
                : "✦  Tap to open  ✦"
              : "Opening…"}
          </p>
        </div>
      ) : (
        // ---------- REVEALED LETTER ----------
        <div className="anim-letter-rise w-full" style={{ maxWidth: 680 }}>
          {/* scrapbook stage: keepsakes flank the letter on wide screens */}
          <div className="relative">
            <SideKeepsakes card={card} />
            <LoveCardView card={card} animate />
          </div>

          <div className="mt-8">
            <MobileKeepsakes card={card} />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3" style={{ animation: "fade-in-up 0.5s ease 1.2s both" }}>
            <a href={`/card/${card.id}/download`} download className="letterpress font-display inline-flex items-center gap-2 px-6 py-3 text-sm" style={{ background: t.accent, color: t.card, border: `2px solid ${t.gold}`, letterSpacing: 1 }}>
              <Download className="h-4 w-4" /> Keep this letter
            </a>
            <a href="/" className="letterpress font-display px-6 py-3 text-sm" style={{ background: "transparent", color: t.accent, border: `1.5px solid ${t.accent}`, letterSpacing: 1 }}>
              Make your own
            </a>
          </div>

          {alreadyOpened && (
            <p className="font-body" style={{ textAlign: "center", marginTop: 16, fontSize: 12, fontStyle: "italic", color: t.muted, opacity: 0.8 }}>
              This letter was first opened {new Date(card.openedAt!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Like a real letter, it can&apos;t be resealed — but it&apos;s yours to keep. ♥
            </p>
          )}

          {/* viral share + creator credit */}
          <div style={{ marginTop: 30, textAlign: "center", animation: "fade-in-up 0.5s ease 1.5s both" }}>
            <p className="font-script" style={{ fontSize: 24, color: t.accent, marginBottom: 10 }}>{tone.shareLine} 💌</p>
            <ShareRow colors={t} />
            <p className="font-body" style={{ marginTop: 16, fontSize: 11, color: t.muted, opacity: 0.85 }}>
              Made with ♥ by{" "}
              <a href={CREATOR.linkedin} target="_blank" rel="noopener" style={{ color: t.accent, borderBottom: `1px solid ${t.accent}` }}>
                {CREATOR.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
