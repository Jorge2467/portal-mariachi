import { getMariachiById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Award, Star, Music, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default async function MariachiProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbMariachi = await getMariachiById(id);

  // Fallback a mock data si no hay DB
  const mariachi = dbMariachi || {
    id,
    name: 'Mariachi Tradición de México',
    location: 'Guadalajara, Jalisco',
    awards: 8,
    bio: 'Con más de 15 años de experiencia, somos embajadores de la música tradicional mexicana.',
    rating: 4.9,
    reviews: 124,
    verified: true,
    price_per_hour: 4500
  };

  if (!mariachi) notFound();

  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-24">
      <div className="container-fluid max-w-5xl mx-auto">
        <Link href="/#directorio" className="inline-flex items-center gap-2 text-text-light hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Volver al Directorio
        </Link>
        
        <FadeIn>
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mariachi-red/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-mariachi-red/20 border-4 border-white/5 flex items-center justify-center shrink-0">
                <Music size={64} className="text-mariachi-red/50" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-syne font-bold m-0 bg-transparent line-clamp-2 leading-tight tracking-tight">{mariachi.name}</h1>
                  {mariachi.verified && <CheckCircle size={24} className="text-blue-400" />}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-light mb-6">
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-mariachi-red" /> {mariachi.location}</span>
                  <span className="flex items-center gap-1.5"><Star size={16} className="text-gold-primary" fill="currentColor" /> {mariachi.rating} ({mariachi.reviews} reseñas)</span>
                  {mariachi.awards > 0 && <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 text-gold-light font-bold text-xs uppercase uppercase border border-gold-primary/20"><Award size={14} /> {mariachi.awards} Premios</span>}
                </div>
                
                <p className="body-text text-lg mb-8 max-w-2xl">{mariachi.bio}</p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="btn-primary py-3 px-8 text-lg hover:shadow-[0_0_20px_rgba(230,184,0,0.3)]">
                    Solicitar Presupuesto
                  </button>
                  <p className="text-sm text-text-light ml-2">Desde <strong className="text-white">${mariachi.price_per_hour} MXN</strong> / hr</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
