import { IllustrationId } from "@/lib/types";

/** Decorative fallback art shown when no photo is attached. Inherits `color`. */
export function Illustration({ id, color }: { id: IllustrationId; color: string }) {
  const common = { width: "100%", height: "100%", viewBox: "0 0 120 120", fill: "none" } as const;
  switch (id) {
    case "floral":
      return (
        <svg {...common} style={{ color }}>
          <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M60 96V54" />
            <path d="M60 70c-10-2-18-10-18-20 10 0 18 8 18 20Z" fill="currentColor" opacity=".18" />
            <path d="M60 62c10-2 18-10 18-20-10 0-18 8-18 20Z" fill="currentColor" opacity=".18" />
          </g>
          <g fill="currentColor">
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx="60" cy="34" rx="7" ry="15" opacity=".85" transform={`rotate(${i * 72} 60 40)`} />
            ))}
            <circle cx="60" cy="40" r="6" opacity="1" />
          </g>
        </svg>
      );
    case "seal":
      return (
        <svg {...common} style={{ color }}>
          <circle cx="60" cy="60" r="40" fill="currentColor" opacity=".14" />
          <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
          <path
            d="M60 78s-20-11-20-25a11 11 0 0 1 20-6 11 11 0 0 1 20 6c0 14-20 25-20 25Z"
            fill="currentColor"
          />
        </svg>
      );
    case "cherub":
      return (
        <svg {...common} style={{ color }}>
          <g fill="currentColor">
            <circle cx="60" cy="44" r="14" opacity=".9" />
            <path d="M40 92c0-14 9-24 20-24s20 10 20 24Z" opacity=".85" />
            <path d="M40 60c-10-4-18-2-22 4 8 6 16 6 22 0Z" opacity=".5" />
            <path d="M80 60c10-4 18-2 22 4-8 6-16 6-22 0Z" opacity=".5" />
            <circle cx="60" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".8" />
          </g>
        </svg>
      );
    case "heart":
    default:
      return (
        <svg {...common} style={{ color }}>
          <path
            d="M60 96S22 74 22 46a20 20 0 0 1 38-9 20 20 0 0 1 38 9c0 28-38 50-38 50Z"
            fill="currentColor"
          />
          <path
            d="M60 96S22 74 22 46a20 20 0 0 1 38-9 20 20 0 0 1 38 9c0 28-38 50-38 50Z"
            fill="white"
            opacity=".12"
          />
        </svg>
      );
  }
}
