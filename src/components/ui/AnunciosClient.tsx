'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import AnuncioForm from '@/components/ui/AnuncioForm';
import { Plus, X } from 'lucide-react';

interface Anuncio {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  price?: string | null;
  currency?: string | null;
  contactEmail?: string | null;
  contactWhatsapp?: string | null;
  imageUrl?: string | null;
}

interface AnunciosClientProps {
  records: Anuncio[];
  categories: { value: string; label: string }[];
}

export default function AnunciosClient({ records, categories }: AnunciosClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-8 pb-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-amber-500/5 rotate-12 pointer-events-none" />

      {/* Modal overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors">
              <X size={22} />
            </button>
            <AnuncioForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-amber-500">El Mercado</h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Compra, vende, busca empleo y anuncia servicios en la comunidad mariachi.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-colors w-full sm:w-auto"
            >
              <Plus size={20} /> Publicar Anuncio
            </button>
          </div>
        </FadeIn>

        {/* Category pills */}
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap gap-2 mb-10">
            <a href="/anuncios" className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors bg-white/10 text-white border-white/20`}>
              Todos
            </a>
            {categories.map(cat => (
              <a key={cat.value} href={`/anuncios?cat=${cat.value}`}
                className="px-4 py-2 rounded-full text-sm font-bold border border-white/10 text-neutral-400 hover:text-white hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors">
                {cat.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <span className="text-4xl block mb-4">🏪</span>
              <p className="text-neutral-500">La plaza está vacía. ¡Sé el primero en publicar un anuncio!</p>
              <button onClick={() => setShowForm(true)} className="mt-4 btn-primary inline-flex items-center gap-2">
                <Plus size={16} /> Publicar Anuncio
              </button>
            </div>
          ) : (
            records.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.05}>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-colors group">
                  <div className="aspect-video w-full bg-neutral-800 relative">
                    <img src={item.imageUrl || 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=400&q=80'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                    <div className="absolute top-4 left-4 bg-amber-500 text-black font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-syne font-bold mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-neutral-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5">
                      <div className="font-syne text-2xl font-bold text-teal-400">
                        {item.price ? `${item.price} ${item.currency || 'EUR'}` : 'A convenir'}
                      </div>
                      {(item.contactEmail || item.contactWhatsapp) && (
                        <a href={item.contactWhatsapp ? `https://wa.me/${item.contactWhatsapp.replace(/\D/g,'')}` : `mailto:${item.contactEmail}`}
                          className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors" target="_blank" rel="noreferrer">
                          {item.contactWhatsapp ? '📱' : '✉️'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
