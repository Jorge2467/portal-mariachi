'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, User, Search } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import LanguageSelector from './LanguageSelector';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';
import pt from '@/i18n/pt.json';

const dicts: Record<string, typeof es> = { es, en, pt };

export default function Navbar({ isLoggedIn = false, lang = 'es' }: { isLoggedIn?: boolean, lang?: string }) {
  const dict = dicts[lang] || dicts.es;

  const NAV_LINKS = [
    { name: dict.nav.home, href: '/' },
    { name: dict.nav.directory, href: '/directorio' },
    { name: dict.nav.audios, href: '/audios' },
    { name: dict.nav.scores, href: '/partituras' },
    { name: dict.nav.blog, href: '/blog' },
  ];
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Si scrolleamos mucho hacia abajo escondemos el nav
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Si pasamos de 50px de scroll, aplicamos glassmorphism
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-card border-b border-white/10 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-fluid flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-primary flex items-center justify-center overflow-hidden">
              <span className="font-syne font-bold text-black text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-bold text-lg leading-tight group-hover:text-gold-primary transition-colors">Portal del Mariachi</span>
              <span className="text-xs text-gold-light tracking-widest hidden sm:block">MÉXICO • MADEIRA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-text-light hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <LanguageSelector />
              <button
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))}
                className="p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                title="Búsqueda global (Cmd+K)"
              >
                <Search size={16} />
              </button>
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-2 border border-gold-primary/40 text-gold-primary rounded-full px-4 py-2 text-sm hover:bg-gold-primary/10 transition-colors"
                  >
                    <User size={16} />
                    <span>{dict.nav.dashboard}</span>
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-2 bg-gradient-to-r from-gold-primary to-yellow-500 text-black font-bold rounded-full px-4 py-2 text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    <span className="text-lg leading-none -mt-0.5">＋</span>
                    <span>Publicar</span>
                  </Link>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setAuthView('login'); setIsAuthOpen(true); }}
                    className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                  >
                    <User size={16} />
                    <span>{dict.nav.login}</span>
                  </button>
                  <button 
                    onClick={() => { setAuthView('register'); setIsAuthOpen(true); }}
                    className="flex items-center gap-2 bg-gradient-to-r from-gold-primary to-yellow-500 text-black font-bold rounded-full px-4 py-2 text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    <span className="text-lg leading-none -mt-0.5">＋</span>
                    <span>Unirse / Subir</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, pointerEvents: 'auto' },
          closed: { opacity: 0, pointerEvents: 'none' }
        }}
        className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-xl pt-24 px-6 md:hidden"
      >
        <div className="flex flex-col gap-6 text-2xl font-syne font-semibold">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-gold-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-full my-4" />
          {isLoggedIn ? (
            <div className="flex flex-col gap-4 mt-2">
              <Link 
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-gold-primary hover:text-gold-light focus:outline-none flex items-center gap-3"
              >
                <User size={24} />
                {dict.nav.dashboard}
              </Link>
              <Link 
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-gold-primary/20 text-gold-primary px-4 py-3 rounded-xl hover:bg-gold-primary/30 transition-colors w-fit"
              >
                <span className="text-2xl leading-none">＋</span>
                <span className="font-bold">Publicar Mariachi o Audio</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthView('login'); setIsAuthOpen(true); }}
                className="text-left hover:text-gold-primary focus:outline-none flex items-center gap-3"
              >
                <User size={24} />
                {dict.nav.login}
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthView('register'); setIsAuthOpen(true); }}
                className="flex items-center gap-3 bg-gold-primary text-black px-4 py-3 rounded-xl hover:opacity-90 font-bold transition-opacity w-fit shadow-lg shadow-gold-primary/20"
              >
                <span className="text-2xl leading-none">＋</span>
                <span>Unirse y Subir Material</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authView} 
      />
    </>
  );
}
