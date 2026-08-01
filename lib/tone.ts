import { MessageTone } from "./types";

export interface TonePreset {
  id: MessageTone;
  label: string; // shown in the builder selector
  hint: string; // small helper text
  greeting: string; // "My dearest", "Hey", "Dear"…
  signoff: string; // default sign-off when the sender leaves it blank
  noun: string; // "love letter", "message", "thank-you note"
  emoji: string; // used in tab title / share text
  opener: string; // "you've got a love letter"
  shareLine: string; // heading above the share row on the reveal
}

export const TONES: Record<MessageTone, TonePreset> = {
  love: {
    id: "love",
    label: "Romantic",
    hint: "For someone you love",
    greeting: "My dearest",
    signoff: "with all my love ♥",
    noun: "love letter",
    emoji: "💌",
    opener: "you've got a love letter",
    shareLine: "Loved this? Send the love onward",
  },
  friend: {
    id: "friend",
    label: "Close friend",
    hint: "For a dear friend",
    greeting: "Hey",
    signoff: "always, your friend ✨",
    noun: "message",
    emoji: "✨",
    opener: "you've got a special message",
    shareLine: "Loved this? Send one to someone you care about",
  },
  family: {
    id: "family",
    label: "Family",
    hint: "For family",
    greeting: "Dear",
    signoff: "with love, always ♥",
    noun: "message",
    emoji: "💛",
    opener: "you've got a heartfelt message",
    shareLine: "Loved this? Send one to someone you love",
  },
  thanks: {
    id: "thanks",
    label: "Thank you",
    hint: "To say thank you",
    greeting: "Dear",
    signoff: "with heartfelt thanks 🌼",
    noun: "thank-you note",
    emoji: "🌼",
    opener: "you've got a thank-you note",
    shareLine: "Loved this? Send a thank-you of your own",
  },
};

export const DEFAULT_TONE: MessageTone = "love";

export function tonePreset(tone?: string | null): TonePreset {
  return TONES[(tone as MessageTone) ?? DEFAULT_TONE] ?? TONES[DEFAULT_TONE];
}
