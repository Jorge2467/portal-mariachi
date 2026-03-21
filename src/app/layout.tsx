import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chat/Chatbot';
import CommandPalette from '@/components/ui/CommandPalette';
import { cookies } from 'next/headers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '600', '800'] });

export const metadata: Metadata = {
  title: 'El Portal del Mariachi - México Madeira',
  description: 'La enciclopedia digital más completa del mariachi. Descubre, aprende y comparte la riqueza musical de México.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('portal_auth_token')?.value;
  
  const rawLang = cookieStore.get('portal_locale')?.value;
  const lang = (rawLang === 'es' || rawLang === 'en' || rawLang === 'pt') ? rawLang : 'es';

  return (
    <html lang={lang} className={`${inter.variable} ${syne.variable} scroll-smooth snap-y snap-proximity`}>
      <body className="bg-bg-dark text-white font-sans antialiased selection:bg-gold-primary selection:text-black flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} lang={lang} />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <CommandPalette />
      </body>
    </html>
  );
}
