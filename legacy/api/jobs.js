const pool = require('../db/pool');
const { GoogleGenAI } = require('@google/genai');

let ai;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

/**
 * Genera el embedding y lo actualiza en la tabla correspondiente.
 */
async function generateEmbeddingAsync(table, id, textToVectorize) {
    if (!ai || !textToVectorize) return;
    try {
        const embedRes = await ai.models.embedContent({
            model: 'text-embedding-004',
            contents: textToVectorize,
        });
        const embedding = embedRes.embeddings[0].values;
        const vectorStr = `[${embedding.join(',')}]`;
        
        await pool.query(`UPDATE ${table} SET embedding = $1::vector WHERE id = $2`, [vectorStr, id]);
        console.log(`✅ Embedding generado para ${table} [id: ${id}]`);
    } catch (e) {
        console.error(`Error generando embedding para ${table}:`, e.message);
    }
}

/**
 * Transcripción Asíncrona simulada usando multimodal con Gemini, si se adjuntan audios puros.
 * Dado que enviar un archivo largo requiere el bucket de Gemini, usaremos un job mock o fetch si es un URL corto.
 */
async function transcribeAudioAsync(songId, audioUrl) {
    if (!ai || !audioUrl) return;
    try {
        console.log(`Iniciando transcripción IA para canción ${songId}...`);
        
        // Aquí conectamos con Gemini File API para subir el audio y luego generar content
        // Por la limitación de descargas directas en entornos sin estado, omitiendo el buffer gigante.
        const reqPayload = `Eres un transcriptor experto. Escucha el audio de esta canción mariachi y devuelve SÓLO la letra transcrita: ${audioUrl}`;
        
        // Simulado: en producción se descargarían los bytes del audio y se pondrían en inlineData.
        const chatRes = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: reqPayload, // Usando la URL de audio si el bucket fuera accesible.
        });
        
        const lyrics = chatRes.text;
        if (lyrics && lyrics.length > 20) {
            await pool.query('UPDATE songs SET lyrics = $1 WHERE id = $2', [lyrics, songId]);
            console.log(`✅ Transcripción generada para canción ${songId}`);
        }
    } catch (e) {
        console.error(`Error transcribiendo ${audioUrl}:`, e.message);
    }
}

module.exports = {
    generateEmbeddingAsync,
    transcribeAudioAsync
};
