/**
 * Seed database with initial mariachi content
 * Run: node db/seed.js
 */
const pool = require('./pool');

async function seed() {
    console.log('Seeding database...');

    // ===================================
    // SONGS
    // ===================================
    const songs = [
        { title: 'El Son de la Negra', composer: 'Blas Galindo (arr.)', style: 'Son Jalisciense', year: 'Tradicional', description: 'El son más emblemático de Jalisco, reconocido internacionalmente como símbolo de la música mariachi. Declarado patrimonio cultural.', score_rating: 9.2, badge: 'GANADOR', is_featured: true },
        { title: 'La Bikina', composer: 'Rubén Fuentes', style: 'Bolero Ranchero', year: '1964', description: 'Una de las canciones más interpretadas del repertorio mariachi, con su inconfundible introducción de trompetas.', score_rating: 8.9, badge: 'NOMINADO' },
        { title: 'El Rey', composer: 'José Alfredo Jiménez', style: 'Ranchera', year: '1971', description: 'Himno ranchero por excelencia. "Con dinero y sin dinero, hago siempre lo que quiero..."', score_rating: 9.5, badge: 'TOP #1' },
        { title: 'Cielito Lindo', composer: 'Quirino Mendoza y Cortés', style: 'Son Huasteco', year: '1882', description: 'Canción mexicana conocida mundialmente. Su estribillo "Ay, ay, ay, ay" es reconocido en todo el planeta.', score_rating: 9.0, badge: 'CLÁSICO' },
        { title: 'Las Mañanitas', composer: 'Tradicional', style: 'Canción Mexicana', year: 'Tradicional', description: 'La canción de cumpleaños por excelencia en México y Latinoamérica.', score_rating: 8.7, badge: 'POPULAR' },
        { title: 'Volver Volver', composer: 'Fernando Z. Maldonado', style: 'Ranchera', year: '1972', description: 'Inmortalizada por Vicente Fernández, esta ranchera es imprescindible en toda fiesta mexicana.', score_rating: 9.1, badge: 'TRENDING' },
        { title: 'Guadalajara', composer: 'Pepe Guízar', style: 'Son Jalisciense', year: '1937', description: 'Himno a la capital de Jalisco, tierra del mariachi. Reconocida como segundo himno de México.', score_rating: 8.8, badge: 'CLÁSICO' },
        { title: 'Si Nos Dejan', composer: 'José Alfredo Jiménez', style: 'Bolero Ranchero', year: '1970', description: 'Bolero romántico que ha sido interpretado por los más grandes artistas del mariachi.', score_rating: 8.6, badge: 'NOMINADO' },
        { title: 'México Lindo y Querido', composer: 'Chucho Monge', style: 'Ranchera', year: '1921', description: 'Canción patriótica que expresa el amor por México. Interpretada en todo el mundo.', score_rating: 9.0, badge: 'CLÁSICO' },
        { title: 'La Cucaracha', composer: 'Tradicional', style: 'Corrido', year: 'Tradicional', description: 'Corrido revolucionario que se convirtió en una de las canciones mexicanas más conocidas mundialmente.', score_rating: 7.5, badge: 'POPULAR' },
        { title: 'Amor Eterno', composer: 'Juan Gabriel', style: 'Balada Ranchera', year: '1984', description: 'Composición de Juan Gabriel dedicada a su madre. Una de las baladas más emotivas del repertorio mexicano.', score_rating: 9.4, badge: 'TOP #1' },
        { title: 'El Huapango de Moncayo', composer: 'José Pablo Moncayo', style: 'Huapango', year: '1941', description: 'Obra sinfónica basada en sones huastecos. Considerada la pieza orquestal más importante de México.', score_rating: 9.3, badge: 'GANADOR' },
    ];

    for (const s of songs) {
        await pool.query(
            `INSERT INTO songs (title, composer, style, year, description, score_rating, badge, is_featured)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
            [s.title, s.composer, s.style, s.year, s.description, s.score_rating, s.badge, s.is_featured || false]
        );
    }
    console.log(`  ${songs.length} songs seeded`);

    // ===================================
    // COLLECTIONS
    // ===================================
    const collections = [
        { title: 'Sones Jaliscienses Clásicos', category: 'Música Tradicional', icon: '🎵', description: 'La mejor selección de sones tradicionales de Jalisco, cuna del mariachi.' },
        { title: 'Rancheras Inolvidables', category: 'Género Ranchera', icon: '🎺', description: 'Las rancheras más emblemáticas del repertorio mariachi de todos los tiempos.' },
        { title: 'Boleros Mariachi', category: 'Baladas Románticas', icon: '💚', description: 'Los boleros más románticos interpretados en estilo mariachi.' },
        { title: 'Corridos Mexicanos', category: 'Corrido Tradicional', icon: '🎸', description: 'Corridos que narran la historia y las leyendas de México.' },
        { title: 'Huapangos', category: 'Son Huasteco', icon: '🎻', description: 'La tradición huasteca en su máxima expresión musical.' },
    ];

    for (const c of collections) {
        await pool.query(
            `INSERT INTO collections (title, category, icon, description) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
            [c.title, c.category, c.icon, c.description]
        );
    }
    console.log(`  ${collections.length} collections seeded`);

    // ===================================
    // MARIACHIS
    // ===================================
    const mariachis = [
        { name: 'Mariachi Vargas de Tecalitlán', type: 'Agrupación Profesional', location: 'Tecalitlán, Jalisco', presentations: 250, awards: 12, is_pro: true, description: 'Fundado en 1898, es el mariachi más antiguo y prestigioso del mundo.' },
        { name: 'Mariachi Sol de México', type: 'Agrupación Internacional', location: 'Ciudad de México', presentations: 180, awards: 8, is_pro: true, description: 'Dirigido por José Hernández, reconocido internacionalmente por su excelencia musical.' },
        { name: 'Mariachi Los Camperos', type: 'Agrupación Tradicional', location: 'Los Ángeles, California', presentations: 200, awards: 15, is_pro: true, description: 'Fundado por Nati Cano, ganador de múltiples premios Grammy.' },
        { name: 'Mariachi Nuevo Tecalitlán', type: 'Agrupación Regional', location: 'Guadalajara, Jalisco', presentations: 95, awards: 5, is_pro: false, description: 'Agrupación joven que mantiene viva la tradición del mariachi jalisciense.' },
        { name: 'Mariachi Internacional Guadalajara', type: 'Agrupación Profesional', location: 'Guadalajara, Jalisco', presentations: 150, awards: 7, is_pro: true, description: 'Grupo de renombre que representa la tradición del mariachi en eventos internacionales.' },
        { name: 'Mariachi México de Madeira', type: 'Agrupación Internacional', location: 'Funchal, Madeira', presentations: 50, awards: 2, is_pro: true, description: 'Primer mariachi establecido en Portugal, difundiendo la cultura mexicana en Europa.' },
    ];

    for (const m of mariachis) {
        await pool.query(
            `INSERT INTO mariachis (name, type, location, presentations, awards, is_pro, description)
             VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
            [m.name, m.type, m.location, m.presentations, m.awards, m.is_pro, m.description]
        );
    }
    console.log(`  ${mariachis.length} mariachis seeded`);

    // ===================================
    // COURSES
    // ===================================
    const courses = [
        { title: 'Técnicas Avanzadas de Violín Mariachi', instructor_name: 'Maestro Luis Hernández', icon: '🎻', lessons: 12, hours: 8, rating: 5.0, student_count: 234, is_free: true },
        { title: 'Trompeta Mariachi: De Principiante a Profesional', instructor_name: 'Maestra Ana García', icon: '🎺', lessons: 20, hours: 12, rating: 4.9, student_count: 189, is_free: true },
        { title: 'Guitarrón: El Corazón del Mariachi', instructor_name: 'Maestro Carlos Mendoza', icon: '🎸', lessons: 15, hours: 10, rating: 5.0, student_count: 312, is_free: true },
        { title: 'Vihuela Mexicana: Ritmo y Armonía', instructor_name: 'Maestro Roberto Pérez', icon: '🎵', lessons: 10, hours: 6, rating: 4.8, student_count: 156, is_free: true },
        { title: 'Historia del Mariachi: De Cocula al Mundo', instructor_name: 'Dr. María Fernández', icon: '📚', lessons: 8, hours: 4, rating: 4.7, student_count: 420, is_free: true },
    ];

    for (const c of courses) {
        await pool.query(
            `INSERT INTO courses (title, instructor_name, icon, lessons, hours, rating, student_count, is_free)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
            [c.title, c.instructor_name, c.icon, c.lessons, c.hours, c.rating, c.student_count, c.is_free]
        );
    }
    console.log(`  ${courses.length} courses seeded`);

    // ===================================
    // BLOG POSTS
    // ===================================
    const posts = [
        {
            title: 'La Historia del Mariachi: De Cocula a Todo el Mundo',
            slug: 'historia-del-mariachi',
            icon: '📖',
            excerpt: 'Descubre los orígenes del mariachi en Cocula, Jalisco, y cómo se convirtió en un símbolo cultural reconocido internacionalmente.',
            content: '<h2>Los orígenes</h2><p>El mariachi nació en el occidente de México, específicamente en la región de Cocula, Jalisco, durante el siglo XIX. Los primeros conjuntos utilizaban instrumentos de cuerda: violines, vihuela y guitarrón.</p><h2>La evolución</h2><p>A principios del siglo XX, el mariachi migró a las ciudades y se incorporó la trompeta, dándole ese sonido brillante que lo caracteriza hoy. El Mariachi Vargas de Tecalitlán, fundado en 1898, fue pionero en esta transformación.</p><h2>Patrimonio de la Humanidad</h2><p>En 2011, la UNESCO declaró al mariachi como Patrimonio Cultural Inmaterial de la Humanidad, reconociendo su importancia como expresión artística y cultural de México.</p>',
            author_name: 'Jorge L. Garcia', status: 'published'
        },
        {
            title: '10 Técnicas Esenciales para Tocar la Trompeta Mariachi',
            slug: 'tecnicas-trompeta-mariachi',
            icon: '🎺',
            excerpt: 'Una guía completa para músicos que desean perfeccionar su técnica de trompeta en el contexto del mariachi tradicional.',
            content: '<h2>La trompeta en el mariachi</h2><p>La trompeta fue incorporada al mariachi en la década de 1930, transformando para siempre el sonido del género. Hoy es uno de los instrumentos más emblemáticos del conjunto.</p><h2>Técnicas fundamentales</h2><p>El dominio del vibrato, el uso del registro agudo, la articulación limpia y el control de la respiración son esenciales. Los grandes trompetistas mariachi como Pedro Infante y Miguel Martínez establecieron el estándar.</p><h2>Práctica diaria</h2><p>Se recomienda al menos 2 horas diarias de práctica, divididas entre escalas, estudios de repertorio y ensayo con el conjunto.</p>',
            author_name: 'Ana M. Hernández', status: 'published'
        },
        {
            title: 'El Violín en el Mariachi: Más Allá de la Melodía',
            slug: 'violin-en-el-mariachi',
            icon: '🎻',
            excerpt: 'Exploramos el papel fundamental del violín en el mariachi y las técnicas que lo hacen único en este género musical.',
            content: '<h2>El alma del mariachi</h2><p>El violín es el instrumento más antiguo del mariachi y su columna vertebral melódica. Un mariachi profesional puede tener hasta 8 violines en su formación.</p><h2>Estilo único</h2><p>El estilo violinístico del mariachi se distingue del clásico por su uso del portamento, el tremolo y un vibrato más amplio. Los adornos y floreos son parte esencial de la interpretación.</p><h2>Grandes violinistas</h2><p>Figuras como Gaspar Vargas y José Reyes elevaron el violín mariachi a nivel artístico, creando un legado que continúa inspirando a nuevas generaciones.</p>',
            author_name: 'Carlos Mendoza', status: 'published'
        }
    ];

    for (const p of posts) {
        await pool.query(
            `INSERT INTO blog_posts (title, slug, excerpt, content, icon, author_name, status, published_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) ON CONFLICT (slug) DO NOTHING`,
            [p.title, p.slug, p.excerpt, p.content, p.icon, p.author_name, p.status]
        );
    }
    console.log(`  ${posts.length} blog posts seeded`);

    console.log('Seed complete!');
}

seed().then(() => pool.end()).catch(err => { console.error(err); pool.end(); });
