import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { songs, uploads } from '@/db/schema';
import { join, extname, basename } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import { existsSync } from 'fs';

const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    const validMimes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/m4a', 'audio/x-m4a'];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json({ error: 'Solo se permiten archivos de audio válidos' }, { status: 400 });
    }

    const audioDir = join(UPLOAD_DIR, 'audio');
    if (!existsSync(audioDir)) {
      await mkdir(audioDir, { recursive: true });
    }

    const ext = extname(file.name).toLowerCase();
    const uniqueName = randomBytes(16).toString('hex') + ext;
    const filePath = join(audioDir, uniqueName);
    const fileUrl = `/uploads/audio/${uniqueName}`;

    // Guarda el archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Registra en base de datos
    const rawName = basename(file.name, ext);
    const cleanTitle = rawName.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();

    if (!db) {
      return NextResponse.json({ error: 'Database disconnected', url: fileUrl }, { status: 503 });
    }

    // 1. Insertar en Uploads
    await db.insert(uploads).values({
      filename: uniqueName,
      originalName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      url: fileUrl,
      uploadType: 'audio',
      uploadedBy: userId || undefined
    });

    // 2. Insertar en Songs
    const newSong = await db.insert(songs).values({
      title: cleanTitle,
      audioUrl: fileUrl,
      createdBy: userId || undefined
    }).returning({ id: songs.id, title: songs.title, audioUrl: songs.audioUrl });

    return NextResponse.json({
      success: true,
      url: fileUrl,
      song: newSong[0],
      message: `"${cleanTitle}" añadida a la audioteca`
    }, { status: 201 });

  } catch (error: any) {
    console.error('Audio upload error:', error);
    return NextResponse.json({ error: 'Error interno guardando el audio' }, { status: 500 });
  }
}
