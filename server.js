const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

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

  // Build messages array from history + new message
  const messages = [];
  for (const h of history.slice(-10)) { // Max 10 turns of history
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
        messages: messages
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

// Static assets (no cache during dev)
app.use('/css', express.static(path.join(__dirname, 'css'), { maxAge: 0 }));
app.use('/js', express.static(path.join(__dirname, 'js'), { maxAge: 0 }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 0 }));

// Serve index.html for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎺 Portal del Mariachi running on port ${PORT}`);
});
