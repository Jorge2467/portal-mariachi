import { db } from '@/db';
import { anuncios } from '@/db/schema';
import { ilike, and, desc, eq } from 'drizzle-orm';
import FadeIn from '@/components/ui/FadeIn';
import SearchFilter from '@/components/ui/SearchFilter';

export default async function AnunciosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const cat = resolvedParams.cat || '';

  const conditions = [eq(anuncios.status, 'approved')];
  if (q) conditions.push(ilike(anuncios.title, `%${q}%`));
  if (cat) conditions.push(eq(anuncios.category, cat));

  const records = await db.select().from(anuncios).where(and(...conditions)).orderBy(desc(anuncios.createdAt)).limit(30);

  const categories = [
    { value: 'instruments', label: 'Instrumentos' },
    { value: 'clothing', label: 'Trajes y Vestimenta' },
    { value: 'jobs', label: 'Empleos (Busca/Ofrece)' },
    { value: 'services', label: 'Servicios' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-amber-500/5 rotate-12 pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-amber-500">
              El Mercado
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Compra y venta de indumentaria, instrumentos y la mayor bolsa de trabajo mariachi.
            </p>
          </div>
        </FadeIn>

        <div className="mb-16">
          <FadeIn delay={0.2} direction="up">
            <SearchFilter 
              baseRoute="/anuncios" 
              placeholder="Trompeta Bach, Traje de Gala..."
              categories={categories}
            />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <span className="text-4xl block mb-4">🏪</span>
              <p className="text-neutral-500">La plaza está vacía. No hay anuncios para esta combinación.</p>
            </div>
          ) : (
            records.map((item: any, idx: number) => (
              <FadeIn key={item.id} delay={idx * 0.1}>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-colors group">
                  <div className="aspect-video w-full bg-neutral-800 relative">
                    <img src={item.imageUrl || '/placeholder-mariachi.jpg'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                    <div className="absolute top-4 left-4 bg-amber-500 text-black font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-syne font-bold mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-neutral-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                    
                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5">
                      <div className="font-syne text-2xl font-bold text-teal-400">
                        {item.price ? `${item.price} ${item.currency}` : 'A convenir'}
                      </div>
                      <a href={`mailto:${item.contactEmail}`} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors">
                        ✉️
                      </a>
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
