import { getBlogPostBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbPost = await getBlogPostBySlug(slug);

  // Fallback a mock data si no hay DB
  const post = dbPost || {
    slug,
    title: 'El Origen del Guitarrón y su impacto en la música',
    icon: '🎸',
    author_name: 'Dr. Alejandro Hernández',
    published_at: new Date('2023-10-15'),
    content: `
      El guitarrón mexicano es el sustento rítmico y armónico del conjunto de mariachi moderno. Sin embargo, su origen es un viaje fascinante a través de la evolución instrumental colonial en la Nueva España.

      A diferencia del tololoche, el guitarrón carece de alma, su costilla es abombada y requiere una técnica de "tirón" o pellizco simultáneo en dos cuerdas separadas por octavas, otorgándole ese sonido profundo e inconfundible.
      
      ### El Título de la Reseña
      Se cree que los primeros lauderos de Cocula, Jalisco, idearon este diseño adaptando el "Bajo de uña" español para poder tocar de pie durante las serenatas y procesiones.
      
      Hoy en día, luthieres en comunidades como Paracho, Michoacán, continúan perfeccionando este instrumento, usando maderas como el cedro, tacote y palo escrito para asegurar resonancia y belleza estética incomparable.
    `
  };

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-24">
      <div className="container-fluid max-w-4xl mx-auto">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-text-light hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} /> Volver a Noticias
        </Link>
        
        <FadeIn>
          <article className="glass-card p-8 md:p-16 border-t-4 border-t-gold-primary">
            <div className="text-6xl mb-8">{post.icon}</div>
            <h1 className="text-4xl md:text-5xl font-syne font-bold mb-6 leading-tight tracking-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-12 py-4 border-y border-white/10 text-sm text-text-light">
              <span className="flex items-center gap-2"><User size={16} className="text-gold-primary" /> {post.author_name}</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-gold-primary" /> {new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <button className="flex items-center gap-2 ml-auto hover:text-gold-primary transition-colors">
                <Share2 size={16} /> Compartir
              </button>
            </div>
            
            <div className="prose prose-invert prose-lg prose-headings:font-syne prose-headings:text-gold-light prose-a:text-gold-primary max-w-none">
              {post.content.split('\n\n').map((paragraph: string, idx: number) => {
                if (paragraph.trim().startsWith('###')) {
                  return <h3 key={idx} className="mt-8 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                }
                return <p key={idx} className="mb-6 leading-relaxed text-text-light/90">{paragraph.trim()}</p>;
              })}
            </div>
          </article>
        </FadeIn>
      </div>
    </div>
  );
}
