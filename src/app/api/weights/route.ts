import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { weight } = await request.json();
    const result = await db`INSERT INTO weights (weight) VALUES (${weight}) RETURNING id`;
    return NextResponse.json({ id: result.rows[0].id, success: true });
  } catch (error) {
    console.error('Error inserting weight:', error);
    return NextResponse.json({ error: 'Failed to insert weight' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db`SELECT * FROM weights ORDER BY date DESC`;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching weights:', error);
    return NextResponse.json({ error: 'Failed to fetch weights' }, { status: 500 });
  }
}
