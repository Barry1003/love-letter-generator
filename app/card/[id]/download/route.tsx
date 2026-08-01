import { ImageResponse } from "next/og";
import { getCard } from "@/lib/db";
import { loadFont } from "@/lib/ogFont";
import { CREATOR } from "@/lib/creator";
import { tonePreset } from "@/lib/tone";

export const runtime = "nodejs";

// Server-rendered keepsake image of the message — reliable fonts, downloadable.
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const card = await getCard(id);
  if (!card) return new Response("Not found", { status: 404 });
  const t = card.colors;
  const tone = tonePreset(card.tone);
  const name = card.to?.trim() || "friend";
  const signoff = card.from?.trim() || tone.signoff;

  const [script, hand, serif] = await Promise.all([
    loadFont("Dancing+Script", 700),
    loadFont("Caveat", 600),
    loadFont("Lora", 500),
  ]);
  const fonts = [
    ...(script ? [{ name: "Script", data: script, weight: 700 as const, style: "normal" as const }] : []),
    ...(hand ? [{ name: "Hand", data: hand, weight: 600 as const, style: "normal" as const }] : []),
    ...(serif ? [{ name: "Serif", data: serif, weight: 500 as const, style: "normal" as const }] : []),
  ];
  const sf = script ? "Script" : "serif";
  const hf = hand ? "Hand" : serif ? "Serif" : "serif"; // handwriting for the body
  const bf = serif ? "Serif" : "serif"; // plain serif for small footer

  const paragraphs = (card.message || "").split(/\n{2,}/).filter(Boolean);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: t.card }}>
        <div style={{ height: 12, background: t.accent }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "64px 72px" }}>
          <div style={{ display: "flex", justifyContent: "center", color: t.gold, fontSize: 26, letterSpacing: 8, marginBottom: 24 }}>
            —— ♥ ——
          </div>
          <div style={{ fontFamily: sf, fontSize: 48, color: t.muted, marginBottom: 6 }}>{`${tone.greeting} ${name},`}</div>
          {card.headline ? (
            <div style={{ fontFamily: sf, fontSize: 44, color: t.accent, textAlign: "center", lineHeight: 1.3, margin: "10px 0 26px" }}>
              {`“${card.headline}”`}
            </div>
          ) : null}
          <div style={{ height: 1, background: t.border, marginBottom: 26 }} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {paragraphs.map((p, i) => (
              <div key={i} style={{ fontFamily: hf, fontSize: 38, color: t.text, lineHeight: 1.5, marginBottom: 16 }}>
                {p}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", fontFamily: sf, fontSize: 40, color: t.accent, marginTop: 10 }}>
            {signoff}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", fontFamily: bf, fontSize: 18, color: t.muted, paddingBottom: 22 }}>
          {`For You, Always · made with ♥ by ${CREATOR.name}`}
        </div>
        <div style={{ height: 12, background: t.accent }} />
      </div>
    ),
    {
      width: 1000,
      height: 1414,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        "Content-Disposition": `attachment; filename="love-letter-for-${name.replace(/\s+/g, "-").toLowerCase()}.png"`,
      },
    }
  );
}
