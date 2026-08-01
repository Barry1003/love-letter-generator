import path from "node:path";
import { defineConfig, env } from "prisma/config";

// Load .env and .env.local
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Use DIRECT_URL (non-pooler) for migrations/CLI, fallback to DATABASE_URL
  datasource: {
    url: process.env.DIRECT_URL || env("DATABASE_URL"),
  },
});
