import fs from 'fs';
import path from 'path';

const API_DIR = path.join(process.cwd(), 'src', 'app', 'api');

const TABLES = [
  { name: 'songs', schemaImport: 'songs', pk: 'id', titleStr: 'title' },
  { name: 'collections', schemaImport: 'collections', pk: 'id', titleStr: 'title' },
  { name: 'partituras', schemaImport: 'partituras', pk: 'id', titleStr: 'title' },
  { name: 'courses', schemaImport: 'courses', pk: 'id', titleStr: 'title' },
  { name: 'blog', schemaImport: 'blogPosts', pk: 'slug', titleStr: 'title' },
  { name: 'anuncios', schemaImport: 'anuncios', pk: 'id', titleStr: 'title' },
  { name: 'directory', schemaImport: 'mariachiDirectory', pk: 'id', titleStr: 'groupName' },
  { name: 'gallery', schemaImport: 'gallery', pk: 'id', titleStr: 'title' },
  { name: 'albums', schemaImport: 'albums', pk: 'id', titleStr: 'title' },
];

const TEMPLATE_ROUTE_TS = (schemaImport) => `import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ${schemaImport} } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const records = await db.select().from(${schemaImport}).orderBy(desc(${schemaImport}.createdAt)).limit(limit);
    return NextResponse.json(records);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRecord = await db.insert(${schemaImport}).values(body).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
  }
}
`;

const TEMPLATE_ID_ROUTE_TS = (schemaImport, pk) => `import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ${schemaImport} } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { ${pk}: string } }) {
  try {
    const record = await db.select().from(${schemaImport}).where(eq(${schemaImport}.${pk}, params.${pk})).limit(1);
    if (!record[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(record[0]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { ${pk}: string } }) {
  try {
    const body = await request.json();
    const updated = await db.update(${schemaImport}).set(body).where(eq(${schemaImport}.${pk}, params.${pk})).returning();
    if (!updated[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { ${pk}: string } }) {
  try {
    const deleted = await db.delete(${schemaImport}).where(eq(${schemaImport}.${pk}, params.${pk})).returning();
    if (!deleted[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, deleted: deleted[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
`;

TABLES.forEach(({ name, schemaImport, pk }) => {
  const collectionDir = path.join(API_DIR, name);
  const idDir = path.join(collectionDir, `[${pk}]`);

  if (!fs.existsSync(collectionDir)) {
    fs.mkdirSync(collectionDir, { recursive: true });
  }
  if (!fs.existsSync(idDir)) {
    fs.mkdirSync(idDir, { recursive: true });
  }

  const routePath = path.join(collectionDir, 'route.ts');
  const idRoutePath = path.join(idDir, 'route.ts');

  if (!fs.existsSync(routePath)) {
    fs.writeFileSync(routePath, TEMPLATE_ROUTE_TS(schemaImport));
    console.log(`✅ Generated ${routePath}`);
  }

  if (!fs.existsSync(idRoutePath)) {
    fs.writeFileSync(idRoutePath, TEMPLATE_ID_ROUTE_TS(schemaImport, pk));
    console.log(`✅ Generated ${idRoutePath}`);
  }
});
