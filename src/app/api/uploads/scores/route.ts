import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { partituras } from '@/db/schema';
import { join, extname, basename } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import { existsSync } from 'fs';

const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads');
const SCORE_EXTENSIONS: Record<string, string> = {
  '.pdf': 'pdf',
  '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.webp': 'image',
  '.sib': 'sibelius', '.mus': 'sibelius'
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const userId = formData.get('userId') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
    }

    const scoresDir = join(UPLOAD_DIR, 'scores');
    if (!existsSync(scoresDir)) {
      await mkdir(scoresDir, { recursive: true });
    }

    const results = [];
    const errors = [];

    if (!db) {
      return NextResponse.json({ error: 'Database disconnected' }, { status: 503 });
    }

    for (const file of files) {
      const ext = extname(file.name).toLowerCase();
      const fileType = SCORE_EXTENSIONS[ext] || 'pdf';
      const uniqueName = randomBytes(16).toString('hex') + ext;
      const filePath = join(scoresDir, uniqueName);
      const fileUrl = `/uploads/scores/${uniqueName}`;

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        const rawName = basename(file.name, ext);
        const cleanTitle = rawName.replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();

        const [partitura] = await db.insert(partituras).values({
          title: cleanTitle,
          fileUrl: fileUrl,
          fileType: fileType,
          originalFilename: file.name,
          fileSizeBytes: file.size,
          uploadedBy: userId || undefined
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
      errorList: errors
    }, { status: 201 });

  } catch (error: any) {
    console.error('Scores batch upload error:', error);
    return NextResponse.json({ error: 'Error interno guardando las partituras' }, { status: 500 });
  }
}
