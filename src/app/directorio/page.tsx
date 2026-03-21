import { db } from '@/db';
import { mariachiDirectory } from '@/db/schema';
import { ilike, and, sql, eq } from 'drizzle-orm';
import FadeIn from '@/components/ui/FadeIn';
import SearchFilter from '@/components/ui/SearchFilter';
import Link from 'next/link';

// App Router Server Component
export default async function DirectorioPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; loc?: string }>; // Next.js 15+ searchParams are Promises
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const loc = resolvedParams.loc || '';

  // Preparar Consultas Drizzle ORM
  const conditions = [eq(mariachiDirectory.status, 'approved')];
  
  if (q) {
    conditions.push(ilike(mariachiDirectory.groupName, `%${q}%`));
  }
  
  if (loc) {
    // Busca en location
    conditions.push(ilike(mariachiDirectory.location, `%${loc}%`));
  }

  // Ejecutar en DB
  const mariachis = await db.select().from(mariachiDirectory).where(and(...conditions)).limit(50);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 to-neutral-950 pointer-events-none" />
      <div className="absolute -top-40 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-teal-200">
              Directorio Global
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Encuentra a las mejores agrupaciones mariachis verificadas en tu ciudad, listos para tu próximo evento.
            </p>
          </div>
        </FadeIn>

        {/* Buscador Paramétrico */}
        <div className="mb-16 max-w-4xl mx-auto">
          <FadeIn delay={0.2} direction="up">
            <SearchFilter 
              baseRoute="/directorio" 
              placeholder="Mariachi Vargas, Sol de México..." 
              showLocation={true} 
            />
          </FadeIn>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mariachis.length === 0 ? (
            <div className="col-span-full py-24 text-center">
              <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏜️</span>
              </div>
              <h3 className="text-2xl font-syne font-bold mb-2">Sin resultados</h3>
              <p className="text-neutral-500">No encontramos agrupaciones que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            mariachis.map((m: any, idx: number) => (
              <FadeIn key={m.id} delay={idx * 0.1} direction="up">
                <div className="group bg-neutral-900/40 border border-neutral-800 rounded-[2rem] p-6 hover:bg-neutral-800/60 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 bg-neutral-800">
                    <img 
                      src={m.imageUrl || '/placeholder-mariachi.jpg'} 
                      alt={m.groupName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold border border-white/10 flex items-center gap-1.5 shadow-xl">
                      👥 {m.membersCount || 1}+ integrantes
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-syne font-bold mb-2 group-hover:text-teal-400 transition-colors">{m.groupName}</h3>
                    <p className="text-neutral-400 flex items-center gap-2 mb-4 font-inter text-sm">
                      📍 {m.location || 'Localidad no especificada'}
                    </p>
                    <p className="text-neutral-300 line-clamp-2 text-sm leading-relaxed mb-6">
                      {m.bio || "Agrupación distinguida perteneciente al padrón de honor del Portal Mariachi."}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-800/50 flex items-center justify-between">
                    <span className="text-lg font-bold text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                      Contacto Directo
                    </span>
                    <Link href={`/directorio/${m.id}`} className="text-teal-400 hover:text-white font-medium transition-colors bg-teal-500/10 hover:bg-teal-500/20 px-6 py-2.5 rounded-xl border border-teal-500/20">
                      Ver Perfil
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
