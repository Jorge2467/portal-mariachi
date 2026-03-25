'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Upload, Music, FileText, Image as ImageIcon, Loader2, CheckCircle2, Link, ExternalLink, Info } from 'lucide-react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
type TabType = 'audio' | 'scores' | 'gallery';

interface AudioForm { title: string; url: string; composer?: string; style?: string; }
interface ScoreForm { title: string; url: string; composer?: string; style?: string; instrument?: string; tonality?: string; description?: string; }
interface GalleryForm { title: string; imageUrl: string; category?: string; }

export default function ExploradorArchivos() {
  const [activeTab, setActiveTab] = useState<TabType>('audio');
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState('');

  const [audioForm, setAudioForm] = useState<AudioForm>({ title: '', url: '' });
  const [scoreForm, setScoreForm] = useState<ScoreForm>({ title: '', url: '' });
  const [galleryForm, setGalleryForm] = useState<GalleryForm>({ title: '', imageUrl: '' });

  const reset = () => { setStatus('idle'); setMessage(''); };

  async function submit(endpoint: string, payload: object) {
    setStatus('uploading');
    setMessage('Guardando en la base de datos...');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');
      setStatus('success');
      setMessage(data.message || '✅ Guardado correctamente en la base de datos.');
      setAudioForm({ title: '', url: '' });
      setScoreForm({ title: '', url: '' });
      setGalleryForm({ title: '', imageUrl: '' });
      setTimeout(reset, 3500);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Error de red. Intenta de nuevo.');
    }
  }

  async function handleAudio(e: React.FormEvent) {
    e.preventDefault();
    await submit('/api/songs', {
      title: audioForm.title,
      audioUrl: audioForm.url,
      composer: audioForm.composer,
      style: audioForm.style,
      isFeatured: false,
    });
  }

  async function handleScore(e: React.FormEvent) {
    e.preventDefault();
    await submit('/api/partituras', {
      title: scoreForm.title,
      fileUrl: scoreForm.url,
      fileType: 'pdf',
      composer: scoreForm.composer,
      style: scoreForm.style,
      instrument: scoreForm.instrument,
      tonality: scoreForm.tonality,
      description: scoreForm.description,
    });
  }

  async function handleGallery(e: React.FormEvent) {
    e.preventDefault();
    await submit('/api/gallery', {
      title: galleryForm.title,
      imageUrl: galleryForm.imageUrl,
      category: galleryForm.category || 'Eventos',
    });
  }

  const platforms: Record<TabType, { name: string; url: string }[]> = {
    audio: [
      { name: 'SoundCloud', url: 'https://soundcloud.com' },
      { name: 'Dropbox', url: 'https://dropbox.com' },
      { name: 'Google Drive', url: 'https://drive.google.com' },
    ],
    scores: [
      { name: 'Google Drive', url: 'https://drive.google.com' },
      { name: 'Dropbox', url: 'https://dropbox.com' },
      { name: 'MuseScore', url: 'https://musescore.com' },
    ],
    gallery: [
      { name: 'Imgur', url: 'https://imgur.com' },
      { name: 'Unsplash', url: 'https://unsplash.com' },
      { name: 'Google Drive', url: 'https://drive.google.com' },
    ],
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Explorador Multimedia</h1>
          <p className="body-text">Registra audios, partituras e imágenes en la Base de Datos. Los archivos se alojan en servicios externos (Google Drive, SoundCloud, Dropbox) y el portal guarda el enlace.</p>
        </div>
      </FadeIn>

      {/* Info banner */}
      <FadeIn delay={0.05}>
        <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-5 py-4 text-sm text-blue-300">
          <Info size={18} className="shrink-0 mt-0.5" />
          <p>
            <strong>¿Cómo funciona?</strong> Sube tu archivo a Google Drive, Dropbox o SoundCloud, obtén el enlace público directo y pégalo aquí. El portal guardará el enlace en la Base de Datos permanentemente.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-card p-6 border-t-4 border-t-gold-primary">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
            {([
              { id: 'audio', label: 'Audios (MP3/WAV)', icon: <Music size={18} /> },
              { id: 'scores', label: 'Partituras (PDF)', icon: <FileText size={18} /> },
              { id: 'gallery', label: 'Galería de Eventos', icon: <ImageIcon size={18} /> },
            ] as { id: TabType; label: string; icon: React.ReactNode }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); reset(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-gold-primary text-black' : 'text-text-light hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Platforms hint */}
          <div className="flex items-center gap-2 mb-6 text-xs text-neutral-500">
            <span>Plataformas recomendadas:</span>
            {platforms[activeTab].map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/5">
                <ExternalLink size={10} /> {p.name}
              </a>
            ))}
          </div>

          {/* AUDIO FORM */}
          {activeTab === 'audio' && (
            <form onSubmit={handleAudio} className="max-w-2xl space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Título de la Canción *</label>
                <input value={audioForm.title} onChange={e => setAudioForm(f => ({ ...f, title: e.target.value }))} required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                  placeholder="El Rey — José Alfredo Jiménez" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">URL del Audio * <span className="text-neutral-600 font-normal normal-case">(enlace directo MP3, SoundCloud, Google Drive)</span></label>
                <div className="relative">
                  <Link size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="url" value={audioForm.url} onChange={e => setAudioForm(f => ({ ...f, url: e.target.value }))} required
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="https://drive.google.com/... o https://soundcloud.com/..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Compositor</label>
                  <input value={audioForm.composer || ''} onChange={e => setAudioForm(f => ({ ...f, composer: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="José Alfredo Jiménez" />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Estilo</label>
                  <input value={audioForm.style || ''} onChange={e => setAudioForm(f => ({ ...f, style: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="Ranchera" />
                </div>
              </div>
              <StatusBar status={status} message={message} />
              <button type="submit" disabled={status === 'uploading'}
                className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
                {status === 'uploading' ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : <><Upload size={16} /> Registrar Audio</>}
              </button>
            </form>
          )}

          {/* SCORES FORM */}
          {activeTab === 'scores' && (
            <form onSubmit={handleScore} className="max-w-2xl space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Título de la Partitura *</label>
                <input value={scoreForm.title} onChange={e => setScoreForm(f => ({ ...f, title: e.target.value }))} required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                  placeholder="El Rey — Violín 1°" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">URL del Archivo * <span className="text-neutral-600 font-normal normal-case">(Google Drive, Dropbox, MuseScore)</span></label>
                <div className="relative">
                  <Link size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="url" value={scoreForm.url} onChange={e => setScoreForm(f => ({ ...f, url: e.target.value }))} required
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="https://drive.google.com/file/d/..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Compositor</label>
                  <input value={scoreForm.composer || ''} onChange={e => setScoreForm(f => ({ ...f, composer: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="J.A. Jiménez" />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Instrumento</label>
                  <input value={scoreForm.instrument || ''} onChange={e => setScoreForm(f => ({ ...f, instrument: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="Violín, Trompeta, Vihuela..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Estilo</label>
                  <input value={scoreForm.style || ''} onChange={e => setScoreForm(f => ({ ...f, style: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="Ranchera, Son..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Tonalidad</label>
                  <input value={scoreForm.tonality || ''} onChange={e => setScoreForm(f => ({ ...f, tonality: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="Sol Mayor" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Descripción</label>
                <textarea rows={2} value={scoreForm.description || ''} onChange={e => setScoreForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600 resize-none"
                  placeholder="Descripción breve de la partitura..." />
              </div>
              <StatusBar status={status} message={message} />
              <button type="submit" disabled={status === 'uploading'}
                className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
                {status === 'uploading' ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : <><Upload size={16} /> Registrar Partitura</>}
              </button>
            </form>
          )}

          {/* GALLERY FORM */}
          {activeTab === 'gallery' && (
            <form onSubmit={handleGallery} className="max-w-2xl space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Título de la Foto *</label>
                <input value={galleryForm.title} onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))} required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                  placeholder="Presentación en Plaza Garibaldi" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">URL de la Imagen * <span className="text-neutral-600 font-normal normal-case">(Imgur, Unsplash, enlace directo)</span></label>
                <div className="relative">
                  <Link size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="url" value={galleryForm.imageUrl} onChange={e => setGalleryForm(f => ({ ...f, imageUrl: e.target.value }))} required
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                    placeholder="https://i.imgur.com/..." />
                </div>
              </div>
              {galleryForm.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-white/10 aspect-video w-full bg-neutral-900">
                  <img src={galleryForm.imageUrl} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Categoría</label>
                <input value={galleryForm.category || ''} onChange={e => setGalleryForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
                  placeholder="Conciertos, Tradición, Eventos..." />
              </div>
              <StatusBar status={status} message={message} />
              <button type="submit" disabled={status === 'uploading'}
                className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
                {status === 'uploading' ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : <><Upload size={16} /> Añadir a Galería</>}
              </button>
            </form>
          )}

        </div>
      </FadeIn>
    </div>
  );
}

function StatusBar({ status, message }: { status: UploadStatus; message: string }) {
  if (status === 'idle' || !message) return null;
  return (
    <div className={`flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl border ${
      status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
      status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
      'bg-blue-500/10 text-blue-400 border-blue-500/20'
    }`}>
      {status === 'success' ? <CheckCircle2 size={18} /> : status === 'uploading' ? <Loader2 size={18} className="animate-spin" /> : null}
      {message}
    </div>
  );
}
