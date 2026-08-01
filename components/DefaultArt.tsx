import { CardColors, ThemeId } from "@/lib/types";

/**
 * Animated default artwork shown when no photo is attached.
 * The *scene* changes with the theme; colors come from the theme palette.
 * Pure SVG + CSS — always loads, no external images.
 */
export function DefaultArt({ theme, colors }: { theme: ThemeId; colors: CardColors }) {
  const { accent, gold, muted } = colors;
  const common = { width: "100%", height: "100%", viewBox: "0 0 340 210", preserveAspectRatio: "xMidYMid slice", fill: "none" } as const;

  if (theme === "midnight") {
    // moonlit, twinkling sky
    const stars = [
      [40, 40], [80, 70], [120, 30], [300, 120], [270, 60], [60, 130], [150, 150], [210, 40], [180, 100], [110, 110],
    ];
    return (
      <svg {...common} aria-label="a moonlit night">
        <rect width="340" height="210" fill={accent} opacity="0.06" />
        <g className="art-bob">
          <circle cx="250" cy="66" r="34" fill={gold} opacity="0.9" />
          <circle cx="238" cy="60" r="30" fill={colors.card} />
        </g>
        {stars.map(([x, y], i) => (
          <g key={i} className="art-twinkle" style={{ animationDelay: `${(i % 5) * 0.5}s` }}>
            <path d={`M${x} ${y - 5} L${x + 1.4} ${y - 1.4} L${x + 5} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 5} L${x - 1.4} ${y + 1.4} L${x - 5} ${y} L${x - 1.4} ${y - 1.4} Z`} fill={gold} />
          </g>
        ))}
      </svg>
    );
  }

  if (theme === "blush") {
    // blossom branch with drifting petals
    const petal = "M0 0 C -6 -4 -6 -12 0 -15 C 6 -12 6 -4 0 0Z";
    const blossoms = [[70, 66], [120, 52], [168, 68], [214, 50]];
    return (
      <svg {...common} aria-label="cherry blossoms">
        <rect width="340" height="210" fill={accent} opacity="0.05" />
        <path d="M0 40 C 60 30 150 44 250 34 C 290 30 320 34 340 40" stroke={muted} strokeWidth="3" fill="none" opacity="0.6" />
        {blossoms.map(([x, y], i) => (
          <g key={i} className="art-bob" style={{ animationDelay: `${i * 0.6}s`, transformOrigin: `${x}px ${y}px` }}>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx={x} cy={y - 8} rx="5" ry="8" fill={accent} opacity="0.85" transform={`rotate(${r} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r="3.5" fill={gold} />
          </g>
        ))}
        {[[60, 8], [140, 4], [220, 6], [110, 2], [190, 10]].map(([x, d], i) => (
          <g key={`p${i}`} className="art-fall" style={{ animationDuration: `${5 + (i % 3)}s`, animationDelay: `${d * 0.4}s` }} transform={`translate(${x} 60)`}>
            <path d={petal} fill={accent} opacity="0.7" />
          </g>
        ))}
      </svg>
    );
  }

  if (theme === "lavender") {
    // swaying lavender field
    const stems = [90, 140, 175, 210, 250];
    return (
      <svg {...common} aria-label="a lavender field">
        <rect width="340" height="210" fill={accent} opacity="0.05" />
        {stems.map((x, i) => (
          <g key={i} className="art-sway" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px 205px` }}>
            <path d={`M${x} 205 L${x} 70`} stroke={muted} strokeWidth="2.5" />
            {[70, 84, 98, 112, 126].map((y, j) => (
              <g key={j}>
                <ellipse cx={x - 6} cy={y} rx="4.5" ry="7" fill={accent} opacity="0.8" />
                <ellipse cx={x + 6} cy={y + 6} rx="4.5" ry="7" fill={accent} opacity="0.8" />
              </g>
            ))}
          </g>
        ))}
        {[[50, 60], [300, 90], [160, 40]].map(([x, y], i) => (
          <circle key={i} className="art-bob" style={{ animationDelay: `${i * 0.8}s` }} cx={x} cy={y} r="2.5" fill={gold} opacity="0.7" />
        ))}
      </svg>
    );
  }

  // rosewood (default) — a single swaying rose
  const petal = "M0 0 C -7 -5 -7 -14 0 -17 C 7 -14 7 -5 0 0Z";
  return (
    <svg {...common} aria-label="a single rose">
      <rect width="340" height="210" fill={accent} opacity="0.05" />
      <g className="art-sway" style={{ transformOrigin: "170px 205px" }}>
        <path d="M170 205 L170 96" stroke={muted} strokeWidth="3" />
        <path d="M170 150 C 150 146 140 132 138 120 C 156 122 168 134 170 150Z" fill={accent} opacity="0.5" />
        <path d="M170 138 C 190 134 200 120 202 108 C 184 110 172 122 170 138Z" fill={accent} opacity="0.5" />
        {/* rose bloom */}
        <g style={{ transformOrigin: "170px 84px" }}>
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <ellipse key={r} cx="170" cy="72" rx="9" ry="16" fill={accent} opacity="0.8" transform={`rotate(${r} 170 84)`} />
          ))}
          <circle cx="170" cy="84" r="9" fill={gold} opacity="0.9" />
        </g>
      </g>
      {[[150, 0], [190, 1], [170, 2]].map(([x, d], i) => (
        <g key={i} className="art-fall" style={{ animationDuration: `${6 + i}s`, animationDelay: `${d * 0.6}s` }} transform={`translate(${x} 80)`}>
          <path d={petal} fill={accent} opacity="0.65" />
        </g>
      ))}
    </svg>
  );
}
