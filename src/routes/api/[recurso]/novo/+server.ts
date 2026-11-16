import { cadastrar } from '#lib/server/recursos.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ params, request }) => cadastrar(params.recurso, request);
