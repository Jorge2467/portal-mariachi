'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Language } from '@/lib/i18n/dictionaries';

export async function setLanguage(lang: Language) {
  // Configura la cookie HTTP con el idioma seleccionado (expira en 1 año)
  const cookieStore = await cookies();
  cookieStore.set('portal_lang', lang, {
    maxAge: 31536000, 
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Revalida el layout raíz para inyectar los nuevos textos en todos los Server Components
  revalidatePath('/', 'layout');
}
