'use client';

import { useState, useRef, useCallback } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import {
  Youtube, Music, FileText, Image as ImageIcon,
  Loader2, CheckCircle2, X, Upload, Plus, Film
} from 'lucide-react';

type Tab = 'video' | 'audio' | 'scores' | 'gallery';
type FileEntry = { file: File; id: string; status: 'pending' | 'uploading' | 'done' | 'error'; message: string };

/* ─── Utilities ─── */
function ytId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function uid() { return Math.random().toString(36).slice(2); }
function humanSize(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

/* ─── StatusIndicator ─── */
function StatusBadge({ status, message }: { status: FileEntry['status']; message: string }) {
  const styles: Record<typeof status, string> = {
    pending: 'bg-white/5 text-neutral-400 border-white/10',
    uploading: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    done: 'bg-green-500/10 text-green-400 border-green-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {status === 'uploading' && <Loader2 size={10} className="inline animate-spin mr-1" />}
      {status === 'done' && <CheckCircle2 size={10} className="inline mr-1" />}
      {message || status}
    </span>
  );
}

/* ─── DropZone ─── */
function DropZone({
  accept, multiple = false, onFiles,
  icon, label, hint,
}: {
  accept: string; multiple?: boolean;
  onFiles: (files: File[]) => void;
  icon: React.ReactNode; label: string; hint: string;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handle}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
        drag ? 'border-gold-primary bg-gold-primary/5' : 'border-white/10 bg-black/40 hover:border-gold-primary/40 hover:bg-white/5'
      }`}
    >
      <input
        ref={inputRef} type="file" className="hidden"
        accept={accept} multiple={multiple}
        onChange={e => { if (e.target.files?.length) { onFiles(Array.from(e.target.files)); e.target.value = ''; } }}
      />
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gold-primary">{icon}</div>
      <p className="text-lg font-medium text-white mb-1">{label}</p>
      <p className="text-sm text-neutral-500 mb-3">o haz clic para explorar en tu disco</p>
      <span className="text-xs font-mono text-gold-light/60 bg-gold-primary/10 px-3 py-1 rounded-full">{hint}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TABS
═══════════════════════════════════════════════ */

/* ── VIDEO TAB ── */
function VideoTab() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const preview = ytId(url);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = ytId(url);
    if (!id) { setStatus('error'); setMsg('URL de YouTube no válida'); return; }
    setStatus('loading');
    const embedUrl = `https://www.youtube.com/embed/${id}`;
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title || `Video YouTube ${id}`,
        imageUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        videoUrl: embedUrl,
        category: 'Videos',
        description,
      }),
    });
    if (res.ok) {
      setStatus('done'); setMsg('Video registrado en la base de datos.');
      setUrl(''); setTitle(''); setDescription('');
      setTimeout(() => { setStatus('idle'); setMsg(''); }, 3000);
    } else {
      setStatus('error'); setMsg('Error al guardar el video.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="label-sm">URL de YouTube *</label>
        <input value={url} onChange={e => setUrl(e.target.value)} required
          className="input-field" placeholder="https://www.youtube.com/watch?v=..." />
      </div>

      {preview && (
        <div className="rounded-2xl overflow-hidden aspect-video border border-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${preview}`}
            className="w-full h-full" allowFullScreen
            title="Preview"
          />
        </div>
      )}

      <div>
        <label className="label-sm">Título</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="input-field" placeholder="El Rey — Mariachi Vargas en vivo" />
      </div>
      <div>
        <label className="label-sm">Descripción</label>
        <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)}
          className="input-field resize-none" placeholder="Presentación en el Palacio de Bellas Artes..." />
      </div>

      {msg && (
        <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
          status === 'done' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {status === 'done' ? <CheckCircle2 size={16} /> : null} {msg}
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" />Guardando...</> : <><Film size={16} />Registrar Video</>}
      </button>
    </form>
  );
}

/* ── AUDIO TAB ── */
function AudioTab() {
  const [queue, setQueue] = useState<FileEntry[]>([]);
  const [uploading, setUploading] = useState(false);

  const addFiles = (files: File[]) => {
    const valid = files.filter(f => f.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(f.name));
    setQueue(q => [...q, ...valid.map(f => ({ file: f, id: uid(), status: 'pending' as const, message: humanSize(f.size) }))]);
  };

  const remove = (id: string) => setQueue(q => q.filter(x => x.id !== id));

  async function uploadAll() {
    setUploading(true);
    for (const entry of queue) {
      if (entry.status === 'done') continue;
      setQueue(q => q.map(x => x.id === entry.id ? { ...x, status: 'uploading', message: 'Subiendo...' } : x));
      const fd = new FormData();
      fd.append('file', entry.file);
      const res = await fetch('/api/uploads/audio', { method: 'POST', body: fd });
      const data = await res.json();
      setQueue(q => q.map(x => x.id === entry.id
        ? { ...x, status: res.ok ? 'done' : 'error', message: res.ok ? data.message || '✓ Guardado' : data.error || 'Error' }
        : x
      ));
    }
    setUploading(false);
  }

  const pending = queue.filter(x => x.status !== 'done').length;

  return (
    <div className="max-w-2xl space-y-6">
      <DropZone
        accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
        multiple
        onFiles={addFiles}
        icon={<Music size={28} />}
        label="Arrastra tus archivos de audio aquí"
        hint="MP3, WAV, OGG, M4A, AAC, FLAC — Máx. 50 MB c/u"
      />

      {queue.length > 0 && (
        <div className="space-y-2">
          {queue.map(entry => (
            <div key={entry.id} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
              <Music size={16} className="text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{entry.file.name}</p>
              </div>
              <StatusBadge status={entry.status} message={entry.message} />
              {entry.status !== 'uploading' && entry.status !== 'done' && (
                <button onClick={() => remove(entry.id)} className="shrink-0 text-neutral-600 hover:text-red-400 transition-colors"><X size={14} /></button>
              )}
            </div>
          ))}
        </div>
      )}

      {pending > 0 && (
        <button onClick={uploadAll} disabled={uploading}
          className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
          {uploading ? <><Loader2 size={16} className="animate-spin" />Subiendo...</> : <><Upload size={16} />Subir {pending} audio{pending > 1 ? 's' : ''}</>}
        </button>
      )}
    </div>
  );
}

/* ── PARTITURAS TAB ── */
function PartiturasTab() {
  const [queue, setQueue] = useState<FileEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const addFiles = (files: File[]) => {
    const valid = files.filter(f => /\.(pdf|png|jpg|jpeg|webp|sib|mus)$/i.test(f.name));
    setQueue(q => [...q, ...valid.map(f => ({ file: f, id: uid(), status: 'pending' as const, message: humanSize(f.size) }))]);
  };

  const remove = (id: string) => setQueue(q => q.filter(x => x.id !== id));

  async function uploadAll() {
    setUploading(true);
    let count = doneCount;
    for (const entry of queue) {
      if (entry.status === 'done') continue;
      setQueue(q => q.map(x => x.id === entry.id ? { ...x, status: 'uploading', message: 'Subiendo...' } : x));
      const fd = new FormData();
      fd.append('files', entry.file);
      const res = await fetch('/api/uploads/scores', { method: 'POST', body: fd });
      const data = await res.json();
      const ok = res.ok && data.uploaded > 0;
      if (ok) count++;
      setQueue(q => q.map(x => x.id === entry.id
        ? { ...x, status: ok ? 'done' : 'error', message: ok ? '✓ Guardada en DB' : data.errorList?.[0]?.error || 'Error' }
        : x
      ));
    }
    setDoneCount(count);
    setUploading(false);
  }

  const pending = queue.filter(x => x.status !== 'done').length;

  const extColor: Record<string, string> = {
    pdf: 'text-red-400', sib: 'text-purple-400', mus: 'text-purple-400',
    png: 'text-green-400', jpg: 'text-green-400', jpeg: 'text-green-400',
  };

  return (
    <div className="max-w-2xl space-y-6">
      <DropZone
        accept=".pdf,.sib,.mus,.png,.jpg,.jpeg,.webp"
        multiple
        onFiles={addFiles}
        icon={<FileText size={28} />}
        label="Arrastra tus partituras aquí"
        hint="PDF, SIB (Sibelius), MUS (Finale), JPG/PNG — Batch de miles"
      />

      {doneCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} /> {doneCount} partitura{doneCount > 1 ? 's' : ''} guardada{doneCount > 1 ? 's' : ''} en la base de datos.
        </div>
      )}

      {queue.length > 0 && (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {queue.map(entry => {
            const ext = entry.file.name.split('.').pop()?.toLowerCase() || '';
            return (
              <div key={entry.id} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
                <FileText size={16} className={`${extColor[ext] || 'text-neutral-400'} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{entry.file.name}</p>
                </div>
                <StatusBadge status={entry.status} message={entry.message} />
                {entry.status !== 'uploading' && entry.status !== 'done' && (
                  <button onClick={() => remove(entry.id)} className="shrink-0 text-neutral-600 hover:text-red-400 transition-colors"><X size={14} /></button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {pending > 0 && (
        <button onClick={uploadAll} disabled={uploading}
          className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
          {uploading ? <><Loader2 size={16} className="animate-spin" />Subiendo...</> : <><Upload size={16} />Subir {pending} partitura{pending > 1 ? 's' : ''}</>}
        </button>
      )}
    </div>
  );
}

/* ── GALLERY TAB ── */
function GalleryTab() {
  const [queue, setQueue] = useState<FileEntry[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

  const addFiles = (files: File[]) => {
    const valid = files.filter(f => f.type.startsWith('image/'));
    valid.forEach(f => {
      const reader = new FileReader();
      reader.onload = e => setPreviews(p => ({ ...p, [f.name + f.size]: e.target?.result as string }));
      reader.readAsDataURL(f);
    });
    setQueue(q => [...q, ...valid.map(f => ({ file: f, id: uid(), status: 'pending' as const, message: humanSize(f.size) }))]);
  };

  const remove = (id: string, key: string) => {
    setQueue(q => q.filter(x => x.id !== id));
    setPreviews(p => { const n = { ...p }; delete n[key]; return n; });
  };

  async function uploadAll() {
    setUploading(true);
    for (const entry of queue) {
      if (entry.status === 'done') continue;
      setQueue(q => q.map(x => x.id === entry.id ? { ...x, status: 'uploading', message: 'Subiendo...' } : x));
      const fd = new FormData();
      fd.append('files', entry.file);
      const res = await fetch('/api/uploads/gallery', { method: 'POST', body: fd });
      const data = await res.json();
      setQueue(q => q.map(x => x.id === entry.id
        ? { ...x, status: res.ok ? 'done' : 'error', message: res.ok ? '✓ En galería' : data.error || 'Error' }
        : x
      ));
    }
    setUploading(false);
  }

  const pending = queue.filter(x => x.status !== 'done').length;

  return (
    <div className="max-w-2xl space-y-6">
      <DropZone
        accept="image/*"
        multiple
        onFiles={addFiles}
        icon={<ImageIcon size={28} />}
        label="Arrastra las fotos de eventos aquí"
        hint="JPG, PNG, WEBP — Máx. 10 MB c/u"
      />

      {queue.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {queue.map(entry => {
            const key = entry.file.name + entry.file.size;
            return (
              <div key={entry.id} className="relative rounded-xl overflow-hidden aspect-square bg-neutral-900 border border-white/10 group">
                {previews[key] && <img src={previews[key]} alt="" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => remove(entry.id, key)} className="p-1 bg-red-500 rounded-full text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <StatusBadge status={entry.status} message={entry.message} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pending > 0 && (
        <button onClick={uploadAll} disabled={uploading}
          className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50">
          {uploading ? <><Loader2 size={16} className="animate-spin" />Subiendo...</> : <><Upload size={16} />Subir {pending} imagen{pending > 1 ? 'es' : ''}</>}
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPLORADOR
═══════════════════════════════════════════════ */
export default function ExploradorArchivos() {
  const [activeTab, setActiveTab] = useState<Tab>('scores');

  const tabs: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'video', label: 'Videos YouTube', icon: <Youtube size={16} />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    { id: 'audio', label: 'Audios', icon: <Music size={16} />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { id: 'scores', label: 'Partituras (PDF / SIB)', icon: <FileText size={16} />, color: 'text-gold-primary bg-gold-primary/10 border-gold-primary/20' },
    { id: 'gallery', label: 'Galería de Fotos', icon: <ImageIcon size={16} />, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Explorador Multimedia</h1>
          <p className="body-text">Carga videos de YouTube, audios MP3, partituras PDF/SIB e imágenes directamente desde tu disco. Todo se guarda en la base de datos PostgreSQL.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-card p-6 border-t-4 border-t-gold-primary">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                  activeTab === tab.id
                    ? tab.color
                    : 'text-text-light border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'video' && <VideoTab />}
          {activeTab === 'audio' && <AudioTab />}
          {activeTab === 'scores' && <PartiturasTab />}
          {activeTab === 'gallery' && <GalleryTab />}
        </div>
      </FadeIn>

      {/* Helper styles */}
      <style>{`
        .label-sm { display: block; font-size: 0.7rem; font-weight: 700; color: rgb(163 163 163); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.375rem; }
        .input-field { width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 0.75rem 1rem; color: white; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: rgba(217,175,65,0.6); }
        .input-field::placeholder { color: rgb(82 82 82); }
      `}</style>
    </div>
  );
}
