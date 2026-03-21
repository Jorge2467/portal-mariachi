import { db } from '@/db';
import { blogPosts, blogComments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import FadeIn from '@/components/ui/FadeIn';
import BlogComments from '@/components/ui/BlogComments';
import WikiCorrections from '@/components/ui/WikiCorrections';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, resolvedParams.slug)).limit(1);
  const post = posts[0];

  if (!post) {
    return { title: 'Papiro Perdido | Portal Mariachi' };
  }

  const cleanDescription = (post.content ? post.content.substring(0, 160).replace(/<[^>]+>/g, '') : 'Artículo milenario del Portal Mariachi') + '...';

  return {
    title: `${post.title} | Portal del Mariachi`,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      images: post.coverUrl ? [post.coverUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      images: post.coverUrl ? [post.coverUrl] : [],
    }
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  let userId = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      userId = payload.sub as string;
    } catch(e) {}
  }

  // Buscar post
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, resolvedParams.slug)).limit(1);
  const post = posts[0];
  if (!post) notFound();

  // Buscar comentarios atados a este post
  const comments = await db.select().from(blogComments).where(eq(blogComments.postId, post.id)).orderBy(desc(blogComments.createdAt));

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Decorators */}
      {post.coverUrl && (
        <div className="absolute top-0 left-0 w-full h-[60vh] opacity-20 pointer-events-none">
          <img src={post.coverUrl} className="w-full h-full object-cover mix-blend-overlay" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950" />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 relative z-10">
        <Link href="/blog" className="text-teal-400 hover:text-white font-bold mb-8 inline-block transition-colors">
          &larr; Volver al Papiro Universal
        </Link>
        
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <span className="bg-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-500/20 mb-6 inline-block">
              {post.icon} Sabiduría Mariachi
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-neutral-400 font-inter">
              <span>✍🏼 {post.authorName || 'Escribano del Portal'}</span>
              <span>•</span>
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Fecha estelar desconocida'}</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose prose-invert prose-lg max-w-none font-inter text-neutral-300 leading-relaxed marker:text-teal-500">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-center text-xl text-neutral-500 my-20">Este documento sagrado aún carece de inscripciones.</p>
            )}
          </div>
        </FadeIn>

        {/* Phase 5 Interaction Core */}
        <div className="mt-20">
          <FadeIn delay={0.3}>
            {/* Componente para proponer enmiendas */}
            <div className="mb-12">
              <h3 className="text-2xl font-syne font-bold text-amber-500 mb-2">Ayúdanos a Mejorar</h3>
              <p className="text-neutral-400 text-sm">¿Encontraste una inconsistencia histórica? ¿Tienes datos más precisos? Los eruditos moderadores revisarán tu aporte a este pergamino.</p>
              <WikiCorrections postId={post.id} userId={userId} />
            </div>

            {/* Componente Reactivo de Comentarios */}
            <BlogComments 
              postId={post.id} 
              userId={userId}
              initialComments={comments.map((c: any) => ({
                id: c.id,
                userId: c.userId || 'anon',
                content: c.content,
                createdAt: c.createdAt || new Date(),
                // Simplificación por ahora (idealmente se hace un JOIN para sacar el avatar/nombre del usr)
                userName: 'Erudito Anónimo' 
              }))} 
            />
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
