import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { songs } from '@/db/schema';
import { ilike, or, desc, sql } from 'drizzle-orm';
import { GoogleGenAI } from '@google/genai';
import { buildRagContext } from '@/lib/ai/rag';

const token = process.env.TELEGRAM_TOKEN;

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

async function sendTelegramMessage(chatId: number, text: string) {
  if (!token) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });
    if (!res.ok) console.error('Error sending Telegram message:', await res.text());
  } catch (error) {
    console.error('Telegram fetch error:', error);
  }
}

async function sendTelegramChatAction(chatId: number, action: string) {
  if (!token) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        action
      })
    });
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body.message;
    
    // Si no hay mensaje de texto, respondemos OK para que Telegram no reintente
    if (!msg || !msg.text) return NextResponse.json({ ok: true });
    
    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (text.startsWith('/start')) {
      await sendTelegramMessage(
        chatId, 
        '🎺 ¡Bienvenido a la comunidad del Portal Mariachi México Madeira!\nEstamos aquí para compartir la pasión por la música. Puedes usar chat normal para hablar conmigo o intentar /buscar <término>, /top y /azar.'
      );
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith('/buscar')) {
      const query = text.replace('/buscar', '').trim();
      if (!query) {
        await sendTelegramMessage(chatId, 'Debes escribir algo para buscar, ej: /buscar huapango');
        return NextResponse.json({ ok: true });
      }

      if (!db) {
        await sendTelegramMessage(chatId, 'La base de datos de canciones no está conectada actualmente.');
        return NextResponse.json({ ok: true });
      }

      // Buscar canciones en Drizzle ORM
      const match = await db.select()
        .from(songs)
        .where(
          or(
            ilike(songs.title, `%${query}%`),
            ilike(songs.description, `%${query}%`),
            ilike(songs.style, `%${query}%`),
            ilike(songs.composer, `%${query}%`)
          )
        )
        .limit(3);

      if (match.length > 0) {
        const results = match.map((r: any) => `🎵 *${r.title}*\nCompositor: ${r.composer || 'N/A'} | Estilo: ${r.style || 'N/A'}`).join('\n\n');
        await sendTelegramMessage(chatId, `Encontré esto en el portal:\n\n${results}`);
      } else {
        await sendTelegramMessage(chatId, 'No encontré canciones con ese término. 😿');
      }
      
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith('/top')) {
      const topSongs = await db.select().from(songs).orderBy(desc(songs.scoreRating)).limit(5);
      if (topSongs.length > 0) {
        const results = topSongs.map((s: any, i: number) => `${i + 1}. *${s.title}* - ⭐ ${s.scoreRating || 'N/A'}`).join('\n');
        await sendTelegramMessage(chatId, `🏆 *Top 5 Canciones del Portal:*\n\n${results}`);
      } else {
        await sendTelegramMessage(chatId, 'El ranking está vacío por ahora.');
      }
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith('/azar')) {
      const randomSong = await db.select().from(songs).orderBy(sql`RANDOM()`).limit(1);
      if (randomSong.length > 0) {
        const s = randomSong[0];
        await sendTelegramMessage(chatId, `🎲 *Canción al Azar:*\n\n🎵 *${s.title}*\nCompositor: ${s.composer || 'N/A'}\nEstilo: ${s.style || 'N/A'}\n\nEscúchala de inmediato en nuestro portal!`);
      } else {
        await sendTelegramMessage(chatId, 'No hay canciones en el portal aún.');
      }
      return NextResponse.json({ ok: true });
    }

    // Respuesta Inteligente de Gemini Ponderada por RAG
    if (!ai) {
      await sendTelegramMessage(chatId, 'Mi cerebro inteligente (Gemini) no está encendido.');
      return NextResponse.json({ ok: true });
    }

    await sendTelegramChatAction(chatId, 'typing');

    const SYSTEM_PROMPT = `
Eres el asistente experto "Mariachi Bot" del Portal Mariachi México Madeira.
Eres experto en música mariachi, historia, instrumentos y cultura mexicana.
Mantén respuestas concisas, amigables, no más de dos párrafos y usa ocasionalmente emojis como 🎻🎺🎷🎵. Toma en cuenta el mensaje actual que te han enviado vía Telegram.
Basa tu respuesta EN LOS SIGUIENTES DATOS AISLADOS DE LA BASE DE DATOS LOCAL (Si el contexto no tiene relación con el mensaje del usuario, ignóralo):
${await buildRagContext(text)}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        config: {
          systemInstruction: SYSTEM_PROMPT
        },
        contents: text
      });
      
      const reply = response.text || 'No pude generar una respuesta.';
      await sendTelegramMessage(chatId, reply);
    } catch (aiError: any) {
      console.error('Gemini error:', aiError);
      await sendTelegramMessage(chatId, 'Tuve un pequeño tropiezo procesando tu mensaje. 😵‍💫 Intenta de nuevo en un momento.');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Siempre retornar 200 a Telegram para que no reintente enviar el mismo Crash
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
