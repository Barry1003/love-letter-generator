import { promises as fs } from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { LoveCard } from "./types";

/**
 * Neon PostgreSQL database adapter with local file fallback.
 * Uses process.env.DATABASE_URL when available.
 */

const DATA_DIR = path.join(process.cwd(), "data", "cards");
const CODE_INDEX = path.join(process.cwd(), "data", "codes.json");

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

let isInitialized = false;

async function initDb() {
  if (isInitialized) return;
  const sql = getSql();
  if (!sql) return;

  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS cards (
        id VARCHAR(64) PRIMARY KEY,
        code VARCHAR(64) UNIQUE NOT NULL,
        "to" VARCHAR(255) NOT NULL,
        "from" VARCHAR(255),
        headline VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        theme VARCHAR(64) NOT NULL,
        colors JSONB NOT NULL,
        illustration VARCHAR(64) NOT NULL,
        photo TEXT,
        music BOOLEAN NOT NULL DEFAULT FALSE,
        song VARCHAR(500),
        created_at BIGINT NOT NULL,
        opened_at BIGINT
      );
    `);
    await sql(`CREATE INDEX IF NOT EXISTS idx_cards_code ON cards (code);`);
    isInitialized = true;
  } catch (err) {
    console.error("Failed to initialize Neon database tables:", err);
  }
}

function mapRowToCard(row: any): LoveCard {
  return {
    id: row.id,
    code: row.code,
    to: row.to,
    from: row.from || undefined,
    headline: row.headline,
    message: row.message,
    theme: row.theme,
    colors: typeof row.colors === "string" ? JSON.parse(row.colors) : row.colors,
    illustration: row.illustration,
    photo: row.photo || undefined,
    music: Boolean(row.music),
    song: row.song || undefined,
    createdAt: Number(row.created_at),
    openedAt: row.opened_at ? Number(row.opened_at) : undefined,
  };
}

// ----------------------------------------------------
// File-based fallback implementation
// ----------------------------------------------------
async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function cardPath(id: string) {
  const safe = id.replace(/[^A-Za-z0-9_-]/g, "");
  return path.join(DATA_DIR, `${safe}.json`);
}

async function saveCardFile(card: LoveCard): Promise<void> {
  await ensureDir();
  await fs.writeFile(cardPath(card.id), JSON.stringify(card), "utf8");

  const index = await readCodeIndexFile();
  index[card.code.toUpperCase()] = card.id;
  await fs.writeFile(CODE_INDEX, JSON.stringify(index), "utf8");
}

async function getCardFile(id: string): Promise<LoveCard | null> {
  try {
    const raw = await fs.readFile(cardPath(id), "utf8");
    return JSON.parse(raw) as LoveCard;
  } catch {
    return null;
  }
}

async function readCodeIndexFile(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(CODE_INDEX, "utf8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

async function getCardByCodeFile(code: string): Promise<LoveCard | null> {
  const index = await readCodeIndexFile();
  const id = index[code.trim().toUpperCase()];
  if (!id) return null;
  return getCardFile(id);
}

// ----------------------------------------------------
// Exported API
// ----------------------------------------------------

export async function saveCard(card: LoveCard): Promise<void> {
  const sql = getSql();
  if (sql) {
    await initDb();
    await sql(
      `INSERT INTO cards (
        id, code, "to", "from", headline, message, theme, colors, illustration, photo, music, song, created_at, opened_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (id) DO UPDATE SET
        code = EXCLUDED.code,
        "to" = EXCLUDED."to",
        "from" = EXCLUDED."from",
        headline = EXCLUDED.headline,
        message = EXCLUDED.message,
        theme = EXCLUDED.theme,
        colors = EXCLUDED.colors,
        illustration = EXCLUDED.illustration,
        photo = EXCLUDED.photo,
        music = EXCLUDED.music,
        song = EXCLUDED.song,
        created_at = EXCLUDED.created_at,
        opened_at = EXCLUDED.opened_at`,
      [
        card.id,
        card.code.toUpperCase(),
        card.to,
        card.from || null,
        card.headline,
        card.message,
        card.theme,
        JSON.stringify(card.colors),
        card.illustration,
        card.photo || null,
        card.music,
        card.song || null,
        card.createdAt,
        card.openedAt || null,
      ]
    );
    return;
  }

  return saveCardFile(card);
}

export async function getCard(id: string): Promise<LoveCard | null> {
  const sql = getSql();
  if (sql) {
    await initDb();
    const rows = await sql(`SELECT * FROM cards WHERE id = $1 LIMIT 1`, [id]);
    if (!rows || rows.length === 0) return null;
    return mapRowToCard(rows[0]);
  }

  return getCardFile(id);
}

export async function getCardByCode(code: string): Promise<LoveCard | null> {
  const sql = getSql();
  if (sql) {
    await initDb();
    const cleanCode = code.trim().toUpperCase();
    const rows = await sql(`SELECT * FROM cards WHERE UPPER(code) = $1 LIMIT 1`, [cleanCode]);
    if (!rows || rows.length === 0) return null;
    return mapRowToCard(rows[0]);
  }

  return getCardByCodeFile(code);
}

export async function markOpened(id: string): Promise<LoveCard | null> {
  const sql = getSql();
  if (sql) {
    await initDb();
    const card = await getCard(id);
    if (!card) return null;
    if (!card.openedAt) {
      const now = Date.now();
      card.openedAt = now;
      await sql(`UPDATE cards SET opened_at = $1 WHERE id = $2`, [now, id]);
    }
    return card;
  }

  const card = await getCardFile(id);
  if (!card) return null;
  if (!card.openedAt) {
    card.openedAt = Date.now();
    await fs.writeFile(cardPath(id), JSON.stringify(card), "utf8");
  }
  return card;
}
