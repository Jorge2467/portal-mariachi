import { NextResponse } from 'next/server';
import { db } from '@/db';
import { anuncios } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const record = await db.select().from(anuncios).where(eq(anuncios.id, params.id)).limit(1);
    if (!record[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(record[0]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await db.update(anuncios).set(body).where(eq(anuncios.id, params.id)).returning();
    if (!updated[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await db.delete(anuncios).where(eq(anuncios.id, params.id)).returning();
    if (!deleted[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, deleted: deleted[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
