import { NextResponse } from 'next/server';
import { db } from '@/db';
import { songVotes, songs } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import * as crypto from 'crypto';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const score = parseInt(body.score, 10);
    if (!score || score < 1 || score > 10) {
      return NextResponse.json({ error: 'Valid score (1-10) is required' }, { status: 400 });
    }

    // In a real app we'd get userId from session parsing context
    // For now we simulate an authenticated action
    const fakeUserId = crypto.randomUUID(); 

    // Insert vote
    await db.insert(songVotes).values({
      songId: params.id,
      userId: fakeUserId,
      score: score
    });

    // Update song average (very basic simulation, typically done via trigger or background job)
    await db.update(songs)
      .set({ voteCount: sql`COALESCE(vote_count, 0) + 1` })
      .where(eq(songs.id, params.id));

    return NextResponse.json({ success: true, message: 'Vote registered' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
