import { eq } from 'drizzle-orm';
import { VIACEP_URL } from '$app/env/private';
import { db } from './db.ts';
import { cidade, uf } from './schema.ts';

type Cep = { logradouro: string; bairro: string; localidade: string; uf: string; ibge: string; erro?: unknown };

export async function enderecoPorCep(cep: string) {
	const resposta = await fetch(`${VIACEP_URL}/${cep}/json/`, { signal: AbortSignal.timeout(5000) }).catch(() => null);
	if (!resposta?.ok) return null;
	const dados: Cep = await resposta.json();
	if (dados.erro) return null;

	const ibge = Number(dados.ibge);
	let [encontrada] = await db.select({ id: cidade.id }).from(cidade).where(eq(cidade.codigoIbge, ibge));
	if (!encontrada) {
		const [estado] = await db.select({ id: uf.id }).from(uf).where(eq(uf.sigla, dados.uf));
		if (!estado) return null;
		[encontrada] = await db
			.insert(cidade)
			.values({ nome: dados.localidade, codigoIbge: ibge, ufId: estado.id })
			.onConflictDoUpdate({ target: cidade.codigoIbge, set: { nome: dados.localidade } })
			.returning({ id: cidade.id });
	}
	return { logradouro: dados.logradouro, bairro: dados.bairro, cidadeId: encontrada.id };
}
