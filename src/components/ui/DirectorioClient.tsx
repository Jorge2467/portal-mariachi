'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import DirectorioForm from '@/components/ui/DirectorioForm';
import SearchFilter from '@/components/ui/SearchFilter';
import Link from 'next/link';
import { Plus, X, Globe } from 'lucide-react';

interface DirectorioItem {
  id: string;
  groupName: string;
  location?: string | null;
  imageUrl?: string | null;
  bio?: string | null;
  membersCount?: number | null;
}

interface DirectorioClientProps {
  mariachis: DirectorioItem[];
}

export default function DirectorioClient({ mariachis }: DirectorioClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-8 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 to-neutral-950 pointer-events-none" />
      <div className="absolute -top-40 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors">
              <X size={22} />
            </button>
            <DirectorioForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-teal-400 font-bold tracking-widest text-xs uppercase mb-4 bg-teal-400/10 px-4 py-2 rounded-full">
              <Globe size={14} /> Directorio Global
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-teal-200">
              Directorio Global
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Encuentra las mejores agrupaciones mariachis verificadas en tu ciudad, listas para tu próximo evento.
            </p>
          </div>
        </FadeIn>

        {/* CTA + Search */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-4xl mx-auto">
            <div className="flex-1">
              <SearchFilter baseRoute="/directorio" placeholder="Mariachi Vargas, Sol de México..." showLocation={true} />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-bold px-6 py-3 rounded-xl transition-colors shrink-0"
            >
              <Plus size={20} /> Inscribir mi Grupo
            </button>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mariachis.length === 0 ? (
            <div className="col-span-full py-24 text-center">
              <span className="text-4xl block mb-4">🌐</span>
              <h3 className="text-2xl font-syne font-bold mb-2">El directorio está vacío</h3>
              <p className="text-neutral-500 mb-6">Sé el primero en registrar tu grupo mariachi.</p>
              <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2">
                <Plus size={16} /> Inscribir mi Grupo
              </button>
            </div>
          ) : (
            mariachis.map((m, idx) => (
              <FadeIn key={m.id} delay={idx * 0.1} direction="up">
                <div className="group bg-neutral-900/40 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800/60 transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 bg-neutral-800">
                    <img
                      src={m.imageUrl || 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=400&q=80'}
                      alt={m.groupName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold border border-white/10">
                      👥 {m.membersCount || 1}+ integrantes
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-syne font-bold mb-2 group-hover:text-teal-400 transition-colors">{m.groupName}</h3>
                    <p className="text-neutral-400 flex items-center gap-2 mb-4 text-sm">📍 {m.location || 'Localidad no especificada'}</p>
                    <p className="text-neutral-300 line-clamp-2 text-sm leading-relaxed mb-6">{m.bio || 'Agrupación distinguida del Portal Mariachi.'}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-800/50">
                    <Link href={`/directorio/${m.id}`} className="block text-center text-teal-400 hover:text-white font-medium transition-colors bg-teal-500/10 hover:bg-teal-500/20 px-6 py-2.5 rounded-xl border border-teal-500/20 w-full">
                      Ver Perfil Completo →
                    </Link>
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
