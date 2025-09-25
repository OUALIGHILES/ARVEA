// Postgres client using pg Pool

import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  // eslint-disable-next-line no-console
  console.warn("DATABASE_URL is not set. Database operations will fail.")
}

export const pgPool = new Pool({
  connectionString: databaseUrl,
  // Supabase pooler requires SSL
  ssl: { rejectUnauthorized: false },
})

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pgPool.connect()
  try {
    const result = await client.query(text, params)
    return { rows: result.rows as T[] }
  } finally {
    client.release()
  }
}


