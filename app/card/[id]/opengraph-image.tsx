import { ImageResponse } from "next/og";
import { getCard } from "@/lib/db";
import { THEMES, DEFAULT_THEME } from "@/lib/themes";
import { loadFont } from "@/lib/ogFont";
import { tonePreset } from "@/lib/tone";

export const runtime = "nodejs";
export const alt = "A sealed message — tap to open";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await Promise.resolve(params as { id: string });
  const card = await getCard(id);
  const t = card?.colors ?? THEMES[DEFAULT_THEME].colors;
  const recipient = card?.to?.trim();
  const displayName = recipient || "you";
  const tone = tonePreset(card?.tone);

  const [script, serif] = await Promise.all([loadFont("Dancing+Script", 700), loadFont("Playfair+Display", 500)]);
  const fonts = [
    ...(script ? [{ name: "Script", data: script, weight: 700 as const, style: "normal" as const }] : []),
    ...(serif ? [{ name: "Serif", data: serif, weight: 500 as const, style: "normal" as const }] : []),
  ];
  const scriptFam = script ? "Script" : "serif";
  const serifFam = serif ? "Serif" : "serif";

  const heart = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21s-8-5.5-8-11a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 5.5-8 11-8 11Z' fill='${t.card}'/></svg>`
  )}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: t.bg,
          fontFamily: serifFam,
        }}
      >
        {/* sealed card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 520,
            background: t.card,
            border: `2px solid ${t.border}`,
            boxShadow: "8px 12px 0 rgba(0,0,0,0.12)",
            paddingTop: 44,
          }}
        >
          <div style={{ fontFamily: scriptFam, fontSize: 62, color: t.accent, lineHeight: 1 }}>For You, Always.</div>
          <div style={{ fontFamily: serifFam, fontSize: 24, color: t.muted, marginTop: 10, fontStyle: "italic" }}>{`For ${displayName}`}</div>

          {/* kraft band + wax seal */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 110,
              background: t.kraft,
              marginTop: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 84,
                height: 84,
                borderRadius: 84,
                background: t.accent,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heart} width={44} height={44} alt="" />
            </div>
          </div>

          <div style={{ fontFamily: serifFam, fontSize: 20, color: t.muted, fontStyle: "italic", padding: "22px 0 26px" }}>
            sealed for you
          </div>
        </div>

        <div style={{ fontFamily: scriptFam, fontSize: 40, color: t.accent, marginTop: 34 }}>
          {recipient ? `${recipient}, ${tone.opener}` : tone.opener.charAt(0).toUpperCase() + tone.opener.slice(1)}
        </div>
        <div style={{ fontFamily: serifFam, fontSize: 22, color: t.muted, marginTop: 6, letterSpacing: 2 }}>TAP TO OPEN</div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
