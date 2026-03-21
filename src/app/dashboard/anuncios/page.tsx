import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/db';
import { anuncios } from '@/db/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { UploadCloud, PenTool, Euro, Phone, Mail, FileText } from 'lucide-react';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

async function handleAction(formData: FormData) {
  'use server';

  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;
  if (!token) throw new Error('Unauthorized');
  
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.sub as string;

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = formData.get('price') ? formData.get('price')?.toString() : null;
  const contactEmail = formData.get('contactEmail') as string;
  
  await db.insert(anuncios).values({
    userId,
    title,
    description,
    category,
    price: price ? price : null,
    contactEmail,
    status: 'pending' // Moderated by default
  });

  revalidatePath('/dashboard');
  redirect('/dashboard?success=anuncio_creado');
}

export default async function PublicarAnuncioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return redirect('/');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-syne font-bold mb-2">Publicar Anuncio en El Mercado</h1>
        <p className="text-neutral-400">Ofrece instrumentos, vestimenta o servicios a la comunidad. Todo anuncio pasará por una revisión de los administradores antes de ser público.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
        {/* Decorator */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
        
        <form action={handleAction} className="relative z-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <label className="text-sm font-bold text-neutral-300">Título del Anuncio</label>
              <div className="relative">
                <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input required type="text" name="title" placeholder="Ej: Vendo Guitarrón de Palo Escrito..." className="w-full bg-black/50 border border-neutral-800 focus:border-amber-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-neutral-600 outline-none" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-300">Categoría</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <select required name="category" className="w-full bg-black/50 border border-neutral-800 focus:border-amber-500/50 rounded-xl py-3 pl-12 pr-4 text-white outline-none appearance-none">
                  <option value="instruments">Instrumentos</option>
                  <option value="clothing">Trajes y Vestimenta</option>
                  <option value="jobs">Buscar / Ofrecer Empleo</option>
                  <option value="services">Servicios Adicionales</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-300">Precio (Opcional)</label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input type="number" name="price" placeholder="Monto" className="w-full bg-black/50 border border-neutral-800 focus:border-amber-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-neutral-600 outline-none" />
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-bold text-neutral-300">Correo de Contacto</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input required type="email" name="contactEmail" placeholder="Tu correo para interesados..." className="w-full bg-black/50 border border-neutral-800 focus:border-amber-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-neutral-600 outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-neutral-300">Descripción detallada</label>
            <textarea required name="description" placeholder="Describe el estado de tu instrumento o las condiciones del trabajo..." className="w-full bg-black/50 border border-neutral-800 focus:border-amber-500/50 rounded-xl p-4 min-h-[160px] text-white placeholder-neutral-600 outline-none resize-y" />
          </div>

          <div className="pt-6 flex justify-end">
            <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)]">
              <UploadCloud className="w-5 h-5" />
              Enviar a Moderación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
