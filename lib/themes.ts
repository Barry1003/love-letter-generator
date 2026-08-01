import { CardColors, ThemeId } from "./types";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: CardColors;
}

/** Colors mirror the Figma Make craft palette. */
export const THEMES: Record<ThemeId, ThemeConfig> = {
  rosewood: {
    id: "rosewood",
    name: "Rosewood",
    colors: {
      bg: "#F5EDE0", card: "#EFE3CC", text: "#3D1A1A", accent: "#7B1F2E",
      gold: "#C9A227", border: "#C4A878", muted: "#9A6040", kraft: "#C49A6C",
    },
  },
  midnight: {
    id: "midnight",
    name: "Midnight Gold",
    colors: {
      bg: "#1C1410", card: "#2A1F15", text: "#F0E6D8", accent: "#C9A227",
      gold: "#C9A227", border: "#4A3828", muted: "#C6A870", kraft: "#8A6840",
    },
  },
  blush: {
    id: "blush",
    name: "Blush Bloom",
    colors: {
      bg: "#FDF0F3", card: "#F8E4EB", text: "#3D1A24", accent: "#C45C7A",
      gold: "#D4889A", border: "#EBBCC8", muted: "#A06080", kraft: "#D4A0A8",
    },
  },
  lavender: {
    id: "lavender",
    name: "Lavender Dusk",
    colors: {
      bg: "#F2EDF8", card: "#E8DEEE", text: "#2D1A3D", accent: "#7B5EA7",
      gold: "#C4A8D8", border: "#C4A8D8", muted: "#8060A0", kraft: "#B098C8",
    },
  },
};

export const DEFAULT_THEME: ThemeId = "rosewood";

/** Warm cream backdrop used on the create/landing screens (theme-independent). */
export const PAPER_BG = "#F5E8C0";
