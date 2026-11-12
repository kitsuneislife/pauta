import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '#lib/server/db.ts';
import { cidade, noticia, pessoa, uf } from '#lib/server/schema.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [n] = await db
		.select({
			id: noticia.id,
			titulo: noticia.titulo,
			conteudo: noticia.conteudo,
			publicadaEm: noticia.publicadaEm,
			autor: pessoa.nome,
			cidade: cidade.nome,
			uf: uf.sigla
		})
		.from(noticia)
		.innerJoin(pessoa, eq(noticia.autorId, pessoa.id))
		.innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
		.innerJoin(uf, eq(cidade.ufId, uf.id))
		.where(eq(noticia.id, Number(params.id) || 0));
	if (!n) error(404, 'Notícia não encontrada');
	return { noticia: n };
};

export const actions: Actions = {
	excluir: async ({ params }) => {
		await db.delete(noticia).where(eq(noticia.id, Number(params.id) || 0));
		redirect(303, '/');
	}
};
