import { db } from '@/db';
import { songs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import FadeIn from '@/components/ui/FadeIn';
import SongInteraction from '@/components/ui/SongInteraction';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

export default async function AudiosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  let userId = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      userId = payload.sub as string;
    } catch(e) {}
  }

  const records = await db.select().from(songs).where(eq(songs.isFeatured, true)).orderBy(desc(songs.createdAt)).limit(10);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-amber-500">
              Gramófono de Oro
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Las piezas más selectas de nuestra vasta biblioteca musical empacadas en alta fidelidad.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-6">
          {records.length === 0 ? (
            <div className="py-20 text-center w-full">
              <span className="text-4xl block mb-4">🎼</span>
              <p className="text-neutral-500">Aún no hay sinfonías registradas.</p>
            </div>
          ) : (
            records.map((song: any, idx: number) => (
              <FadeIn key={song.id} delay={idx * 0.1}>
                <div className="flex flex-col md:flex-row items-center gap-6 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 hover:border-amber-500/30 transition-all duration-500 group">
                  {/* Play Button & Cover */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={song.thumbnailUrl || '/placeholder-mariachi.jpg'} 
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-700"
                      alt={song.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                      <PlayCircle className="w-16 h-16 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-3xl font-syne font-bold text-white group-hover:text-amber-400 transition-colors">
                          {song.title}
                        </h2>
                        <p className="text-amber-500/60 font-mono text-sm uppercase tracking-widest mt-1">
                          {song.style || 'Música Tradicional'}
                        </p>
                      </div>
                      
                      {/* Interactive Voting Phase 5 */}
                      <SongInteraction 
                        songId={song.id} 
                        initialRating={song.scoreRating ? parseFloat(song.scoreRating) : 0} 
                        initialVoteCount={song.voteCount || 0} 
                        initialIsFavorite={false} 
                        userId={userId}
                      />
                    </div>
                    
                    <p className="text-neutral-400 line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {song.description || 'Siente la vibración de las cuerdas y la potencia de los metales en esta interpretación magistral. Un viaje a las raíces de México.'}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="bg-neutral-800 text-neutral-300 px-4 py-1.5 rounded-full text-xs font-bold font-inter border border-white/5">
                        🎧 {song.playCount || 0} escuchas
                      </span>
                      {song.year && (
                        <span className="bg-black text-neutral-400 px-4 py-1.5 rounded-full text-xs font-bold border border-white/5">
                          🕰️ Año {song.year}
                        </span>
                      )}
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
