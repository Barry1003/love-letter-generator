import { ImageResponse } from "next/og";
import { THEMES } from "@/lib/themes";
import { loadFont } from "@/lib/ogFont";
import { CREATOR } from "@/lib/creator";

export const runtime = "nodejs";
export const alt = "For You, Always — make a message worth keeping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const t = THEMES.rosewood.colors;
  const cream = "#F5E8C0";

  const [script, serif] = await Promise.all([loadFont("Dancing+Script", 700), loadFont("Playfair+Display", 500)]);
  const fonts = [
    ...(script ? [{ name: "Script", data: script, weight: 700 as const, style: "normal" as const }] : []),
    ...(serif ? [{ name: "Serif", data: serif, weight: 500 as const, style: "normal" as const }] : []),
  ];
  const sf = script ? "Script" : "serif";
  const bf = serif ? "Serif" : "serif";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: cream }}>
        <div style={{ fontFamily: bf, color: t.gold, fontSize: 22, letterSpacing: 12, marginBottom: 8 }}>FOR YOU, ALWAYS</div>
        <div style={{ fontFamily: sf, fontSize: 108, color: t.accent, lineHeight: 1 }}>Make a message worth keeping</div>
        <div style={{ fontFamily: bf, fontSize: 30, color: "#7A5040", marginTop: 22, fontStyle: "italic" }}>
          A sealed card that opens with animation, a song & a keepsake.
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
          {["Romantic", "Friends", "Family", "Thank-you"].map((label) => (
            <div key={label} style={{ display: "flex", fontFamily: bf, fontSize: 22, color: t.accent, border: `1.5px solid ${t.border}`, padding: "8px 18px", background: "#FFF8EE" }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ fontFamily: bf, fontSize: 20, color: "#9A6040", marginTop: 40 }}>{`made with love by ${CREATOR.name}`}</div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
