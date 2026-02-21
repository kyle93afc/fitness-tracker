import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.VERCEL
  ? path.join('/tmp', 'fitness.db')
  : path.join(process.cwd(), 'fitness.db');

const db = new Database(dbPath);
db.exec('CREATE TABLE IF NOT EXISTS weights (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATETIME DEFAULT CURRENT_TIMESTAMP, weight REAL)');
db.exec('CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATETIME DEFAULT CURRENT_TIMESTAMP, type TEXT, slot TEXT, macros TEXT, notes TEXT)');
db.exec('CREATE TABLE IF NOT EXISTS preps (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATETIME DEFAULT CURRENT_TIMESTAMP, meals BOOLEAN, bag BOOLEAN, notes TEXT)');
db.exec('CREATE TABLE IF NOT EXISTS family_events (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATETIME, desc TEXT)');

export { db };
