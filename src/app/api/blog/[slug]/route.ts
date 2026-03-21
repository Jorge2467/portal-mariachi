import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const record = await db.select().from(blogPosts).where(eq(blogPosts.slug, params.slug)).limit(1);
    if (!record[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(record[0]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json();
    const updated = await db.update(blogPosts).set(body).where(eq(blogPosts.slug, params.slug)).returning();
    if (!updated[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const deleted = await db.delete(blogPosts).where(eq(blogPosts.slug, params.slug)).returning();
    if (!deleted[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, deleted: deleted[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
