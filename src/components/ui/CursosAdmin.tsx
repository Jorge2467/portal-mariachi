'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, X, AlertCircle } from 'lucide-react';

interface CourseFormData {
  title: string;
  instructorName: string;
  description: string;
  icon: string;
  lessons: number;
  hours: string;
  price: string;
  isFree: boolean;
}

const ICONS = ['🎺', '🎸', '🎻', '🎤', '🎵', '📚', '🥁', '🎹', '🎷', '🎼'];
const EMPTY: CourseFormData = {
  title: '', instructorName: '', description: '',
  icon: '🎵', lessons: 12, hours: '6', price: '0', isFree: true,
};

export default function CursosAdmin({ initialCourses }: { initialCourses: any[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<CourseFormData>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(course: any) {
    setEditing(course);
    setForm({
      title: course.title || '',
      instructorName: course.instructorName || '',
      description: course.description || '',
      icon: course.icon || '🎵',
      lessons: course.lessons || 12,
      hours: course.hours || '6',
      price: course.price || '0',
      isFree: course.isFree ?? true,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');
    try {
      const payload = { ...form, lessons: Number(form.lessons), studentCount: 0 };
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/courses/${editing.id}` : '/api/courses';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const saved = await res.json();
      if (editing) {
        setCourses(cs => cs.map(c => c.id === saved.id ? saved : c));
      } else {
        setCourses(cs => [...cs, saved]);
      }
      setStatus('success');
      setMsg(editing ? 'Curso actualizado.' : 'Curso creado.');
      setTimeout(() => { setShowForm(false); setStatus('idle'); setMsg(''); }, 1500);
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message || 'Error al guardar.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este curso?')) return;
    await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    setCourses(cs => cs.filter(c => c.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-syne font-bold">Gestión de Cursos</h2>
          <p className="text-sm text-neutral-400">{courses.length} cursos en la plataforma</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors">
          <Plus size={18} /> Nuevo Curso
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 text-neutral-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-syne font-bold mb-6">{editing ? 'Editar Curso' : 'Crear Nuevo Curso'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle size={15} /> {msg}
                </div>
              )}
              {status === 'success' && (
                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-xl px-4 py-3 text-sm">
                  <CheckCircle size={15} /> {msg}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Icono</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map(ic => (
                    <button type="button" key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                      className={`text-2xl p-2 rounded-lg transition-colors ${form.icon === ic ? 'bg-blue-600' : 'bg-white/5 hover:bg-white/10'}`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400/60 placeholder:text-neutral-600"
                  placeholder="Trompeta Mariachi — Nivel Básico" />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Instructor *</label>
                <input value={form.instructorName} onChange={e => setForm(f => ({ ...f, instructorName: e.target.value }))} required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400/60 placeholder:text-neutral-600"
                  placeholder="Maestro Juan Valdés" />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Descripción</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-400/60 placeholder:text-neutral-600 resize-none"
                  placeholder="Descripción del contenido del curso..." />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Lecciones</label>
                  <input type="number" min="1" value={form.lessons} onChange={e => setForm(f => ({ ...f, lessons: Number(e.target.value) }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-white outline-none focus:border-blue-400/60" />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Horas</label>
                  <input value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-white outline-none focus:border-blue-400/60"
                    placeholder="12" />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">Precio €</label>
                  <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} disabled={form.isFree}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-white outline-none focus:border-blue-400/60 disabled:opacity-40"
                    placeholder="49.99" />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isFree} onChange={e => setForm(f => ({ ...f, isFree: e.target.checked, price: e.target.checked ? '0' : f.price }))}
                  className="w-5 h-5 accent-blue-500" />
                <span className="text-sm text-neutral-300">Curso gratuito</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors font-bold">
                  Cancelar
                </button>
                <button type="submit" disabled={status === 'loading'}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
                  {status === 'loading' ? 'Guardando...' : editing ? 'Actualizar' : 'Crear Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course list */}
      <div className="space-y-3">
        {courses.length === 0 && (
          <div className="glass-card py-16 text-center">
            <span className="text-4xl block mb-3">📚</span>
            <p className="text-neutral-500">Sin cursos. Crea el primero.</p>
          </div>
        )}
        {courses.map((c: any) => (
          <div key={c.id} className="glass-card px-6 py-4 flex items-center gap-4">
            <span className="text-3xl shrink-0">{c.icon || '🎵'}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-syne font-bold text-white truncate">{c.title}</h4>
              <p className="text-sm text-neutral-400">{c.instructorName} · {c.lessons} lecciones · {c.hours}h</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${c.isFree ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
              {c.isFree ? 'GRATIS' : `${c.price} €`}
            </span>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(c)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Edit3 size={16} />
              </button>
              <button onClick={() => handleDelete(c.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
