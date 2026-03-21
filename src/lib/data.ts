'use server';

import { db } from '@/db';
import {
  songs, mariachis, mariachiDirectory, courses, blogPosts,
  blogComments, collections, collectionSongs, partituras,
  gallery, albums, albumPhotos, anuncios, favorites, songVotes, uploads
} from '@/db/schema';
import { desc, eq, and, sql, ilike, asc, count } from 'drizzle-orm';

// ===================================
// HELPER: safe query wrapper
// ===================================
async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!db) return fallback;
  try { return await fn(); }
  catch (error) { console.error('[data]', error); return fallback; }
}

// ===================================
// SONGS
// ===================================

export async function getSongs(limit = 6) {
  return safeQuery(async () => {
    const records = await db.select()
      .from(songs)
      .where(eq(songs.isFeatured, true))
      .orderBy(desc(songs.scoreRating))
      .limit(limit);
    return records.map((song: any) => ({
      ...song,
      rating: song.scoreRating ? Number(song.scoreRating) : 0,
      difficulty: Number(song.scoreRating) > 9.5 ? 'Alta' : (Number(song.scoreRating) > 8.5 ? 'Media' : 'Baja'),
      category: song.style || 'General'
    }));
  }, []);
}

export async function getAllSongs({ style, search, sort = 'rating', limit = 50, offset = 0 }: {
  style?: string; search?: string; sort?: string; limit?: number; offset?: number;
} = {}) {
  return safeQuery(async () => {
    let query = db.select().from(songs).$dynamic();
    const conditions = [];
    if (style) conditions.push(eq(songs.style, style));
    if (search) conditions.push(ilike(songs.title, `%${search}%`));
    if (conditions.length) query = query.where(and(...conditions)) as any;
    const orderMap: Record<string, any> = {
      rating: desc(songs.scoreRating),
      newest: desc(songs.createdAt),
      title: asc(songs.title),
      plays: desc(songs.playCount),
    };
    query = query.orderBy(orderMap[sort] || desc(songs.scoreRating)).limit(limit).offset(offset) as any;
    return await query;
  }, []);
}

export async function getSongById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(songs).where(eq(songs.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

export async function getSongStyles() {
  return safeQuery(async () => {
    const result = await db.selectDistinct({ style: songs.style }).from(songs).where(sql`${songs.style} IS NOT NULL`);
    return result.map((r: { style: string | null }) => r.style).filter(Boolean) as string[];
  }, []);
}

// ===================================
// COLLECTIONS
// ===================================

export async function getCollections(limit = 10) {
  return safeQuery(async () => {
    return await db.select().from(collections)
      .where(eq(collections.isPublic, true))
      .orderBy(desc(collections.createdAt))
      .limit(limit);
  }, []);
}

export async function getCollectionById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(collections).where(eq(collections.id, id)).limit(1);
    if (!records[0]) return null;
    // Get songs in collection
    const collSongs = await db.select({ song: songs, position: collectionSongs.position })
      .from(collectionSongs)
      .innerJoin(songs, eq(collectionSongs.songId, songs.id))
      .where(eq(collectionSongs.collectionId, id))
      .orderBy(asc(collectionSongs.position));
    return { ...records[0], songs: collSongs.map((cs: any) => ({ ...cs.song, position: cs.position })) };
  }, null);
}

// ===================================
// MARIACHIS (Hall of Fame)
// ===================================

export async function getMariachis(limit = 6) {
  return safeQuery(async () => {
    return await db.select().from(mariachis).orderBy(desc(mariachis.awards)).limit(limit);
  }, []);
}

export async function getMariachiById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(mariachis).where(eq(mariachis.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

// ===================================
// DIRECTORY
// ===================================

export async function getDirectoryListings({ status = 'approved', limit = 20, offset = 0 }: {
  status?: string; limit?: number; offset?: number;
} = {}) {
  return safeQuery(async () => {
    return await db.select().from(mariachiDirectory)
      .where(eq(mariachiDirectory.status, status))
      .orderBy(desc(mariachiDirectory.createdAt))
      .limit(limit).offset(offset);
  }, []);
}

export async function getDirectoryById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(mariachiDirectory).where(eq(mariachiDirectory.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

export async function getDirectoryAds(limit = 10) {
  return safeQuery(async () => {
    const records = await db.select().from(mariachiDirectory)
      .where(eq(mariachiDirectory.status, 'approved'))
      .orderBy(desc(mariachiDirectory.createdAt))
      .limit(limit);
    return records.map((row: any) => ({
      id: row.id, type: 'services', title: row.groupName,
      user: row.contactName || 'Mariachi', location: row.location || 'México',
      price: 'A convenir', desc: row.bio || 'Servicios musicales.',
      image: row.imageUrl,
    }));
  }, []);
}

// ===================================
// COURSES
// ===================================

export async function getCourses(limit = 6) {
  return safeQuery(async () => {
    return await db.select().from(courses).orderBy(desc(courses.rating)).limit(limit);
  }, []);
}

export async function getCourseById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

// ===================================
// BLOG
// ===================================

export async function getBlogPosts(limit = 10) {
  return safeQuery(async () => {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }, []);
}

export async function getBlogPostBySlug(slug: string) {
  return safeQuery(async () => {
    const records = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
      .limit(1);
    return records[0] || null;
  }, null);
}

export async function getBlogComments(postId: string) {
  return safeQuery(async () => {
    return await db.select().from(blogComments)
      .where(and(eq(blogComments.postId, postId), eq(blogComments.status, 'approved')))
      .orderBy(desc(blogComments.createdAt));
  }, []);
}

// ===================================
// PARTITURAS
// ===================================

export async function getPartituras({ style, instrument, search, limit = 50, offset = 0 }: {
  style?: string; instrument?: string; search?: string; limit?: number; offset?: number;
} = {}) {
  return safeQuery(async () => {
    let query = db.select().from(partituras).$dynamic();
    const conditions = [];
    if (style) conditions.push(eq(partituras.style, style));
    if (instrument) conditions.push(eq(partituras.instrument, instrument));
    if (search) conditions.push(ilike(partituras.title, `%${search}%`));
    if (conditions.length) query = query.where(and(...conditions)) as any;
    return await query.orderBy(desc(partituras.createdAt)).limit(limit).offset(offset);
  }, []);
}

export async function getPartituraById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(partituras).where(eq(partituras.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

// ===================================
// GALLERY & ALBUMS
// ===================================

export async function getGalleryPhotos({ category, limit = 30, offset = 0 }: {
  category?: string; limit?: number; offset?: number;
} = {}) {
  return safeQuery(async () => {
    let query = db.select().from(gallery).$dynamic();
    if (category) query = query.where(eq(gallery.category, category)) as any;
    return await query.orderBy(desc(gallery.createdAt)).limit(limit).offset(offset);
  }, []);
}

export async function getGalleryCategories() {
  return safeQuery(async () => {
    const result = await db.selectDistinct({ category: gallery.category }).from(gallery).where(sql`${gallery.category} IS NOT NULL`);
    return result.map((r: { category: string | null }) => r.category).filter(Boolean) as string[];
  }, []);
}

export async function getAlbums({ status = 'approved', limit = 20 }: { status?: string; limit?: number } = {}) {
  return safeQuery(async () => {
    return await db.select().from(albums)
      .where(eq(albums.status, status))
      .orderBy(desc(albums.createdAt)).limit(limit);
  }, []);
}

export async function getAlbumById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(albums).where(eq(albums.id, id)).limit(1);
    if (!records[0]) return null;
    const photos = await db.select({ photo: gallery, position: albumPhotos.position })
      .from(albumPhotos)
      .innerJoin(gallery, eq(albumPhotos.photoId, gallery.id))
      .where(eq(albumPhotos.albumId, id))
      .orderBy(asc(albumPhotos.position));
    return { ...records[0], photos: photos.map((p: any) => ({ ...p.photo, position: p.position })) };
  }, null);
}

// ===================================
// ANUNCIOS
// ===================================

export async function getAnuncios({ category, status = 'approved', limit = 20, offset = 0 }: {
  category?: string; status?: string; limit?: number; offset?: number;
} = {}) {
  return safeQuery(async () => {
    const conditions = [eq(anuncios.status, status)];
    if (category) conditions.push(eq(anuncios.category, category));
    return await db.select().from(anuncios)
      .where(and(...conditions))
      .orderBy(desc(anuncios.createdAt))
      .limit(limit).offset(offset);
  }, []);
}

export async function getAnuncioById(id: string) {
  return safeQuery(async () => {
    const records = await db.select().from(anuncios).where(eq(anuncios.id, id)).limit(1);
    return records[0] || null;
  }, null);
}

// ===================================
// STATS (Dashboard / Home)
// ===================================

export async function getPortalStats() {
  return safeQuery(async () => {
    const [songCount] = await db.select({ count: count() }).from(songs);
    const [mariachiCount] = await db.select({ count: count() }).from(mariachis);
    const [courseCount] = await db.select({ count: count() }).from(courses);
    const [postCount] = await db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.status, 'published'));
    const [partituraCount] = await db.select({ count: count() }).from(partituras);
    const [photoCount] = await db.select({ count: count() }).from(gallery);
    const [directoryCount] = await db.select({ count: count() }).from(mariachiDirectory).where(eq(mariachiDirectory.status, 'approved'));

    return {
      songs: songCount.count,
      mariachis: mariachiCount.count,
      courses: courseCount.count,
      blogPosts: postCount.count,
      partituras: partituraCount.count,
      photos: photoCount.count,
      directory: directoryCount.count,
    };
  }, { songs: 0, mariachis: 0, courses: 0, blogPosts: 0, partituras: 0, photos: 0, directory: 0 });
}


