'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Briefcase, Music, Wrench, MessageCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'jobs', label: 'Trabajo' },
  { id: 'instruments', label: 'Instrumentos' },
  { id: 'services', label: 'Servicios' }
];

export interface AdData {
  id: number;
  type: string;
  title: string;
  user: string;
  location: string;
  price: string;
  desc: string;
}
export default function Anuncios({ initialAds = [] }: { initialAds?: AdData[] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const displayAds = initialAds.length > 0 ? initialAds : [
    { id: 1, type: 'jobs', title: 'Vihuelista con experiencia', user: 'Mariachi Imperial', location: 'Ciudad de México', price: 'Sueldo Base', desc: 'Se busca vihuelista responsable. Disponibilidad inmediata.' },
    { id: 2, type: 'instruments', title: 'Trompeta Yamaha Xeno', user: 'Carlos M.', location: 'Guadalajara', price: '$22,500 MXN', desc: 'Trompeta en excelente estado, servicio recién hecho.' },
    { id: 3, type: 'services', title: 'Arreglos Inéditos', user: 'Maestro Valdés', location: 'Online', price: 'Desde $500', desc: 'Partituras y arreglos espectaculares de todo nivel.' },
    { id: 4, type: 'instruments', title: 'Guitarrón Custom', user: 'Luthier H.', location: 'Paracho', price: '$15,000 MXN', desc: 'Sonido profundo, hecho a mano.' }
  ];

  const filteredAds = displayAds.filter(ad => activeFilter === 'all' || ad.type === activeFilter);

  return (
    <section id="anuncios" className="py-24 bg-bg-dark border-y border-white/5 relative snap-start scroll-mt-24">
      <div className="container-fluid relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-primary font-bold tracking-widest text-sm uppercase mb-3 block">Comunidad</span>
            <h2 className="heading-2 mb-6 text-balance">Tablón de Anuncios</h2>
            <p className="body-text">
              El punto de encuentro para músicos. Encuentra ofertas de trabajo, compra y venta de instrumentos, y servicios profesionales para tu grupo.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === category.id 
                    ? 'bg-gold-primary text-black shadow-[0_0_15px_rgba(230,184,0,0.4)]' 
                    : 'bg-white/5 text-text-light border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
          {filteredAds.map((ad, i) => {
            const Icon = ad.type === 'jobs' ? Briefcase : (ad.type === 'instruments' ? Music : Wrench);
            const color = ad.type === 'jobs' ? 'text-mariachi-red' : (ad.type === 'instruments' ? 'text-blue-400' : 'text-gold-primary');
            return (
              <FadeIn key={ad.id} delay={0.1 * (i % 4)} direction="up" fullWidth>
                <div className="glass-card p-6 flex flex-col sm:flex-row gap-6 h-full border-l-4" style={{ borderLeftColor: color === 'text-mariachi-red' ? 'var(--color-mariachi-red)' : color === 'text-gold-primary' ? 'var(--color-gold-primary)' : '#60a5fa' }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} className={color} />
                      <span className="text-xs uppercase tracking-wider font-bold text-text-light">{ad.type}</span>
                    </div>
                  <h3 className="text-xl font-syne font-bold mb-1 text-white">{ad.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-text-light mb-4">
                    <span>{ad.user}</span>
                    <span>•</span>
                    <span>📍 {ad.location}</span>
                  </div>
                  <p className="text-text-light text-sm line-clamp-2">{ad.desc}</p>
                </div>
                
                <div className="flex flex-row sm:flex-col justify-between items-end shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 mt-4 sm:mt-0">
                  <div className="text-right">
                    <span className="block text-xs text-text-light mb-1">Precio / Salario</span>
                    <span className="font-bold text-gold-light">{ad.price}</span>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-white/5 hover:bg-gold-primary hover:text-black transition-colors">
                    <MessageCircle size={16} /> Contactar
                  </button>
                </div>
              </div>
            </FadeIn>
            );
          })}
          
          {filteredAds.length === 0 && (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center p-12 glass-card">
              <p className="text-text-light">No hay anuncios en esta categoría por el momento.</p>
            </div>
          )}
        </div>
        
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <button className="btn-primary">Publicar Anuncio Gratis</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
