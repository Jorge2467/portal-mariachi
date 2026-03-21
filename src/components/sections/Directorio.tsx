import FadeIn from '@/components/ui/FadeIn';
import { Users, MapPin, Award } from 'lucide-react';
import Link from 'next/link';
import { getMariachis } from '@/lib/data';

export default async function Directorio() {
  const dbMariachis = await getMariachis(6);
  
  const displayMariachis = dbMariachis.length > 0 ? dbMariachis : [
    { id: 1, name: 'Mariachi Vargas de Tecalitlán', location: 'Ciudad de México', awards: 15 },
    { id: 2, name: 'Mariachi Nuevo Tecalitlán', location: 'Guadalajara, Jalisco', awards: 8 },
    { id: 3, name: 'Mariachi Sol de México', location: 'Los Ángeles, CA', awards: 5 },
  ];

  return (
    <section id="directorio" className="py-24 bg-bg-dark relative border-t border-white/5 snap-start scroll-mt-24">
      <div className="container-fluid relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-mariachi-red font-bold tracking-widest text-sm uppercase mb-3 block">Directorio Global</span>
            <h2 className="heading-2 mb-6 text-balance">Encuentra a tu Mariachi</h2>
            <p className="body-text">
              El directorio oficial más grande del mundo. Contrata agrupaciones verificadas cerca de tu ubicación.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
          {displayMariachis.map((mariachi: any, i: number) => (
            <FadeIn key={mariachi.id} delay={0.1 * i} direction="up" fullWidth>
              <Link href={`/directorio/${mariachi.id}`} className="block h-full block">
                <div className="glass-card p-6 h-full flex flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-mariachi-red/20 flex items-center justify-center shrink-0 border border-mariachi-red/30 group-hover:border-mariachi-red transition-colors">
                    <Users size={28} className="text-mariachi-red group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-syne font-bold text-lg mb-1 group-hover:text-white transition-colors text-white/90">{mariachi.name}</h3>
                    <div className="flex items-center gap-1 justify-start text-xs text-text-light mb-2">
                       <MapPin size={12} /> {mariachi.location}
                    </div>
                    {mariachi.awards > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gold-primary/10 text-gold-light text-[10px] font-bold uppercase tracking-wider border border-gold-primary/20">
                        <Award size={10} /> {mariachi.awards} Premios
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <Link href="/directorio" className="btn-primary inline-flex items-center gap-2">
              Explorar Directorio Completo
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
