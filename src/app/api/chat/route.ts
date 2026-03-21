import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Using fallback mock response.');
      return NextResponse.json({ 
        reply: 'El sistema de Inteligencia Artificial está inactivo temporalmente por falta de credenciales. Por favor, contacta con soporte o intenta más tarde.' 
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // RAG Context Minimal Setup for Demo
    const systemInstruction = `Eres un asistente virtual experto del "Portal del Mariachi". Eres amable, respetuoso y conoces sobre música tradicional mexicana. Tu objetivo es ayudar a los usuarios del portal a encontrar partituras, músicos y recursos corporativos. Sé conciso y útil.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor al procesar el mensaje' }, { status: 500 });
  }
}
