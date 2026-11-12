import { asc, eq } from 'drizzle-orm';
import { db } from './db.ts';
import { cidade, pessoa, uf } from './schema.ts';

export async function opcoesDeNoticia() {
	const [autores, cidades] = await Promise.all([
		db.select({ id: pessoa.id, nome: pessoa.nome }).from(pessoa).where(eq(pessoa.ativo, true)).orderBy(asc(pessoa.nome)),
		db
			.select({ id: cidade.id, nome: cidade.nome, uf: uf.sigla })
			.from(cidade)
			.innerJoin(uf, eq(cidade.ufId, uf.id))
			.orderBy(asc(cidade.nome))
	]);
	return { autores, cidades };
}
