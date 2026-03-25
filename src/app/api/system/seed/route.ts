import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import bcrypt from 'bcryptjs';

// ONE-TIME seed endpoint — protegido con una clave secreta
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key');

  if (secret !== process.env.SEED_SECRET && secret !== 'mariachi2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, number> = {};

  try {
    // Admin user
    const adminHash = await bcrypt.hash('admin2026!', 10);
    await db.insert(schema.users).values({
      name: 'Administrador', email: 'admin@portalmariachi.com',
      passwordHash: adminHash, role: 'admin', isActive: true,
    }).onConflictDoNothing({ target: schema.users.email });
    results.users = 1;

    // Songs
    const songsData = [
      { title: 'El Son de la Negra', composer: 'Blas Galindo (arr.)', style: 'Son Jalisciense', year: 'Tradicional', description: 'El son más emblemático de Jalisco, reconocido internacionalmente como símbolo de la música mariachi.', scoreRating: '9.2', badge: 'GANADOR', isFeatured: true },
      { title: 'La Bikina', composer: 'Rubén Fuentes', style: 'Bolero Ranchero', year: '1964', description: 'Una de las canciones más interpretadas del repertorio mariachi.', scoreRating: '8.9', badge: 'NOMINADO', isFeatured: true },
      { title: 'El Rey', composer: 'José Alfredo Jiménez', style: 'Ranchera', year: '1971', description: 'Himno ranchero por excelencia. Una de las composiciones más icónicas de la música mexicana.', scoreRating: '9.5', badge: 'TOP #1', isFeatured: true },
      { title: 'Cielito Lindo', composer: 'Quirino Mendoza y Cortés', style: 'Son Huasteco', year: '1882', description: 'Canción mexicana conocida mundialmente.', scoreRating: '9.0', badge: 'CLÁSICO', isFeatured: true },
      { title: 'Las Mañanitas', composer: 'Tradicional', style: 'Canción Mexicana', year: 'Tradicional', description: 'La canción de cumpleaños por excelencia en México y Latinoamérica.', scoreRating: '8.7', badge: 'POPULAR', isFeatured: true },
      { title: 'Volver Volver', composer: 'Fernando Z. Maldonado', style: 'Ranchera', year: '1972', description: 'Inmortalizada por Vicente Fernández, imprescindible en toda fiesta mexicana.', scoreRating: '9.1', badge: 'TRENDING', isFeatured: true },
      { title: 'Guadalajara', composer: 'Pepe Guízar', style: 'Son Jalisciense', year: '1937', description: 'Himno a la capital de Jalisco, tierra del mariachi.', scoreRating: '8.8', badge: 'CLÁSICO', isFeatured: false },
      { title: 'Amor Eterno', composer: 'Juan Gabriel', style: 'Balada Ranchera', year: '1984', description: 'Composición de Juan Gabriel dedicada a su madre.', scoreRating: '9.4', badge: 'TOP #1', isFeatured: true },
      { title: 'El Huapango de Moncayo', composer: 'José Pablo Moncayo', style: 'Huapango', year: '1941', description: 'Obra sinfónica basada en sones huastecos.', scoreRating: '9.3', badge: 'GANADOR', isFeatured: true },
      { title: 'México Lindo y Querido', composer: 'Chucho Monge', style: 'Ranchera', year: '1921', description: 'Canción patriótica que expresa el amor por México.', scoreRating: '9.0', badge: 'CLÁSICO', isFeatured: false },
    ];
    await db.insert(schema.songs).values(songsData).onConflictDoNothing();
    results.songs = songsData.length;

    // Mariachis
    const mariachisData = [
      { name: 'Mariachi Vargas de Tecalitlán', type: 'Tradicional', location: 'Ciudad de México', description: 'Fundado en 1898, es el mariachi más antiguo y reconocido del mundo.', awards: 15, presentations: 5000, isPro: true },
      { name: 'Mariachi de América', type: 'Moderno', location: 'Guadalajara, Jalisco', description: 'Uno de los mariachis más versátiles de México.', awards: 8, presentations: 3000, isPro: true },
      { name: 'Mariachi Sol de México', type: 'Internacional', location: 'Los Ángeles, CA', description: 'El mariachi más premiado de Estados Unidos.', awards: 12, presentations: 4000, isPro: true },
      { name: 'Mariachi Los Camperos', type: 'Tradicional', location: 'Los Ángeles, CA', description: 'Ganadores del Grammy, preservadores de la tradición.', awards: 10, presentations: 2500, isPro: true },
      { name: 'Mariachi Cobre', type: 'Show', location: 'Orlando, FL', description: 'Residentes permanentes de Epcot Center, Walt Disney World.', awards: 5, presentations: 8000, isPro: true },
    ];
    await db.insert(schema.mariachis).values(mariachisData).onConflictDoNothing();
    results.mariachis = mariachisData.length;

    // Directory
    const directoryData = [
      { groupName: 'Mariachi Internacional México Madeira', membersCount: 12, location: 'Ciudad de México, México', imageUrl: 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=400&q=80', bio: 'Agrupación con más de 30 años de trayectoria internacional.', contactName: 'Carlos Mendoza', whatsapp: '+52 55 8120 4455', email: 'contacto@mariachimexicomadeira.com', status: 'approved' },
      { groupName: 'Mariachi Garibaldi de Jalisco', membersCount: 8, location: 'Guadalajara, Jalisco, México', imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80', bio: 'Directamente de la cuna del mariachi, Jalisco.', contactName: 'Alejandro Torres', whatsapp: '+52 33 9856 2211', email: 'mariachi.garibaldi@gmail.com', status: 'approved' },
      { groupName: 'Mariachi Madeira Portugal', membersCount: 6, location: 'Lisboa, Portugal', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80', bio: 'El único mariachi profesional de Portugal.', contactName: 'María João Santos', whatsapp: '+351 91 234 5678', email: 'mariachi.madeira.pt@gmail.com', status: 'approved' },
    ];
    await db.insert(schema.mariachiDirectory).values(directoryData).onConflictDoNothing();
    results.directory = directoryData.length;

    // Courses
    const coursesData = [
      { title: 'Trompeta Mariachi — Nivel Básico', instructorName: 'Prof. Roberto Hernández', description: 'Aprende las técnicas fundamentales de la trompeta en el estilo mariachi.', icon: '🎺', lessons: 24, hours: '12', rating: '4.8', studentCount: 245, price: '0', isFree: true },
      { title: 'Vihuela y Armonía Mariachi', instructorName: 'Maestro Luis Rodríguez', description: 'Domina los rasgueos y patrones armónicos esenciales de la vihuela.', icon: '🎸', lessons: 18, hours: '9', rating: '4.9', studentCount: 189, price: '0', isFree: true },
      { title: 'Violín Mariachi — Técnica Avanzada', instructorName: 'Dra. Ana Martínez', description: 'Perfecciona tu técnica de violín con los ornamentos propios del mariachi.', icon: '🎻', lessons: 32, hours: '16', rating: '4.7', studentCount: 156, price: '49.99', isFree: false },
      { title: 'Canto Ranchero — Interpretación', instructorName: 'José Luis Gutiérrez', description: 'Desarrolla tu voz para el repertorio ranchero y bolero.', icon: '🎤', lessons: 20, hours: '10', rating: '4.6', studentCount: 312, price: '0', isFree: true },
      { title: 'Guitarrón — Bajo Mariachi', instructorName: 'Mtro. Francisco Díaz', description: 'El fundamento rítmico del mariachi: técnica de guitarrón desde cero.', icon: '🎵', lessons: 28, hours: '14', rating: '4.8', studentCount: 134, price: '29.99', isFree: false },
      { title: 'Historia del Mariachi', instructorName: 'Dra. Patricia Figueroa', description: 'Un recorrido completo por la evolución del mariachi desde el siglo XIX.', icon: '📚', lessons: 15, hours: '7.5', rating: '4.9', studentCount: 420, price: '0', isFree: true },
    ];
    await db.insert(schema.courses).values(coursesData).onConflictDoNothing();
    results.courses = coursesData.length;

    // Blog posts
    const blogData = [
      { title: 'El Mariachi: Patrimonio Cultural Inmaterial de la Humanidad', slug: 'mariachi-patrimonio-unesco', excerpt: 'En 2011, la UNESCO reconoció al mariachi como patrimonio cultural inmaterial.', content: '<h2>Un reconocimiento merecido</h2><p>El 27 de noviembre de 2011, el mariachi fue inscrito en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.</p>', icon: '🏛️', authorName: 'Portal del Mariachi', status: 'published', publishedAt: new Date('2025-01-15') },
      { title: 'Los 5 Estilos Fundamentales del Repertorio Mariachi', slug: 'estilos-fundamentales-mariachi', excerpt: 'Ranchera, Son, Bolero, Huapango y Corrido: los pilares musicales del mariachi.', content: '<h2>Diversidad dentro de la tradición</h2><p>El repertorio del mariachi es mucho más rico y diverso de lo que mucha gente imagina, abarcando desde rancheras hasta sones huastecos.</p>', icon: '🎵', authorName: 'Portal del Mariachi', status: 'published', publishedAt: new Date('2025-02-10') },
      { title: 'Guía para Contratar un Mariachi: Todo lo que Debes Saber', slug: 'guia-contratar-mariachi', excerpt: 'Consejos prácticos para elegir y contratar el mariachi perfecto para tu evento.', content: '<h2>Una guía práctica</h2><p>Contratar un mariachi para un evento especial puede ser una experiencia maravillosa si se hace correctamente.</p>', icon: '📋', authorName: 'Portal del Mariachi', status: 'published', publishedAt: new Date('2025-03-05') },
    ];
    await db.insert(schema.blogPosts).values(blogData).onConflictDoNothing();
    results.blogPosts = blogData.length;

    // Partituras
    const partiturasData = [
      { title: 'El Son de la Negra — Arreglo Completo', composer: 'Blas Galindo (arr.)', style: 'Son Jalisciense', instrument: 'Ensamble Mariachi', tonality: 'Re Mayor', description: 'Arreglo completo para mariachi tradicional con todas las voces.', fileUrl: '/partituras/son-negra.pdf', fileType: 'pdf' },
      { title: 'Cielito Lindo — Trompeta', composer: 'Q. Mendoza y Cortés', style: 'Son Huasteco', instrument: 'Trompeta', tonality: 'Do Mayor', description: 'Parte de trompeta con articulaciones y dinámicas.', fileUrl: '/partituras/cielito-lindo-trompeta.pdf', fileType: 'pdf' },
      { title: 'El Rey — Violín 1°', composer: 'José Alfredo Jiménez', style: 'Ranchera', instrument: 'Violín', tonality: 'Sol Mayor', description: 'Primera voz de violín para la ranchera más emblemática.', fileUrl: '/partituras/el-rey-violin1.pdf', fileType: 'pdf' },
      { title: 'Amor Eterno — Voz y Piano', composer: 'Juan Gabriel', style: 'Balada Ranchera', instrument: 'Voz y Piano', tonality: 'Mi Menor', description: 'Arreglo para voz con acompañamiento de piano.', fileUrl: '/partituras/amor-eterno-voz-piano.pdf', fileType: 'pdf' },
      { title: 'Huapango de Moncayo — Score', composer: 'J.P. Moncayo', style: 'Huapango', instrument: 'Orquesta (reducción)', tonality: 'Si♭ Mayor', description: 'Reducción para ensamble pequeño del huapango orquestal.', fileUrl: '/partituras/huapango-moncayo-reducido.pdf', fileType: 'pdf' },
    ];
    await db.insert(schema.partituras).values(partiturasData).onConflictDoNothing();
    results.partituras = partiturasData.length;

    // Gallery
    const galleryData = [
      { title: 'Mariachi en Plaza Garibaldi', category: 'Tradición', imageUrl: 'https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?w=800&q=80' },
      { title: 'Presentación en teatro', category: 'Conciertos', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
      { title: 'Traje de charro', category: 'Tradición', imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80' },
    ];
    await db.insert(schema.gallery).values(galleryData).onConflictDoNothing();
    results.gallery = galleryData.length;

    // Anuncios
    const anunciosData = [
      { category: 'empleo', title: 'Se busca trompetista para mariachi en Lisboa', description: 'Buscamos trompetista con experiencia mínima de 3 años en repertorio mariachi.', location: 'Lisboa, Portugal', contactName: 'María João Santos', contactEmail: 'mariachi.madeira.pt@gmail.com', contactWhatsapp: '+351 91 234 5678', status: 'approved' },
      { category: 'instrumentos', title: 'Vihuela artesanal de Paracho en venta', description: 'Vihuela hecha a mano por artesanos de Paracho, Michoacán. Excelente estado.', price: '450', currency: 'EUR', location: 'Funchal, Madeira', contactName: 'Pedro Silva', contactPhone: '+351 96 555 1234', status: 'approved' },
      { category: 'servicios', title: 'Mariachi para bodas y eventos — Madeira', description: 'Servicio de mariachi profesional para bodas, bautizos y eventos corporativos.', location: 'Funchal, Madeira', contactName: 'Grupo Mariachi Madeira', contactEmail: 'eventos@mariachimadeira.pt', contactWhatsapp: '+351 91 234 5678', status: 'approved' },
    ];
    await db.insert(schema.anuncios).values(anunciosData).onConflictDoNothing();
    results.anuncios = anunciosData.length;

    return NextResponse.json({
      success: true,
      message: '🎉 Portal del Mariachi seeded successfully!',
      inserted: results,
    });
  } catch (error: any) {
    console.error('[seed]', error);
    return NextResponse.json({ error: error?.message || 'Seed failed' }, { status: 500 });
  }
}
