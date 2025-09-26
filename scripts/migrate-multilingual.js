// Migration script for multilingual support

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  const client = await pool.connect()
  
  try {
    console.log('Starting multilingual migration...')
    
    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'migrations', '0004_multilingual_descriptions.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    
    // Execute migration
    await client.query(migrationSQL)
    
    console.log('✅ Multilingual migration completed successfully!')
    
    // Verify the migration
    const result = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      AND (column_name LIKE '%_ar' OR column_name LIKE '%_fr' OR column_name LIKE '%_en')
      ORDER BY column_name
    `)
    
    console.log('📋 New multilingual columns added:')
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}`)
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

runMigration()
