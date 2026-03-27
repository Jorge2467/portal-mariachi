import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const dynamic = 'force-dynamic'

const SUPER_PROMPT = `Eres OMNI CONTENT, el generador de contenido para redes sociales más avanzado de LATAM. Eres un estratega de contenido de clase mundial con experiencia en copywriting persuasivo, psicología del consumidor y algoritmos de plataformas sociales.

MISIÓN CRÍTICA: Generar contenido 100% relevante al tema solicitado por el usuario. JAMÁS hablar del portal, de ti mismo, ni de herramientas — solo del tema que el usuario pide.

PROTOCOLO DE ANÁLISIS (antes de escribir):
1. DETECTA el tema central del pedido del usuario
2. IDENTIFICA la plataforma objetivo
3. DETERMINA el tono: profesional, inspiracional, educativo, provocador, humorístico
4. INFIERE la audiencia objetivo desde el contexto

FRAMEWORK DE ESCRITURA PROFESIONAL:

HOOK (primera línea — CRÍTICO):
• Debe detener el scroll en 0.3 segundos
• Usa uno de estos patrones: pregunta provocadora / dato sorprendente / afirmación contraintuitiva / historia en miniatura / "La verdad sobre..."
• NUNCA empieces con "¡", "Hola", "En el mundo de", "En la actualidad" → openers genéricos PROHIBIDOS

CUERPO:
• Desarrolla el tema con profundidad real, no frases vacías
• Incluye valor tangible: datos, pasos, consejos accionables, perspectiva única
• Párrafos cortos de máximo 2 líneas para mobile
• Emojis estratégicos que refuerzan el mensaje

CTA (llamada a acción):
• Específica y medible: "Guarda este post", "Comparte con alguien que...", "¿Tú qué piensas?", "Etiqueta a quien necesita esto"
• NUNCA uses CTAs genéricas como "Síguenos" o "Comenta abajo"

HASHTAGS:
• 5-8 hashtags: 2 de nicho específico + 2 de industria + 2 de trending LATAM + 1 de marca

REGLAS ABSOLUTAS:
✅ El contenido DEBE ser 100% sobre el tema pedido
✅ Mínimo 150 palabras de contenido real por variación
✅ Tono adaptado a profesionales de LATAM
❌ PROHIBIDO: mencionar el portal, OmniAgent, herramientas internas
❌ PROHIBIDO: frases genéricas como "En el mundo actual", "Es fundamental", "Cabe destacar"
❌ PROHIBIDO: posts de menos de 80 palabras`

export async function POST(req: NextRequest) {
    try {
        const { topic, platform, tone, brand, count = 2 } = await req.json()

        if (!topic) {
            return NextResponse.json({ error: 'topic is required' }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

        const userPrompt = `Genera exactamente ${count} posts completos y distintos para ${platform || 'Instagram'}.

TEMA: ${topic}
MARCA/EMPRESA: ${brand || 'no especificada — no menciones ninguna marca específica'}
TONO: ${tone || 'profesional'}
PLATAFORMA: ${platform || 'Instagram'}

Para cada post usa EXACTAMENTE este formato:

---POST_START---
HOOK: [la primera línea impactante]
BODY: [el cuerpo completo del post con emojis, saltos de línea y valor real]
CTA: [llamada a acción específica]
HASHTAGS: [los hashtags]
SCORE: [número del 1 al 100 estimando el engagement potencial]
---POST_END---

Recuerda: el contenido debe ser 100% sobre "${topic}". No menciones portales, herramientas ni OmniAgent.`

        const result = await model.generateContent([
            { text: SUPER_PROMPT },
            { text: userPrompt }
        ])

        const rawText = result.response.text()

        // Parse posts from structured format
        const postMatches = [...rawText.matchAll(/---POST_START---\s*([\s\S]*?)---POST_END---/g)]

        if (postMatches.length === 0) {
            // Fallback: return raw text as a single post
            return NextResponse.json({
                success: true,
                posts: [{ hook: '', body: rawText, cta: '', hashtags: '', score: 80 }],
                raw: rawText
            })
        }

        const posts = postMatches.map(match => {
            const block = match[1]
            const extract = (key: string) => {
                const regex = new RegExp(`${key}:\\s*([\\s\\S]*?)(?=\\n[A-Z]+:|$)`, 'i')
                return (block.match(regex)?.[1] || '').trim()
            }
            return {
                hook: extract('HOOK'),
                body: extract('BODY'),
                cta: extract('CTA'),
                hashtags: extract('HASHTAGS'),
                score: parseInt(extract('SCORE')) || 82,
            }
        })

        return NextResponse.json({ success: true, posts, platform, tone, topic })

    } catch (e: any) {
        console.error('[Social Generate API]', e)
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
}
