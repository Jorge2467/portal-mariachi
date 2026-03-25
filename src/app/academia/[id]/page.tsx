import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, PlayCircle, ChevronLeft, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AcademiaDetalleePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const records = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  const course = records[0];
  if (!course) notFound();

  const lessons = [
    { num: 1, title: 'Introducción y Bienvenida', duration: '5 min', free: true },
    { num: 2, title: 'Historia del Instrumento', duration: '12 min', free: true },
    { num: 3, title: 'Postura y Técnica Básica', duration: '18 min', free: false },
    { num: 4, title: 'Primeras Notas y Escalas', duration: '22 min', free: false },
    { num: 5, title: 'Ritmos Fundamentales del Mariachi', duration: '25 min', free: false },
    { num: 6, title: 'Tu Primera Canción Completa', duration: '30 min', free: false },
  ];

  const highlights = [
    `${course.lessons || 6} lecciones en video`,
    `${course.hours || 4} horas de contenido`,
    'Acceso de por vida',
    'Certificado de finalización',
    'Material descargable',
    'Comunidad de estudiantes',
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-white pb-24 relative overflow-hidden">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-blue-950 via-black to-black py-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1e3a8a22,_transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/academia" className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors mb-8 group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver a Academia
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-5xl mb-4">{course.icon || '🎵'}</div>
              <h1 className="text-4xl md:text-5xl font-syne font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-neutral-400 text-lg mb-6">{course.description}</p>
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1 text-gold-primary">
                  <Star size={14} fill="currentColor" />
                  <strong>{course.rating || '4.8'}</strong>
                </span>
                <span className="text-neutral-500 flex items-center gap-1">
                  <Users size={14} />
                  {course.studentCount || 0} estudiantes
                </span>
                <span className="text-neutral-500 flex items-center gap-1">
                  <Clock size={14} />
                  {course.hours}h
                </span>
              </div>
              <p className="text-neutral-400 text-sm">Por <strong className="text-white">{course.instructorName}</strong></p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className={`text-4xl font-syne font-black mb-2 ${course.isFree ? 'text-green-400' : 'text-white'}`}>
                {course.isFree ? 'GRATIS' : `${course.price} €`}
              </div>
              {!course.isFree && <p className="text-neutral-500 text-sm mb-6">Acceso completo de por vida</p>}
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors text-lg mb-3">
                {course.isFree ? 'Comenzar Gratis' : 'Inscribirse Ahora'}
              </button>
              <p className="text-xs text-neutral-500">30 días de garantía de devolución</p>
              <div className="mt-6 pt-6 border-t border-white/10 text-left space-y-2">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle size={14} className="text-green-400 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-3xl font-syne font-bold mb-8">Contenido del Curso</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div key={lesson.num} className="glass-card px-6 py-4 flex items-center justify-between group hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${lesson.free ? 'bg-blue-600' : 'bg-white/5'}`}>
                    <PlayCircle size={16} className={lesson.free ? 'text-white' : 'text-neutral-500'} />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-blue-300 transition-colors">
                      Lección {lesson.num}: {lesson.title}
                    </p>
                    <p className="text-xs text-neutral-500">{lesson.duration}</p>
                  </div>
                </div>
                {lesson.free ? (
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">VISTA PREVIA</span>
                ) : (
                  <span className="text-xs text-neutral-600">🔒 Con inscripción</span>
                )}
              </div>
            ))}
            {(course.lessons || 6) > lessons.length && (
              <div className="glass-card px-6 py-4 text-center text-neutral-500 text-sm">
                + {(course.lessons || 6) - lessons.length} lecciones adicionales con inscripción
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16 glass-card p-8 text-center">
            <BookOpen size={40} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-2xl font-syne font-bold mb-2">¿Listo para aprender?</h3>
            <p className="text-neutral-400 mb-6">Únete a {course.studentCount || 0} estudiantes y aprende con los mejores maestros del mariachi.</p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-12 py-4 rounded-xl transition-colors text-lg">
              {course.isFree ? 'Empezar Ahora — Gratis' : `Inscribirse por ${course.price} €`}
            </button>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
