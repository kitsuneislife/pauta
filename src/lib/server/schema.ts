import { pgTable, serial, integer, varchar, text, date, boolean, timestamp } from 'drizzle-orm/pg-core';

export const pais = pgTable('pais', {
	id: serial().primaryKey(),
	nome: varchar({ length: 100 }).notNull().unique(),
	codigoIso: varchar({ length: 3 }).notNull().unique()
});

export const uf = pgTable('uf', {
	id: serial().primaryKey(),
	nome: varchar({ length: 100 }).notNull(),
	sigla: varchar({ length: 2 }).notNull().unique(),
	paisId: integer()
		.notNull()
		.references(() => pais.id)
});

export const cidade = pgTable('cidade', {
	id: serial().primaryKey(),
	nome: varchar({ length: 150 }).notNull(),
	codigoIbge: integer().notNull().unique(),
	ufId: integer()
		.notNull()
		.references(() => uf.id)
});

export const pessoa = pgTable('pessoa', {
	id: serial().primaryKey(),
	nome: varchar({ length: 150 }).notNull(),
	cpf: varchar({ length: 11 }).notNull().unique(),
	dataNascimento: date(),
	email: varchar({ length: 150 }),
	ativo: boolean().notNull().default(true)
});

export const endereco = pgTable('endereco', {
	id: serial().primaryKey(),
	cep: varchar({ length: 8 }).notNull(),
	logradouro: varchar({ length: 200 }),
	numero: varchar({ length: 10 }),
	bairro: varchar({ length: 100 }),
	cidadeId: integer()
		.notNull()
		.references(() => cidade.id),
	pessoaId: integer()
		.notNull()
		.references(() => pessoa.id, { onDelete: 'cascade' })
});

export const noticia = pgTable('noticia', {
	id: serial().primaryKey(),
	titulo: varchar({ length: 200 }).notNull(),
	conteudo: text().notNull(),
	publicadaEm: timestamp().notNull().defaultNow(),
	autorId: integer()
		.notNull()
		.references(() => pessoa.id),
	cidadeId: integer()
		.notNull()
		.references(() => cidade.id)
});
