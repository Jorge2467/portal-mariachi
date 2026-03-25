import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { songs } from '@/db/schema';
import { extname, basename } from 'path';
import { uploadToR2 } from '@/lib/r2';

const VALID_AUDIO_EXTS = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm']);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });

    const ext = extname(file.name).toLowerCase();
    if (!file.type.startsWith('audio/') && !VALID_AUDIO_EXTS.has(ext)) {
      return NextResponse.json({ error: 'Formato de audio no soportado' }, { status: 400 });
    }
    if (file.size > 60 * 1024 * 1024) return NextResponse.json({ error: 'Límite 60 MB superado' }, { status: 413 });
    if (!db) return NextResponse.json({ error: 'DB desconectada' }, { status: 503 });

    const mime = file.type.startsWith('audio/') ? file.type : `audio/${ext.slice(1)}`;
    const fileUrl = await uploadToR2(file, file.name, mime, 'audio');

    const rawName = basename(file.name, ext);
    const title = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

    const [song] = await db.insert(songs).values({ title, audioUrl: fileUrl, isFeatured: false }).returning();

    return NextResponse.json({
      success: true, url: fileUrl, song,
      message: `"${title}" guardada en Cloudflare R2 ✓`,
    }, { status: 201 });

  } catch (err: any) {
    console.error('[upload/audio]', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
