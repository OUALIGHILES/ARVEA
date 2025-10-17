// src/lib/pg.ts
// Postgres client using pg Pool with automatic SSL handling for Supabase / pooler
import { Pool } from "pg";

const rawDatabaseUrl = process.env.DATABASE_URL;
const databaseUrl = rawDatabaseUrl?.trim();

if (!databaseUrl) {
  // eslint-disable-next-line no-console
  console.warn("DATABASE_URL is not set. Database operations will fail.");
}

// Detect if this is a Supabase / pooler URL (remote) — enable ssl only in that case
const isSupabase = typeof databaseUrl === "string" && /supabase|pooler/i.test(databaseUrl);

export const pgPool = new Pool({
  connectionString: databaseUrl,
  ssl: isSupabase ? { rejectUnauthorized: false } : false,
});

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pgPool.connect();
  try {
    const result = await client.query(text, params);
    return { rows: result.rows as T[] };
  } finally {
    client.release();
  }
}
