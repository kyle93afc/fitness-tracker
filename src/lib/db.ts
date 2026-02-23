import { sql } from '@vercel/postgres';

export async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS weights (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      weight REAL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS workouts (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      type TEXT,
      slot TEXT,
      macros TEXT,
      notes TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS preps (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      meals BOOLEAN,
      bag BOOLEAN,
      notes TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS family_events (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP,
      desc TEXT
    )
  `;
}

// Initialize tables on import
createTables().catch(console.error);

export { sql as db };
