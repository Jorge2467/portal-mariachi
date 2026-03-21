import FadeIn from '@/components/ui/FadeIn';
import { Music, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getSongs } from '@/lib/data';

export default async function Repertorio() {
  const dbSongs = await getSongs(6);
  
  const displaySongs = dbSongs.length > 0 ? dbSongs : [
    { id: 1, title: 'El Son de la Negra', category: 'Sones Jaliscienses', rating: 9.8, difficulty: 'Alta' },
    { id: 2, title: 'Cielito Lindo', category: 'Canción Ranchera', rating: 9.5, difficulty: 'Baja' },
    { id: 3, title: 'El Rey', category: 'Canción Ranchera', rating: 9.9, difficulty: 'Media' },
  ];
  return (
    <section id="repertorio" className="py-24 bg-black relative snap-start scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-black to-black" />
      
      <div className="container-fluid relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-gold-primary font-bold tracking-widest text-sm uppercase mb-3 block flex items-center gap-2">
                <Music size={16} /> Repertorio Base
              </span>
              <h2 className="heading-2 mb-4 text-balance">El Alma del Mariachi</h2>
              <p className="body-text">
                Explora la colección curada de partituras, audios de referencia y análisis histórico de las piezas fundamentales que todo mariachi debe conocer.
              </p>
            </div>
            
            <Link href="/repertorio" className="btn-secondary group flex items-center gap-2 shrink-0">
              Ver Catálogo Completo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySongs.map((item: any, i: number) => (
            <FadeIn key={item.id} delay={0.1 * i} direction="up" fullWidth>
              <Link href={`/repertorio/${item.id}`} className="block h-full block">
                <div className="glass-card p-8 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300 group bg-bg-card/40 hover:bg-bg-card/80">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-light group-hover:border-gold-primary/30 group-hover:text-gold-light transition-colors">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-gold-primary">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="heading-3 mb-2 group-hover:text-gold-primary transition-colors">{item.title}</h3>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                    <span className="text-sm text-text-light">Dificultad: <strong className="text-white font-medium">{item.difficulty}</strong></span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold-primary group-hover:text-black group-hover:border-gold-primary transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
