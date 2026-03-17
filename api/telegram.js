const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const pool = require('../db/pool');

const router = express.Router();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (token) {
    bot = new TelegramBot(token, { polling: false }); 
}

// Obtener API Key de Anthropic (usada también en server.js)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// POST /api/telegram/webhook (Definido en Railway)
router.post('/webhook', async (req, res) => {
    // 1. Reply immediately to Meta/Telegram to prevent timeouts
    res.status(200).send('OK');

    if (!bot) return;

    try {
        const msg = req.body.message;
        if (!msg || !msg.text) return;

        const chatId = msg.chat.id;
        const text = msg.text.trim();

        if (text.startsWith('/start')) {
            await bot.sendMessage(chatId, '🎺 ¡Bienvenido a la comunidad del Portal Mariachi México Madeira!\nEstamos aquí para compartir la pasión por la música. Puedes usar chat normal para hablar conmigo o intentar /buscar <término>.');
        } 
        else if (text.startsWith('/buscar')) {
            const query = text.replace('/buscar', '').trim();
            if (!query) {
                await bot.sendMessage(chatId, 'Debes escribir algo para buscar, ej: /buscar huapango');
                return;
            }
            
            // Búsqueda en canciones
            const match = await pool.query("SELECT title, composer, style FROM songs WHERE title ILIKE $1 OR description ILIKE $1 LIMIT 3", [`%${query}%`]);
            
            if (match.rows.length > 0) {
                const results = match.rows.map(r => `🎵 *${r.title}*\nCompositor: ${r.composer || 'N/A'} | Estilo: ${r.style || 'N/A'}`).join('\n\n');
                await bot.sendMessage(chatId, `Encontré esto en el portal:\n\n${results}`, { parse_mode: 'Markdown' });
            } else {
                await bot.sendMessage(chatId, 'No encontré canciones con ese término. 😿');
            }
        }
        else {
            // Conversación Libre con Claude AI
            if (!ANTHROPIC_API_KEY) {
                if (msg.chat.type === 'private') {
                    await bot.sendMessage(chatId, 'Lo siento, mi cerebro de IA (Claude) no está conectado en este momento. 🧠💤');
                }
                return;
            }

            // Mostrar "escribiendo..." en Telegram
            await bot.sendChatAction(chatId, 'typing');

            const SYSTEM_PROMPT = `
Eres el asistente experto "Mariachi Bot" del Portal Mariachi México Madeira.
Eres experto en música mariachi, historia, instrumentos y cultura mexicana.
Mantén respuestas concisas, amigables, no más de dos párrafos y usa ocasionalmente emojis como 🎻🎺🎷🎵. Toma en cuenta el mensaje actual que te han enviado vía Telegram.
`;
            
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 512,
                    system: SYSTEM_PROMPT,
                    messages: [
                        { role: 'user', content: text }
                    ]
                })
            });

            if (!response.ok) {
                console.error('Anthropic API Error', await response.text());
                await bot.sendMessage(chatId, 'Tuve un pequeño tropiezo procesando tu mensaje. 😵‍💫 Intenta de nuevo en un momento.');
                return;
            }

            const data = await response.json();
            const reply = data.content?.[0]?.text || 'No pude generar una respuesta.';

            await bot.sendMessage(chatId, reply);
        }
    } catch (err) {
        console.error('Telegram bot error:', err.message);
    }
});

module.exports = { router, bot };
