export type ThemeId = "rosewood" | "midnight" | "blush" | "lavender" | "moonlit";

export type IllustrationId = "heart" | "floral" | "seal" | "cherub";

/** Who the message is for — drives the greeting, sign-off and wording. */
export type MessageTone = "love" | "friend" | "family" | "thanks";

/** Craft palette, matching the Figma Make design language. */
export interface CardColors {
  bg: string; // page background
  card: string; // paper / card surface
  text: string; // body ink
  accent: string; // maroon / plum / rose — headings, bars, seal
  gold: string; // gold foil accents & photo frame
  border: string; // hairline borders
  muted: string; // secondary ink (greetings, captions)
  kraft: string; // kraft-paper band
}

export interface LoveCard {
  id: string;
  code: string; // human backup code, e.g. ROSE-482
  to: string;
  from?: string; // optional sign-off; falls back to "with all my love ♥"
  headline: string;
  message: string;
  theme: ThemeId;
  colors: CardColors; // resolved (theme defaults, possibly fine-tuned)
  illustration: IllustrationId; // fallback art when no photo
  tone?: MessageTone; // who it's for (default: "love")
  photo?: string; // base64 data URL, optional
  music: boolean;
  song?: string; // background song — a YouTube link or id (default: Sailor Song)
  createdAt: number;
  openedAt?: number;
}

/** What the builder POSTs — server assigns id/code/createdAt. */
export type NewCardInput = Omit<LoveCard, "id" | "code" | "createdAt" | "openedAt">;
