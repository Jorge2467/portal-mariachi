'use server';

import { db } from '@/db';
import { songs, mariachiDirectory, blogPosts } from '@/db/schema';
import { ilike, or } from 'drizzle-orm';

export type SearchResult = {
  type: 'song' | 'mariachi' | 'blog';
  id: string;
  title: string;
  subtitle: string;
  url: string;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  const searchPattern = `%${query}%`;

  const [foundSongs, foundMariachis, foundBlogs] = await Promise.all([
    db.select().from(songs).where(or(ilike(songs.title, searchPattern), ilike(songs.style, searchPattern))).limit(4),
    db.select().from(mariachiDirectory).where(or(ilike(mariachiDirectory.groupName, searchPattern), ilike(mariachiDirectory.location, searchPattern))).limit(4),
    db.select().from(blogPosts).where(ilike(blogPosts.title, searchPattern)).limit(4)
  ]);

  const results: SearchResult[] = [];

  foundSongs.forEach((s: any) => results.push({ type: 'song', id: s.id, title: s.title, subtitle: s.style || 'Audios', url: `/audios` }));
  foundMariachis.forEach((m: any) => results.push({ type: 'mariachi', id: m.id, title: m.groupName, subtitle: m.location || 'Directorio', url: `/directorio/${m.id}` }));
  foundBlogs.forEach((b: any) => results.push({ type: 'blog', id: b.id, title: b.title, subtitle: 'Papiro Literario', url: `/blog/${b.slug}` }));

  return results;
}
