'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, MapPin, SlidersHorizontal, Loader2 } from 'lucide-react';

interface SearchFilterProps {
  placeholder?: string;
  showLocation?: boolean;
  categories?: { value: string; label: string }[];
  baseRoute: string;
}

export default function SearchFilter({ placeholder = "Buscar...", showLocation = false, categories = [], baseRoute }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [term, setTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('loc') || '');
  const [category, setCategory] = useState(searchParams.get('cat') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build URL query params
    const params = new URLSearchParams();
    if (term.trim()) params.set('q', term.trim());
    if (location.trim() && showLocation) params.set('loc', location.trim());
    if (category && category !== 'all') params.set('cat', category);

    // Push new path, transition gives a native pending state
    startTransition(() => {
      router.push(`${baseRoute}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full relative z-10 flex flex-col md:flex-row gap-4 p-4 md:p-2 bg-neutral-900/60 backdrop-blur-xl border border-neutral-700/50 rounded-3xl md:rounded-[2rem] shadow-2xl">
      
      {/* Primary Search Input */}
      <div className="flex-1 relative flex items-center bg-neutral-950/50 rounded-2xl md:rounded-full px-6 py-4 md:py-3 group border border-transparent focus-within:border-teal-500/50 transition-colors">
        <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-teal-400" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full bg-transparent border-none text-white placeholder-neutral-500 focus:ring-0 ml-4 font-inter outline-none text-lg md:text-base"
        />
      </div>

      {/* Conditional Location Input */}
      {showLocation && (
        <div className="flex-1 relative flex items-center bg-neutral-950/50 rounded-2xl md:rounded-full px-6 py-4 md:py-3 group border border-transparent focus-within:border-teal-500/50 transition-colors">
          <MapPin className="w-5 h-5 text-neutral-400 group-focus-within:text-teal-400" />
          <input 
            type="text" 
            placeholder="Ciudad, Estado..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border-none text-white placeholder-neutral-500 focus:ring-0 ml-4 font-inter outline-none text-lg md:text-base"
          />
        </div>
      )}

      {/* Conditional Dropdown */}
      {categories.length > 0 && (
        <div className="flex-1 relative flex items-center bg-neutral-950/50 rounded-2xl md:rounded-full px-6 py-4 md:py-3 group border border-transparent focus-within:border-teal-500/50 transition-colors">
          <SlidersHorizontal className="w-5 h-5 text-neutral-400 group-focus-within:text-teal-400" />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:ring-0 ml-4 font-inter outline-none text-lg md:text-base appearance-none cursor-pointer"
          >
            <option value="all" className="bg-neutral-900 text-white">Todas las categorías</option>
            {categories.map(c => (
              <option key={c.value} value={c.value} className="bg-neutral-900 text-white">{c.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-4 md:py-3 rounded-2xl md:rounded-full transition-all flex items-center justify-center min-w-[140px] shadow-lg shadow-indigo-500/30 disabled:opacity-70"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Buscar"
        )}
      </button>
    </form>
  );
}
