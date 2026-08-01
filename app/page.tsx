import Builder from "@/components/Builder";
import { RedeemCode } from "@/components/RedeemCode";
import { CornerBotanical } from "@/components/CraftArt";
import { PAPER_BG } from "@/lib/themes";
import { CREATOR } from "@/lib/creator";

const ACCENT = "#7B1F2E";
const GOLD = "#C9A227";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background: PAPER_BG,
        backgroundImage:
          "radial-gradient(ellipse at 15% 12%, rgba(201,162,39,0.12) 0%, transparent 45%), radial-gradient(ellipse at 85% 88%, rgba(123,31,46,0.08) 0%, transparent 45%)",
      }}
    >
      {/* corner botanicals */}
      <div style={{ position: "absolute", top: -8, left: -8, opacity: 0.4 }}><CornerBotanical color={ACCENT} /></div>
      <div style={{ position: "absolute", top: -8, right: -8, opacity: 0.4 }}><CornerBotanical color={ACCENT} flip /></div>
      <div style={{ position: "absolute", bottom: -8, left: -8, opacity: 0.28, transform: "scaleY(-1)" }}><CornerBotanical color={ACCENT} /></div>
      <div style={{ position: "absolute", bottom: -8, right: -8, opacity: 0.28, transform: "scale(-1,-1)" }}><CornerBotanical color={ACCENT} /></div>

      <div className="relative z-10">
        <header style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", padding: "48px 24px 8px" }}>
          <p className="font-display" style={{ color: GOLD, fontSize: 18, letterSpacing: 10, margin: "0 0 12px" }}>❧ ✦ ❧</p>
          <h1 className="font-script" style={{ fontSize: "clamp(48px, 11vw, 82px)", color: ACCENT, lineHeight: 1.05, margin: "0 0 12px", letterSpacing: 2 }}>
            For You, Always.
          </h1>
          <p className="font-body" style={{ fontStyle: "italic", fontSize: 17, color: "#7A5040", lineHeight: 1.7, margin: "0 0 22px" }}>
            Write a letter sealed with love — then send a link that opens<br />
            into a beautiful card on any phone or computer.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 8 }}>
            <div style={{ height: 1, width: 70, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <span style={{ color: GOLD, fontSize: 16 }}>♥</span>
            <div style={{ height: 1, width: 70, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
          </div>

          <RedeemCode accent={ACCENT} gold={GOLD} />
        </header>

        <Builder />

        <footer className="font-body" style={{ borderTop: `1px solid ${ACCENT}22`, padding: "20px", textAlign: "center", fontSize: 12, color: "#9A6040", marginTop: 24 }}>
          <div>Your letter is saved privately and only opens with its link.</div>
          <div style={{ marginTop: 6 }}>
            Made with ♥ by{" "}
            <a href={CREATOR.linkedin} target="_blank" rel="noopener" style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}>
              {CREATOR.name}
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
