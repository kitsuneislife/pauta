import { desc, eq } from 'drizzle-orm';
import { db } from '#lib/server/db.ts';
import { cidade, noticia, pessoa, uf } from '#lib/server/schema.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	noticias: await db
		.select({
			id: noticia.id,
			titulo: noticia.titulo,
			publicadaEm: noticia.publicadaEm,
			autor: pessoa.nome,
			cidade: cidade.nome,
			uf: uf.sigla
		})
		.from(noticia)
		.innerJoin(pessoa, eq(noticia.autorId, pessoa.id))
		.innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
		.innerJoin(uf, eq(cidade.ufId, uf.id))
		.orderBy(desc(noticia.publicadaEm))
});
