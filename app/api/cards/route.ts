import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveCard, getCardByCode } from "@/lib/db";
import { LoveCard, NewCardInput } from "@/lib/types";

export const runtime = "nodejs";

const CODE_WORDS = ["ROSE", "LOVE", "DEAR", "AMOUR", "SWEET", "HEART", "DUSK", "BLUSH", "MOON", "STAR"];
function makeCode() {
  const w = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
  const n = Math.floor(100 + Math.random() * 900);
  return `${w}-${n}`;
}

// very light validation / sanitation
function clean(input: any): NewCardInput {
  const str = (v: any, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
  return {
    to: str(input.to, 60),
    from: str(input.from, 60),
    headline: str(input.headline, 240),
    message: str(input.message, 6000),
    theme: input.theme,
    colors: {
      bg: str(input.colors?.bg, 32),
      card: str(input.colors?.card, 32),
      text: str(input.colors?.text, 32),
      accent: str(input.colors?.accent, 32),
      gold: str(input.colors?.gold, 32),
      border: str(input.colors?.border, 32),
      muted: str(input.colors?.muted, 32),
      kraft: str(input.colors?.kraft, 32),
    },
    illustration: input.illustration,
    tone: ["love", "friend", "family", "thanks"].includes(input.tone) ? input.tone : "love",
    photo: typeof input.photo === "string" ? input.photo.slice(0, 7_000_000) : undefined,
    music: Boolean(input.music),
    song: typeof input.song === "string" ? input.song.slice(0, 200) : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = clean(body);

    if (!data.message.trim() && !data.headline.trim()) {
      return NextResponse.json({ error: "Write a message or a headline first." }, { status: 400 });
    }

    // ensure unique backup code
    let code = makeCode();
    for (let i = 0; i < 6 && (await getCardByCode(code)); i++) code = makeCode();

    const card: LoveCard = {
      ...data,
      id: nanoid(10),
      code,
      createdAt: Date.now(),
    };

    await saveCard(card);
    return NextResponse.json({ id: card.id, code: card.code });
  } catch (err: any) {
    console.error("create card failed", err);
    return NextResponse.json(
      { error: err?.message || "Could not save card." },
      { status: 500 }
    );
  }
}