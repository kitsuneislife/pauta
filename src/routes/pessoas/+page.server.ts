import { fail } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db } from '#lib/server/db.ts';
import { cidade, endereco, pessoa, uf } from '#lib/server/schema.ts';
import { erroDoBanco, validarPessoa } from '#lib/server/validacao.ts';
import { enderecoPorCep } from '#lib/server/viacep.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	pessoas: await db
		.select({
			id: pessoa.id,
			nome: pessoa.nome,
			cpf: pessoa.cpf,
			email: pessoa.email,
			logradouro: endereco.logradouro,
			numero: endereco.numero,
			bairro: endereco.bairro,
			cidade: cidade.nome,
			uf: uf.sigla
		})
		.from(pessoa)
		.leftJoin(endereco, eq(endereco.pessoaId, pessoa.id))
		.leftJoin(cidade, eq(endereco.cidadeId, cidade.id))
		.leftJoin(uf, eq(cidade.ufId, uf.id))
		.orderBy(asc(pessoa.nome))
});

export const actions: Actions = {
	criar: async ({ request }) => {
		const valores = Object.fromEntries(await request.formData());
		const { dados, erro } = validarPessoa(valores);
		if (!dados) return fail(400, { erro, valores });

		const cep = String(valores.cep ?? '').replace(/\D/g, '');
		if (cep && cep.length !== 8) return fail(400, { erro: 'O CEP precisa ter 8 dígitos.', valores });
		const local = cep ? await enderecoPorCep(cep) : null;
		if (cep && !local) return fail(400, { erro: 'CEP não encontrado (ou ViaCEP fora do ar).', valores });

		try {
			await db.transaction(async (tx) => {
				const [{ id }] = await tx.insert(pessoa).values(dados).returning({ id: pessoa.id });
				if (local) await tx.insert(endereco).values({ ...local, cep, numero: String(valores.numero ?? '').slice(0, 10), pessoaId: id });
			});
		} catch (e) {
			return fail(409, { erro: erroDoBanco(e), valores });
		}
		return { sucesso: `${dados.nome} cadastrada.` };
	},
	excluir: async ({ request }) => {
		const id = Number((await request.formData()).get('id')) || 0;
		try {
			await db.delete(pessoa).where(eq(pessoa.id, id));
		} catch (e) {
			return fail(409, { erro: erroDoBanco(e) });
		}
	}
};
