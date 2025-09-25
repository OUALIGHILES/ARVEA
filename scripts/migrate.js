// Simple migration runner for Node (CommonJS)
const fs = require('node:fs')
const path = require('node:path')
// Prefer .env.local if present, else fallback to .env
const envLocalPath = path.resolve(process.cwd(), '.env.local')
const envPath = fs.existsSync(envLocalPath) ? envLocalPath : path.resolve(process.cwd(), '.env')
require('dotenv').config({ path: envPath })
const { Pool } = require('pg')

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Aborting migrations.')
  process.exit(1)
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
})

async function query(text, params) {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

async function ensureMigrationsTable() {
  await query(
    'create table if not exists _migrations (id serial primary key, filename text not null unique, applied_at timestamptz not null default now())'
  )
}

async function getApplied() {
  await ensureMigrationsTable()
  const res = await query('select filename from _migrations')
  return new Set(res.rows.map((r) => r.filename))
}

async function applyMigration(filename, fullPath) {
  const sql = fs.readFileSync(fullPath, 'utf8')
  await query(sql)
  await query('insert into _migrations (filename) values ($1)', [filename])
  console.log(`Applied migration: ${filename}`)
}

async function main() {
  const migrationsDir = path.resolve(process.cwd(), 'migrations')
  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found. Skipping.')
    process.exit(0)
  }

  const applied = await getApplied()
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    if (applied.has(file)) continue
    await applyMigration(file, path.join(migrationsDir, file))
  }

  console.log('Migrations complete.')
  await pool.end()
}

main().catch(async (err) => {
  console.error(err)
  try { await pool.end() } catch {}
  process.exit(1)
})


