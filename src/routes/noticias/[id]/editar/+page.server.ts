import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '#lib/server/db.ts';
import { noticia } from '#lib/server/schema.ts';
import { opcoesDeNoticia } from '#lib/server/opcoes.ts';
import { erroDoBanco, validarNoticia } from '#lib/server/validacao.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [n] = await db.select().from(noticia).where(eq(noticia.id, Number(params.id) || 0));
	if (!n) error(404, 'Notícia não encontrada');
	return { noticia: n, ...(await opcoesDeNoticia()) };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const valores = Object.fromEntries(await request.formData());
		const { dados, erro } = validarNoticia(valores);
		if (!dados) return fail(400, { erro, valores });
		try {
			await db.update(noticia).set(dados).where(eq(noticia.id, Number(params.id) || 0));
		} catch (e) {
			return fail(409, { erro: erroDoBanco(e), valores });
		}
		redirect(303, `/noticias/${params.id}`);
	}
};
