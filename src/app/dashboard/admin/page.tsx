import { db } from '@/db';
import { mariachiDirectory, anuncios, blogCorrections, courses } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import CursosAdmin from '@/components/ui/CursosAdmin';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import { 
  approveMariachi, rejectMariachi, 
  approveAnuncio, rejectAnuncio, 
  resolveWikiCorrection 
} from '@/app/actions/admin';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'portal-mariachi-super-secret-key-2026');

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_auth_token')?.value;

  if (!token) return redirect('/');

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') {
      return redirect('/dashboard'); // Kick impostors to regular dashboard
    }
  } catch (e) {
    return redirect('/');
  }

  // Fetch pending review items
  const pendingMariachis = await db.select().from(mariachiDirectory).where(eq(mariachiDirectory.status, 'pending'));
  const pendingAnuncios = await db.select().from(anuncios).where(eq(anuncios.status, 'pending'));
  const pendingCorrections = await db.select().from(blogCorrections).where(eq(blogCorrections.adminStatus, 'pending'));
  const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt));

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-8">
        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
          <ShieldCheck className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-syne font-bold">Centro de Comando</h1>
          <p className="text-neutral-400">Moderación y curaduría del ecosistema musical.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* MARIACHIS BOX */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <h2 className="text-xl font-syne font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
            Solicitudes de Directorio ({pendingMariachis.length})
          </h2>
          {pendingMariachis.length === 0 ? (
            <p className="text-neutral-500 text-sm">No hay mariachis en cola de revisión.</p>
          ) : (
            <div className="space-y-4">
              {pendingMariachis.map((m: any) => (
                <div key={m.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{m.groupName}</h3>
                      <p className="text-xs text-neutral-400">{m.location} • {m.membersCount} integrantes</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{m.bio}</p>
                  <div className="flex gap-2">
                    <form action={approveMariachi.bind(null, m.id)}>
                      <button type="submit" className="text-xs bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><CheckCircle className="w-3 h-3"/> Aprobar</button>
                    </form>
                    <form action={rejectMariachi.bind(null, m.id)}>
                      <button type="submit" className="text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><XCircle className="w-3 h-3"/> Rechazar</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ANUNCIOS BOX */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <h2 className="text-xl font-syne font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]"></span>
            Clasificados del Mercado ({pendingAnuncios.length})
          </h2>
          {pendingAnuncios.length === 0 ? (
            <p className="text-neutral-500 text-sm">No hay clasificados en cola de revisión.</p>
          ) : (
            <div className="space-y-4">
              {pendingAnuncios.map((a: any) => (
                <div key={a.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{a.title}</h3>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider">{a.category}</p>
                    </div>
                    {a.price && <span className="text-amber-500 font-bold">${a.price}</span>}
                  </div>
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{a.description}</p>
                  <div className="flex gap-2">
                    <form action={approveAnuncio.bind(null, a.id)}>
                      <button type="submit" className="text-xs bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><CheckCircle className="w-3 h-3"/> Aprobar</button>
                    </form>
                    <form action={rejectAnuncio.bind(null, a.id)}>
                      <button type="submit" className="text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><XCircle className="w-3 h-3"/> Rechazar</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* WIKI CORRECTIONS BOX */}
        <section className="col-span-1 xl:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <h2 className="text-xl font-syne font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]"></span>
            Enmiendas Históricas Wiki ({pendingCorrections.length})
          </h2>
          {pendingCorrections.length === 0 ? (
            <p className="text-neutral-500 text-sm">La biblioteca nacional no presenta inconsistencias por revisar.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingCorrections.map((w: any) => (
                <div key={w.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                  <div className="mb-2">
                    <span className="text-xs text-indigo-400 tracking-widest uppercase font-bold">Aporte Literario</span>
                  </div>
                  <p className="text-sm text-neutral-300 font-inter italic border-l-2 border-neutral-700 pl-3 mb-4">
                    "{w.proposedContent}"
                  </p>
                  <div className="flex gap-2">
                    <form action={resolveWikiCorrection.bind(null, w.id, 'approve')}>
                      <button type="submit" className="text-xs bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><CheckCircle className="w-3 h-3"/> Procesar (Válido)</button>
                    </form>
                    <form action={resolveWikiCorrection.bind(null, w.id, 'reject')}>
                      <button type="submit" className="text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"><XCircle className="w-3 h-3"/> Descartar</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CURSOS MANAGEMENT */}
        <section className="col-span-1 xl:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
            <h2 className="text-xl font-syne font-bold">Gestión de Cursos ({allCourses.length})</h2>
          </div>
          <CursosAdmin initialCourses={allCourses as any} />
        </section>

      </div>
    </div>
  );
}
