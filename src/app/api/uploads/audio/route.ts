import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { songs } from '@/db/schema';
import { extname, basename } from 'path';

const VALID_AUDIO_MIME = new Set([
  'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg',
  'audio/aac', 'audio/m4a', 'audio/x-m4a', 'audio/flac',
  'audio/webm', 'audio/mp4',
]);

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    // Accept by mime OR extension (browsers sometimes report wrong mime for audio)
    const ext = extname(file.name).toLowerCase();
    const validExts = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm']);
    if (!VALID_AUDIO_MIME.has(file.type) && !validExts.has(ext)) {
      return NextResponse.json({ error: 'Formato de audio no soportado' }, { status: 400 });
    }

    if (file.size > 60 * 1024 * 1024) {
      return NextResponse.json({ error: 'El archivo supera el límite de 60 MB' }, { status: 413 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Base de datos desconectada' }, { status: 503 });
    }

    // Convert to base64 data URL → stored in PostgreSQL (permanent, no filesystem needed)
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = VALID_AUDIO_MIME.has(file.type) ? file.type : `audio/${ext.slice(1)}`;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const rawName = basename(file.name, ext);
    const cleanTitle = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

    const [newSong] = await db.insert(songs).values({
      title: cleanTitle,
      audioUrl: dataUrl,
      isFeatured: false,
    }).returning({ id: songs.id, title: songs.title, audioUrl: songs.audioUrl });

    return NextResponse.json({
      success: true,
      url: dataUrl,
      song: newSong,
      message: `"${cleanTitle}" guardada en la base de datos ✓`,
    }, { status: 201 });

  } catch (error: any) {
    console.error('[upload/audio]', error);
    return NextResponse.json({ error: 'Error interno al procesar el audio' }, { status: 500 });
  }
}
