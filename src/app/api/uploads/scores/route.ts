import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { partituras } from '@/db/schema';
import { extname, basename } from 'path';

const SCORE_EXTENSIONS: Record<string, string> = {
  '.pdf':  'pdf',
  '.sib':  'sibelius',
  '.mus':  'finale',
  '.xml':  'musicxml',
  '.mxl':  'musicxml',
  '.png':  'image',
  '.jpg':  'image',
  '.jpeg': 'image',
  '.webp': 'image',
};

const MIME_FOR_EXT: Record<string, string> = {
  '.pdf':  'application/pdf',
  '.sib':  'application/octet-stream',
  '.mus':  'application/octet-stream',
  '.xml':  'application/xml',
  '.mxl':  'application/vnd.recordare.musicxml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Accepts both single 'file' and multiple 'files'
    const rawFiles = formData.getAll('files');
    const singleFile = formData.get('file') as File | null;
    const files = (rawFiles.length ? rawFiles : singleFile ? [singleFile] : []) as File[];

    if (!files.length) {
      return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Base de datos desconectada' }, { status: 503 });
    }

    const results = [];
    const errors = [];

    for (const file of files) {
      const ext = extname(file.name).toLowerCase();
      const fileType = SCORE_EXTENSIONS[ext];

      if (!fileType) {
        errors.push({ file: file.name, error: `Formato no soportado: ${ext}` });
        continue;
      }

      if (file.size > 30 * 1024 * 1024) {
        errors.push({ file: file.name, error: 'Supera el límite de 30 MB' });
        continue;
      }

      try {
        // Guarda como base64 data URL en PostgreSQL — permanente sin filesystem
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');
        const mime = MIME_FOR_EXT[ext] || 'application/octet-stream';
        const dataUrl = `data:${mime};base64,${base64}`;

        const rawName = basename(file.name, ext);
        const cleanTitle = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

        const [partitura] = await db.insert(partituras).values({
          title: cleanTitle,
          fileUrl: dataUrl,
          fileType,
          originalFilename: file.name,
          fileSizeBytes: file.size,
        }).returning();

        results.push(partitura);
      } catch (err: any) {
        errors.push({ file: file.name, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length,
      errors: errors.length,
      partituras: results,
      errorList: errors,
      message: `${results.length} partitura${results.length !== 1 ? 's' : ''} guardada${results.length !== 1 ? 's' : ''} en la base de datos ✓`,
    }, { status: 201 });

  } catch (error: any) {
    console.error('[upload/scores]', error);
    return NextResponse.json({ error: 'Error interno al procesar las partituras' }, { status: 500 });
  }
}
