import { NextResponse } from 'next/server';
import { db } from '@/db';
import { mariachiDirectory, anuncios } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request) {
  try {
    const { id, type, action } = await request.json();
    
    // In a real app we would check User Admin Role here via cookies
    
    if (type === 'anuncio') {
      const status = action === 'approve' ? 'active' : 'rejected';
      const updated = await db.update(anuncios)
        .set({ status })
        .where(eq(anuncios.id, id))
        .returning();
      return NextResponse.json({ success: true, record: updated[0] });
    }
    
    if (type === 'directory') {
      const status = action === 'approve' ? 'approved' : 'rejected';
      const updated = await db.update(mariachiDirectory)
        .set({ status })
        .where(eq(mariachiDirectory.id, id))
        .returning();
      return NextResponse.json({ success: true, record: updated[0] });
    }

    return NextResponse.json({ error: 'Invalid type provided' }, { status: 400 });

  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Failed to perform administrative action' }, { status: 500 });
  }
}
