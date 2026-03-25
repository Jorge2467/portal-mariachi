import FadeIn from '@/components/ui/FadeIn';
import { FileMusic, Download, Search, Music } from 'lucide-react';
import { getPartituras, getSongStyles } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function PartiturasPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string; instrument?: string; q?: string }>;
}) {
  const params = await searchParams;
  const partituras = await getPartituras({
    style: params.style,
    instrument: params.instrument,
    search: params.q,
    limit: 60,
  });
  const styles = await getSongStyles();

  const instruments = ['Trompeta', 'Violín', 'Vihuela', 'Guitarrón', 'Voz y Piano', 'Ensamble Mariachi', 'Orquesta (reducción)'];

  return (
    <div className="min-h-screen bg-bg-dark text-white pt-8 pb-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gold-primary/5 blur-3xl pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-gold-primary font-bold tracking-widest text-xs uppercase mb-4 bg-gold-primary/10 px-4 py-2 rounded-full">
              <FileMusic size={14} />
              Biblioteca Musical
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-primary">
                Partituras
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Descarga arreglos completos, partes individuales y partituras del repertorio mariachi.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <form method="GET" className="glass-card p-5 mb-10 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 flex-1 min-w-[200px] focus-within:border-gold-primary/60">
              <Search size={15} className="text-neutral-500 shrink-0" />
              <input
                name="q"
                defaultValue={params.q}
                placeholder="Buscar partitura..."
                className="bg-transparent w-full outline-none text-white placeholder:text-neutral-500"
              />
            </div>
            <select name="style" defaultValue={params.style || ''}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-gold-primary/60">
              <option value="">Todos los estilos</option>
              {styles.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select name="instrument" defaultValue={params.instrument || ''}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-gold-primary/60">
              <option value="">Todos los instrumentos</option>
              {instruments.map(ins => <option key={ins} value={ins}>{ins}</option>)}
            </select>
            <button type="submit" className="btn-primary px-6 py-2.5">Buscar</button>
          </form>
        </FadeIn>

        {partituras.length === 0 ? (
          <FadeIn delay={0.3}>
            <div className="glass-card p-20 text-center">
              <Music size={48} className="mx-auto text-neutral-600 mb-4" />
              <p className="text-neutral-500">
                {params.q || params.style || params.instrument
                  ? 'No se encontraron partituras para esa búsqueda.'
                  : 'No hay partituras disponibles aún. El administrador puede añadirlas desde el Panel.'}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-3">
            {partituras.map((p: any, i: number) => (
              <FadeIn key={p.id} delay={0.05 * i}>
                <div className="glass-card px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-gold-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center shrink-0">
                    <FileMusic size={22} className="text-gold-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-syne font-bold text-lg group-hover:text-gold-light transition-colors truncate">{p.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-neutral-400 mt-1">
                      {p.composer && <span>✍️ {p.composer}</span>}
                      {p.instrument && <span>🎵 {p.instrument}</span>}
                      {p.style && <span>🎼 {p.style}</span>}
                      {p.tonality && <span>🎹 {p.tonality}</span>}
                    </div>
                    {p.description && (
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-1">{p.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-neutral-400">
                      {p.fileType?.toUpperCase() || 'PDF'}
                    </span>
                    <a
                      href={p.fileUrl}
                      download
                      className="flex items-center gap-2 bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary border border-gold-primary/30 rounded-xl px-4 py-2 text-sm font-bold transition-all hover:border-gold-primary/60"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download size={15} />
                      Descargar
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
