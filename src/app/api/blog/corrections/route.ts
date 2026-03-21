import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogCorrections } from '@/db/schema';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { notifyAdmin } from '@/lib/telegram';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub as string;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body.postId || !body.suggestedContent) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const newCorrection = await db.insert(blogCorrections).values({
      postId: body.postId,
      userId: userId,
      proposedContent: body.suggestedContent,
      adminStatus: 'pending',
      aiVerifiedStatus: 'pending',
    }).returning();

    // Notificar al Fundador
    await notifyAdmin(`Nueva propuesta de enmienda (Corrección Wiki/Blog) recibida.\n\nAprobación pendiente en el Centro de Comando (/dashboard/admin).`);

    return NextResponse.json(newCorrection[0], { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error al sugerir corrección' }, { status: 500 });
  }
}
