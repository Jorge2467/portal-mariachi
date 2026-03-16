const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON
app.use(express.json({ limit: '10mb' }));

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

        // Auto-seed if songs table is empty
        const songCount = await pool.query('SELECT COUNT(*) FROM songs');
        if (parseInt(songCount.rows[0].count) === 0) {
            console.log('Empty database detected — running seed...');
            const seedPath = path.join(__dirname, 'db', 'seed.js');
            if (fs.existsSync(seedPath)) {
                require(seedPath);
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

// Diagnostic endpoint
app.get('/api/debug', async (req, res) => {
    try {
        const pool = require('./db/pool');
        const songs = await pool.query('SELECT COUNT(*) as c FROM songs');
        const users = await pool.query('SELECT COUNT(*) as c FROM users');
        res.json({ 
            db: 'connected',
            songs: songs.rows[0].c,
            users: users.rows[0].c,
            dbReady: dbReady
        });
    } catch (err) {
        res.json({ db: 'error', message: err.message, code: err.code });
    }
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

// ===================================
// CHATBOT API - Anthropic Claude
// ===================================
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = {
    es: `Eres el asistente del Portal del Mariachi México Madeira. Tu nombre es "Mariachi Bot".
Eres experto en música mariachi: historia, instrumentos (violín, trompeta, guitarrón, vihuela, guitarra), 
estilos (son jalisciense, ranchera, bolero, huapango, corrido), compositores famosos 
(José Alfredo Jiménez, Rubén Fuentes, Juan Gabriel, etc.) y tradiciones culturales mexicanas.
Responde siempre en español, de forma amigable y educativa. Usa emojis musicales ocasionalmente 🎺🎻🎵.
S� conciso: máximo 3 párrafos por respuesta.`,
    en: `You are the Mariachi Portal México Madeira assistant. Your name is "Mariachi Bot".
You are an expert in mariachi music: history, instruments (violin, trumpet, guitarrón, vihuela, guitar),
styles (son jalisciense, ranchera, bolero, huapango, corrido), famous composers
(José Alfredo Jiménez, Rubén Fuentes, Juan Gabriel, etc.) and Mexican cultural traditions.
Always respond in English, in a friendly and educational way. Use musical emojis occasionally 🎺🎻🎵.
Be concise: max 3 paragraphs per response.`,
    pt: `És o assistente do Portal do Mariachi México Madeira. O teu nome é "Mariachi Bot".
És especialista em música mariachi: história, instrumentos (violino, trompete, guitarrón, vihuela, guitarra),
estilos (son jalisciense, ranchera, bolero, huapango, corrido), compositores famosos
(José Alfredo Jiménez, Rubén Fuentes, Juan Gabriel, etc.) e tradições culturais mexicanas.
Responde sempre em português europeu, de forma amigável e educativa. Usa emojis musicais ocasionalmente 🎺🎻🎵.
S� conciso: máximo 3 parágrafos por resposta.`
};

app.post('/api/chat', async (req, res) => {
    if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const { message, lang = 'es', history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.length > 2000) {
        return res.status(400).json({ error: 'Invalid message' });
    }

    const messages = [];
    for (const h of history.slice(-10)) {
        if (h.role && h.content) {
            messages.push({ role: h.role, content: h.content.substring(0, 2000) });
        }
    }
    messages.push({ role: 'user', content: message });

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: SYSTEM_PROMPT[lang] || SYSTEM_PROMPT.es,
                messages
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('Anthropic API error:', response.status, err);
            return res.status(502).json({ error: 'AI service error' });
        }

        const data = await response.json();
        const reply = data.content?.[0]?.text || 'No response';
        res.json({ reply });
    } catch (err) {
        console.error('Chat error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// STATIC FILES
// ===================================
app.use('/css', express.static(path.join(__dirname, 'css'), { maxAge: 0 }));
app.use('/js', express.static(path.join(__dirname, 'js'), { maxAge: 0 }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 0 }));

// SPA fallback
app.get('*', (req, res) => {
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
        console.log(`   Chatbot:  ${ANTHROPIC_API_KEY ? '✅ Ready' : '⚠️  No API key'}`);
    });
}

start();
