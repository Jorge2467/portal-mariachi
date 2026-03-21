import { LayoutDashboard, Users, Music, Calendar, Settings, LogOut, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  let isAdmin = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.role === 'admin') isAdmin = true;
    } catch(e) {}
  }
  return (
    <div className="min-h-screen bg-bg-dark flex flex-col md:flex-row pt-20">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-black/80 border-r border-white/10 md:min-h-[calc(100vh-80px)] p-6 shrink-0 flex flex-col">
        <div className="mb-8">
          <p className="text-xs font-bold text-text-light uppercase tracking-widest mb-4">Menú Principal</p>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold-primary/10 text-gold-light border border-gold-primary/20 hover:bg-gold-primary/20 transition-colors">
              <LayoutDashboard size={18} /> Resumen
            </Link>
            <Link href="/dashboard/perfil" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-light hover:text-white hover:bg-white/5 transition-colors">
              <Users size={18} /> Mi Perfil Público
            </Link>
            <Link href="/dashboard/explorador" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gold-light font-bold hover:text-white hover:bg-white/5 transition-colors">
              <Music size={18} /> Explorador de Archivos
            </Link>
            <Link href="/dashboard/repertorio" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-light hover:text-white hover:bg-white/5 transition-colors">
              <Music size={18} /> Mi Repertorio
            </Link>
            <Link href="/dashboard/eventos" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-light hover:text-white hover:bg-white/5 transition-colors">
              <Calendar size={18} /> Mis Eventos
            </Link>
            
            {isAdmin && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900/20 text-red-400 border border-red-900/40 hover:bg-red-900/40 hover:text-red-300 transition-colors">
                  <ShieldAlert size={18} /> Centro de Mando
                </Link>
              </div>
            )}
          </nav>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard/configuracion" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-light hover:text-white hover:bg-white/5 transition-colors">
              <Settings size={18} /> Ajustes
            </Link>
            
            <form action={async () => {
              'use server';
              await logoutAction();
              redirect('/');
            }}>
              <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-mariachi-red hover:bg-mariachi-red/10 transition-colors w-full text-left">
                <LogOut size={18} /> Cerrar Sesión
              </button>
            </form>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/5 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
           {children}
        </div>
      </main>
      
    </div>
  );
}
