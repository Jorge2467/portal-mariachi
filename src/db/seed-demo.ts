import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in the environment');
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function seed() {
  console.log('🌱 Iniciando volcado de datos (Seed) de la Fase 1...');

  try {
    // ---- 1. Anuncios (Clasificados) ----
    console.log('Insertando Anuncios...');
    await db.insert(schema.anuncios).values([
      {
        title: 'Vendo Vihuela de Paracho',
        category: 'Instrumentos',
        description: 'Vihuela fina hecha a mano, tapa de tacote y aros de cedro. Sonido impecable.',
        price: '4500.00',
        contactPhone: '+52 555 123 4567',
        contactWhatsapp: '+52 555 123 4567',
        imageUrl: '/placeholder-vihuela.jpg'
      },
      {
        title: 'Buscamos Vihuelista Urgente',
        category: 'Empleo',
        description: 'Mariachi estable en CDMX busca vihuelista con disponibilidad fines de semana. Buen sueldo.',
        price: '0.00',
        contactEmail: 'mariachicdmx@example.com'
      }
    ]);

    // ---- 2. Álbumes y Colecciones ----
    console.log('Insertando Álbumes y Colecciones...');
    const [album1] = await db.insert(schema.albums).values({
      title: 'Tributo a Vicente Fernández',
      description: 'Recopilación de las mejores rancheras del Charro de Huentitán.',
      coverUrl: '/placeholder-album.jpg'
    }).returning({ id: schema.albums.id });

    const [coleccion1] = await db.insert(schema.collections).values({
      title: 'Joyas del Mariachi Vargas',
      description: 'Playlist curada con los clásicos instrumentales.',
      coverUrl: '/placeholder-playlist.jpg'
    }).returning({ id: schema.collections.id });

    // Assuming there is at least one song in the database, 
    // we would normally map it in collectionSongs. 
    // We will leave the mapping empty for now to avoid foreign key errors if `songs` is empty.

    console.log('✅ Seed completado con éxito!');
  } catch (error) {
    console.error('❌ Error en el Seed:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
}

seed();
