/**
 * Hand-drawn craft SVGs in the Figma Make style — botanical sprigs, corner
 * vines, a wax seal, and a twine bow. All inherit a `color` prop.
 */

export function BotanicalSprig({
  color,
  side = "left",
  w = 50,
  h = 220,
}: {
  color: string;
  side?: "left" | "right";
  w?: number;
  h?: number;
}) {
  return (
    <svg
      viewBox="0 0 70 340"
      width={w}
      height={h}
      fill="none"
      style={{ flexShrink: 0, transform: side === "right" ? "scaleX(-1)" : undefined, overflow: "visible" }}
    >
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 35 335 C 34 295 36 260 35 225 C 34 190 36 155 35 120 C 34 85 36 50 35 15" strokeWidth="1.8" />
        <path d="M 35 270 C 26 264 15 261 8 268 C 5 274 9 281 18 278 C 27 275 34 271 35 270" strokeWidth="1.3" fill={color} fillOpacity="0.1" />
        <line x1="35" y1="270" x2="9" y2="273" strokeWidth="0.7" />
        <path d="M 35 215 C 44 209 55 207 62 213 C 65 219 62 226 53 223 C 45 220 36 216 35 215" strokeWidth="1.3" fill={color} fillOpacity="0.1" />
        <line x1="35" y1="215" x2="61" y2="217" strokeWidth="0.7" />
        <path d="M 35 162 C 28 155 21 149 17 142" strokeWidth="1.3" />
        <path d="M 17 142 C 14 138 12 133 14 129 C 16 125 20 124 23 127 C 26 130 25 135 22 139 C 20 141 18 143 17 142" strokeWidth="1.2" fill={color} fillOpacity="0.14" />
        <path d="M 35 105 C 42 98 49 92 53 84" strokeWidth="1.3" />
        <path d="M 53 84 C 56 80 58 75 56 71 C 54 67 50 66 47 69 C 44 72 45 77 48 81 C 50 83 52 85 53 84" strokeWidth="1.2" fill={color} fillOpacity="0.14" />
        <path d="M 35 50 C 28 44 22 42 19 47 C 17 52 21 56 27 54 C 32 52 35 50 35 50" strokeWidth="1.1" fill={color} fillOpacity="0.1" />
        <path d="M 35 38 C 42 32 48 30 51 35 C 53 40 49 44 43 42 C 38 40 35 38 35 38" strokeWidth="1.1" fill={color} fillOpacity="0.1" />
        <circle cx="10" cy="274" r="2.5" strokeWidth="1" fill={color} fillOpacity="0.22" />
        <circle cx="58" cy="220" r="2.5" strokeWidth="1" fill={color} fillOpacity="0.22" />
      </g>
    </svg>
  );
}

export function CornerBotanical({ color, flip = false, size = 110 }: { color: string; flip?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 110 110" width={size} height={size} fill="none" style={{ overflow: "visible", transform: flip ? "scaleX(-1)" : undefined }}>
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 8 102 C 20 75 35 55 55 35 C 68 22 83 14 95 10" strokeWidth="1.6" />
        <path d="M 22 82 C 13 78 6 79 4 86 C 2 92 7 98 15 95 C 23 92 23 83 22 82" strokeWidth="1.2" fill={color} fillOpacity="0.1" />
        <line x1="22" y1="82" x2="5" y2="89" strokeWidth="0.7" />
        <path d="M 44 58 C 54 51 65 50 70 56 C 72 62 70 68 62 66 C 55 64 44 59 44 58" strokeWidth="1.2" fill={color} fillOpacity="0.1" />
        <line x1="44" y1="58" x2="68" y2="62" strokeWidth="0.7" />
        <path d="M 72 32 C 66 25 60 20 56 13" strokeWidth="1.2" />
        <path d="M 56 13 C 53 9 51 4 53 1 C 55 -3 59 -4 62 -1 C 65 3 64 8 61 12 C 59 14 57 14 56 13" strokeWidth="1.2" fill={color} fillOpacity="0.14" />
        <circle cx="7" cy="90" r="2.5" strokeWidth="1" fill={color} fillOpacity="0.22" />
        <circle cx="12" cy="96" r="2" strokeWidth="1" fill={color} fillOpacity="0.22" />
        <path d="M 33 70 C 25 65 18 65 16 71 C 14 76 18 81 25 79 C 31 77 33 71 33 70" strokeWidth="1.1" fill={color} fillOpacity="0.1" />
        <line x1="33" y1="70" x2="16" y2="74" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

export function WaxSeal({ fillColor, heartColor, size = 72 }: { fillColor: string; heartColor: string; size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
      <path
        d="M40 5 C49 4 58 7 64 13 C70 19 73 27 73 36 C73 45 70 53 64 59 C58 65 49 68 40 68 C31 68 22 65 16 59 C10 53 7 45 7 36 C7 27 10 19 16 13 C22 7 31 6 40 5Z"
        fill={fillColor}
        opacity="0.93"
      />
      <circle cx="40" cy="37" r="26" stroke={heartColor} strokeWidth="0.9" opacity="0.3" />
      <path
        d="M40 53 C30 46 19 37 19 27 C19 21 24 16 31 16 C35 16 38 18 40 21 C42 18 45 16 49 16 C56 16 61 21 61 27 C61 37 50 46 40 53Z"
        fill={heartColor}
        opacity="0.78"
      />
    </svg>
  );
}

/** Cardboard hearts hanging like a bunch of balloons, spelling out `letters`. */
export function HangingHearts({
  letters,
  heartColor,
  inkColor,
  stringColor,
}: {
  letters: string[];
  heartColor: string;
  inkColor: string;
  stringColor: string;
}) {
  const n = letters.length;
  // fan the hearts across the top, strings converging at a knot near the bottom
  const knot = { x: 70, y: 300 };
  const spread = 34;
  const positions = letters.map((_, i) => {
    const centerOffset = i - (n - 1) / 2;
    return { x: 70 + centerOffset * spread, y: 44 + Math.abs(centerOffset) * 14 };
  });
  return (
    <svg viewBox="0 0 140 320" width="112" height="256" fill="none" style={{ overflow: "visible" }}>
      {/* strings */}
      {positions.map((p, i) => (
        <path key={`s${i}`} d={`M ${p.x} ${p.y + 18} Q ${(p.x + knot.x) / 2} ${(p.y + knot.y) / 2 + 20} ${knot.x} ${knot.y}`} stroke={stringColor} strokeWidth="1" fill="none" opacity="0.7" />
      ))}
      <circle cx={knot.x} cy={knot.y} r="3" fill={stringColor} />
      {/* hearts */}
      {positions.map((p, i) => (
        <g key={`h${i}`} transform={`translate(${p.x - 18} ${p.y - 18}) rotate(${(i - (n - 1) / 2) * 6} 18 18)`}>
          <path
            d="M18 33 C6 24 1 16 1 10 C1 4 5 1 9 1 C13 1 16 3 18 6 C20 3 23 1 27 1 C31 1 35 4 35 10 C35 16 30 24 18 33Z"
            fill={heartColor}
            stroke={inkColor}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text x="18" y="17" textAnchor="middle" fontFamily="var(--f-display)" fontSize="12" fontWeight="600" fill={inkColor}>
            {letters[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** A red-thread cross-stitched heart on a kraft tag, like the reference. */
export function StitchedHeart({ kraft, thread, size = 96 }: { kraft: string; thread: string; size?: number }) {
  const heart = "M60 92 C34 72 16 56 16 38 C16 26 25 18 36 18 C46 18 54 24 60 32 C66 24 74 18 84 18 C95 18 104 26 104 38 C104 56 86 72 60 92Z";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      <rect x="4" y="4" width="112" height="112" rx="3" fill={kraft} />
      <rect x="4" y="4" width="112" height="112" rx="3" fill="#000" opacity="0.05" />
      {/* folded corner */}
      <path d="M92 4 L116 4 L116 28Z" fill="#000" opacity="0.12" />
      {/* stitched heart — two crossing dashed strokes */}
      <path d={heart} stroke={thread} strokeWidth="2.4" strokeDasharray="1 7" strokeLinecap="round" />
      <path d={heart} stroke={thread} strokeWidth="2.4" strokeDasharray="1 7" strokeDashoffset="4" strokeLinecap="round" transform="rotate(4 60 60)" opacity="0.85" />
      <path d={heart} stroke={thread} strokeWidth="1" fill={thread} fillOpacity="0.14" />
    </svg>
  );
}

export function TwineBow({ color = "#C49A6C", untying = false }: { color?: string; untying?: boolean }) {
  return (
    <svg
      viewBox="0 0 150 90"
      width="150"
      height="90"
      fill="none"
      style={{
        transition: "opacity 0.4s ease, transform 0.5s ease",
        opacity: untying ? 0 : 1,
        transform: untying ? "scale(0.75) translateY(-12px)" : "scale(1) translateY(0)",
      }}
    >
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d="M75 44 C60 34 38 27 23 34 C12 39 12 54 23 57 C37 60 60 51 75 44" strokeWidth="2.8" fill={color} fillOpacity="0.2" />
        <path d="M75 44 C90 34 112 27 127 34 C138 39 138 54 127 57 C113 60 90 51 75 44" strokeWidth="2.8" fill={color} fillOpacity="0.2" />
        <ellipse cx="75" cy="44" rx="7" ry="6" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
        <path d="M70 49 C62 61 52 71 48 82" strokeWidth="2.2" />
        <path d="M80 49 C90 61 100 72 104 83" strokeWidth="2.2" />
      </g>
    </svg>
  );
}
