import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';
dotenv.config();

// Creamos un cliente de PostgreSQL usando drizzle-orm/postgres-js
const connectionString = process.env.DATABASE_URL || '';

// Configuración recomendada para Serverless o Next.js (prevenir múltiples conexiones agotadas)
// Si no hay DATABASE_URL configurada localmente, nullificamos para no crashear Next.js
const client = connectionString ? postgres(connectionString, { prepare: false }) : null as any;
export const db = client ? drizzle(client, { schema }) : null as any;
