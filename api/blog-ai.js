const express = require('express');
const pool = require('../db/pool');
const { authMiddleware, adminMiddleware } = require('./auth');

const router = express.Router();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const BLOG_SYSTEM_PROMPT = {
    es: `Eres un escritor experto en música mariachi y cultura mexicana. 
Escribe artículos de blog profesionales, educativos y atractivos.
Formato: devuelve SOLO un JSON válido con esta estructura:
{
  "title": "Título del artículo",
  "excerpt": "Resumen de 1-2 frases",
  "content": "Artículo completo en HTML (usa <h2>, <p>, <ul>, <li>, <strong>, <em>). Mínimo 500 palabras.",
  "icon": "emoji relevante"
}
NO incluyas markdown, backticks ni texto fuera del JSON.`,

    en: `You are an expert writer on mariachi music and Mexican culture.
Write professional, educational and engaging blog articles.
Format: return ONLY valid JSON with this structure:
{
  "title": "Article title",
  "excerpt": "1-2 sentence summary",
  "content": "Full article in HTML (use <h2>, <p>, <ul>, <li>, <strong>, <em>). Minimum 500 words.",
  "icon": "relevant emoji"
}
Do NOT include markdown, backticks or text outside the JSON.`,

    pt: `És um escritor especialista em música mariachi e cultura mexicana.
Escreve artigos de blog profissionais, educativos e atrativos.
Formato: devolve APENAS um JSON válido com esta estrutura:
{
  "title": "Título do artigo",
  "excerpt": "Resumo de 1-2 frases",
  "content": "Artigo completo em HTML (usa <h2>, <p>, <ul>, <li>, <strong>, <em>). Mínimo 500 palavras.",
  "icon": "emoji relevante"
}
NÃO incluas markdown, backticks nem texto fora do JSON.`
};

// POST /api/blog-ai/generate (admin only)
router.post('/generate', authMiddleware, adminMiddleware, async (req, res) => {
    if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'AI not configured' });
    }

    const { topic, lang = 'es' } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

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
                max_tokens: 4096,
                system: BLOG_SYSTEM_PROMPT[lang] || BLOG_SYSTEM_PROMPT.es,
                messages: [{ role: 'user', content: `Escribe un artículo sobre: ${topic}` }]
            })
        });

        if (!response.ok) {
            console.error('Blog AI error:', response.status);
            return res.status(502).json({ error: 'AI service error' });
        }

        const data = await response.json();
        const rawText = data.content?.[0]?.text || '';

        // Parse JSON from response
        let article;
        try {
            const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            article = JSON.parse(cleaned);
        } catch {
            return res.status(502).json({ error: 'AI returned invalid format', raw: rawText.substring(0, 200) });
        }

        // Save to DB
        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, excerpt, content, icon, author_id, author_name, status, is_ai_generated, published_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'published', true, NOW()) RETURNING *`,
            [article.title, slug + '-' + Date.now(), article.excerpt, article.content,
             article.icon || '📖', req.user.id, req.user.name]
        );

        res.status(201).json({ post: result.rows[0] });
    } catch (err) {
        console.error('Blog AI error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

module.exports = router;
