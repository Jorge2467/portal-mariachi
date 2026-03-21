'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { Search, Loader2, Music, User, BookOpen, X } from 'lucide-react';
import { globalSearch, SearchResult } from '@/app/actions/search';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    if (val.length >= 2) {
      startTransition(async () => {
        const res = await globalSearch(val);
        setResults(res);
      });
    } else {
      setResults([]);
    }
  }, []);

  const goToRoute = (url: string) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    router.push(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl w-full max-w-xl overflow-hidden relative z-10 mx-4"
          >
            <div className="flex items-center px-4 py-3 border-b border-neutral-800">
              <Search className="w-5 h-5 text-neutral-500 mr-3" />
              <input
                autoFocus
                placeholder="Busca mariachis, audios o artículos literarios..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-500"
              />
              {isPending && <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />}
              <button onClick={() => setIsOpen(false)} className="ml-2 text-neutral-500 hover:text-white p-1 rounded-md hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {results.length === 0 && query.length >= 2 && !isPending && (
                <div className="text-center py-8 text-neutral-500 text-sm">No hay hallazgos para "{query}".</div>
              )}
              {results.length === 0 && query.length < 2 && (
                <div className="text-center py-8 text-neutral-600 text-xs uppercase tracking-widest font-bold">
                  Ingresa al menos 2 letras
                </div>
              )}

              {results.map((r, i) => (
                <button
                  key={`${r.id}-${i}`}
                  onClick={() => goToRoute(r.url)}
                  className="w-full text-left flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-800 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    r.type === 'song' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                    r.type === 'mariachi' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                    'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {r.type === 'song' && <Music className="w-5 h-5" />}
                    {r.type === 'mariachi' && <User className="w-5 h-5" />}
                    {r.type === 'blog' && <BookOpen className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium group-hover:text-amber-500 transition-colors">{r.title}</h4>
                    <span className="text-xs text-neutral-500">{r.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-800 flex items-center gap-2">
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                Presiona <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">ESC</kbd> para salir
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
