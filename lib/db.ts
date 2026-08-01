import { promises as fs } from "fs";
import path from "path";
import { LoveCard } from "./types";

/**
 * Tiny file-based store: one JSON file per card under /data/cards.
 * Zero native dependencies, works anywhere Node runs. For higher volume,
 * swap this module for SQLite/Postgres — the API surface is just these 4 fns.
 */

const DATA_DIR = path.join(process.cwd(), "data", "cards");
const CODE_INDEX = path.join(process.cwd(), "data", "codes.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function cardPath(id: string) {
  // ids are nanoid (url-safe); guard against traversal anyway
  const safe = id.replace(/[^A-Za-z0-9_-]/g, "");
  return path.join(DATA_DIR, `${safe}.json`);
}

export async function saveCard(card: LoveCard): Promise<void> {
  await ensureDir();
  await fs.writeFile(cardPath(card.id), JSON.stringify(card), "utf8");

  // maintain a code -> id index for the "look up by code" feature
  const index = await readCodeIndex();
  index[card.code.toUpperCase()] = card.id;
  await fs.writeFile(CODE_INDEX, JSON.stringify(index), "utf8");
}

export async function getCard(id: string): Promise<LoveCard | null> {
  try {
    const raw = await fs.readFile(cardPath(id), "utf8");
    return JSON.parse(raw) as LoveCard;
  } catch {
    return null;
  }
}

async function readCodeIndex(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(CODE_INDEX, "utf8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function getCardByCode(code: string): Promise<LoveCard | null> {
  const index = await readCodeIndex();
  const id = index[code.trim().toUpperCase()];
  if (!id) return null;
  return getCard(id);
}

export async function markOpened(id: string): Promise<LoveCard | null> {
  const card = await getCard(id);
  if (!card) return null;
  if (!card.openedAt) {
    card.openedAt = Date.now();
    await fs.writeFile(cardPath(id), JSON.stringify(card), "utf8");
  }
  return card;
}
