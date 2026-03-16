/**
 * MARIACHI PORTAL - Translation System
 * ES (Principal), EN, PT-PT
 */
const translations = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.explore': 'Explorar',
        'nav.academy': 'Academia',
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
        'login.title': 'Iniciar Sesión',
        'login.email': 'Correo Electrónico',
        'login.password': 'Contraseña',
        'login.submit': 'Entrar',
        'login.register_prompt': '¿No tienes cuenta?',
        'login.register': 'Regístrate aquí',

        // Home / Hero
        'home.badge': 'Canción del Día',
        'home.title': 'El Portal del Mariachi',
        'home.subtitle': 'México Madeira',
        'home.description': 'La enciclopedia digital más completa del mariachi. Descubre, aprende y comparte la riqueza musical de México con el mundo.',
        'home.btn_repertorio': 'Explorar Repertorio',
        'home.btn_audios': 'Escuchar Audios',
        'home.featured_title': 'El Son de la Negra',
        'home.featured_desc': 'El son más emblemático de Jalisco, reconocido internacionalmente como símbolo de la música mariachi.',
        'home.composer': 'Compositor',
        'home.style': 'Estilo',
        'home.year': 'Año',
        'home.traditional': 'Tradicional',
        'home.son_jalisciense': 'Son Jalisciense',
        'home.listen_now': 'Escuchar Ahora',
        'home.vote_now': 'Votar Ahora',
        'stats.songs': 'Canciones',
        'stats.audios': 'Audios',
        'stats.scores': 'Partituras',
        'stats.styles': 'Estilos',

        // Awards
        'awards.title_awards': 'Premios',
        'awards.title_nominees': 'Nominados',
        'awards.title_trending': 'Tendencias',
        'awards.title_winners': 'Ganadores',
        'awards.subtitle': 'Las mejores canciones mariachi seleccionadas por nuestra comunidad',
        'awards.by': 'Por',
        'awards.view_details': 'Ver Detalles',
        'awards.badge_winner': 'GANADOR',
        'awards.badge_nominee': 'NOMINADO',
        'awards.badge_top': 'TOP #1',
        'awards.badge_classic': 'CLÁSICO',
        'awards.badge_popular': 'POPULAR',
        'awards.badge_trending': 'TRENDING',

        // Repertorio
        'repertorio.title': 'Repertorio Mariachi',
        'repertorio.subtitle': 'Explora la colección más completa de música mariachi',

        // Stub sections
        'audios.title': 'Audios - En Construcción',
        'partituras.title': 'Partituras - En Construcción',
        'estilos.title': 'Estilos - En Construcción',
        'wiki.title': 'Wiki Mariachi - En Construcción',
        'chatbot.title': 'Chatbot Musical - En Construcción',
        'admin.title': 'Panel de Administración - En Construcción',

        // Academy
        'academy.title': 'Academia Mariachi',
        'academy.subtitle': 'Aprende con los mejores maestros del mariachi',
        'academy.by_maestro': 'Por Maestro',
        'academy.by_maestra': 'Por Maestra',
        'academy.course1': 'Técnicas Avanzadas de Violín Mariachi',
        'academy.course2': 'Trompeta Mariachi: De Principiante a Profesional',
        'academy.course3': 'Guitarrón: El Corazón del Mariachi',
        'academy.instructor1': 'Luis Hernández',
        'academy.instructor2': 'Ana García',
        'academy.instructor3': 'Carlos Mendoza',
        'academy.students': 'estudiantes',
        'academy.lessons': 'lecciones',
        'academy.hours': 'horas',
        'academy.free': 'GRATIS',

        // Collections
        'collections.title': 'Colecciones Especiales',
        'collections.subtitle': 'Colecciones curadas de las mejores canciones mariachi',
        'collections.col1_title': 'Sones Jaliscienses Clásicos',
        'collections.col1_cat': 'Música Tradicional',
        'collections.col1_desc': 'La mejor selección de sones tradicionales de Jalisco',
        'collections.col2_title': 'Rancheras Inolvidables',
        'collections.col2_cat': 'Género Ranchera',
        'collections.col2_desc': 'Las rancheras más emblemáticas del repertorio mariachi',
        'collections.col3_title': 'Boleros Mariachi',
        'collections.col3_cat': 'Baladas Románticas',
        'collections.col3_desc': 'Los boleros más románticos interpretados en mariachi',
        'collections.songs': 'canciones',
        'collections.favorites': 'favoritos',

        // Directory
        'directory.title': 'Directorio de Mariachis',
        'directory.subtitle': 'Los mejores mariachis y profesionales de México',
        'directory.registered': 'Mariachis y Profesionales registrados',
        'directory.pro_group': 'Agrupación Profesional',
        'directory.intl_group': 'Agrupación Internacional',
        'directory.trad_group': 'Agrupación Tradicional',
        'directory.reg_group': 'Agrupación Regional',
        'directory.presentations': 'Presentaciones',
        'directory.awards': 'Premios',

        // Blog
        'blog.title': 'Blog Mariachi',
        'blog.subtitle': 'Artículos, noticias y recursos sobre la música mariachi',
        'blog.post1_title': 'La Historia del Mariachi: De Cocula a Todo el Mundo',
        'blog.post1_excerpt': 'Descubre los orígenes del mariachi en Cocula, Jalisco, y cómo se convirtió en un símbolo cultural reconocido internacionalmente.',
        'blog.post2_title': '10 Técnicas Esenciales para Tocar la Trompeta Mariachi',
        'blog.post2_excerpt': 'Una guía completa para músicos que desean perfeccionar su técnica de trompeta en el contexto del mariachi tradicional.',
        'blog.post3_title': 'El Violín en el Mariachi: Más Allá de la Melodía',
        'blog.post3_excerpt': 'Exploramos el papel fundamental del violín en el mariachi y las técnicas que lo hacen único en este género musical.',
        'blog.read_more': 'Leer más',
        'blog.date1': '15 de Marzo, 2026',
        'blog.date2': '10 de Marzo, 2026',
        'blog.date3': '5 de Marzo, 2026',

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
        // Navigation
        'nav.home': 'Home',
        'nav.explore': 'Explore',
        'nav.academy': 'Academy',
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
        'login.title': 'Sign In',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.submit': 'Sign In',
        'login.register_prompt': "Don't have an account?",
        'login.register': 'Register here',

        // Home / Hero
        'home.badge': 'Song of the Day',
        'home.title': 'The Mariachi Portal',
        'home.subtitle': 'México Madeira',
        'home.description': 'The most complete digital encyclopedia of mariachi music. Discover, learn and share the musical richness of Mexico with the world.',
        'home.btn_repertorio': 'Explore Repertoire',
        'home.btn_audios': 'Listen to Audios',
        'home.featured_title': 'El Son de la Negra',
        'home.featured_desc': 'The most emblematic son of Jalisco, internationally recognized as a symbol of mariachi music.',
        'home.composer': 'Composer',
        'home.style': 'Style',
        'home.year': 'Year',
        'home.traditional': 'Traditional',
        'home.son_jalisciense': 'Son Jalisciense',
        'home.listen_now': 'Listen Now',
        'home.vote_now': 'Vote Now',
        'stats.songs': 'Songs',
        'stats.audios': 'Audios',
        'stats.scores': 'Scores',
        'stats.styles': 'Styles',

        // Awards
        'awards.title_awards': 'Awards',
        'awards.title_nominees': 'Nominees',
        'awards.title_trending': 'Trending',
        'awards.title_winners': 'Winners',
        'awards.subtitle': 'The best mariachi songs selected by our community',
        'awards.by': 'By',
        'awards.view_details': 'View Details',
        'awards.badge_winner': 'WINNER',
        'awards.badge_nominee': 'NOMINEE',
        'awards.badge_top': 'TOP #1',
        'awards.badge_classic': 'CLASSIC',
        'awards.badge_popular': 'POPULAR',
        'awards.badge_trending': 'TRENDING',

        // Repertorio
        'repertorio.title': 'Mariachi Repertoire',
        'repertorio.subtitle': 'Explore the most complete collection of mariachi music',

        // Stub sections
        'audios.title': 'Audios - Under Construction',
        'partituras.title': 'Sheet Music - Under Construction',
        'estilos.title': 'Styles - Under Construction',
        'wiki.title': 'Mariachi Wiki - Under Construction',
        'chatbot.title': 'Music Chatbot - Under Construction',
        'admin.title': 'Admin Panel - Under Construction',

        // Academy
        'academy.title': 'Mariachi Academy',
        'academy.subtitle': 'Learn from the best mariachi masters',
        'academy.by_maestro': 'By Master',
        'academy.by_maestra': 'By Master',
        'academy.course1': 'Advanced Mariachi Violin Techniques',
        'academy.course2': 'Mariachi Trumpet: From Beginner to Professional',
        'academy.course3': 'Guitarrón: The Heart of the Mariachi',
        'academy.instructor1': 'Luis Hernández',
        'academy.instructor2': 'Ana García',
        'academy.instructor3': 'Carlos Mendoza',
        'academy.students': 'students',
        'academy.lessons': 'lessons',
        'academy.hours': 'hours',
        'academy.free': 'FREE',

        // Collections
        'collections.title': 'Special Collections',
        'collections.subtitle': 'Curated collections of the best mariachi songs',
        'collections.col1_title': 'Classic Sones Jaliscienses',
        'collections.col1_cat': 'Traditional Music',
        'collections.col1_desc': 'The best selection of traditional sones from Jalisco',
        'collections.col2_title': 'Unforgettable Rancheras',
        'collections.col2_cat': 'Ranchera Genre',
        'collections.col2_desc': 'The most emblematic rancheras of the mariachi repertoire',
        'collections.col3_title': 'Mariachi Boleros',
        'collections.col3_cat': 'Romantic Ballads',
        'collections.col3_desc': 'The most romantic boleros performed in mariachi style',
        'collections.songs': 'songs',
        'collections.favorites': 'favorites',

        // Directory
        'directory.title': 'Mariachi Directory',
        'directory.subtitle': 'The best mariachis and professionals from Mexico',
        'directory.registered': 'Mariachis and Professionals registered',
        'directory.pro_group': 'Professional Group',
        'directory.intl_group': 'International Group',
        'directory.trad_group': 'Traditional Group',
        'directory.reg_group': 'Regional Group',
        'directory.presentations': 'Performances',
        'directory.awards': 'Awards',

        // Blog
        'blog.title': 'Mariachi Blog',
        'blog.subtitle': 'Articles, news and resources about mariachi music',
        'blog.post1_title': 'The History of Mariachi: From Cocula to the World',
        'blog.post1_excerpt': 'Discover the origins of mariachi in Cocula, Jalisco, and how it became an internationally recognized cultural symbol.',
        'blog.post2_title': '10 Essential Techniques for Playing Mariachi Trumpet',
        'blog.post2_excerpt': 'A complete guide for musicians who want to perfect their trumpet technique in the context of traditional mariachi.',
        'blog.post3_title': 'The Violin in Mariachi: Beyond the Melody',
        'blog.post3_excerpt': 'We explore the fundamental role of the violin in mariachi and the techniques that make it unique in this musical genre.',
        'blog.read_more': 'Read more',
        'blog.date1': 'March 15, 2026',
        'blog.date2': 'March 10, 2026',
        'blog.date3': 'March 5, 2026',

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
        // Navigation
        'nav.home': 'Início',
        'nav.explore': 'Explorar',
        'nav.academy': 'Academia',
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
        'login.title': 'Iniciar Sessão',
        'login.email': 'Email',
        'login.password': 'Palavra-passe',
        'login.submit': 'Entrar',
        'login.register_prompt': 'Não tens conta?',
        'login.register': 'Regista-te aqui',

        // Home / Hero
        'home.badge': 'Canção do Dia',
        'home.title': 'O Portal do Mariachi',
        'home.subtitle': 'México Madeira',
        'home.description': 'A enciclopédia digital mais completa do mariachi. Descobre, aprende e partilha a riqueza musical do México com o mundo.',
        'home.btn_repertorio': 'Explorar Repertório',
        'home.btn_audios': 'Ouvir Áudios',
        'home.featured_title': 'El Son de la Negra',
        'home.featured_desc': 'O son mais emblemático de Jalisco, reconhecido internacionalmente como símbolo da música mariachi.',
        'home.composer': 'Compositor',
        'home.style': 'Estilo',
        'home.year': 'Ano',
        'home.traditional': 'Tradicional',
        'home.son_jalisciense': 'Son Jalisciense',
        'home.listen_now': 'Ouvir Agora',
        'home.vote_now': 'Votar Agora',
        'stats.songs': 'Canções',
        'stats.audios': 'Áudios',
        'stats.scores': 'Partituras',
        'stats.styles': 'Estilos',

        // Awards
        'awards.title_awards': 'Prémios',
        'awards.title_nominees': 'Nomeados',
        'awards.title_trending': 'Tendências',
        'awards.title_winners': 'Vencedores',
        'awards.subtitle': 'As melhores canções mariachi selecionadas pela nossa comunidade',
        'awards.by': 'Por',
        'awards.view_details': 'Ver Detalhes',
        'awards.badge_winner': 'VENCEDOR',
        'awards.badge_nominee': 'NOMEADO',
        'awards.badge_top': 'TOP #1',
        'awards.badge_classic': 'CLÁSSICO',
        'awards.badge_popular': 'POPULAR',
        'awards.badge_trending': 'TENDÊNCIA',

        // Repertorio
        'repertorio.title': 'Repertório Mariachi',
        'repertorio.subtitle': 'Explora a coleção mais completa de música mariachi',

        // Stub sections
        'audios.title': 'Áudios - Em Construção',
        'partituras.title': 'Partituras - Em Construção',
        'estilos.title': 'Estilos - Em Construção',
        'wiki.title': 'Wiki Mariachi - Em Construção',
        'chatbot.title': 'Chatbot Musical - Em Construção',
        'admin.title': 'Painel de Administração - Em Construção',

        // Academy
        'academy.title': 'Academia Mariachi',
        'academy.subtitle': 'Aprende com os melhores mestres do mariachi',
        'academy.by_maestro': 'Por Mestre',
        'academy.by_maestra': 'Por Mestra',
        'academy.course1': 'Técnicas Avançadas de Violino Mariachi',
        'academy.course2': 'Trompete Mariachi: De Iniciante a Profissional',
        'academy.course3': 'Guitarrón: O Coração do Mariachi',
        'academy.instructor1': 'Luis Hernández',
        'academy.instructor2': 'Ana García',
        'academy.instructor3': 'Carlos Mendoza',
        'academy.students': 'estudantes',
        'academy.lessons': 'lições',
        'academy.hours': 'horas',
        'academy.free': 'GRÁTIS',

        // Collections
        'collections.title': 'Coleções Especiais',
        'collections.subtitle': 'Coleções curadas das melhores canções mariachi',
        'collections.col1_title': 'Sones Jaliscienses Clássicos',
        'collections.col1_cat': 'Música Tradicional',
        'collections.col1_desc': 'A melhor seleção de sones tradicionais de Jalisco',
        'collections.col2_title': 'Rancheras Inesquecíveis',
        'collections.col2_cat': 'Género Ranchera',
        'collections.col2_desc': 'As rancheras mais emblemáticas do repertório mariachi',
        'collections.col3_title': 'Boleros Mariachi',
        'collections.col3_cat': 'Baladas Românticas',
        'collections.col3_desc': 'Os boleros mais românticos interpretados em mariachi',
        'collections.songs': 'canções',
        'collections.favorites': 'favoritos',

        // Directory
        'directory.title': 'Diretório de Mariachis',
        'directory.subtitle': 'Os melhores mariachis e profissionais do México',
        'directory.registered': 'Mariachis e Profissionais registados',
        'directory.pro_group': 'Agrupação Profissional',
        'directory.intl_group': 'Agrupação Internacional',
        'directory.trad_group': 'Agrupação Tradicional',
        'directory.reg_group': 'Agrupação Regional',
        'directory.presentations': 'Apresentações',
        'directory.awards': 'Prémios',

        // Blog
        'blog.title': 'Blog Mariachi',
        'blog.subtitle': 'Artigos, notícias e recursos sobre a música mariachi',
        'blog.post1_title': 'A História do Mariachi: De Cocula para Todo o Mundo',
        'blog.post1_excerpt': 'Descobre as origens do mariachi em Cocula, Jalisco, e como se tornou um símbolo cultural reconhecido internacionalmente.',
        'blog.post2_title': '10 Técnicas Essenciais para Tocar Trompete Mariachi',
        'blog.post2_excerpt': 'Um guia completo para músicos que desejam aperfeiçoar a sua técnica de trompete no contexto do mariachi tradicional.',
        'blog.post3_title': 'O Violino no Mariachi: Para Além da Melodia',
        'blog.post3_excerpt': 'Exploramos o papel fundamental do violino no mariachi e as técnicas que o tornam único neste género musical.',
        'blog.read_more': 'Ler mais',
        'blog.date1': '15 de Março, 2026',
        'blog.date2': '10 de Março, 2026',
        'blog.date3': '5 de Março, 2026',

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

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('mariachi_lang') || 'es';
        this.translations = translations;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('mariachi_lang', lang);
            this.updatePageTranslations();
            document.documentElement.lang = lang;
        }
    }

    t(key) {
        return this.translations[this.currentLang][key] || this.translations['es'][key] || key;
    }

    updatePageTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    }
}

const i18n = new I18n();
window.translations = translations;
window.i18n = i18n;

document.addEventListener('DOMContentLoaded', () => {
    i18n.updatePageTranslations();
});
