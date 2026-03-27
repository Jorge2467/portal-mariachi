'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Send, Loader2, CheckCircle2, Copy, AlertCircle, Layout } from 'lucide-react';
import Image from 'next/link';

type PlatformOption = 'instagram' | 'linkedin' | 'x/twitter' | 'tiktok/youtube shorts' | 'blog';

export default function ViralStudioClient() {
  const [briefing, setBriefing] = useState('');
  const [platforms, setPlatforms] = useState<PlatformOption[]>(['instagram']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [generatedPosts, setGeneratedPosts] = useState<Record<string, string> | null>(null);

  const ALERTS = {
    'instagram': 'text-pink-400',
    'linkedin': 'text-blue-400',
    'x/twitter': 'text-sky-400',
    'tiktok/youtube shorts': 'text-white',
    'blog': 'text-green-400',
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageBase64(result.split(',')[1]); // Solo el base64 sin el prefijo data:image/
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlatform = (p: PlatformOption) => {
    setPlatforms(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const generateCampaign = async () => {
    if (!briefing.trim()) {
      setErrorText('Por favor, escribe de qué trata el evento.');
      return;
    }
    if (platforms.length === 0) {
      setErrorText('Selecciona al menos 1 plataforma.');
      return;
    }

    setIsGenerating(true);
    setErrorText('');
    setGeneratedPosts(null);

    try {
      const payload = {
        title: 'Campaña Mariachi',
        content_raw: briefing,
        platforms: platforms,
        image_base64: imageBase64 || undefined,
        mime_type: imageFile?.type || undefined,
        prompt_used: 'NEXUS Mariachi Viral Studio'
      };

      const res = await fetch('https://nexus-omnicanal-ai-production.up.railway.app/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Error conectando con NEXUS AI');
      }

      const adaptedContent = typeof data.content_adapted === 'string' 
        ? JSON.parse(data.content_adapted) 
        : data.content_adapted;

      setGeneratedPosts(adaptedContent);

    } catch (err: any) {
      setErrorText(err.message || 'Hubo un error al generar la campaña.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2 flex items-center gap-3">
            <Sparkles className="text-gold-primary" size={28} />
            Estudio Viral NEXUS
          </h1>
          <p className="body-text">
            Tu Community Manager Inteligente. Cuéntale a NEXUS sobre tu última tocada o promoción, sube una foto y la inteligencia artificial generará textos virales adaptados a cada red social.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Lado Izquierdo: Input */}
        <FadeIn delay={0.1}>
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-syne font-bold border-b border-white/10 pb-4">Configurar Post</h2>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider text-gold-light">
                1. ¿A quién/dónde tocaron hoy?
              </label>
              <textarea
                value={briefing}
                onChange={(e) => setBriefing(e.target.value)}
                placeholder="Ej. Ayer tocamos en los 15 años de Maritza. Hubo un ambiente increíble cuando tocamos el mariachi loco..."
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-gold-primary/60 transition-colors resize-none placeholder:text-text-light"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider text-gold-light">
                2. Añadir Foto (Aumenta viralidad)
              </label>
              <div className="relative group">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/20">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setImageFile(null); setImagePreview(''); setImageBase64(''); }}
                        className="btn-primary text-xs !py-2"
                      >
                        Quitar Foto
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl hover:border-gold-primary/50 hover:bg-white/5 transition-all">
                    <ImageIcon className="text-text-light mb-2" size={24} />
                    <span className="text-sm text-text-light">Sube una imagen o tómate una foto</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider text-gold-light">
                3. Redes Sociales a Generar
              </label>
              <div className="flex flex-wrap gap-3">
                {(['instagram', 'linkedin', 'x/twitter', 'tiktok/youtube shorts', 'blog'] as PlatformOption[]).map(plat => (
                  <button
                    key={plat}
                    onClick={() => togglePlatform(plat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all border ${
                      platforms.includes(plat) 
                        ? 'bg-gold-primary text-black border-gold-primary' 
                        : 'bg-white/5 text-text-light border-white/10 hover:border-gold-light/50'
                    }`}
                  >
                    {plat.split('/')[0]}
                  </button>
                ))}
              </div>
            </div>

            {errorText && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                <AlertCircle size={16} />
                {errorText}
              </div>
            )}

            <button
              onClick={generateCampaign}
              disabled={isGenerating}
              className="w-full btn-primary py-4 text-center mt-4 text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Conectando con NEXUS AI...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Generar Super Campaña
                </>
              )}
            </button>
          </div>
        </FadeIn>

        {/* Lado Derecho: Resultados */}
        <FadeIn delay={0.2}>
          <div className="glass-card p-6 min-h-[500px] flex flex-col">
            <h2 className="text-xl font-syne font-bold border-b border-white/10 pb-4 mb-6">Resultados NEXUS</h2>
            
            {!generatedPosts && !isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Layout size={48} className="mb-4 text-text-light" />
                <p>Las campañas mágicas aparecerán aquí.</p>
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-gold-primary/20 border-t-gold-primary animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-gold-primary animate-pulse" size={24} />
                </div>
                <p className="mt-6 text-gold-light font-bold animate-pulse">Analizando imagen y estructurando hooks virales...</p>
              </div>
            )}

            {generatedPosts && !isGenerating && (
              <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(generatedPosts).map(([platKey, copyText], idx) => {
                   if (platKey === 'error') return null;
                   const platformName = platKey.toUpperCase();
                   return (
                    <motion.div 
                      key={platKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-black/30 border border-white/10 rounded-xl overflow-hidden"
                    >
                      <div className="bg-white/5 py-2 px-4 flex items-center justify-between border-b border-white/10">
                        <span className={`font-bold text-xs tracking-wider ${ALERTS[platKey as keyof typeof ALERTS] || 'text-gold-light'}`}>
                          {platformName}
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(copyText as string);
                            // Podríamos agregar un toast aquí
                          }}
                          className="text-text-light hover:text-white transition-colors"
                          title="Copiar texto"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <div className="p-4 whitespace-pre-wrap text-sm leading-relaxed text-neutral-200">
                        {String(copyText)}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
            
            {generatedPosts && (
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-green-400 gap-2">
                <CheckCircle2 size={16} />
                Campaña generada y optimizada con éxito. Todo listo para copiar y publicar.
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
