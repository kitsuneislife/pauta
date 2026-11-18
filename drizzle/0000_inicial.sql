CREATE TABLE "cidade" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(150) NOT NULL,
	"codigo_ibge" integer NOT NULL,
	"uf_id" integer NOT NULL,
	CONSTRAINT "cidade_codigoIbge_unique" UNIQUE("codigo_ibge")
);
--> statement-breakpoint
CREATE TABLE "endereco" (
	"id" serial PRIMARY KEY NOT NULL,
	"cep" varchar(8) NOT NULL,
	"logradouro" varchar(200),
	"numero" varchar(10),
	"bairro" varchar(100),
	"cidade_id" integer NOT NULL,
	"pessoa_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "noticia" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(200) NOT NULL,
	"conteudo" text NOT NULL,
	"publicada_em" timestamp DEFAULT now() NOT NULL,
	"autor_id" integer NOT NULL,
	"cidade_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pais" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"codigo_iso" varchar(3) NOT NULL,
	CONSTRAINT "pais_nome_unique" UNIQUE("nome"),
	CONSTRAINT "pais_codigoIso_unique" UNIQUE("codigo_iso")
);
--> statement-breakpoint
CREATE TABLE "pessoa" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(150) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"data_nascimento" date,
	"email" varchar(150),
	"ativo" boolean DEFAULT true NOT NULL,
	CONSTRAINT "pessoa_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
CREATE TABLE "uf" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"sigla" varchar(2) NOT NULL,
	"pais_id" integer NOT NULL,
	CONSTRAINT "uf_sigla_unique" UNIQUE("sigla")
);
--> statement-breakpoint
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_uf_id_uf_id_fk" FOREIGN KEY ("uf_id") REFERENCES "public"."uf"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cidade_id_cidade_id_fk" FOREIGN KEY ("cidade_id") REFERENCES "public"."cidade"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_pessoa_id_pessoa_id_fk" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoa"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "noticia" ADD CONSTRAINT "noticia_autor_id_pessoa_id_fk" FOREIGN KEY ("autor_id") REFERENCES "public"."pessoa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "noticia" ADD CONSTRAINT "noticia_cidade_id_cidade_id_fk" FOREIGN KEY ("cidade_id") REFERENCES "public"."cidade"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uf" ADD CONSTRAINT "uf_pais_id_pais_id_fk" FOREIGN KEY ("pais_id") REFERENCES "public"."pais"("id") ON DELETE no action ON UPDATE no action;