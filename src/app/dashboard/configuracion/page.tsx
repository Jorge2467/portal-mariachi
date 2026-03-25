'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Lock, User, Mail, Eye, EyeOff, Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function ConfiguracionPage() {
  const [nameForm, setNameForm] = useState({ name: '' });
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [passError, setPassError] = useState('');

  async function handleNameSave(e: React.FormEvent) {
    e.preventDefault();
    if (!nameForm.name.trim()) return;
    // Update name via API
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameForm.name }),
    });
    if (res.ok) {
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 3000);
    }
  }

  async function handlePassSave(e: React.FormEvent) {
    e.preventDefault();
    setPassError('');
    if (passForm.newPass !== passForm.confirm) {
      setPassError('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (passForm.newPass.length < 8) {
      setPassError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: passForm.current, newPassword: passForm.newPass }),
    });
    if (res.ok) {
      setPassSaved(true);
      setPassForm({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setPassSaved(false), 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      setPassError(data.error || 'Error al cambiar la contraseña.');
    }
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="heading-2 mb-2">Configuración de Cuenta</h1>
          <p className="body-text">Actualiza tu nombre de perfil y contraseña de acceso.</p>
        </div>
      </FadeIn>

      {/* Name form */}
      <FadeIn delay={0.1}>
        <form onSubmit={handleNameSave} className="glass-card p-8 space-y-6">
          <h2 className="text-lg font-syne font-bold flex items-center gap-3">
            <User size={20} className="text-gold-primary" /> Información Personal
          </h2>
          <div>
            <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">Nombre para mostrar</label>
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
              <User size={16} className="text-text-light shrink-0" />
              <input
                value={nameForm.name}
                onChange={e => setNameForm({ name: e.target.value })}
                className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                placeholder="Tu nombre artístico o real..."
              />
            </div>
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2 px-6">
            {nameSaved ? <CheckCircle size={18} /> : <Save size={18} />}
            {nameSaved ? 'Nombre actualizado' : 'Guardar nombre'}
          </button>
        </form>
      </FadeIn>

      {/* Password form */}
      <FadeIn delay={0.2}>
        <form onSubmit={handlePassSave} className="glass-card p-8 space-y-6">
          <h2 className="text-lg font-syne font-bold flex items-center gap-3">
            <Lock size={20} className="text-mariachi-red" /> Cambiar Contraseña
          </h2>

          {passError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              <AlertCircle size={16} shrink-0 />
              {passError}
            </div>
          )}

          {passSaved && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 text-sm">
              <CheckCircle size={16} />
              Contraseña actualizada correctamente.
            </div>
          )}

          {[
            { key: 'current', label: 'Contraseña actual', value: passForm.current },
            { key: 'newPass', label: 'Nueva contraseña', value: passForm.newPass },
            { key: 'confirm', label: 'Confirmar nueva contraseña', value: passForm.confirm },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs font-bold text-text-light uppercase tracking-widest mb-2 block">{field.label}</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary/60">
                <Lock size={16} className="text-text-light shrink-0" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={field.value}
                  onChange={e => setPassForm(f => ({ ...f, [field.key]: e.target.value }))}
                  className="bg-transparent w-full outline-none text-white placeholder:text-text-light"
                  placeholder="••••••••"
                  minLength={8}
                />
                {field.key === 'newPass' && (
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="text-text-light hover:text-white transition-colors shrink-0">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="submit" className="bg-mariachi-red hover:bg-mariachi-red/80 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
            {passSaved ? <CheckCircle size={18} /> : <Lock size={18} />}
            {passSaved ? 'Contraseña cambiada' : 'Actualizar contraseña'}
          </button>
        </form>
      </FadeIn>
    </div>
  );
}
