import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { gallery } from '@/db/schema';
import { extname, basename } from 'path';
import { uploadToR2 } from '@/lib/r2';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawFiles = formData.getAll('files');
    const single = formData.get('file') as File | null;
    const files = (rawFiles.length ? rawFiles : single ? [single] : []) as File[];
    const category = (formData.get('category') as string) || 'Eventos';

    if (!files.length) return NextResponse.json({ error: 'No se recibieron imágenes' }, { status: 400 });
    if (!db) return NextResponse.json({ error: 'DB desconectada' }, { status: 503 });

    const results = [];
    const errors = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        errors.push({ file: file.name, error: 'Solo se aceptan imágenes' });
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        errors.push({ file: file.name, error: 'Supera el límite de 15 MB' });
        continue;
      }
      try {
        const ext = extname(file.name).toLowerCase();
        const imageUrl = await uploadToR2(file, file.name, file.type, 'gallery');
        const title = basename(file.name, ext).replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

        const [img] = await db.insert(gallery).values({
          title, imageUrl, category,
          originalFilename: file.name,
          fileSizeBytes: file.size,
        }).returning();

        results.push(img);
      } catch (err: any) {
        errors.push({ file: file.name, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length, errors: errors.length,
      images: results, errorList: errors,
      message: `${results.length} imagen${results.length !== 1 ? 'es' : ''} subida${results.length !== 1 ? 's' : ''} a Cloudflare R2 ✓`,
    }, { status: 201 });

  } catch (err: any) {
    console.error('[upload/gallery]', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
