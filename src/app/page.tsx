import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Repertorio from '@/components/sections/Repertorio';
import Anuncios from '@/components/sections/Anuncios';
import Academia from '@/components/sections/Academia';
import Directorio from '@/components/sections/Directorio';
import Blog from '@/components/sections/Blog';
import { getDirectoryAds } from '@/lib/data';
import { cookies } from 'next/headers';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';
import pt from '@/i18n/pt.json';

const dicts: Record<string, typeof es> = { es, en, pt };

export default async function Home() {
  const directoryAds = await getDirectoryAds(4);
  const cookieStore = await cookies();
  const rawLang = cookieStore.get('portal_locale')?.value;
  const lang = (rawLang === 'es' || rawLang === 'en' || rawLang === 'pt') ? rawLang : 'es';
  const dict = dicts[lang];
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center -mt-24 pt-24 pb-20 snap-start">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/60 to-bg-dark z-10" />
          {/* Si hay un video original, se puede cargar aquí, uso un div de color por ahora */}
          <div className="absolute inset-0 bg-[url('/assets/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-dark to-transparent z-10" />
        </div>

        <div className="container-fluid relative z-20 flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-primary/30 bg-gold-primary/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              <span className="text-sm font-medium text-gold-light tracking-wide">
                CANCIÓN DEL DÍA - {new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date())}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <h1 className="heading-1 mb-6 max-w-5xl mx-auto drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-[#cc9900]">
                {dict.hero.title1}
              </span>
              <br />
              <span className="text-white">
                {dict.hero.title2}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="heading-3 text-text-light mb-8 font-light">
              México Madeira
            </p>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <p className="body-text max-w-2xl mx-auto mb-12">
              {dict.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <Link href="#repertorio" className="btn-primary group flex items-center gap-2 w-full sm:w-auto justify-center">
                <span>{dict.hero.cta}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#audios" className="btn-secondary group flex items-center gap-2 w-full sm:w-auto justify-center">
                <Play size={20} className="group-hover:text-gold-primary transition-colors" />
                <span>{dict.nav.audios}</span>
              </Link>
            </div>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2">
            <div className="w-1 h-3 bg-gold-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      
      <Repertorio />
      <Academia />
      <Directorio />
      <Anuncios initialAds={directoryAds} />
      <Blog />
    </div>
  );
}
