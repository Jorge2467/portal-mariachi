const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const pool = require('../db/pool');

const router = express.Router();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (token) {
    bot = new TelegramBot(token, { polling: false }); 
}

// Handler para modo Polling (Local Test)
if (bot) {
    bot.on('message', async (msg) => {
        if (!msg || !msg.text) return;
        await processTelegramMessage(msg.chat.id, msg.text.trim(), msg);
    });
}

async function processTelegramMessage(chatId, text, msg) {
    try {

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
            // Conversación Libre con Inteligencia Artificial
            // Mostrar "escribiendo..." en Telegram
            await bot.sendChatAction(chatId, 'typing');

            const SYSTEM_PROMPT = `
Eres el asistente experto "Mariachi Bot" del Portal Mariachi México Madeira.
Eres experto en música mariachi, historia, instrumentos y cultura mexicana.
Mantén respuestas concisas, amigables, no más de dos párrafos y usa ocasionalmente emojis como 🎻🎺🎷🎵. Toma en cuenta el mensaje actual que te han enviado vía Telegram.
`;
            const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
            if (!GEMINI_API_KEY) {
                await bot.sendMessage(chatId, 'El cerebro de la IA no está configurado (Falta API Key).');
                return;
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents: [{ role: 'user', parts: [{ text }] }]
                })
            });

            if (!response.ok) {
                console.error('Gemini API Error', await response.text());
                await bot.sendMessage(chatId, 'Tuve un pequeño tropiezo procesando tu mensaje. 😵‍💫 Intenta de nuevo en un momento.');
                return;
            }

            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar una respuesta.';

            await bot.sendMessage(chatId, reply);
        }
    } catch (err) {
        console.error('Telegram bot error:', err.message);
    }
}

// POST /api/telegram/webhook (Para el despliegue en Railway)
router.post('/webhook', async (req, res) => {
    res.status(200).send('OK');
    if (!bot) return;
    
    const msg = req.body.message;
    if (!msg || !msg.text) return;
    
    await processTelegramMessage(msg.chat.id, msg.text.trim(), msg);
});

module.exports = { router, bot };
