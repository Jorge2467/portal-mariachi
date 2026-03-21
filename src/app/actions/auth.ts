'use server';

import { cookies } from 'next/headers';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'El email y la contraseña son requeridos' };

  try {
    if (db) {
      // Buscar en DB real
      const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const user = userList[0];
      
      if (!user) {
        return { error: 'Credenciales inválidas' };
      }

      // Validar contra bcrypt hash heredado o nuevo
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return { error: 'Credenciales inválidas' };
      }
      
      const cookieStore = await cookies();
      cookieStore.set('portal_auth_token', user.id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
      return { success: true };
    } else {
      // Entorno de Desarrollo sin DB configurada
      const cookieStore = await cookies();
      cookieStore.set('portal_auth_token', 'mock_user_1', { httpOnly: true, path: '/' });
      return { success: true };
    }
  } catch (error) {
    console.error('Error en Login:', error);
    return { error: 'Ha ocurrido un error inesperado al procesar la solicitud' };
  }
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) return { error: 'Todos los campos son requeridos' };

  try {
    if (db) {
      // Check if user exists
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existing.length > 0) return { error: 'Este correo electrónico ya está registrado' };

      // Insert new user con bcrypt
      const hash = await bcrypt.hash(password, 10);
      const inserted = await db.insert(users).values({
        name,
        email,
        passwordHash: hash,
        role: 'user'
      }).returning({ id: users.id });

      const cookieStore = await cookies();
      cookieStore.set('portal_auth_token', inserted[0].id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
      return { success: true };
    } else {
      // Dev mock environment
      const cookieStore = await cookies();
      cookieStore.set('portal_auth_token', 'mock_user_1', { httpOnly: true, path: '/' });
      return { success: true };
    }
  } catch (error) {
    console.error('Error en Registro:', error);
    return { error: 'Ha ocurrido un error inesperado durante el registro' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('portal_auth_token');
  return { success: true };
}
