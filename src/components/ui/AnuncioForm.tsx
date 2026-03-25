'use client';

import { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface AnuncioFormProps {
  onClose: () => void;
}

export default function AnuncioForm({ onClose }: AnuncioFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    title: '', category: 'servicios', description: '',
    price: '', currency: 'EUR', location: '',
    contactName: '', contactEmail: '', contactWhatsapp: '', contactPhone: '',
  });

  const categories = [
    { value: 'servicios', label: '🎺 Servicios (Contratación)' },
    { value: 'empleo', label: '💼 Empleo (Busca/Ofrece)' },
    { value: 'instrumentos', label: '🎸 Instrumentos (Compra/Venta)' },
    { value: 'general', label: '📢 General (Eventos / Otros)' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/anuncios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'pending' }),
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
        <h3 className="text-2xl font-syne font-bold mb-3">¡Anuncio enviado!</h3>
        <p className="text-neutral-400 mb-6">Tu anuncio está pendiente de revisión por el administrador. Aparecerá en el mercado en breve.</p>
        <button onClick={onClose} className="btn-primary px-8">Cerrar</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-syne font-bold">Publicar Anuncio</h2>
      <p className="text-sm text-neutral-400">Completa el formulario. Tu anuncio será revisado antes de publicarse.</p>

      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" /> {errorMsg}
        </div>
      )}

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Categoría *</label>
        <select
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60"
          required
        >
          {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Título del Anuncio *</label>
        <input
          value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
          placeholder="Ej: Vendo Trompeta Bach Stradivarius..."
          required
        />
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Descripción *</label>
        <textarea
          rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600 resize-none"
          placeholder="Describe tu anuncio en detalle..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Precio (opcional)</label>
          <input
            type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
            placeholder="450"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Moneda</label>
          <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60">
            <option value="EUR">EUR €</option>
            <option value="MXN">MXN $</option>
            <option value="USD">USD $</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Ubicación</label>
        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
          placeholder="Ciudad, País"
        />
      </div>

      <div className="pt-2 border-t border-white/10">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Información de Contacto *</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
            placeholder="Tu nombre" required
          />
          <input type="email" value={form.contactEmail} onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
            placeholder="tu@email.com"
          />
          <input value={form.contactWhatsapp} onChange={e => setForm(f => ({ ...f, contactWhatsapp: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
            placeholder="WhatsApp +34 / +52..."
          />
          <input value={form.contactPhone} onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 placeholder:text-neutral-600"
            placeholder="Teléfono"
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
          {status === 'loading' ? 'Enviando...' : 'Publicar Anuncio'}
        </button>
      </div>
    </form>
  );
}
