import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Clock, Star, BookOpen, Check } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbCourse = await getCourseById(id);

  // Fallback a mock data si no hay DB
  const course = dbCourse || {
    id,
    title: 'Técnica Mariachi Nivel 1',
    instructor_name: 'Maestro Valdés',
    rating: 4.9,
    reviews: 342,
    is_free: false,
    price: 999,
    lessons: 12,
    hours: 4,
    description: 'Aprende los fundamentos técnicos y teóricos para tocar la vihuela desde cero. Ideal para principiantes que buscan un sonido auténtico y tradicional.',
    curriculum: [
      'Introducción a la Vihuela y Postura',
      'Acordes Básicos y Rasgueos Simples',
      'El Abanico Tradicional',
      'Progresiones Rancheras',
      'Proyecto Final: Tocar "El Son de la Negra"'
    ]
  };

  if (!course) notFound();

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-fluid max-w-5xl mx-auto relative z-10">
        <Link href="/#academia" className="inline-flex items-center gap-2 text-text-light hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Volver a la Academia
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-syne font-bold m-0 mb-4 tracking-tight">{course.title}</h1>
              <p className="text-xl text-text-light mb-6">Impartido por <strong className="text-blue-400">{course.instructor_name}</strong></p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
                <span className="flex items-center gap-1.5 font-bold text-gold-primary"><Star size={16} fill="currentColor" /> {course.rating} ({course.reviews} reseñas)</span>
                <span className="flex items-center gap-1.5 text-text-light"><PlayCircle size={16} /> {course.lessons} Elementos</span>
                <span className="flex items-center gap-1.5 text-text-light"><Clock size={16} /> {course.hours} Horas de Video</span>
              </div>
              
              <div className="prose prose-invert prose-blue max-w-none">
                <h3 className="text-2xl font-syne font-bold mb-4">Acerca de este curso</h3>
                <p className="text-lg text-text-light leading-relaxed">{course.description}</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-syne font-bold mb-6">Plan de Estudios</h3>
              <div className="space-y-4">
                {course.curriculum?.map((module: string, idx: number) => (
                  <div key={idx} className="glass-card p-5 flex items-center gap-4 hover:border-blue-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-lg">{module}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-1">
            <FadeIn delay={0.3} direction="up">
              <div className="glass-card p-8 sticky top-32 border-t-4 border-t-blue-500">
                <div className="w-full h-48 bg-black/50 rounded-xl mb-6 flex items-center justify-center relative group cursor-pointer overflow-hidden border border-white/5">
                  <BookOpen size={48} className="text-blue-500/50 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-bold flex items-center gap-2"><PlayCircle size={16}/> Ver Trailer</span>
                  </div>
                </div>
                
                <h2 className="text-4xl font-syne font-bold mb-2">
                  {course.is_free ? <span className="text-green-400">Gratis</span> : `$${course.price}`}
                </h2>
                <p className="text-sm text-text-light mb-6">Acceso de por vida. Certificado al finalizar.</p>
                
                <button className={`w-full py-4 text-center font-bold text-lg rounded-xl transition-all ${course.is_free ? 'bg-green-500 text-black hover:bg-green-400' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>
                  {course.is_free ? 'Inscribirse Gratis' : 'Comprar Curso'}
                </button>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-light"><Check size={16} className="text-blue-400" /> Video Bajo Demanda (VOD)</div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Check size={16} className="text-blue-400" /> Archivos PDF Descargables</div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Check size={16} className="text-blue-400" /> Acceso en Móvil y TV</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
