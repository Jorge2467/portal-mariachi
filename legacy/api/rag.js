const express = require('express');
const pool = require('../db/pool');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();
let ai;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// POST /api/rag/chat
router.post('/chat', async (req, res) => {
    if (!ai) return res.status(500).json({ error: 'Gemini AI not configured' });
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        // 1. Convert query to vector
        const embedRes = await ai.models.embedContent({
            model: 'text-embedding-004',
            contents: query,
        });
        const embedding = embedRes.embeddings[0].values;
        const vectorStr = `[${embedding.join(',')}]`;

        // 2. Vector search (Cosine distance operator <=>)
        const sql = `
            SELECT title, excerpt as content, 'blog' as source, 1 - (embedding <=> $1::vector) as similarity FROM blog_posts WHERE embedding IS NOT NULL
            UNION ALL
            SELECT title, description as content, 'song' as source, 1 - (embedding <=> $1::vector) as similarity FROM songs WHERE embedding IS NOT NULL
            UNION ALL
            SELECT name as title, description as content, 'mariachi' as source, 1 - (embedding <=> $1::vector) as similarity FROM mariachis WHERE embedding IS NOT NULL
            ORDER BY similarity DESC LIMIT 5
        `;
        const result = await pool.query(sql, [vectorStr]);
        
        // 3. Render context string
        const context = result.rows.map(r => `[${r.source.toUpperCase()}] ${r.title}: ${r.content}`).join('\n');

        // 4. Generate answer
        const prompt = `Eres el asistente experto "Mariachi Bot" del Portal Mariachi México Madeira.
Usa ÚNICAMENTE este contexto local para responder la pregunta del usuario. Si la respuesta no está en el contexto, di que no tienes esa información y sugiere buscar en el portal.
Sé breve, amigable y usa emojis de mariachi. Responde en el mismo idioma que la pregunta.
CONTEXTO:
${context}

PREGUNTA: ${query}`;

        const chatRes = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        res.json({ reply: chatRes.text, sources: result.rows });
    } catch (err) {
        console.error('RAG Error:', err.message);
        res.status(500).json({ error: 'Internal context generation error' });
    }
});

module.exports = router;
