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

const { GoogleGenAI } = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST /api/blog-ai/generate (admin only)
router.post('/generate', authMiddleware, adminMiddleware, async (req, res) => {
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API not configured' });
    }

    const { topic, lang = 'es' } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const systemPrompt = BLOG_SYSTEM_PROMPT[lang] || BLOG_SYSTEM_PROMPT.es;

        // --- FASE 1: Creación del Borrador ---
        const draftResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                responseMimeType: 'application/json'
            },
            contents: `Escribe un artículo sobre: ${topic}`
        });

        // --- FASE 2: Verificación de Hechos (Fact-Checking) ---
        const verificationPrompt = `Eres un auditor histórico y periodístico experto en música mariachi y cultura mexicana.
Tu tarea es leer el siguiente artículo en formato JSON y VERIFICAR TODOS SUS HECHOS.
- Si detectas "alucinaciones" (fechas incorrectas, muertes inventadas, autores equivocados, o afirmaciones dudosas), CORRIGE EL TEXTO y elimina el contenido falso.
- Devuelve EXACTAMENTE EL MISMO FORMATO JSON (title, excerpt, content, icon).
- Responde estrictamente con el JSON corregido.`;

        const finalResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: verificationPrompt,
                temperature: 0.2, // Baja temperatura para revisión estricta
                responseMimeType: 'application/json'
            },
            contents: draftResponse.text
        });

        const rawText = finalResponse.text || '';

        // Parse JSON from response
        let article;
        try {
            const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            article = JSON.parse(cleaned);
        } catch {
            console.error('Gemini returned invalid JSON during verification:', rawText.substring(0, 300));
            return res.status(502).json({ error: 'AI returned invalid format', raw: rawText.substring(0, 200) });
        }

        // Save to DB as DRAFT
        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, excerpt, content, icon, author_id, author_name, status, is_ai_generated, published_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'draft', true, null) RETURNING *`,
            [article.title, slug + '-' + Date.now(), article.excerpt, article.content,
             article.icon || '📖', req.user.id, req.user.name]
        );

        res.status(201).json({ post: result.rows[0] });
    } catch (err) {
        console.error('Blog AI error:', err.message);
        res.status(500).json({ error: 'Internal error: ' + err.message });
    }
});

// ==========================================
// MODO WIKI: EVALUADOR IA DE CORRECCIONES
// ==========================================
router.post('/corrections/:slug', authMiddleware, async (req, res) => {
    const { proposed_content } = req.body;
    if (!proposed_content) return res.status(400).json({ error: 'Falta el contenido propuesto' });
    if (!GEMINI_API_KEY) return res.status(500).json({ error: 'API Gemini no configurada' });

    try {
        // Fetch original post context
        const postRes = await pool.query('SELECT id, title, content FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (postRes.rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
        
        const post = postRes.rows[0];

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const evalPrompt = `Eres un Auditor Jefe de Contenidos. Un usuario quiere modificar el artículo "${post.title}".
Revisa el "Contenido Propuesto" que envió el usuario. Tu trabajo EXCLUSIVO es verificar la EXACTITUD HISTÓRICA Y VERACIDAD.
Reglas:
1. Si el usuario solo mejoró ortografía, redacción, o añadió datos históricos COMPROBADOS y correctos sobre la música mariachi, aprueba el cambio.
2. Si el usuario introdujo "fake news", fechas imposibles, nombres de músicos falsos, insultos, o spam, recházalo de inmediato.
3. Devuelve ESTRICTAMENTE un objeto JSON: 
{ "ai_verified_status": "passed" | "rejected_by_ai", "feedback": "Breve explicación de por qué lo apruebas o rechazas en español" }`;

        const finalResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: evalPrompt,
                temperature: 0.1,
                responseMimeType: 'application/json'
            },
            contents: `CONTENIDO PROPUESTO POR EL USUARIO:\n${proposed_content}`
        });

        const rawText = finalResponse.text || '';
        let evaluation;
        try {
            const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            evaluation = JSON.parse(cleaned);
        } catch {
            return res.status(502).json({ error: 'La IA devolvió una evaluación inválida' });
        }

        // Si la IA detectó falsedades, ni siquiera guardar en DB, bloquear en seco
        if (evaluation.ai_verified_status === 'rejected_by_ai') {
            return res.status(400).json({ 
                error: 'Tu corrección fue rechazada automáticamente por nuestro verificador de hechos IA.', 
                feedback: evaluation.feedback 
            });
        }

        // Si pasó el chequeo de hechos, guardar en DB para aprobación final del admin
        const result = await pool.query(
            `INSERT INTO blog_corrections (post_id, user_id, proposed_content, ai_verified_status, admin_status, ai_feedback) 
             VALUES ($1, $2, $3, $4, 'pending', $5) RETURNING id`,
            [post.id, req.user.id, proposed_content, evaluation.ai_verified_status, evaluation.feedback]
        );

        res.status(201).json({ 
            success: true, 
            message: 'Corrección verificada por IA exitosamente. Pasó a validación humana del administrador.',
            feedback: evaluation.feedback
        });

    } catch (err) {
        console.error('Wiki AI Editor error:', err.message);
        res.status(500).json({ error: 'Error procesando tu edición con la IA.' });
    }
});

module.exports = router;
