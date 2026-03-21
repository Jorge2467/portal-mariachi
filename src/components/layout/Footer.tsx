import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { getDictionaryServer } from '@/lib/i18n/getDictionary';

export default async function Footer() {
  const { t } = await getDictionaryServer();

  return (
    <footer className="bg-bg-dark border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <div className="w-10 h-10 rounded-full bg-gold-primary flex items-center justify-center">
                <span className="font-syne font-bold text-black text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne font-bold text-lg leading-tight">Portal del Mariachi</span>
              </div>
            </Link>
            <p className="text-text-light max-w-sm mb-6">
              {t('home.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-light hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-light hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-light hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-syne font-bold font-lg mb-6 text-white">{t('nav.explore')}</h4>
            <ul className="flex flex-col gap-3 text-text-light">
              <li><Link href="/#repertorio" className="hover:text-gold-primary transition-colors">{t('repertorio.title')}</Link></li>
              <li><Link href="/#audios" className="hover:text-gold-primary transition-colors">{t('nav.audios')}</Link></li>
              <li><Link href="/#estilos" className="hover:text-gold-primary transition-colors">{t('nav.estilos')}</Link></li>
              <li><Link href="/#partituras" className="hover:text-gold-primary transition-colors">{t('nav.partituras')}</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-syne font-bold font-lg mb-6 text-white">{t('footer.col_resources')}</h4>
            <ul className="flex flex-col gap-3 text-text-light">
              <li><Link href="/#academia" className="hover:text-gold-primary transition-colors">{t('nav.academy')}</Link></li>
              <li><Link href="/#anuncios" className="hover:text-gold-primary transition-colors">{t('nav.anuncios')}</Link></li>
              <li><Link href="/#directorio" className="hover:text-gold-primary transition-colors">{t('nav.directory')}</Link></li>
              <li><Link href="/#wiki" className="hover:text-gold-primary transition-colors">{t('nav.wiki')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-light">
          <p>© {new Date().getFullYear()} Portal del Mariachi. {t('footer.rights')}.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link href="/contacto" className="hover:text-white transition-colors">{t('footer.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
