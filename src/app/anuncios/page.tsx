import { db } from '@/db';
import { anuncios } from '@/db/schema';
import { and, desc, eq, ilike } from 'drizzle-orm';
import AnunciosClient from '@/components/ui/AnunciosClient';

export const dynamic = 'force-dynamic';

export default async function AnunciosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const cat = resolvedParams.cat || '';

  const conditions = [eq(anuncios.status, 'approved')];
  if (q) conditions.push(ilike(anuncios.title, `%${q}%`));
  if (cat) conditions.push(eq(anuncios.category, cat));

  const records = await db.select().from(anuncios)
    .where(and(...conditions))
    .orderBy(desc(anuncios.createdAt))
    .limit(30);

  const categories = [
    { value: 'servicios', label: 'Servicios' },
    { value: 'empleo', label: 'Empleo' },
    { value: 'instrumentos', label: 'Instrumentos' },
    { value: 'general', label: 'General' },
  ];

  return <AnunciosClient records={records as any} categories={categories} />;
}
