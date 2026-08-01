"use client";

import { useMemo, useRef, useState } from "react";
import { Image as ImageIcon, Sparkles, Copy, Check, Eye, X, Music, Trash2, Heart, Users, Home, Flower2 } from "lucide-react";
import { LoveCard, NewCardInput, ThemeId, MessageTone } from "@/lib/types";
import { THEMES, DEFAULT_THEME } from "@/lib/themes";
import { TONES } from "@/lib/tone";

const TONE_ICONS: Record<MessageTone, typeof Heart> = {
  love: Heart,
  friend: Users,
  family: Home,
  thanks: Flower2,
};
import { LoveCardView } from "./LoveCardView";
import { WaxSeal } from "./CraftArt";
import { ShareRow } from "./ShareRow";

const INSPIRATION = [
  { headline: "In all the world, there is no heart for me like yours.",
    message: "From quiet mornings to the stillness of midnight, my thoughts always drift back to you. You brought a warmth into my life I never knew I was searching for. Thank you for your gentle smile and the way you make ordinary days feel like poetry." },
  { headline: "You are my favorite place, my today and all of my tomorrows.",
    message: "When I look at you I see my safe harbor and my greatest adventure at once. I promise to stand by your side through every season, and to cherish you more with every sunset." },
  { headline: "Whatever our souls are made of, yours and mine are the same.",
    message: "Words feel too small to hold what I feel for you. You are the quiet melody in a crowded room, the first light through winter trees. Being loved by you is the greatest gift of my life." },
];

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 720;
        let { width: w, height: h } = img;
        const scale = Math.min(1, MAX / Math.max(w, h));
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const cv = document.createElement("canvas");
        cv.width = w;
        cv.height = h;
        cv.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(cv.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Builder() {
  const [card, setCard] = useState<NewCardInput>(() => ({
    to: "",
    from: "",
    headline: "",
    message: "",
    theme: DEFAULT_THEME,
    colors: { ...THEMES[DEFAULT_THEME].colors },
    illustration: "heart",
    tone: "love",
    photo: undefined,
    music: true,
    song: "",
  }));
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ id: string; code: string } | null>(null);
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Fixed cream/ink palette for the FORM chrome so it stays readable no matter
  // which theme (incl. dark ones) is chosen. The theme only styles the preview card.
  const t = {
    bg: "#F5E8C0", card: "#FFF8EE", text: "#3D2A1A", accent: "#7B1F2E",
    gold: "#C9A227", border: "#C4A878", muted: "#9A6040", kraft: "#C49A6C",
  };
  const preview = useMemo<LoveCard>(() => ({ ...card, id: "preview", code: "PREVIEW", createdAt: Date.now() }), [card]);
  const set = <K extends keyof NewCardInput>(k: K, v: NewCardInput[K]) => setCard((p) => ({ ...p, [k]: v }));
  const pickTheme = (id: ThemeId) => setCard((p) => ({ ...p, theme: id, colors: { ...THEMES[id].colors } }));

  const onPhoto = async (file?: File) => {
    if (!file) return;
    try {
      set("photo", await compressImage(file));
    } catch {
      alert("Couldn't read that image, try another.");
    }
  };

  const inspire = () => {
    const p = INSPIRATION[Math.floor(Math.random() * INSPIRATION.length)];
    setCard((c) => ({ ...c, headline: p.headline, message: p.message }));
  };

  const generate = async () => {
    if (!card.message.trim() && !card.headline.trim()) {
      alert("Write a message or a headline first ♥");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data);
    } catch (e: any) {
      alert(e.message || "Something went wrong saving your card.");
    } finally {
      setBusy(false);
    }
  };

  const shareUrl = result ? `${typeof window !== "undefined" ? window.location.origin : ""}/card/${result.id}` : "";
  const copy = async (text: string, which: "link" | "code") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setCopied(which);
    setTimeout(() => setCopied(null), 1800);
  };

  const label = { fontFamily: "var(--f-display)", color: t.accent, letterSpacing: 1, fontSize: 13 } as const;
  const inputStyle = {
    width: "100%",
    background: "#FFF8EE",
    border: `1.5px solid ${t.border}`,
    borderRadius: 0,
    padding: "11px 13px",
    fontFamily: "var(--f-body)",
    fontSize: 15,
    color: t.text,
    outline: "none",
  } as const;

  return (
    <div className="create-grid">
      {/* ---------------- FORM ---------------- */}
      <div className="create-form-col" style={{ paddingRight: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* who it's for — sets greeting, sign-off and wording */}
          <div>
            <div style={label}>WHO IS IT FOR?</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {Object.values(TONES).map((tn) => {
                const active = (card.tone ?? "love") === tn.id;
                const Icon = TONE_ICONS[tn.id];
                return (
                  <button key={tn.id} type="button" onClick={() => set("tone", tn.id as MessageTone)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 14px", cursor: "pointer", fontFamily: "var(--f-body)", fontSize: 13,
                      background: active ? t.accent : "transparent",
                      color: active ? t.card : t.text,
                      border: `1.5px solid ${active ? t.accent : t.border}`,
                    }}>
                    <Icon className="h-4 w-4" strokeWidth={1.75} /> {tn.label}
                  </button>
                );
              })}
            </div>
            <p className="font-body" style={{ fontSize: 11, color: t.muted, fontStyle: "italic", marginTop: 6 }}>
              Sets the greeting (“{TONES[card.tone ?? "love"].greeting} {card.to || "…"}”) and sign-off — not just for love letters.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label>
              <div style={label}>TO (THEIR NAME)</div>
              <input style={inputStyle} value={card.to} maxLength={60} placeholder="Amara" onChange={(e) => set("to", e.target.value)} />
            </label>
            <label>
              <div style={label}>SIGN OFF (OPTIONAL)</div>
              <input style={inputStyle} value={card.from} maxLength={60} placeholder={TONES[card.tone ?? "love"].signoff} onChange={(e) => set("from", e.target.value)} />
            </label>
          </div>

          <label>
            <div style={label}>THE HEADLINE — YOUR MAIN SENTENCE</div>
            <input style={inputStyle} value={card.headline} maxLength={240} placeholder="You are my today and all of my tomorrows." onChange={(e) => set("headline", e.target.value)} />
          </label>

          <label>
            <div style={{ ...label, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>YOUR LETTER</span>
              <button onClick={inspire} type="button" className="inline-flex items-center gap-1" style={{ fontFamily: "var(--f-body)", fontStyle: "italic", fontSize: 12, color: t.muted, letterSpacing: 0 }}>
                <Sparkles className="h-3.5 w-3.5" /> inspire me
              </button>
            </div>
            <textarea style={{ ...inputStyle, minHeight: 150, resize: "vertical", lineHeight: 1.6 }} value={card.message} maxLength={6000} placeholder="The first time I saw you…" onChange={(e) => set("message", e.target.value)} />
          </label>

          {/* theme */}
          <div>
            <div style={label}>CHOOSE A THEME</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              {Object.values(THEMES).map((th) => {
                const active = card.theme === th.id;
                return (
                  <button key={th.id} onClick={() => pickTheme(th.id)} type="button"
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer",
                      background: active ? "#FBF3E4" : "transparent",
                      boxShadow: active ? `inset 0 0 0 1px ${t.accent}` : "none",
                      border: `1.5px solid ${active ? t.accent : t.border}`,
                    }}>
                    {/* two-tone swatch shows the theme's own colors */}
                    <span style={{ display: "flex", width: 16, height: 16, border: `1px solid ${t.border}` }}>
                      <span style={{ width: 8, height: 16, background: th.colors.bg, display: "block" }} />
                      <span style={{ width: 8, height: 16, background: th.colors.accent, display: "block" }} />
                    </span>
                    <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: t.text }}>{th.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* photo / illustration */}
          <div>
            <div style={label}>A MEMORY PHOTO</div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
            {card.photo ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.photo} alt="preview" style={{ width: 92, height: 92, objectFit: "cover", border: `3px solid ${t.gold}` }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => fileRef.current?.click()} className="letterpress font-body" style={{ background: t.card, color: t.accent, border: `1.5px solid ${t.border}`, padding: "8px 14px", fontSize: 13 }}>Replace</button>
                  <button onClick={() => set("photo", undefined)} className="letterpress font-body inline-flex items-center gap-1" style={{ background: t.card, color: t.accent, border: `1.5px solid ${t.border}`, padding: "8px 14px", fontSize: 13 }}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 8 }}>
                <button onClick={() => fileRef.current?.click()} className="font-body" style={{ width: "100%", padding: "18px", border: `2px dashed ${t.border}`, background: `${t.accent}08`, color: t.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontStyle: "italic", fontSize: 14 }}>
                  <ImageIcon className="h-4 w-4" /> Tap to add a photo
                </button>
                <p className="font-body" style={{ fontSize: 11, color: t.muted, fontStyle: "italic", marginTop: 6 }}>
                  No photo? A gentle animated illustration is used, matched to your theme (see preview).
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 font-body" style={{ color: t.muted, fontSize: 14 }}>
              <input type="checkbox" checked={card.music} onChange={(e) => set("music", e.target.checked)} style={{ accentColor: t.accent, width: 16, height: 16 }} />
              <Music className="h-4 w-4" /> Play a song when they open it
            </label>
            {card.music && (
              <div style={{ marginTop: 8 }}>
                <input
                  style={{ ...inputStyle, fontSize: 13 }}
                  value={card.song}
                  onChange={(e) => set("song", e.target.value)}
                  placeholder="Default: Gigi Perez — Sailor Song  (paste a YouTube link to change)"
                />
                <p className="font-body" style={{ fontSize: 11, color: t.muted, fontStyle: "italic", marginTop: 4 }}>
                  Streams from YouTube&apos;s official player. Leave blank for Sailor Song.
                </p>
              </div>
            )}
          </div>

          <button onClick={generate} disabled={busy} className="letterpress font-display"
            style={{ background: t.accent, color: t.card, border: `2px solid ${t.gold}`, padding: "16px", fontSize: 16, letterSpacing: 1.5, cursor: "pointer", marginTop: 4 }}>
            {busy ? "Sealing your letter…" : "Seal & Create Link"}
          </button>
        </div>
      </div>

      {/* ---------------- LIVE PREVIEW ---------------- */}
      <div className="create-preview-col" style={{ position: "sticky", top: 24 }}>
        <div className="font-body" style={{ textAlign: "center", fontStyle: "italic", color: t.muted, fontSize: 13, marginBottom: 12 }}>
          ✦ a preview of your letter ✦
        </div>
        <LoveCardView card={preview} />
      </div>

      {/* ---------------- SHARE MODAL ---------------- */}
      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(30,18,14,0.7)" }}>
          <div style={{ width: "100%", maxWidth: 460, background: t.card, border: `1.5px solid ${t.border}`, padding: "32px 28px", textAlign: "center", position: "relative", boxShadow: "6px 10px 40px rgba(0,0,0,0.35)" }}>
            <button onClick={() => setResult(null)} className="absolute right-4 top-4" style={{ color: t.muted }}>
              <X className="h-5 w-5" />
            </button>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <WaxSeal fillColor={t.accent} heartColor={t.card} size={64} />
            </div>
            <h2 className="font-script" style={{ fontSize: 34, color: t.accent, margin: "0 0 4px" }}>Sealed with care</h2>
            <p className="font-body" style={{ fontStyle: "italic", color: t.muted, fontSize: 14, margin: "0 0 18px" }}>
              Send this link — it opens on any phone or computer.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              <input readOnly value={shareUrl} style={{ ...inputStyle, fontSize: 13 }} />
              <button onClick={() => copy(shareUrl, "link")} className="letterpress font-display inline-flex items-center gap-1" style={{ background: t.accent, color: t.card, border: `2px solid ${t.gold}`, padding: "0 16px", fontSize: 13 }}>
                {copied === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy
              </button>
            </div>

            <div className="font-body" style={{ marginTop: 14, fontSize: 14, color: t.muted }}>
              Backup code:{" "}
              <button onClick={() => copy(result.code, "code")} style={{ fontFamily: "var(--f-display)", letterSpacing: 3, color: t.accent, borderBottom: `1px solid ${t.accent}` }}>
                {result.code} {copied === "code" ? "✓" : ""}
              </button>
            </div>

            <a href={`${shareUrl}?preview=1`} className="letterpress font-display mt-6 inline-flex items-center gap-2" style={{ background: "transparent", color: t.accent, border: `1.5px solid ${t.accent}`, padding: "10px 18px", fontSize: 14 }}>
              <Eye className="h-4 w-4" /> Preview how they&apos;ll see it →
            </a>
            <p className="font-body" style={{ fontSize: 11, color: t.muted, fontStyle: "italic", marginTop: 8 }}>
              Previewing won&apos;t open the real letter — they get the sealed surprise.
            </p>

            <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 20, paddingTop: 16 }}>
              <p className="font-body" style={{ fontSize: 12, color: t.muted, marginBottom: 10 }}>Help someone else fall in love with it too:</p>
              <ShareRow colors={t} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
