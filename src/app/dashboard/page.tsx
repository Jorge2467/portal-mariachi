import FadeIn from '@/components/ui/FadeIn';
import { Eye, TrendingUp, Star, Award } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Bienvenido de vuelta, Maestro</h1>
          <p className="body-text">Aquí tienes un resumen del rendimiento de tu perfil en el Directorio Global.</p>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FadeIn delay={0.1}>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Eye size={20} />
              </div>
              <span className="text-sm font-bold text-green-400 flex items-center gap-1">+12% <TrendingUp size={14}/></span>
            </div>
            <p className="text-3xl font-syne font-bold mb-1">1,248</p>
            <p className="text-sm text-text-light uppercase tracking-wider">Visitas al Perfil</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-primary/20 text-gold-light flex items-center justify-center">
                <Star size={20} />
              </div>
              <span className="text-sm font-bold text-green-400 flex items-center gap-1">+5% <TrendingUp size={14}/></span>
            </div>
            <p className="text-3xl font-syne font-bold mb-1">4.9</p>
            <p className="text-sm text-text-light uppercase tracking-wider">Calificación P/M</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <Award size={20} />
              </div>
            </div>
            <p className="text-3xl font-syne font-bold mb-1">2 Nivel</p>
            <p className="text-sm text-text-light uppercase tracking-wider">Insignia de Oro</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="glass-card p-6">
             <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-mariachi-red/20 text-mariachi-red flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-3xl font-syne font-bold mb-1">8</p>
            <p className="text-sm text-text-light uppercase tracking-wider">Contactos Nuevos</p>
          </div>
        </FadeIn>
      </div>

      {/* Tareas Recientes */}
      <FadeIn delay={0.5}>
        <div className="glass-card p-8 mt-8 border-t-4 border-t-gold-primary">
          <h2 className="text-2xl font-syne font-bold mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-sm flex-1">Has recibido un nuevo mensaje de contacto.</p>
              <span className="text-xs text-text-light">Hace 2 horas</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p className="text-sm flex-1">Felicidades, lograste la insignia "Mariachi Destacado".</p>
              <span className="text-xs text-text-light">Ayer</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-white/10">
               <div className="w-2 h-2 rounded-full bg-gold-primary" />
              <p className="text-sm flex-1">Tu perfil ha superado las 1,000 visitas este mes.</p>
              <span className="text-xs text-text-light">Hace 3 días</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
