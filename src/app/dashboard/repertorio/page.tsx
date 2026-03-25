import FadeIn from '@/components/ui/FadeIn';
import { getAllSongs, getSongStyles } from '@/lib/data';
import Link from 'next/link';
import { Music, ExternalLink, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RepertorioPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string; q?: string }>;
}) {
  const params = await searchParams;
  const styles = await getSongStyles();
  const songs = await getAllSongs({
    style: params.style,
    search: params.q,
    limit: 50,
    sort: 'rating',
  });

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Explorador de Repertorio</h1>
          <p className="body-text">Navega por las {songs.length > 0 ? songs.length : 'todas las'} canciones del portal. Filtra por estilo o búsqueda para encontrar lo que necesitas.</p>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <form method="get" className="flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar por título..."
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-white focus:border-gold-primary/60 transition-colors placeholder:text-text-light flex-1 min-w-[200px]"
          />
          <select
            name="style"
            defaultValue={params.style || ''}
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-white focus:border-gold-primary/60 transition-colors"
          >
            <option value="">Todos los estilos</option>
            {styles.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary px-6 py-2.5">
            Filtrar
          </button>
        </form>
      </FadeIn>

      {/* Songs list */}
      {songs.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="glass-card p-16 text-center">
            <Music size={48} className="mx-auto text-text-light mb-4 opacity-40" />
            <p className="text-text-light">
              {params.q || params.style
                ? `Sin resultados para "${params.q || params.style}".`
                : 'Aún no hay canciones en el repertorio. El admin puede añadirlas desde el Panel.'}
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="space-y-2">
          {songs.map((song: any, i: number) => (
            <FadeIn key={song.id} delay={i * 0.03}>
              <div className="glass-card px-6 py-4 flex items-center gap-4 hover:border-gold-primary/30 transition-all group">
                <span className="text-3xl select-none w-10 text-center opacity-60">🎵</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-syne font-bold group-hover:text-gold-light transition-colors truncate">{song.title}</h3>
                  <p className="text-sm text-text-light">{song.composer || 'Compositor desconocido'} · {song.style || 'General'}</p>
                </div>
                <div className="flex items-center gap-1 text-gold-primary shrink-0">
                  <Star size={14} />
                  <span className="text-sm font-bold">{song.scoreRating ? Number(song.scoreRating).toFixed(1) : '—'}</span>
                </div>
                {song.audioUrl && (
                  <a href={song.audioUrl} target="_blank" rel="noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-gold-primary/20 transition-colors text-text-light hover:text-gold-primary shrink-0">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
