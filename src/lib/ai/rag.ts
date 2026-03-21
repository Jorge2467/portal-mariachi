import { GoogleGenAI } from '@google/genai';
import { db } from '@/db';
import { songs, mariachis } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!ai) return Array(768).fill(0);
  try {
    const res = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: text
    });
    return res.embeddings?.[0]?.values || Array(768).fill(0);
  } catch (error) {
    console.error('Embedding error:', error);
    return Array(768).fill(0);
  }
}

export async function buildRagContext(query: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(query);
  const embeddingString = `[${queryEmbedding.join(',')}]`;
  
  // Vector search on Songs
  const similarSongs = await db.select({
    title: songs.title,
    author: songs.composer,
    style: songs.style,
    year: songs.year,
    description: songs.description,
    similarity: sql<number>`1 - (${songs.embedding} <=> ${embeddingString}::vector)`
  })
  .from(songs)
  .orderBy((t: any) => desc(t.similarity))
  .limit(3);

  // Vector search on Mariachis
  const similarMariachis = await db.select({
    name: mariachis.name,
    location: mariachis.location,
    bio: mariachis.description,
    repertoire: mariachis.type,
    similarity: sql<number>`1 - (${mariachis.embedding} <=> ${embeddingString}::vector)`
  })
  .from(mariachis)
  .orderBy((t: any) => desc(t.similarity))
  .limit(3);

  let contextSnippet = '--- CONTEXTO RECUPERADO DE LA BASE DE DATOS LOCAL ---\n\n';
  
  if (similarSongs.length > 0) {
    contextSnippet += "🎵 CANCIONES RELEVANTES:\n";
    similarSongs.forEach((s: any) => {
      contextSnippet += `- Título: ${s.title} (${s.year || 'N/A'})\n  Compositor: ${s.author}\n  Estilo: ${s.style}\n  Descripción: ${s.description}\n\n`;
    });
  }

  if (similarMariachis.length > 0) {
    contextSnippet += "🎺 MARIACHIS Y AGRUPACIONES RELEVANTES:\n";
    similarMariachis.forEach((m: any) => {
      contextSnippet += `- Agrupación: ${m.name}\n  Ubicación: ${m.location}\n  Bio: ${m.bio}\n  Repertorio: ${m.repertoire}\n\n`;
    });
  }

  contextSnippet += "--------------------------------------------------\n";
  return contextSnippet;
}
