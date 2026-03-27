export const PLATFORM_LABELS: Record<string, string> = { instagram: 'Instagram', linkedin: 'LinkedIn', twitter: 'Twitter/X', tiktok: 'TikTok', facebook: 'Facebook', threads: 'Threads' };
export const PLATFORM_LIMITS: Record<string, number> = { instagram: 2200, linkedin: 3000, twitter: 280, tiktok: 2200, facebook: 63206, threads: 500 };

export const BOT_INBOX_DATA = [
  { id: 'bot_001', name: 'producto_hero.jpg', type: 'image', source: 'wa', from: '+52 55 1234', time: 'hace 2m', url: 'https://picsum.photos/seed/prod1/300/200' },
  { id: 'bot_002', name: 'demo_video.mp4', type: 'video', source: 'tg', from: '@cliente_mx', time: 'hace 12m', url: 'https://picsum.photos/seed/vid1/300/200' },
  { id: 'bot_003', name: 'banner_campana.png', type: 'image', source: 'wa', from: '+54 11 9876', time: 'hace 38m', url: 'https://picsum.photos/seed/ban1/300/200' },
];

export const HOOKS: Record<string, string[]> = {
  profesional: [
    'La transformación digital no es opcional. Es tu próxima ventaja competitiva.',
    'Lo que más nos cuesta cambiar es exactamente lo que más necesitamos cambiar.',
    '3 años de aprendizaje comprimidos en un hilo. Empezamos →',
    'El secreto de los equipos que escalan 3x más rápido que el mercado.',
    'No es tecnología. Es estrategia. Aquí la diferencia:',
    'Lo que los líderes de LATAM ya están haciendo diferente.',
  ],
  viral: [
    '🚀 Lo que nadie te dice sobre esto (y debería):',
    'POV: descubriste que tu competencia lleva 6 meses usando esto.',
    'Hice X y los resultados me dejaron sin palabras 🧵',
    '¿Por qué el 90% de los equipos fallan en esto? (y cómo evitarlo)',
    'Spoiler: el problema no es el presupuesto.',
    'Esta decisión cambió todo. Y tomó menos de 24 horas.',
  ],
  educativo: [
    '¿Sabías que el 73% de los equipos falla por esto? Guía rápida:',
    'Tutorial: Cómo implementar X en menos de 30 minutos ↓',
    'El framework que cambió la forma en que mi equipo trabaja:',
    '5 métricas que toda empresa LATAM debería trackear hoy:',
    'Guía definitiva: De cero a automatizado en 7 pasos.',
    'Lo que aprendimos después de 1,000+ implementaciones en LATAM:',
  ],
  humano: [
    'Hace 2 años estaba en quiebra. Hoy te cuento qué cambió.',
    'La conversación más honesta que he tenido con mi equipo esta semana.',
    'No siempre tengo las respuestas. Pero esto sí lo sé:',
    'Nadie habla de la soledad que viene con construir algo grande.',
    'Mi mayor error del año y lo que aprendí de él.',
    'Le pregunté a mi equipo qué haría diferente. Esto me dijeron.',
  ],
  audaz: [
    '¡BASTA de hacer las cosas a la mitad! Este es el momento.',
    'El mercado no espera. Tu siguiente movimiento es ahora o nunca.',
    'Cometí el error más costoso de mi carrera. Y te lo cuento todo.',
    'LATAM no necesita copiar a Silicon Valley. Necesita superarlo.',
    'Las reglas del juego cambiaron. ¿Estás jugando el juego correcto?',
    'Esto es lo que separa a los que construyen imperios de los que observan.',
  ],
  minimalista: [
    'Una idea. Una acción. Un resultado.',
    'Menos ruido. Más impacto.',
    'Lo esencial no necesita explicación.',
    'Claridad primero. Velocidad después.',
    'Haz menos. Pero hazlo mejor.',
    'El enfoque es el activo más escaso.',
  ],
};

export const HASHTAG_SETS: Record<string, string> = {
  instagram: '#IA #Emprendimiento #LATAM #Automatizacion #Negocios #Tech #Innovacion #Startup',
  linkedin: '#InteligenciaArtificial #Negocios #LATAM #Innovacion #Liderazgo #Estrategia',
  twitter: '#IA #Tech #LATAM #Startup',
  tiktok: '#IA #Emprendimiento #LATAM #Tech #Negocios #fyp',
  facebook: '#InteligenciaArtificial #Emprendimiento #LATAM #Negocios',
  threads: '#IA #Tech #LATAM #Negocios #Innovacion',
};

export const BODY_TEMPLATES = [
  `En {brand} llevamos meses trabajando en algo que va a cambiar la forma en que los equipos trabajan en LATAM.

Lo que aprendimos en el proceso:

→ La velocidad importa más que la perfección
→ El contexto regional marca la diferencia
→ La automatización libera tiempo para lo estratégico

¿Estás listo para el siguiente nivel?

{hashtags}`,

  `Después de analizar más de 10,000 casos de uso en la región, llegamos a una conclusión:

El futuro del trabajo en LATAM no es igual al de Silicon Valley.

Es nuestro. A nuestra manera. Con nuestra cultura y nuestro ritmo.

{brand} fue construido exactamente para eso.

Comenta QUIERO SABER y te enviamos el playbook completo.

{hashtags}`,

  `Lo que tus competidores no quieren que sepas:

Los equipos que adoptan IA de forma estratégica crecen 3.2x más rápido.

No es magia. Es metodología.

En {brand} lo hacemos simple para que puedas enfocarte en lo que importa:
→ Tus clientes
→ Tu producto
→ Tu equipo

{hashtags}`,

  `3 cosas que cambiarán tu negocio en 90 días:

1. Automatiza lo repetitivo → ganas 4h/semana por persona
2. Centraliza tu intel → decisiones 2x más rápidas
3. Escala sin contratar → crece sin aumentar costos

{brand} hace las tres. En una sola plataforma.

¿Agendamos un demo?

{hashtags}`,

  `El error más común que vemos en empresas LATAM:

Usar herramientas de primer mundo para problemas del mundo real.

En {brand} diseñamos para nuestra región:
→ WhatsApp como canal principal
→ Español e Português nativos
→ Integración con CRMs locales
→ Soporte en tu zona horaria

La diferencia se nota desde el día 1.

{hashtags}`,

  `Resultados reales de empresas como la tuya:

📈 +340% en productividad del equipo de ventas
⚡ 78% menos tiempo en tareas operativas
💬 95% de satisfacción del cliente con respuestas automáticas
🎯 3.8x retorno de inversión en el primer trimestre

Esto es lo que {brand} hace por negocios LATAM.

Comenta INFO y te contactamos hoy.

{hashtags}`,
];

export const SCORES = [94, 88, 82, 91, 78, 86, 93, 75, 89, 85];
