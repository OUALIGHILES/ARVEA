/* Simple migration runner: applies all .sql files in migrations/ alphabetically */

import fs from "node:fs"
import path from "node:path"
import { query } from "../src/lib/pg"

async function ensureMigrationsTable() {
  await query(
    "create table if not exists _migrations (id serial primary key, filename text not null unique, applied_at timestamptz not null default now())"
  )
}

async function getApplied(): Promise<Set<string>> {
  try {
    const { rows } = await query<{ filename: string }>("select filename from _migrations")
    return new Set(rows.map((r) => r.filename))
  } catch {
    await ensureMigrationsTable()
    const { rows } = await query<{ filename: string }>("select filename from _migrations")
    return new Set(rows.map((r) => r.filename))
  }
}

async function applyMigration(filename: string, fullPath: string) {
  const sql = fs.readFileSync(fullPath, "utf8")
  await query(sql)
  await query("insert into _migrations (filename) values ($1)", [filename])
  // eslint-disable-next-line no-console
  console.log(`Applied migration: ${filename}`)
}

async function main() {
  const migrationsDir = path.resolve(process.cwd(), "migrations")
  if (!fs.existsSync(migrationsDir)) {
    // eslint-disable-next-line no-console
    console.log("No migrations directory found. Skipping.")
    return
  }

  await ensureMigrationsTable()
  const applied = await getApplied()

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort()

  for (const file of files) {
    if (applied.has(file)) continue
    const full = path.join(migrationsDir, file)
    await applyMigration(file, full)
  }

  // eslint-disable-next-line no-console
  console.log("Migrations complete.")
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})


