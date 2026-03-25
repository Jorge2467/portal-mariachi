import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { gallery } from '@/db/schema';
import { extname, basename } from 'path';

const ALLOWED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawFiles = formData.getAll('files');
    const singleFile = formData.get('file') as File | null;
    const files = (rawFiles.length ? rawFiles : singleFile ? [singleFile] : []) as File[];
    const category = (formData.get('category') as string) || 'Eventos';

    if (!files.length) {
      return NextResponse.json({ error: 'No se recibieron imágenes' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Base de datos desconectada' }, { status: 503 });
    }

    const results = [];
    const errors = [];

    for (const file of files) {
      const ext = extname(file.name).toLowerCase();

      if (!file.type.startsWith('image/') && !ALLOWED_IMAGE_EXTS.has(ext)) {
        errors.push({ file: file.name, error: 'Solo se aceptan imágenes (JPG/PNG/WEBP/GIF)' });
        continue;
      }

      if (file.size > 12 * 1024 * 1024) {
        errors.push({ file: file.name, error: 'Supera el límite de 12 MB por imagen' });
        continue;
      }

      try {
        // Guarda como base64 data URL en PostgreSQL — permanente
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');
        const mime = file.type.startsWith('image/') ? file.type : `image/${ext.slice(1)}`;
        const dataUrl = `data:${mime};base64,${base64}`;

        const rawName = basename(file.name, ext);
        const cleanTitle = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

        const [imageRecord] = await db.insert(gallery).values({
          title: cleanTitle,
          imageUrl: dataUrl,
          category,
          originalFilename: file.name,
          fileSizeBytes: file.size,
        }).returning();

        results.push(imageRecord);
      } catch (err: any) {
        errors.push({ file: file.name, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length,
      errors: errors.length,
      images: results,
      errorList: errors,
      message: `${results.length} imagen${results.length !== 1 ? 'es' : ''} guardada${results.length !== 1 ? 's' : ''} en la base de datos ✓`,
    }, { status: 201 });

  } catch (error: any) {
    console.error('[upload/gallery]', error);
    return NextResponse.json({ error: 'Error interno al procesar las imágenes' }, { status: 500 });
  }
}
