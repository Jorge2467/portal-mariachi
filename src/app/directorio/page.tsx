import { db } from '@/db';
import { mariachiDirectory } from '@/db/schema';
import { and, ilike, eq } from 'drizzle-orm';
import DirectorioClient from '@/components/ui/DirectorioClient';

export const dynamic = 'force-dynamic';

export default async function DirectorioPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; loc?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const loc = resolvedParams.loc || '';

  const conditions = [eq(mariachiDirectory.status, 'approved')];
  if (q) conditions.push(ilike(mariachiDirectory.groupName, `%${q}%`));
  if (loc) conditions.push(ilike(mariachiDirectory.location, `%${loc}%`));

  const mariachis = await db
    .select()
    .from(mariachiDirectory)
    .where(and(...conditions))
    .limit(50);

  return <DirectorioClient mariachis={mariachis as any} />;
}
