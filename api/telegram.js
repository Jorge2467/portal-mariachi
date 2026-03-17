const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const pool = require('../db/pool');

const router = express.Router();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (token) {
    bot = new TelegramBot(token, { polling: false }); // Usamos Webhook nativo de Express para Fire-and-Forget
}

// POST /api/telegram/webhook (Definido en Railway)
router.post('/webhook', async (req, res) => {
    // 1. Reply immediately to Meta/Telegram to prevent timeouts (Corporate OmniMind pattern)
    res.status(200).send('OK');

    if (!bot) return;

    try {
        const msg = req.body.message;
        if (!msg || !msg.text) return;

        const chatId = msg.chat.id;
        const text = msg.text.trim();

        if (text.startsWith('/start')) {
            await bot.sendMessage(chatId, '🎺 ¡Bienvenido a la comunidad del Portal Mariachi México Madeira!\nEstamos aquí para compartir la pasión por la música. Puedes usar el comando /buscar <término> para consultar nuestro catálogo.');
        } 
        else if (text.startsWith('/buscar')) {
            const query = text.replace('/buscar', '').trim();
            if (!query) {
                await bot.sendMessage(chatId, 'Debes escribir algo para buscar, ej: /buscar huapango');
                return;
            }
            
            // Búsqueda simplificada en canciones
            const match = await pool.query("SELECT title, composer, style FROM songs WHERE title ILIKE $1 OR description ILIKE $1 LIMIT 3", [`%${query}%`]);
            
            if (match.rows.length > 0) {
                const results = match.rows.map(r => `🎵 *${r.title}*\nCompositor: ${r.composer || 'N/A'} | Estilo: ${r.style || 'N/A'}`).join('\n\n');
                await bot.sendMessage(chatId, `Encontré esto en el portal:\n\n${results}`, { parse_mode: 'Markdown' });
            } else {
                await bot.sendMessage(chatId, 'No encontré canciones con ese término. 😿');
            }
        }
        else {
            // Optional: chat comunitario (no respondemos a todo para no causar spam en grupos)
            if (msg.chat.type === 'private') {
                await bot.sendMessage(chatId, 'Usa /buscar para encontrar música en nuestro portal. ¡Que viva el Mariachi! 🎻');
            }
        }
    } catch (err) {
        console.error('Telegram bot error:', err.message);
    }
});

module.exports = { router, bot };
