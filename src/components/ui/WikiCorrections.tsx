'use client';

import { useState, useTransition } from 'react';
import { PenTool, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

interface WikiCorrectionsProps {
  postId: string;
  userId?: string | null;
}

export default function WikiCorrections({ postId, userId }: WikiCorrectionsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setAuthModalOpen(true);
      return;
    }

    startTransition(async () => {
      try {
        await fetch(`/api/blog/corrections`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, suggestedContent: content })
        });
        setSuccess(true);
        setTimeout(() => setIsOpen(false), 3000);
      } catch(e) {
        console.error(e);
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-8 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group"
      >
        <PenTool className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
        Sugerir Corrección o Aporte
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                <h3 className="text-2xl font-syne font-bold mb-2">Aporte Recibido</h3>
                <p className="text-neutral-400">El consejo de sabios revisará tu sugerencia literaria. Gracias por contribuir al legado mariachi.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-syne font-bold mb-2 text-amber-500">Proponer Enmienda</h3>
                <p className="text-neutral-400 mb-6 text-sm">Cita tu fuente bibliográfica si es posible. La exactitud histórica nos define.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <textarea
                    required
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Escribe la versión corregida o el dato histórico complementario aquí..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 min-h-[150px] text-white outline-none focus:border-amber-500/50"
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setIsOpen(false)} className="px-6 py-2 rounded-full font-bold text-neutral-400 hover:text-white transition-colors">Cancelar</button>
                    <button disabled={isPending || !content.trim()} type="submit" className="px-6 py-2 rounded-full font-bold bg-amber-600 hover:bg-amber-500 text-black flex items-center gap-2 disabled:opacity-50">
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar a Revisión'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
