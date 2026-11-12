import { fail, redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import { noticia } from '#lib/server/schema.ts';
import { opcoesDeNoticia } from '#lib/server/opcoes.ts';
import { erroDoBanco, validarNoticia } from '#lib/server/validacao.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => opcoesDeNoticia();

export const actions: Actions = {
	default: async ({ request }) => {
		const valores = Object.fromEntries(await request.formData());
		const { dados, erro } = validarNoticia(valores);
		if (!dados) return fail(400, { erro, valores });
		let id: number;
		try {
			[{ id }] = await db.insert(noticia).values(dados).returning({ id: noticia.id });
		} catch (e) {
			return fail(409, { erro: erroDoBanco(e), valores });
		}
		redirect(303, `/noticias/${id}`);
	}
};
