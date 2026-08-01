import { prisma } from "./prisma";
import { LoveCard } from "./types";

/**
 * Database layer using Prisma + Neon PostgreSQL.
 * All card CRUD operations go through here.
 */

function cardToRow(card: LoveCard) {
  return {
    id: card.id,
    code: card.code.toUpperCase(),
    to: card.to,
    from: card.from || null,
    headline: card.headline,
    message: card.message,
    theme: card.theme,
    colors: card.colors as any,
    illustration: card.illustration,
    photo: card.photo || null,
    music: card.music,
    song: card.song || null,
    createdAt: BigInt(card.createdAt),
    openedAt: card.openedAt ? BigInt(card.openedAt) : null,
  };
}

function rowToCard(row: any): LoveCard {
  return {
    id: row.id,
    code: row.code,
    to: row.to,
    from: row.from ?? undefined,
    headline: row.headline,
    message: row.message,
    theme: row.theme,
    colors: row.colors,
    illustration: row.illustration,
    photo: row.photo ?? undefined,
    music: row.music,
    song: row.song ?? undefined,
    createdAt: Number(row.createdAt),
    openedAt: row.openedAt ? Number(row.openedAt) : undefined,
  };
}

export async function saveCard(card: LoveCard): Promise<void> {
  const data = cardToRow(card);
  await prisma.card.upsert({
    where: { id: card.id },
    create: data,
    update: data,
  });
}

export async function getCard(id: string): Promise<LoveCard | null> {
  const row = await prisma.card.findUnique({ where: { id } });
  if (!row) return null;
  return rowToCard(row);
}

export async function getCardByCode(code: string): Promise<LoveCard | null> {
  const row = await prisma.card.findUnique({
    where: { code: code.trim().toUpperCase() },
  });
  if (!row) return null;
  return rowToCard(row);
}

export async function markOpened(id: string): Promise<LoveCard | null> {
  const row = await prisma.card.findUnique({ where: { id } });
  if (!row) return null;

  if (!row.openedAt) {
    const updated = await prisma.card.update({
      where: { id },
      data: { openedAt: BigInt(Date.now()) },
    });
    return rowToCard(updated);
  }

  return rowToCard(row);
}
