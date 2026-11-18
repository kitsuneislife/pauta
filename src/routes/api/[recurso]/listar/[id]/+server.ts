import { buscar } from '#lib/server/recursos.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => buscar(params.recurso, params.id);
