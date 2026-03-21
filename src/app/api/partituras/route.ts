import { NextResponse } from 'next/server';
import { db } from '@/db';
import { partituras } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const records = await db.select().from(partituras).orderBy(desc(partituras.createdAt)).limit(limit);
    return NextResponse.json(records);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRecord = await db.insert(partituras).values(body).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
  }
}
