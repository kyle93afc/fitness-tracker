import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { weight } = await request.json();
  const stmt = db.prepare('INSERT INTO weights (weight) VALUES (?)');
  const info = stmt.run(weight);
  return NextResponse.json({ id: info.lastInsertRowid, success: true });
}

export async function GET() {
  const stmt = db.prepare('SELECT * FROM weights ORDER BY date DESC');
  const rows = stmt.all();
  return NextResponse.json(rows);
}