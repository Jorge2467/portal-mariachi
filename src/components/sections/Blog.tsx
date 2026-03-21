import FadeIn from '@/components/ui/FadeIn';
import { Newspaper, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';

export default async function Blog() {
  const dbPosts = await getBlogPosts(3);
  
  const displayPosts = dbPosts.length > 0 ? dbPosts : [
    { id: 1, title: 'El Origen del Guitarrón', slug: 'origen-guitarron', excerpt: 'Descubre cómo este icónico instrumento dio forma al sonido moderno del mariachi jalisciense.', icon: '🎸', author_name: 'Dr. Hernández', published_at: new Date('2023-10-15') },
    { id: 2, title: 'Vestimenta Charra Tradicional', slug: 'vestimenta-charra', excerpt: 'Los elementos indispensables que componen el traje de gala de un mariachi profesional.', icon: '🎩', author_name: 'María González', published_at: new Date('2023-11-02') },
    { id: 3, title: 'Técnicas de Respiración', slug: 'tecnicas-respiracion', excerpt: 'Mejora tu soporte vocal para interpretar el falsete huasteco a la perfección.', icon: '🎤', author_name: 'Mtro. Vargas', published_at: new Date('2023-11-20') },
  ];

  return (
    <section id="blog" className="py-24 bg-black relative border-t border-white/5 snap-start scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-black to-black" />
      
      <div className="container-fluid relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-primary font-bold tracking-widest text-sm uppercase mb-3 block">Noticias y Cultura</span>
            <h2 className="heading-2 mb-6 text-balance">El Blog del Mariachi</h2>
            <p className="body-text">
              Artículos, historia, entrevistas y tutoriales. Sumérgete en el conocimiento de nuestra herencia musical.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any, i: number) => (
            <FadeIn key={post.id} delay={0.1 * i} direction="up" fullWidth>
              <Link href={`/blog/${post.slug}`} className="block h-full group">
                <article className="glass-card p-8 h-full flex flex-col hover:bg-white/5 transition-colors border-l-4 border-l-transparent hover:border-l-gold-primary">
                  <div className="text-4xl mb-6">{post.icon || '📰'}</div>
                  
                  <h3 className="text-2xl font-syne font-bold mb-4 group-hover:text-gold-light transition-colors">{post.title}</h3>
                  <p className="text-text-light mb-6 flex-1 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-text-light/70 uppercase tracking-widest">
                       <Calendar size={12} />
                       {new Date(post.published_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                    </div>
                    <span className="flex items-center text-sm font-bold text-gold-primary group-hover:gap-2 transition-all">
                      Leer más <ChevronRight size={16} />
                    </span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <Link href="/blog" className="btn-secondary inline-flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 rounded-full px-8 py-3 font-semibold transition-all">
              Visitar la Wiki
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
