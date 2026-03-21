import { NextResponse } from 'next/server';
import { db } from '@/db';
import { favorites } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'crypto';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulated auth token
    const fakeUserId = crypto.randomUUID(); 

    // Check if favorite exists
    const existing = await db.select()
      .from(favorites)
      .where(and(eq(favorites.userId, fakeUserId), eq(favorites.songId, params.id)))
      .limit(1);

    if (existing.length > 0) {
      // Toggle OFF: Remove favorite
      await db.delete(favorites)
        .where(and(eq(favorites.userId, fakeUserId), eq(favorites.songId, params.id)));
      return NextResponse.json({ success: true, favorited: false, message: 'Removed from favorites' });
    } else {
      // Toggle ON: Add favorite
      await db.insert(favorites).values({
        userId: fakeUserId,
        songId: params.id,
      });
      return NextResponse.json({ success: true, favorited: true, message: 'Added to favorites' }, { status: 201 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 });
  }
}
