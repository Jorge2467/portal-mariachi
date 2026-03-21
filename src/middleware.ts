import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo interceptamos las rutas que empiezan por /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionToken = request.cookies.get('portal_auth_token');
    
    // Si no hay token de sesión, redirigir a la home con el parámetro de login
    if (!sessionToken?.value) {
      return NextResponse.redirect(new URL('/?auth=login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
