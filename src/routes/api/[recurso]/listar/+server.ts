import { listar } from '#lib/server/recursos.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => listar(params.recurso);
