import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { ilike, and, desc, eq } from 'drizzle-orm';
import FadeIn from '@/components/ui/FadeIn';
import SearchFilter from '@/components/ui/SearchFilter';
import Link from 'next/link';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';

  const conditions = [eq(blogPosts.status, 'published')];
  if (q) conditions.push(ilike(blogPosts.title, `%${q}%`));

  const posts = await db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.publishedAt)).limit(20);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-indigo-200 to-white">
              Papiro Universal
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Noticias, historia, y los secretos mejor guardados de la cultura musical mariachi.
            </p>
          </div>
        </FadeIn>

        <div className="mb-16">
          <FadeIn delay={0.2} direction="up">
            <SearchFilter 
              baseRoute="/blog" 
              placeholder="Buscar artículos (Ej. Historia del Guitarrón)..." 
            />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-neutral-800 rounded-3xl bg-neutral-900/20">
              <span className="text-4xl block mb-4">📜</span>
              <p className="text-neutral-400">El pergamino en blanco. No hay artículos para esta búsqueda.</p>
            </div>
          ) : (
            posts.map((post: any, idx: number) => (
              <FadeIn key={post.id} delay={idx * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block h-full bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 hover:bg-neutral-800/80 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {post.icon || '📝'}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-mono text-teal-400 mb-2 uppercase tracking-wider">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Desconocido'}
                      </p>
                      <h2 className="text-2xl font-syne font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-neutral-400 text-sm line-clamp-3">
                        {post.excerpt || 'Sin extracto disponible. Da click para leer el artículo completo y sumergirte en su sabiduría.'}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
