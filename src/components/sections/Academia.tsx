import FadeIn from '@/components/ui/FadeIn';
import { BookOpen, Star, PlayCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/lib/data';

export default async function Academia() {
  const dbCourses = await getCourses(4);
  
  const displayCourses = dbCourses.length > 0 ? dbCourses : [
    { id: 1, title: 'Técnica Mariachi Nivel 1', instructor_name: 'Maestro Valdés', rating: 4.9, is_free: true, price: 0, lessons: 12, hours: 4 },
    { id: 2, title: 'Armonía para Vihuela', instructor_name: 'Carlos Rivera', rating: 4.8, is_free: false, price: 299, lessons: 8, hours: 2.5 },
  ];

  return (
    <section id="academia" className="py-24 bg-black relative border-t border-white/5 snap-start scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />
      
      <div className="container-fluid relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-3 block">Academia Interactiva</span>
            <h2 className="heading-2 mb-6 text-balance">Maestros del Mariachi</h2>
            <p className="body-text">
              Aprende de los mejores. Cursos en línea, *masterclasses* y certificaciones oficiales para llevar tu talento al siguiente nivel.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCourses.map((course: any, i: number) => (
            <FadeIn key={course.id} delay={0.1 * i} direction="up" fullWidth>
              <Link href={`/academia/${course.id}`} className="block h-full block">
                <div className="glass-card p-6 h-full flex flex-col hover:-translate-y-2 transition-all duration-300 group border-t-2 border-t-blue-500/20 hover:border-t-blue-400 bg-bg-card/40 hover:bg-bg-card/80">
                  <div className="mb-4 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-transform origin-left">
                    <BookOpen size={30} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-syne font-bold mb-2 group-hover:text-blue-300 transition-colors">{course.title}</h3>
                  <p className="text-sm text-text-light mb-4 flex-1">Por {course.instructor_name}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold text-text-light mb-6">
                    <span className="flex items-center gap-1"><PlayCircle size={14} className="text-gold-primary" /> {course.lessons} lecciones</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-gold-primary" /> {course.hours}h</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1 text-gold-primary">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold text-sm">{course.rating}</span>
                    </div>
                    <span className={`text-sm font-bold ${course.is_free ? 'text-green-400' : 'text-white'}`}>
                      {course.is_free ? 'GRATIS' : `$${course.price} MXN`}
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <Link href="/academia" className="btn-primary inline-flex items-center gap-2">
              Ver Todos los Cursos
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
