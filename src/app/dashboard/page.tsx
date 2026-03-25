import FadeIn from '@/components/ui/FadeIn';
import { Music, Users, BookOpen, Newspaper, TrendingUp, Star, Award, FileMusic } from 'lucide-react';
import { getPortalStats } from '@/lib/data';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

export default async function DashboardPage() {
  const stats = await getPortalStats();
  
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  let userName = 'Maestro';
  let userRole = 'user';
  
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      userName = (payload.name as string) || 'Maestro';
      userRole = (payload.role as string) || 'user';
    } catch {}
  }

  const statCards = [
    { icon: <Music size={20} />, color: 'blue', label: 'Canciones en el Portal', value: stats.songs },
    { icon: <FileMusic size={20} />, color: 'amber', label: 'Partituras Disponibles', value: stats.partituras },
    { icon: <Users size={20} />, color: 'green', label: 'Grupos en Directorio', value: stats.directory },
    { icon: <BookOpen size={20} />, color: 'purple', label: 'Cursos de Academia', value: stats.courses },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-400',
    amber: 'bg-amber-500/20 text-amber-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Bienvenido, {userName}</h1>
          <p className="body-text">Panel General del Portal Mariachi — Datos en tiempo real.</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <FadeIn key={card.label} delay={(i + 1) * 0.1}>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[card.color]}`}>
                  {card.icon}
                </div>
                <span className="text-sm font-bold text-green-400 flex items-center gap-1">
                  <TrendingUp size={14}/> Live
                </span>
              </div>
              <p className="text-3xl font-syne font-bold mb-1">
                {Number(card.value).toLocaleString()}
              </p>
              <p className="text-sm text-text-light uppercase tracking-wider">{card.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FadeIn delay={0.5}>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Newspaper size={18} className="text-gold-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-light">Artículos del Blog</h3>
            </div>
            <p className="text-4xl font-syne font-bold text-gold-light">{Number(stats.blogPosts).toLocaleString()}</p>
            <p className="text-sm text-text-light mt-1">publicados</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award size={18} className="text-mariachi-red" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-light">Galería</h3>
            </div>
            <p className="text-4xl font-syne font-bold text-white">{Number(stats.photos).toLocaleString()}</p>
            <p className="text-sm text-text-light mt-1">fotos en colección</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="glass-card p-6 border-l-4 border-l-gold-primary">
            <div className="flex items-center gap-3 mb-4">
              <Star size={18} className="text-gold-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-light">Mi Rol Actual</h3>
            </div>
            <p className="text-2xl font-syne font-bold capitalize text-gold-light">{userRole}</p>
            <p className="text-sm text-text-light mt-1">en este portal</p>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.8}>
        <div className="glass-card p-8 border-t-4 border-t-gold-primary">
          <h2 className="text-2xl font-syne font-bold mb-6">Acceso Rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/dashboard/perfil', icon: '👤', label: 'Mi Perfil' },
              { href: '/dashboard/explorador', icon: '🎵', label: 'Explorador' },
              { href: '/dashboard/repertorio', icon: '📋', label: 'Repertorio' },
              { href: '/dashboard/configuracion', icon: '⚙️', label: 'Config.' },
            ].map((item) => (
              <a key={item.href} href={item.href}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-primary/30 transition-all group text-center">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold text-text-light group-hover:text-white tracking-wide uppercase">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
