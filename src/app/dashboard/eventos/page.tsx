import FadeIn from '@/components/ui/FadeIn';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Upcoming events can be linked to a real DB table in the future
const mockEvents = [
  {
    id: '1',
    title: 'Presentación Boda García-Martínez',
    date: '2026-04-05',
    time: '19:00',
    location: 'Salón Versalles, CDMX',
    type: 'Boda',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Serenata Día de las Madres',
    date: '2026-05-10',
    time: '08:00',
    location: 'Colonia Narvarte, CDMX',
    type: 'Serenata',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Festival Mariachi Internacional',
    date: '2026-08-23',
    time: '10:00',
    location: 'Guadalajara, Jalisco',
    type: 'Festival',
    status: 'confirmed',
  },
];

const statusStyle: Record<string, string> = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabel: Record<string, string> = {
  confirmed: 'Confirmado',
  pending: 'En gestión',
  cancelled: 'Cancelado',
};

export default function EventosPage() {
  const now = new Date();
  const upcoming = mockEvents.filter(e => new Date(e.date) >= now);
  const past = mockEvents.filter(e => new Date(e.date) < now);

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="heading-2 mb-2">Mis Eventos y Actuaciones</h1>
            <p className="body-text">Gestiona tu calendario de presentaciones, bodas, serenatas y festivales.</p>
          </div>
          <button className="btn-primary flex items-center gap-2 shrink-0">
            <Plus size={18} /> Nuevo Evento
          </button>
        </div>
      </FadeIn>

      {/* Upcoming */}
      <FadeIn delay={0.1}>
        <h2 className="text-lg font-syne font-bold text-gold-light flex items-center gap-2">
          <Calendar size={18} /> Próximas Actuaciones ({upcoming.length})
        </h2>
      </FadeIn>

      {upcoming.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="glass-card p-12 text-center">
            <Calendar size={40} className="mx-auto text-text-light mb-4 opacity-30" />
            <p className="text-text-light">No tienes actuaciones programadas próximamente.</p>
          </div>
        </FadeIn>
      ) : (
        <div className="space-y-3">
          {upcoming.map((event, i) => (
            <FadeIn key={event.id} delay={0.1 + i * 0.05}>
              <div className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-gold-primary/30 transition-all">
                <div className="flex flex-col items-center justify-center bg-black/40 rounded-2xl p-4 w-16 shrink-0 text-center">
                  <span className="text-xs font-bold text-text-light uppercase tracking-wider">
                    {new Date(event.date).toLocaleDateString('es-MX', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-syne font-bold text-gold-light leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-syne font-bold text-lg mb-1">{event.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-light">
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time} hrs</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-text-light">
                    {event.type}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${statusStyle[event.status]}`}>
                    {statusLabel[event.status]}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <FadeIn delay={0.4}>
          <div className="pt-4 border-t border-white/5">
            <h2 className="text-sm font-bold text-text-light uppercase tracking-widest mb-4">Historial</h2>
            <div className="space-y-2 opacity-50">
              {past.map((event) => (
                <div key={event.id} className="glass-card px-4 py-3 flex items-center gap-3">
                  <Calendar size={14} className="text-text-light shrink-0" />
                  <span className="text-sm text-text-light flex-1">{event.title}</span>
                  <span className="text-xs text-text-light">{new Date(event.date).toLocaleDateString('es-MX')}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
