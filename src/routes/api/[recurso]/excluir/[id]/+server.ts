import { excluir } from '#lib/server/recursos.ts';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = ({ params }) => excluir(params.recurso, params.id);
