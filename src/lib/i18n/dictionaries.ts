export type Language = 'es' | 'en' | 'pt';

export const dictionaries: Record<Language, Record<string, string>> = {
    es: {
        'nav.home': 'Inicio',
        'nav.explore': 'Explorar',
        'nav.academy': 'Academia',
        'nav.anuncios': 'Anuncios',
        'nav.collections': 'Colecciones',
        'nav.directory': 'Directorio',
        'nav.blog': 'Blog',
        'nav.chatbot_ia': 'Chatbot IA',
        'nav.repertorio': 'Repertorio',
        'nav.audios': 'Audios',
        'nav.estilos': 'Estilos',
        'nav.partituras': 'Partituras',
        'nav.wiki': 'Wiki Mariachi',
        'nav.chatbot': 'Chatbot Musical',
        'nav.submit': 'Enviar Canción',
        'login': 'Iniciar Sesión',
        'auth.welcome': '¡Bienvenido',
        
        // Home
        'home.badge': 'Canción del Día',
        'home.title': 'El Portal del Mariachi',
        'home.subtitle': 'México Madeira',
        'home.description': 'La enciclopedia digital más completa del mariachi. Descubre, aprende y comparte la riqueza musical de México con el mundo.',
        'home.btn_repertorio': 'Explorar Repertorio',
        'home.btn_audios': 'Escuchar Audios',

        // Sections
        'repertorio.title': 'Repertorio Mariachi',
        'repertorio.subtitle': 'Explora la colección más completa de música mariachi',
        'academy.title': 'Academia Mariachi',
        'academy.subtitle': 'Aprende con los mejores maestros del mariachi',
        'directory.title': 'Directorio de Mariachis',
        'directory.subtitle': 'Los mejores mariachis y profesionales de México',
        'blog.title': 'Blog Mariachi',
        'blog.subtitle': 'Artículos, noticias y recursos sobre la música mariachi',

        // Footer
        'footer.newsletter_title': 'Recibe las mejores canciones del mariachi',
        'footer.newsletter_desc': 'Suscríbete para recibir novedades, premios y contenido exclusivo',
        'footer.email_placeholder': 'Tu correo electrónico',
        'footer.subscribe': 'Suscribirse',
        'footer.col_portal': 'Portal',
        'footer.col_resources': 'Recursos',
        'footer.col_legal': 'Legal',
        'footer.col_social': 'Síguenos',
        'footer.about': 'Acerca de',
        'footer.contact': 'Contacto',
        'footer.faq': 'Preguntas Frecuentes',
        'footer.submissions': 'Enviar Canción',
        'footer.terms': 'Términos de Uso',
        'footer.privacy': 'Política de Privacidad',
        'footer.cookies': 'Política de Cookies',
        'footer.rights': 'Todos los derechos reservados',
        'footer.director': 'Dirigido por'
    },
    en: {
        'nav.home': 'Home',
        'nav.explore': 'Explore',
        'nav.academy': 'Academy',
        'nav.anuncios': 'Ads',
        'nav.collections': 'Collections',
        'nav.directory': 'Directory',
        'nav.blog': 'Blog',
        'nav.chatbot_ia': 'AI Chatbot',
        'nav.repertorio': 'Repertoire',
        'nav.audios': 'Audios',
        'nav.estilos': 'Styles',
        'nav.partituras': 'Sheet Music',
        'nav.wiki': 'Mariachi Wiki',
        'nav.chatbot': 'Music Chatbot',
        'nav.submit': 'Submit Song',
        'login': 'Sign In',
        'auth.welcome': 'Welcome',

        // Home
        'home.badge': 'Song of the Day',
        'home.title': 'The Mariachi Portal',
        'home.subtitle': 'México Madeira',
        'home.description': 'The most complete digital encyclopedia of mariachi music. Discover, learn and share the musical richness of Mexico with the world.',
        'home.btn_repertorio': 'Explore Repertoire',
        'home.btn_audios': 'Listen to Audios',

        // Sections
        'repertorio.title': 'Mariachi Repertoire',
        'repertorio.subtitle': 'Explore the most complete collection of mariachi music',
        'academy.title': 'Mariachi Academy',
        'academy.subtitle': 'Learn from the best mariachi masters',
        'directory.title': 'Mariachi Directory',
        'directory.subtitle': 'The best mariachis and professionals from Mexico',
        'blog.title': 'Mariachi Blog',
        'blog.subtitle': 'Articles, news and resources about mariachi music',

        // Footer
        'footer.newsletter_title': 'Receive the best mariachi songs',
        'footer.newsletter_desc': 'Subscribe to receive news, awards and exclusive content',
        'footer.email_placeholder': 'Your email address',
        'footer.subscribe': 'Subscribe',
        'footer.col_portal': 'Portal',
        'footer.col_resources': 'Resources',
        'footer.col_legal': 'Legal',
        'footer.col_social': 'Follow Us',
        'footer.about': 'About',
        'footer.contact': 'Contact',
        'footer.faq': 'FAQ',
        'footer.submissions': 'Submit Song',
        'footer.terms': 'Terms of Use',
        'footer.privacy': 'Privacy Policy',
        'footer.cookies': 'Cookie Policy',
        'footer.rights': 'All rights reserved',
        'footer.director': 'Directed by'
    },
    pt: {
        'nav.home': 'Início',
        'nav.explore': 'Explorar',
        'nav.academy': 'Academia',
        'nav.anuncios': 'Anúncios',
        'nav.collections': 'Coleções',
        'nav.directory': 'Diretório',
        'nav.blog': 'Blog',
        'nav.chatbot_ia': 'Chatbot IA',
        'nav.repertorio': 'Repertório',
        'nav.audios': 'Áudios',
        'nav.estilos': 'Estilos',
        'nav.partituras': 'Partituras',
        'nav.wiki': 'Wiki Mariachi',
        'nav.chatbot': 'Chatbot Musical',
        'nav.submit': 'Enviar Canção',
        'login': 'Iniciar Sessão',
        'auth.welcome': 'Bem-vindo',

        // Home
        'home.badge': 'Canção do Dia',
        'home.title': 'O Portal do Mariachi',
        'home.subtitle': 'México Madeira',
        'home.description': 'A enciclopédia digital mais completa do mariachi. Descobre, aprende e partilha a riqueza musical do México com o mundo.',
        'home.btn_repertorio': 'Explorar Repertório',
        'home.btn_audios': 'Ouvir Áudios',

        // Sections
        'repertorio.title': 'Repertório Mariachi',
        'repertorio.subtitle': 'Explora a coleção mais completa de música mariachi',
        'academy.title': 'Academia Mariachi',
        'academy.subtitle': 'Aprende com os melhores mestres do mariachi',
        'directory.title': 'Diretório de Mariachis',
        'directory.subtitle': 'Os melhores mariachis e profissionais do México',
        'blog.title': 'Blog Mariachi',
        'blog.subtitle': 'Artigos, notícias e recursos sobre a música mariachi',

        // Footer
        'footer.newsletter_title': 'Recebe as melhores canções do mariachi',
        'footer.newsletter_desc': 'Subscreve para receber novidades, prémios e conteúdo exclusivo',
        'footer.email_placeholder': 'O teu email',
        'footer.subscribe': 'Subscrever',
        'footer.col_portal': 'Portal',
        'footer.col_resources': 'Recursos',
        'footer.col_legal': 'Legal',
        'footer.col_social': 'Segue-nos',
        'footer.about': 'Sobre',
        'footer.contact': 'Contacto',
        'footer.faq': 'Perguntas Frequentes',
        'footer.submissions': 'Enviar Canção',
        'footer.terms': 'Termos de Uso',
        'footer.privacy': 'Política de Privacidade',
        'footer.cookies': 'Política de Cookies',
        'footer.rights': 'Todos os direitos reservados',
        'footer.director': 'Dirigido por'
    }
};

export function getDictionaryClient(lang: Language) {
    return {
        t: (key: string) => dictionaries[lang][key] || key
    };
}
