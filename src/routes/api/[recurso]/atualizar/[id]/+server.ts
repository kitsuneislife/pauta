import { atualizar } from '#lib/server/recursos.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ params, request }) => atualizar(params.recurso, params.id, request);
