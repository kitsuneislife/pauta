import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from './db.ts';
import { noticia, pessoa } from './schema.ts';
import { erroDoBanco, validarNoticia, validarPessoa } from './validacao.ts';

const recursos = {
	pessoa: { tabela: pessoa, validar: validarPessoa },
	noticia: { tabela: noticia, validar: validarNoticia }
} as const;

type Nome = keyof typeof recursos;

function recurso(nome: string) {
	if (!(nome in recursos)) error(404, 'Recurso não encontrado');
	return recursos[nome as Nome] as (typeof recursos)['pessoa'];
}

const id = (valor: string) => Number(valor) || error(404, 'Id inválido');

async function corpo(request: Request) {
	const dados = await request.json().catch(() => null);
	if (!dados || typeof dados !== 'object') error(400, 'Envie um JSON');
	return dados as Record<string, unknown>;
}

const conflito = (e: unknown) => json({ erro: erroDoBanco(e) }, { status: 409 });

export async function listar(nome: string) {
	return json(await db.select().from(recurso(nome).tabela));
}

export async function buscar(nome: string, valor: string) {
	const { tabela } = recurso(nome);
	const [linha] = await db.select().from(tabela).where(eq(tabela.id, id(valor)));
	return linha ? json(linha) : error(404, 'Não encontrado');
}

export async function cadastrar(nome: string, request: Request) {
	const { tabela, validar } = recurso(nome);
	const { dados, erro } = validar(await corpo(request));
	if (!dados) return json({ erro }, { status: 400 });
	try {
		const [linha] = await db.insert(tabela).values(dados).returning();
		return json(linha, { status: 201 });
	} catch (e) {
		return conflito(e);
	}
}

export async function atualizar(nome: string, valor: string, request: Request) {
	const { tabela, validar } = recurso(nome);
	const { dados, erro } = validar(await corpo(request));
	if (!dados) return json({ erro }, { status: 400 });
	try {
		const [linha] = await db.update(tabela).set(dados).where(eq(tabela.id, id(valor))).returning();
		return linha ? json(linha) : error(404, 'Não encontrado');
	} catch (e) {
		return conflito(e);
	}
}

export async function excluir(nome: string, valor: string) {
	const { tabela } = recurso(nome);
	try {
		const [linha] = await db.delete(tabela).where(eq(tabela.id, id(valor))).returning({ id: tabela.id });
		return linha ? new Response(null, { status: 204 }) : error(404, 'Não encontrado');
	} catch (e) {
		return conflito(e);
	}
}
