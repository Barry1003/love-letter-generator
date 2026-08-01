/** Gigi Perez — Sailor Song (Official Audio). Streamed via YouTube's licensed player. */
export const DEFAULT_SONG_ID = "m0NZ-aH0G1g";
export const DEFAULT_SONG_LABEL = "Gigi Perez — Sailor Song";

/** Accept a raw 11-char id or any common YouTube URL and return the video id. */
export function youTubeId(input?: string): string | null {
  if (!input) return null;
  const s = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
