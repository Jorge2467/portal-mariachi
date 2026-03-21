'use server';

import { db } from '@/db';
import { mariachiDirectory, anuncios, blogCorrections, albums } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  if (!token) throw new Error('Unauthorized');
  
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') throw new Error('Forbidden');
    return payload;
  } catch (e) {
    throw new Error('Forbidden');
  }
}

export async function approveMariachi(id: string) {
  await requireAdmin();
  await db.update(mariachiDirectory).set({ status: 'approved' }).where(eq(mariachiDirectory.id, id));
  revalidatePath('/dashboard/admin');
  revalidatePath('/directorio');
}

export async function rejectMariachi(id: string) {
  await requireAdmin();
  await db.update(mariachiDirectory).set({ status: 'rejected' }).where(eq(mariachiDirectory.id, id));
  revalidatePath('/dashboard/admin');
}

export async function approveAnuncio(id: string) {
  await requireAdmin();
  await db.update(anuncios).set({ status: 'approved' }).where(eq(anuncios.id, id));
  revalidatePath('/dashboard/admin');
  revalidatePath('/anuncios');
}

export async function rejectAnuncio(id: string) {
  await requireAdmin();
  await db.update(anuncios).set({ status: 'rejected' }).where(eq(anuncios.id, id));
  revalidatePath('/dashboard/admin');
}

export async function resolveWikiCorrection(id: string, action: 'approve' | 'reject') {
  await requireAdmin();
  await db.update(blogCorrections).set({ adminStatus: action === 'approve' ? 'approved' : 'rejected' }).where(eq(blogCorrections.id, id));
  revalidatePath('/dashboard/admin');
}

export async function resolveAlbum(id: string, action: 'approve' | 'reject') {
  await requireAdmin();
  await db.update(albums).set({ status: action === 'approve' ? 'approved' : 'rejected' }).where(eq(albums.id, id));
  revalidatePath('/dashboard/admin');
}
