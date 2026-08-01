import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For You, Always · a special message worth keeping",
  description: "Write a beautiful, private message and send it as a link that opens anywhere.",
};

const FONT_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Dancing+Script:wght@400;600;700",
    "family=Playfair+Display:ital,wght@0,400;0,600;1,400",
    "family=Lora:ital,wght@0,400;0,500;1,400",
    "family=Monsieur+La+Doulaise",
  ].join("&") +
  "&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={FONT_HREF} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
