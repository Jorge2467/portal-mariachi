import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { gallery } from '@/db/schema';
import { join, extname, basename } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import { existsSync } from 'fs';

const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string || 'General';
    const userId = formData.get('userId') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se recibieron imágenes' }, { status: 400 });
    }

    const imagesDir = join(UPLOAD_DIR, 'images');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    const results = [];
    const errors = [];

    if (!db) {
      return NextResponse.json({ error: 'Database disconnected' }, { status: 503 });
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    for (const file of files) {
      if (!allowedMimes.includes(file.type)) {
        errors.push({ file: file.name, error: 'Formato no soportado (solo JPG/PNG/WEBP/GIF)' });
        continue;
      }

      const ext = extname(file.name).toLowerCase();
      const uniqueName = randomBytes(16).toString('hex') + ext;
      const filePath = join(imagesDir, uniqueName);
      const imageUrl = `/uploads/images/${uniqueName}`;

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        const rawName = basename(file.name, ext);
        const cleanTitle = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

        const [imageRecord] = await db.insert(gallery).values({
          title: cleanTitle,
          category: category,
          imageUrl: imageUrl,
          originalFilename: file.name,
          fileSizeBytes: file.size,
          uploadedBy: userId || undefined
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
      errorList: errors
    }, { status: 201 });

  } catch (error: any) {
    console.error('Gallery batch upload error:', error);
    return NextResponse.json({ error: 'Error interno guardando la galería' }, { status: 500 });
  }
}
