import { NextRequest, NextResponse } from "next/server";
import { getCard, markOpened } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const card = await getCard(id);
  if (!card) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(card);
}

// called by the reveal page when the envelope is opened
export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const card = await markOpened(id);
  if (!card) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ openedAt: card.openedAt });
}
