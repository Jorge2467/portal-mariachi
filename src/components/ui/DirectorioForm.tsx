'use client';

import { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Users, MapPin, Phone, Mail } from 'lucide-react';

interface DirectorioFormProps {
  onClose: () => void;
}

export default function DirectorioForm({ onClose }: DirectorioFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    groupName: '', membersCount: '1', location: '', bio: '',
    repertoire: '', technicalRequirements: '',
    contactName: '', whatsapp: '', email: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, membersCount: Number(form.membersCount), status: 'pending' }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Error al enviar. Inténtalo de nuevo.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle size={56} className="mx-auto text-green-400 mb-4" />
        <h3 className="text-2xl font-syne font-bold mb-3">¡Solicitud enviada!</h3>
        <p className="text-neutral-400 mb-6">Tu grupo está pendiente de revisión. Aparecerás en el Directorio Global en breve.</p>
        <button onClick={onClose} className="btn-primary px-8">Cerrar</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-syne font-bold">Inscribirse en el Directorio</h2>
      <p className="text-sm text-neutral-400">Registra tu grupo en el Directorio Global del Portal. Tu perfil será revisado antes de publicarse.</p>

      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Nombre del Grupo *</label>
          <input value={form.groupName} onChange={e => setForm(f => ({ ...f, groupName: e.target.value }))}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
            placeholder="Mariachi Los Reyes de Jalisco" required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">N° de Integrantes *</label>
          <input type="number" min="1" value={form.membersCount} onChange={e => setForm(f => ({ ...f, membersCount: e.target.value }))}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Ubicación *</label>
          <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
            placeholder="Ciudad, País" required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Biografía / Presentación *</label>
        <textarea rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600 resize-none"
          placeholder="Cuéntanos sobre tu grupo, trayectoria y especialidades..." required
        />
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Repertorio Principal</label>
        <textarea rows={3} value={form.repertoire} onChange={e => setForm(f => ({ ...f, repertoire: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600 resize-none"
          placeholder="Cielito Lindo, El Rey, Guadalajara, Volver Volver..."
        />
      </div>

      <div className="pt-2 border-t border-white/10">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Contacto *</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
            placeholder="Nombre del contacto" required
          />
          <input value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
            placeholder="WhatsApp +52..."
          />
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-primary/60 placeholder:text-neutral-600"
            placeholder="email@tugrupo.com"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="flex-1 py-3 px-6 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors font-bold">
          Cancelar
        </button>
        <button type="submit" disabled={status === 'loading'}
          className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
          <Send size={16} />
          {status === 'loading' ? 'Enviando...' : 'Inscribir Grupo'}
        </button>
      </div>
    </form>
  );
}
