'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { User, MapPin, Phone, Mail, Globe, Save, CheckCircle } from 'lucide-react';

export default function PerfilPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    groupName: '',
    location: '',
    bio: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    membersCount: 1,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {}
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Mi Perfil Público</h1>
          <p className="body-text">Esta información se mostrará en el Directorio del Portal. Completa todos los campos para destacar entre los maestros del mariachi.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Nombre del Grupo / Artista</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <User size={16} className="text-text-light shrink-0" />
                <input
                  value={form.groupName}
                  onChange={e => setForm(f => ({ ...f, groupName: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="Mariachi México de Pepe Villa..."
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Número de Integrantes</label>
              <input
                type="number"
                min="1"
                value={form.membersCount}
                onChange={e => setForm(f => ({ ...f, membersCount: Number(e.target.value) }))}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-gold-primary/60 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Ubicación</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <MapPin size={16} className="text-text-light shrink-0" />
                <input
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="Ciudad de México, México"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">WhatsApp</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <Phone size={16} className="text-text-light shrink-0" />
                <input
                  value={form.whatsapp}
                  onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Correo de Contacto</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <Mail size={16} className="text-text-light shrink-0" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="contacto@mimariachi.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Sitio Web (opcional)</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <Globe size={16} className="text-text-light shrink-0" />
                <input
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="https://mimariachi.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Biografía / Descripción</label>
            <textarea
              rows={5}
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-gold-primary/60 transition-colors resize-none placeholder:text-text-light"
              placeholder="Cuéntanos sobre tu grupo, trayectoria, estilo y especialidades..."
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 px-8"
            >
              {saved ? <CheckCircle size={18} /> : <Save size={18} />}
              {saved ? 'Guardado con éxito' : 'Guardar Perfil Público'}
            </button>
            {saved && <p className="text-green-400 text-sm">Los cambios están pendientes de aprobación.</p>}
          </div>
        </form>
      </FadeIn>
    </div>
  );
}
