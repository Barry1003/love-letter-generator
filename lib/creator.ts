export const CREATOR = {
  name: "Usaamah Ishola",
  linkedin: "https://www.linkedin.com/in/usaamah-ishola-503703208/",
};

export const APP_NAME = "For You, Always";
export const APP_TAGLINE = "Make a love letter worth keeping.";

/** Suggested post/caption people can share to spread the app (credits the creator). */
export function shareCaption() {
  return (
    `I just made a beautiful digital love letter with “For You, Always” 💌 — ` +
    `a sealed card, keepsakes and a song, all in one link. ` +
    `Built by ${CREATOR.name}. Make yours 👇`
  );
}
