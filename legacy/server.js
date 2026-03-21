require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Express para confiar en el proxy (Railway, Nginx, etc.)
// Requerido por express-rate-limit v7+
app.set('trust proxy', 1);

// Gemini AI client (shared)
const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    : null;

// Parse JSON (increased limit to 50mb to allow for video/image base64 payloads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// ===================================
// DATABASE AUTO-INIT
// ===================================
async function initDatabase() {
    if (!process.env.DATABASE_URL) {
        console.log('⚠️  DATABASE_URL not set — running without database (demo mode)');
        return false;
    }

    try {
        const pool = require('./db/pool');
        const schema = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log('✅ Database schema ready');

        // Create admin if not exists
        const bcrypt = require('bcryptjs');
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@portalmariachi.com']);
        if (existing.rows.length === 0) {
            const hash = await bcrypt.hash('admin2026!', 12);
            await pool.query(
                `INSERT INTO users (email, password_hash, name, role, avatar_url)
                 VALUES ($1, $2, $3, $4, $5)`,
                ['admin@portalmariachi.com', hash, 'Administrador', 'super_admin',
                 'https://ui-avatars.com/api/?name=Admin&background=FFB800&color=0F0F0F']
            );
            console.log('✅ Admin user created');
        }

        // Clean expired sessions every hour
        const { cleanExpiredSessions } = require('./api/auth');
        setInterval(cleanExpiredSessions, 60 * 60 * 1000);

        // Auto-configure Telegram Webhook on startup
        if (process.env.TELEGRAM_TOKEN && process.env.RAILWAY_PUBLIC_DOMAIN) {
            const { bot } = require('./api/telegram');
            if (bot) {
                const webhookUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api/telegram/webhook`;
                try {
                    await bot.setWebhook(webhookUrl);
                    console.log(`✅ Telegram webhook set: ${webhookUrl}`);
                } catch (e) {
                    console.warn('⚠️  Telegram webhook setup failed:', e.message);
                }
            }
        }

        return true;
    } catch (err) {
        console.error('❌ Database init error:', err.message);
        return false;
    }
}

// ===================================
// API ROUTES
// ===================================
let dbReady = false;

// Auth routes
app.use('/api/auth', (req, res, next) => {
    if (!dbReady) return res.status(503).json({ error: 'Database not available' });
    next();
}, (req, res, next) => {
    const { router } = require('./api/auth');
    router(req, res, next);
});

// Content routes (songs, collections, mariachis, blog, courses)
app.use('/api/content', (req, res, next) => {
    if (!dbReady) return res.status(503).json({ error: 'Database not available' });
    next();
}, require('./api/content'));

// Blog AI generator
app.use('/api/blog-ai', (req, res, next) => {
    if (!dbReady) return res.status(503).json({ error: 'Database not available' });
    next();
}, require('./api/blog-ai'));

// Upload routes
app.use('/api/uploads', (req, res, next) => {
    if (!dbReady) return res.status(503).json({ error: 'Database not available' });
    next();
}, require('./api/uploads'));

// Telegram webhook route
app.use('/api/telegram', require('./api/telegram').router);

// RAG (Vector Search) — pgvector
app.use('/api/rag', require('./api/rag'));

// Admin routes (users management)
app.get('/api/admin/users', async (req, res) => {
    if (!dbReady) return res.status(503).json({ error: 'Database not available' });

    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });

    try {
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        if (decoded.role !== 'super_admin') return res.status(403).json({ error: 'Admin only' });

        const pool = require('./db/pool');
        const result = await pool.query(
            'SELECT id, email, name, role, avatar_url, created_at, last_login, is_active FROM users ORDER BY created_at DESC'
        );
        res.json({ users: result.rows });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// ===================================
// CHATBOT API — Gemini 2.0 Flash
// ===================================
const SYSTEM_PROMPT = {
    es: `Eres el asistente del Portal del Mariachi México Madeira. Tu nombre es "Mariachi Bot", pero actúa con una calidez inmensa, como un auténtico charro mexicano experimentado y hospitalario.
Eres experto en música mariachi: historia, instrumentos, estilos y compositores célebres.
IMPORTANTE PARA TU PROSODIA Y CONVERSACIÓN:
- Habla de manera natural, humana, fluida y con excelente dicción.
- Evita comportarte como un asistente robótico. Cero respuestas acartonadas.
- NO uses listas con viñetas o "bullet points" a menos que sea estrictamente necesario. Prefiere párrafos conversacionales.
- Usa ocasionalmente modismos mexicanos elegantes (ej. "¡Qué tal, amigo!", "Con mucho gusto", "Es un honor"), pero mantén el respeto.
- Responde siempre en español. Usa emojis musicales ocasionalmente 🎶🎻🎺.
Sé conciso y cálido: máximo 3 párrafos cortos por respuesta.`,
    en: `You are the Mariachi Portal México Madeira assistant. Your name is "Mariachi Bot", but act with immense warmth, like an authentic, experienced, and hospitable Mexican charro.
You are an expert in mariachi music: history, instruments, styles, and famous composers.
IMPORTANT FOR YOUR CONVERSATIONAL STYLE:
- Speak naturally, humanely, fluently, and with excellent diction.
- Avoid acting like a robotic assistant. No stiff responses.
- DO NOT use bulleted lists unless strictly necessary. Prefer conversational paragraphs.
- Always respond in English, in a friendly and educational way. Use musical emojis occasionally 🎶🎻🎺.
Be concise and warm: max 3 short paragraphs per response.`,
    pt: `És o assistente do Portal do Mariachi México Madeira. O teu nome é "Mariachi Bot", mas age com imensa simpatia, como um autêntico charro mexicano experiente e hospitaleiro.
És especialista em música mariachi: história, instrumentos, estilos e compositores famosos.
IMPORTANTE PARA A TUA CONVERSAÇÃO:
- Fala de forma natural, humana, fluida e com excelente dicção.
- Evita comportar-te como um assistente robótico. Zero respostas rígidas.
- NÃO utilizes listas de marcas (bullet points) a não ser que seja estritamente necessário. Prefere parágrafos de conversação.
- Responde sempre em português europeu, de forma amigável e educativa. Usa emojis musicais ocasionalmente 🎶🎻🎺.
Sê conciso e acolhedor: máximo 3 parágrafos curtos por resposta.`
};

app.post('/api/chat', async (req, res) => {
    const { message, lang = 'es', history = [], image } = req.body;

    if ((!message || typeof message !== 'string') && !image) {
        return res.status(400).json({ error: 'Invalid message' });
    }

    // Secret admin upgrade command
    if (message && message.startsWith('/upgrade_admin ')) {
        const targetEmail = message.split(' ')[1];
        if (targetEmail) {
            try {
                const pool = require('./db/pool');
                const result = await pool.query("UPDATE users SET role = 'super_admin' WHERE email = $1 RETURNING email", [targetEmail]);
                if (result.rowCount > 0) {
                    return res.json({ reply: `¡Hecho, jefe! La cuenta ${targetEmail} ahora es Super Administrador. Refresca la ventana de incógnito e inicia sesión de nuevo para ver los cambios.` });
                } else {
                    return res.json({ reply: `No encontré ninguna cuenta con el correo ${targetEmail} en la base de datos.` });
                }
            } catch (err) {
                return res.json({ reply: `Error actualizando: ${err.message}` });
            }
        }
    }

    const systemPrompt = SYSTEM_PROMPT[lang] || SYSTEM_PROMPT.es;
    const geminiContents = [];

    // Conversation history (last 10 turns)
    for (const h of history.slice(-10)) {
        if (h.role && h.content) {
            geminiContents.push({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: typeof h.content === 'string' ? h.content.substring(0, 2000) : String(h.content) }]
            });
        }
    }

    // Current user message — build multimodal parts
    const userParts = [];

    // Add image if present
    if (image && image.data && image.type) {
        console.log(`Received media: type=${image.type}, size=${Math.round(image.data.length / 1024)}KB`);
        userParts.push({
            inlineData: {
                mimeType: image.type,
                data: image.data  // base64 string (no data:URL prefix)
            }
        });
    } else if (image) {
        console.error(`Received image object but missing data/type:`, Object.keys(image));
    }

// We will fix both the limit and the text logic.
// First replacement is just for the logic block:
    // Add text
    if (message) {
        userParts.push({ text: message });
    } else {
        // If no message was typed, but media was sent, add a default prompt so Gemini knows what to do
        userParts.push({ text: 'Analiza la imagen o video adjunto en el contexto del mariachi y la música mexicana.' });
    }

    geminiContents.push({ role: 'user', parts: userParts });

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        console.log(`Chat request: ${geminiContents.length} history turns. Image attached: ${!!image}`);

        // Build the official SDK payload format
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: systemPrompt,
            },
            contents: geminiContents
        });

        const reply = response.text || '¡Ay! No pude generar una respuesta. Inténtalo de nuevo. 🎺';
        res.json({ reply });
    } catch (err) {
        console.error('Gemini SDK Error:', err.message);
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
});

// ===================================
// STATIC FILES
// ===================================
app.use('/css', express.static(path.join(__dirname, 'css'), { maxAge: 0 }));
app.use('/js', express.static(path.join(__dirname, 'js'), { maxAge: 0 }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 0 }));

// Serve uploaded files (Railway volume)
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

// SPA fallback with explicit no-cache headers
app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===================================
// START
// ===================================
async function start() {
    dbReady = await initDatabase();

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🎺 Portal del Mariachi running on port ${PORT}`);
        console.log(`   Database: ${dbReady ? '✅ Connected' : '⚠️  Demo mode'}`);
        console.log(`   Chatbot:  ✅ Ready (Gemini 2.0 Flash)`);
        console.log(`   RAG:      ✅ Vector search active`);
    });
}

start();
