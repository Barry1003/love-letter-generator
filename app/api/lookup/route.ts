import { NextRequest, NextResponse } from "next/server";
import { getCardByCode } from "@/lib/db";

export const runtime = "nodejs";

// Look up a card id from a human backup code (e.g. ROSE-482).
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "";
  const card = await getCardByCode(code);
  if (!card) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ id: card.id });
}
