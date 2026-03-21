import { NextResponse } from 'next/server';
import { db } from '@/db';
import { songs, mariachis, users, anuncios } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Parallel counting strategy for max performance
    const [songsCountResult, mariachisCountResult, usersCountResult, anunciosCountResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(songs),
      db.select({ count: sql<number>`count(*)` }).from(mariachis),
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(anuncios)
    ]);

    const stats = {
      totalSongs: Number(songsCountResult[0].count),
      totalMariachis: Number(mariachisCountResult[0].count),
      totalUsers: Number(usersCountResult[0].count),
      activeAnuncios: Number(anunciosCountResult[0].count)
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to aggregate statistics' }, { status: 500 });
  }
}
