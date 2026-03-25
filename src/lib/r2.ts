import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import path from 'path';

const BUCKET = process.env.R2_BUCKET_NAME || 'portal-mariachi';
const ACCOUNT_ENDPOINT = process.env.R2_ENDPOINT!; // https://ACCOUNT_ID.r2.cloudflarestorage.com

export const r2 = new S3Client({
  region: 'auto',
  endpoint: ACCOUNT_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload a File or Buffer to Cloudflare R2.
 * Returns the public URL of the uploaded object.
 */
export async function uploadToR2(
  file: File | Buffer,
  originalName: string,
  mimeType: string,
  folder: 'audio' | 'scores' | 'gallery' | 'general' = 'general',
): Promise<string> {
  const ext = path.extname(originalName).toLowerCase();
  const uniqueKey = `${folder}/${randomBytes(16).toString('hex')}${ext}`;

  const bytes = file instanceof File ? await file.arrayBuffer() : file;
  const body = file instanceof File ? Buffer.from(new Uint8Array(bytes as ArrayBuffer)) : (bytes as Buffer);

  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: uniqueKey,
    Body: body,
    ContentType: mimeType,
    // Make object publicly readable
    ACL: 'public-read',
  }));

  // Public URL via R2 public bucket or custom domain
  const publicBase = process.env.R2_PUBLIC_URL || `${ACCOUNT_ENDPOINT}/${BUCKET}`;
  return `${publicBase}/${uniqueKey}`;
}
