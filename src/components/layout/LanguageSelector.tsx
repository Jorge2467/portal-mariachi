'use client';

import { useState, useTransition, useEffect } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LanguageSelector() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState('es');

  useEffect(() => {
    // Read cookie on client safely
    const match = document.cookie.match(new RegExp('(^| )portal_locale=([^;]+)'));
    if (match) setCurrentLocale(match[2]);
  }, []);

  const changeLocale = async (newLocale: string) => {
    startTransition(() => {
      document.cookie = `portal_locale=${newLocale}; path=/; max-age=31536000`;
      setCurrentLocale(newLocale);
      router.refresh();
    });
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Globe className="w-4 h-4 text-amber-500" />}
        <span className="text-sm font-bold uppercase">{currentLocale}</span>
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-2 w-32 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 shadow-2xl">
        <button onClick={() => changeLocale('es')} className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${currentLocale === 'es' ? 'text-amber-500 font-bold' : 'text-neutral-300'}`}>Español</button>
        <button onClick={() => changeLocale('en')} className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${currentLocale === 'en' ? 'text-amber-500 font-bold' : 'text-neutral-300'}`}>English</button>
        <button onClick={() => changeLocale('pt')} className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${currentLocale === 'pt' ? 'text-amber-500 font-bold' : 'text-neutral-300'}`}>Português</button>
      </div>
    </div>
  );
}
