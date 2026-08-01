import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monsieur: ["var(--f-monsieur)", "cursive"],
        dancing: ["var(--f-dancing)", "cursive"],
        greatvibes: ["var(--f-greatvibes)", "cursive"],
        caveat: ["var(--f-caveat)", "cursive"],
        cormorant: ["var(--f-cormorant)", "serif"],
        playfair: ["var(--f-playfair)", "serif"],
        ebgaramond: ["var(--f-ebgaramond)", "serif"],
        poppins: ["var(--f-poppins)", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
