import FadeIn from '@/components/ui/FadeIn';
import { BookOpen, Star, PlayCircle, Clock, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AcademiaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; free?: string }>;
}) {
  const params = await searchParams;
  const allCourses = await getCourses(50);

  let filtered = allCourses;
  if (params.q) {
    filtered = filtered.filter((c: any) =>
      c.title?.toLowerCase().includes(params.q!.toLowerCase()) ||
      c.instructorName?.toLowerCase().includes(params.q!.toLowerCase())
    );
  }
  if (params.free === '1') {
    filtered = filtered.filter((c: any) => c.isFree);
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white pt-8 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-blue-900/10 pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 bg-blue-400/10 px-4 py-2 rounded-full">
              <GraduationCap size={14} />
              Academia Interactiva
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 text-white">
              Maestros del Mariachi
            </h1>
            <p className="text-xl text-neutral-400 font-inter max-w-2xl mx-auto">
              Aprende de los mejores. Cursos en línea, masterclasses y certificaciones para llevar tu talento al siguiente nivel.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <form method="GET" className="flex flex-wrap gap-3 mb-12 justify-center">
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Buscar curso o instructor..."
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-400/60 transition-colors placeholder:text-neutral-500 flex-1 min-w-[220px]"
            />
            <label className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:border-blue-400/40 transition-colors">
              <input type="checkbox" name="free" value="1" defaultChecked={params.free === '1'} className="accent-blue-400" />
              <span className="text-sm text-neutral-300">Solo gratuitos</span>
            </label>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
              Filtrar
            </button>
          </form>
        </FadeIn>

        {filtered.length === 0 ? (
          <FadeIn delay={0.3}>
            <div className="glass-card p-20 text-center">
              <BookOpen size={48} className="mx-auto text-neutral-600 mb-4" />
              <p className="text-neutral-500">
                {params.q
                  ? `Sin resultados para "${params.q}".`
                  : 'No hay cursos disponibles aún. El administrador puede añadirlos desde el Panel.'}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course: any, i: number) => (
              <FadeIn key={course.id} delay={0.1 + i * 0.05} direction="up">
                <Link href={`/academia/${course.id}`} className="block h-full">
                  <div className="glass-card p-6 h-full flex flex-col hover:-translate-y-2 transition-all duration-300 group border-t-2 border-t-blue-500/20 hover:border-t-blue-400">
                    <div className="text-4xl mb-4">{course.icon || '🎵'}</div>
                    <h3 className="text-xl font-syne font-bold mb-2 group-hover:text-blue-300 transition-colors flex-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-2">por {course.instructorName}</p>
                    <p className="text-sm text-neutral-500 mb-5 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 mb-4">
                      <span className="flex items-center gap-1"><PlayCircle size={13} className="text-gold-primary" /> {course.lessons} lecciones</span>
                      <span className="flex items-center gap-1"><Clock size={13} className="text-gold-primary" /> {course.hours}h</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1 text-gold-primary">
                        <Star size={14} fill="currentColor" />
                        <span className="font-bold text-sm">{course.rating}</span>
                        <span className="text-neutral-500 text-xs ml-1">({course.studentCount})</span>
                      </div>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${course.isFree ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                        {course.isFree ? 'GRATIS' : `${course.price} €`}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
