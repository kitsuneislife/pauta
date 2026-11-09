import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';
import { DATABASE_URL } from '$app/env/private';

export const db = drizzle(postgres(DATABASE_URL), { schema, casing: 'snake_case' });
