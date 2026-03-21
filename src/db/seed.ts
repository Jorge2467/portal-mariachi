/**
 * Portal del Mariachi — Database Seed Script
 * Ejecutar: npx tsx src/db/seed.ts
 * Requiere DATABASE_URL en .env
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ DATABASE_URL no configurada');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log('🌱 Seeding Portal del Mariachi...\n');

  // ===================================
  // ADMIN USER
  // ===================================
  const adminHash = await bcrypt.hash('admin2026!', 10);
  const [adminUser] = await db.insert(schema.users).values({
    name: 'Administrador',
    email: 'admin@portalmariachi.com',
    passwordHash: adminHash,
    role: 'admin',
    isActive: true,
  }).onConflictDoNothing({ target: schema.users.email }).returning();
  console.log('✅ Admin user seeded');

  // ===================================
  // SONGS (12 canciones emblemáticas)
  // ===================================
  const songsData = [
    { title: 'El Son de la Negra', composer: 'Blas Galindo (arr.)', style: 'Son Jalisciense', year: 'Tradicional', description: 'El son más emblemático de Jalisco, reconocido internacionalmente como símbolo de la música mariachi. Declarado patrimonio cultural.', scoreRating: '9.2', badge: 'GANADOR', isFeatured: true },
    { title: 'La Bikina', composer: 'Rubén Fuentes', style: 'Bolero Ranchero', year: '1964', description: 'Una de las canciones más interpretadas del repertorio mariachi, con su inconfundible introducción de trompetas.', scoreRating: '8.9', badge: 'NOMINADO', isFeatured: true },
    { title: 'El Rey', composer: 'José Alfredo Jiménez', style: 'Ranchera', year: '1971', description: 'Himno ranchero por excelencia. Una de las composiciones más icónicas de la música mexicana.', scoreRating: '9.5', badge: 'TOP #1', isFeatured: true },
    { title: 'Cielito Lindo', composer: 'Quirino Mendoza y Cortés', style: 'Son Huasteco', year: '1882', description: 'Canción mexicana conocida mundialmente. Su estribillo es reconocido en todo el planeta.', scoreRating: '9.0', badge: 'CLÁSICO', isFeatured: true },
    { title: 'Las Mañanitas', composer: 'Tradicional', style: 'Canción Mexicana', year: 'Tradicional', description: 'La canción de cumpleaños por excelencia en México y Latinoamérica.', scoreRating: '8.7', badge: 'POPULAR', isFeatured: true },
    { title: 'Volver Volver', composer: 'Fernando Z. Maldonado', style: 'Ranchera', year: '1972', description: 'Inmortalizada por Vicente Fernández, esta ranchera es imprescindible en toda fiesta mexicana.', scoreRating: '9.1', badge: 'TRENDING', isFeatured: true },
    { title: 'Guadalajara', composer: 'Pepe Guízar', style: 'Son Jalisciense', year: '1937', description: 'Himno a la capital de Jalisco, tierra del mariachi. Reconocida como segundo himno de México.', scoreRating: '8.8', badge: 'CLÁSICO', isFeatured: false },
    { title: 'Si Nos Dejan', composer: 'José Alfredo Jiménez', style: 'Bolero Ranchero', year: '1970', description: 'Bolero romántico que ha sido interpretado por los más grandes artistas del mariachi.', scoreRating: '8.6', badge: 'NOMINADO', isFeatured: false },
    { title: 'México Lindo y Querido', composer: 'Chucho Monge', style: 'Ranchera', year: '1921', description: 'Canción patriótica que expresa el amor por México. Interpretada en todo el mundo.', scoreRating: '9.0', badge: 'CLÁSICO', isFeatured: false },
    { title: 'La Cucaracha', composer: 'Tradicional', style: 'Corrido', year: 'Tradicional', description: 'Corrido revolucionario que se convirtió en una de las canciones mexicanas más conocidas mundialmente.', scoreRating: '7.5', badge: 'POPULAR', isFeatured: false },
    { title: 'Amor Eterno', composer: 'Juan Gabriel', style: 'Balada Ranchera', year: '1984', description: 'Composición de Juan Gabriel dedicada a su madre. Una de las baladas más emotivas del repertorio mexicano.', scoreRating: '9.4', badge: 'TOP #1', isFeatured: true },
    { title: 'El Huapango de Moncayo', composer: 'José Pablo Moncayo', style: 'Huapango', year: '1941', description: 'Obra sinfónica basada en sones huastecos. Considerada la pieza orquestal más importante de México.', scoreRating: '9.3', badge: 'GANADOR', isFeatured: true },
  ];

  await db.insert(schema.songs).values(songsData).onConflictDoNothing();
  console.log(`✅ ${songsData.length} songs seeded`);

  // ===================================
  // COLLECTIONS
  // ===================================
  const collectionsData = [
    { title: 'Sones Jaliscienses Clásicos', category: 'Música Tradicional', icon: '🎵', description: 'La mejor selección de sones tradicionales de Jalisco, cuna del mariachi.' },
    { title: 'Rancheras Inolvidables', category: 'Género Ranchera', icon: '🎺', description: 'Las rancheras más emblemáticas del repertorio mariachi de todos los tiempos.' },
    { title: 'Boleros Mariachi', category: 'Baladas Románticas', icon: '💚', description: 'Los boleros más románticos interpretados en estilo mariachi.' },
    { title: 'Corridos Mexicanos', category: 'Corrido Tradicional', icon: '🎸', description: 'Corridos que narran la historia y las leyendas de México.' },
    { title: 'Huapangos', category: 'Son Huasteco', icon: '🎻', description: 'La tradición huasteca en su máxima expresión musical.' },
  ];

  await db.insert(schema.collections).values(collectionsData).onConflictDoNothing();
  console.log(`✅ ${collectionsData.length} collections seeded`);

  // ===================================
  // MARIACHIS (Hall of Fame)
  // ===================================
  const mariachisData = [
    { name: 'Mariachi Vargas de Tecalitlán', type: 'Tradicional', location: 'Ciudad de México', description: 'Fundado en 1898, es el mariachi más antiguo y reconocido del mundo.', awards: 15, presentations: 5000, isPro: true },
    { name: 'Mariachi de América', type: 'Moderno', location: 'Guadalajara, Jalisco', description: 'Uno de los mariachis más versátiles de México.', awards: 8, presentations: 3000, isPro: true },
    { name: 'Mariachi Sol de México', type: 'Internacional', location: 'Los Ángeles, CA', description: 'El mariachi más premiado de Estados Unidos.', awards: 12, presentations: 4000, isPro: true },
    { name: 'Mariachi Los Camperos', type: 'Tradicional', location: 'Los Ángeles, CA', description: 'Ganadores del Grammy, preservadores de la tradición.', awards: 10, presentations: 2500, isPro: true },
    { name: 'Mariachi Cobre', type: 'Show', location: 'Orlando, FL', description: 'Residentes permanentes de Epcot Center, Walt Disney World.', awards: 5, presentations: 8000, isPro: true },
    { name: 'Mariachi Internacional Guadalajara', type: 'Tradicional', location: 'Guadalajara, Jalisco', description: 'Representantes de la tradición jalisciense pura.', awards: 7, presentations: 2000, isPro: false },
  ];

  await db.insert(schema.mariachis).values(mariachisData).onConflictDoNothing();
  console.log(`✅ ${mariachisData.length} mariachis seeded`);

  // ===================================
  // MARIACHI DIRECTORY
  // ===================================
  const directoryData = [
    {
      groupName: 'Mariachi Internacional México Madeira',
      membersCount: 12,
      location: 'Ciudad de México, México',
      imageUrl: 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=400&q=80',
      bio: 'Agrupación de mariachi con más de 30 años de trayectoria internacional. Hemos actuado en más de 40 países representando la música mexicana con orgullo y tradición.',
      repertoire: 'Cielito Lindo, La Bamba, Guadalajara, El Rey, Volver Volver, Cucurrucucú Paloma, Las Mañanitas',
      contactName: 'Carlos Mendoza Rivas',
      whatsapp: '+52 55 8120 4455',
      email: 'contacto@mariachimexicomadeira.com',
      status: 'approved',
    },
    {
      groupName: 'Mariachi Garibaldi de Jalisco',
      membersCount: 8,
      location: 'Guadalajara, Jalisco, México',
      imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80',
      bio: 'Directamente de la cuna del mariachi, Jalisco. Especializados en sones, huapangos y rancheras auténticas del repertorio tradicional jalisciense.',
      repertoire: 'El Son de la Negra, La Negra, Jarabe Tapatio, Alla en el Rancho Grande, La Malagueña',
      contactName: 'Alejandro Torres',
      whatsapp: '+52 33 9856 2211',
      email: 'mariachi.garibaldi.jalisco@gmail.com',
      status: 'approved',
    },
    {
      groupName: 'Mariachi Madeira Portugal',
      membersCount: 6,
      location: 'Lisboa, Portugal',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
      bio: 'El único mariachi profesional de Portugal. Llevamos la música mexicana a Europa con un sabor auténtico y un servicio de cinco estrellas para bodas, eventos corporativos y celebraciones.',
      repertoire: 'Bésame Mucho, Granada, Sabor a Mí, El Rancho Grande, Las Golondrinas, Ay Jalisco No Te Rajes',
      contactName: 'María João Santos',
      whatsapp: '+351 91 234 5678',
      email: 'mariachi.madeira.pt@gmail.com',
      status: 'approved',
    },
  ];

  await db.insert(schema.mariachiDirectory).values(directoryData).onConflictDoNothing();
  console.log(`✅ ${directoryData.length} directory entries seeded`);

  // ===================================
  // COURSES
  // ===================================
  const coursesData = [
    { title: 'Trompeta Mariachi — Nivel Básico', instructorName: 'Prof. Roberto Hernández', description: 'Aprende las técnicas fundamentales de la trompeta en el estilo mariachi.', icon: '🎺', lessons: 24, hours: '12', rating: '4.8', studentCount: 245, price: '0', isFree: true },
    { title: 'Vihuela y Armonía Mariachi', instructorName: 'Maestro Luis Rodríguez', description: 'Domina los rasgueos y patrones armónicos esenciales de la vihuela.', icon: '🎸', lessons: 18, hours: '9', rating: '4.9', studentCount: 189, price: '0', isFree: true },
    { title: 'Violín Mariachi — Técnica Avanzada', instructorName: 'Dra. Ana Martínez', description: 'Perfecciona tu técnica de violín con los ornamentos propios del mariachi.', icon: '🎻', lessons: 32, hours: '16', rating: '4.7', studentCount: 156, price: '49.99', isFree: false },
    { title: 'Canto Ranchero — Interpretación', instructorName: 'José Luis Gutiérrez', description: 'Desarrolla tu voz para el repertorio ranchero y bolero.', icon: '🎤', lessons: 20, hours: '10', rating: '4.6', studentCount: 312, price: '0', isFree: true },
    { title: 'Guitarrón — Bajo Mariachi', instructorName: 'Mtro. Francisco Díaz', description: 'El fundamento rítmico del mariachi: técnica de guitarrón desde cero.', icon: '🎵', lessons: 28, hours: '14', rating: '4.8', studentCount: 134, price: '29.99', isFree: false },
    { title: 'Historia del Mariachi', instructorName: 'Dra. Patricia Figueroa', description: 'Un recorrido completo por la evolución del mariachi desde el siglo XIX.', icon: '📚', lessons: 15, hours: '7.5', rating: '4.9', studentCount: 420, price: '0', isFree: true },
  ];

  await db.insert(schema.courses).values(coursesData).onConflictDoNothing();
  console.log(`✅ ${coursesData.length} courses seeded`);

  // ===================================
  // BLOG POSTS
  // ===================================
  const blogData = [
    {
      title: 'El Mariachi: Patrimonio Cultural Inmaterial de la Humanidad',
      slug: 'mariachi-patrimonio-unesco',
      excerpt: 'En 2011, la UNESCO reconoció al mariachi como patrimonio cultural inmaterial. Descubre qué significa esta distinción.',
      content: '<h2>Un reconocimiento merecido</h2><p>El 27 de noviembre de 2011, durante la sexta sesión del Comité Intergubernamental de la UNESCO, el mariachi fue inscrito en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad. Este reconocimiento no fue casualidad: el mariachi es una expresión artística que integra música, canto, danza y una profunda tradición cultural que se transmite de generación en generación.</p><h2>¿Qué se protege exactamente?</h2><p>La inscripción cubre la práctica musical tradicional que incluye instrumentos como la vihuela, el guitarrón, la guitarra de golpe, el violín y la trompeta, así como el repertorio de sones, canciones y corridos que forman parte del acervo cultural mexicano.</p>',
      icon: '🏛️',
      authorName: 'Portal del Mariachi',
      status: 'published',
      publishedAt: new Date('2025-01-15'),
    },
    {
      title: 'Los 5 Estilos Fundamentales del Repertorio Mariachi',
      slug: 'estilos-fundamentales-mariachi',
      excerpt: 'Ranchera, Son, Bolero, Huapango y Corrido: los pilares musicales del mariachi explicados.',
      content: '<h2>Diversidad dentro de la tradición</h2><p>El repertorio del mariachi es mucho más rico y diverso de lo que mucha gente imagina. Aunque a menudo se asocia exclusivamente con las rancheras, el mariachi interpreta una amplia variedad de géneros musicales, cada uno con sus propias características rítmicas, armónicas y expresivas.</p><h2>Los 5 pilares</h2><p>La Ranchera, el Son Jalisciense, el Bolero Ranchero, el Huapango y el Corrido constituyen los cinco géneros fundamentales. Cada uno cuenta una historia diferente y requiere técnicas interpretativas distintas.</p>',
      icon: '🎵',
      authorName: 'Portal del Mariachi',
      status: 'published',
      publishedAt: new Date('2025-02-10'),
    },
    {
      title: 'Guía para Contratar un Mariachi: Todo lo que Debes Saber',
      slug: 'guia-contratar-mariachi',
      excerpt: 'Consejos prácticos para elegir y contratar el mariachi perfecto para tu evento.',
      content: '<h2>Una guía práctica</h2><p>Contratar un mariachi para un evento especial puede ser una experiencia maravillosa si se hace correctamente. En esta guía, compartimos los aspectos clave que debes considerar antes de hacer tu selección.</p><h2>Factores importantes</h2><p>El número de integrantes, el repertorio, la experiencia del grupo y las referencias son factores esenciales. Un mariachi profesional generalmente cuenta con entre 7 y 12 músicos.</p>',
      icon: '📋',
      authorName: 'Portal del Mariachi',
      status: 'published',
      publishedAt: new Date('2025-03-05'),
    },
  ];

  await db.insert(schema.blogPosts).values(blogData).onConflictDoNothing();
  console.log(`✅ ${blogData.length} blog posts seeded`);

  // ===================================
  // PARTITURAS
  // ===================================
  const partiturasData = [
    { title: 'El Son de la Negra — Arreglo Completo', composer: 'Blas Galindo (arr.)', style: 'Son Jalisciense', instrument: 'Ensamble Mariachi', tonality: 'Re Mayor', description: 'Arreglo completo para mariachi tradicional con todas las voces.', fileUrl: '/partituras/son-negra.pdf', fileType: 'pdf' },
    { title: 'Cielito Lindo — Trompeta', composer: 'Q. Mendoza y Cortés', style: 'Son Huasteco', instrument: 'Trompeta', tonality: 'Do Mayor', description: 'Parte de trompeta con articulaciones y dinámicas.', fileUrl: '/partituras/cielito-lindo-trompeta.pdf', fileType: 'pdf' },
    { title: 'El Rey — Violín 1°', composer: 'José Alfredo Jiménez', style: 'Ranchera', instrument: 'Violín', tonality: 'Sol Mayor', description: 'Primera voz de violín para la ranchera más emblemática.', fileUrl: '/partituras/el-rey-violin1.pdf', fileType: 'pdf' },
    { title: 'Amor Eterno — Voz y Piano', composer: 'Juan Gabriel', style: 'Balada Ranchera', instrument: 'Voz y Piano', tonality: 'Mi Menor', description: 'Arreglo para voz con acompañamiento de piano.', fileUrl: '/partituras/amor-eterno-voz-piano.pdf', fileType: 'pdf' },
    { title: 'Huapango de Moncayo — Score Reducido', composer: 'J.P. Moncayo', style: 'Huapango', instrument: 'Orquesta (reducción)', tonality: 'Si♭ Mayor', description: 'Reducción para ensamble pequeño del huapango orquestal.', fileUrl: '/partituras/huapango-moncayo-reducido.pdf', fileType: 'pdf' },
  ];

  await db.insert(schema.partituras).values(partiturasData).onConflictDoNothing();
  console.log(`✅ ${partiturasData.length} partituras seeded`);

  // ===================================
  // GALLERY
  // ===================================
  const galleryData = [
    { title: 'Mariachi en Plaza Garibaldi', category: 'Tradición', description: 'La icónica Plaza Garibaldi en Ciudad de México.', imageUrl: 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=800&q=80' },
    { title: 'Ensayo de trompetas', category: 'Instrumentos', description: 'Sección de trompetas en pleno ensayo.', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80' },
    { title: 'Violín mariachi de cerca', category: 'Instrumentos', description: 'Detalle del violín con ornamentos tradicionales.', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80' },
    { title: 'Presentación en teatro', category: 'Conciertos', description: 'Mariachi en presentación formal en teatro.', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
    { title: 'Traje de charro', category: 'Tradición', description: 'El elegante traje de charro bordado en plata.', imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80' },
    { title: 'Guitarrón mexicano', category: 'Instrumentos', description: 'El poderoso guitarrón, base rítmica del mariachi.', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80' },
  ];

  await db.insert(schema.gallery).values(galleryData).onConflictDoNothing();
  console.log(`✅ ${galleryData.length} gallery photos seeded`);

  // ===================================
  // ANUNCIOS
  // ===================================
  const anunciosData = [
    {
      category: 'empleo',
      title: 'Se busca trompetista para mariachi en Lisboa',
      description: 'Buscamos trompetista con experiencia mínima de 3 años en repertorio mariachi. Presentaciones fines de semana en eventos privados y restaurantes. Excelente remuneración.',
      location: 'Lisboa, Portugal',
      contactName: 'María João Santos',
      contactEmail: 'mariachi.madeira.pt@gmail.com',
      contactWhatsapp: '+351 91 234 5678',
      status: 'approved',
    },
    {
      category: 'instrumentos',
      title: 'Vihuela artesanal de Paracho en venta',
      description: 'Vihuela hecha a mano por artesanos de Paracho, Michoacán. Madera de palo escrito con tapa de cedro. Excelente estado, sonido excepcional.',
      price: '450',
      currency: 'EUR',
      location: 'Funchal, Madeira',
      contactName: 'Pedro Silva',
      contactPhone: '+351 96 555 1234',
      status: 'approved',
    },
    {
      category: 'servicios',
      title: 'Mariachi para bodas y eventos — Madeira',
      description: 'Ofrecemos servicio de mariachi profesional para bodas, bautizos, cumpleaños y eventos corporativos en toda la isla de Madeira. Repertorio amplio y personalizable.',
      location: 'Funchal, Madeira',
      contactName: 'Grupo Mariachi Madeira',
      contactEmail: 'eventos@mariachimadeira.pt',
      contactWhatsapp: '+351 91 234 5678',
      status: 'approved',
    },
    {
      category: 'general',
      title: 'Festival de Mariachi México-Portugal 2025',
      description: 'Primer festival internacional de mariachi en Portugal. Tres días de música, talleres, conferencias y gastronomía mexicana. Entrada libre.',
      location: 'Centro de Congressos do Casino, Funchal',
      contactName: 'Organización Festival',
      contactEmail: 'festival@portalmariachi.com',
      status: 'approved',
    },
  ];

  await db.insert(schema.anuncios).values(anunciosData).onConflictDoNothing();
  console.log(`✅ ${anunciosData.length} anuncios seeded`);

  // ===================================
  // ALBUMS
  // ===================================
  const albumsData = [
    { title: 'Tradiciones de Jalisco', description: 'Colección fotográfica de las tradiciones musicales jaliscienses.', status: 'approved' },
    { title: 'Instrumentos del Mariachi', description: 'Un recorrido visual por los instrumentos que definen el sonido mariachi.', status: 'approved' },
    { title: 'Conciertos 2024-2025', description: 'Las mejores fotografías de presentaciones recientes.', status: 'approved' },
  ];

  await db.insert(schema.albums).values(albumsData).onConflictDoNothing();
  console.log(`✅ ${albumsData.length} albums seeded`);

  console.log('\n🎉 Seed completado exitosamente!');
  console.log('📊 Resumen:');
  console.log('   • 1 admin user');
  console.log(`   • ${songsData.length} canciones`);
  console.log(`   • ${collectionsData.length} colecciones`);
  console.log(`   • ${mariachisData.length} mariachis`);
  console.log(`   • ${directoryData.length} directorio entries`);
  console.log(`   • ${coursesData.length} cursos`);
  console.log(`   • ${blogData.length} blog posts`);
  console.log(`   • ${partiturasData.length} partituras`);
  console.log(`   • ${galleryData.length} fotos galería`);
  console.log(`   • ${anunciosData.length} anuncios`);
  console.log(`   • ${albumsData.length} álbumes`);

  await client.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error durante seed:', err);
  process.exit(1);
});
