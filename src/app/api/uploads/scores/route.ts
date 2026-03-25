import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { partituras } from '@/db/schema';
import { extname, basename } from 'path';
import { uploadToR2 } from '@/lib/r2';

const SCORE_TYPES: Record<string, string> = {
  '.pdf': 'pdf', '.sib': 'sibelius', '.mus': 'finale',
  '.xml': 'musicxml', '.mxl': 'musicxml',
  '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.webp': 'image',
};
const MIME_MAP: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.sib': 'application/octet-stream', '.mus': 'application/octet-stream',
  '.xml': 'application/xml', '.mxl': 'application/vnd.recordare.musicxml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawFiles = formData.getAll('files');
    const single = formData.get('file') as File | null;
    const files = (rawFiles.length ? rawFiles : single ? [single] : []) as File[];

    if (!files.length) return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
    if (!db) return NextResponse.json({ error: 'DB desconectada' }, { status: 503 });

    const results = [];
    const errors = [];

    for (const file of files) {
      const ext = extname(file.name).toLowerCase();
      const fileType = SCORE_TYPES[ext];
      if (!fileType) { errors.push({ file: file.name, error: `Formato no soportado: ${ext}` }); continue; }
      if (file.size > 50 * 1024 * 1024) { errors.push({ file: file.name, error: 'Supera el límite de 50 MB' }); continue; }

      try {
        const mime = MIME_MAP[ext] || 'application/octet-stream';
        const fileUrl = await uploadToR2(file, file.name, mime, 'scores');

        const title = basename(file.name, ext).replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();
        const [p] = await db.insert(partituras).values({
          title, fileUrl, fileType,
          originalFilename: file.name,
          fileSizeBytes: file.size,
        }).returning();

        results.push(p);
      } catch (err: any) {
        errors.push({ file: file.name, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length, errors: errors.length,
      partituras: results, errorList: errors,
      message: `${results.length} partitura${results.length !== 1 ? 's' : ''} subida${results.length !== 1 ? 's' : ''} a Cloudflare R2 ✓`,
    }, { status: 201 });

  } catch (err: any) {
    console.error('[upload/scores]', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
