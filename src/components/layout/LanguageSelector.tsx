'use client';

import { useTransition } from 'react';
import { setLanguage } from '@/app/actions/i18n';
import { Language } from '@/lib/i18n/dictionaries';
import { Loader2 } from 'lucide-react';

export default function LanguageSelector({ currentLang }: { currentLang: Language }) {
  const [isPending, startTransition] = useTransition();

  const languages: { code: Language, label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' }
  ];

  const handleLanguageChange = (lang: Language) => {
    if (lang === currentLang) return;
    
    startTransition(() => {
      setLanguage(lang);
    });
  };

  return (
    <div className="relative group cursor-pointer py-2">
      <div className="text-sm font-medium text-text-light group-hover:text-gold-primary transition-colors flex items-center gap-1 min-w-[36px]">
        {isPending ? (
          <Loader2 size={14} className="animate-spin text-gold-primary" />
        ) : (
          <>{currentLang.toUpperCase()} ▼</>
        )}
      </div>

      {/* Menú Desplegable con CSS Puro */}
      <div className="absolute right-0 top-full pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
        <div className="w-24 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/5 ${
                lang.code === currentLang 
                  ? 'text-gold-primary font-bold bg-white/5' 
                  : 'text-text-light hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
