# Pauta

Sistema de notícias pequeno em SvelteKit, feito para a disciplina Frameworks e
APIs. É a versão SvelteKit do sistema de notícias que a turma fez em Spring
Boot: mesmo domínio (pessoa, endereço, cidade, UF, país) mais a notícia, e uma
API REST com os mesmos caminhos do `GenericController` do Java.

Faculdade Senac Cascavel, Padrões de Projetos, Frameworks e APIs.

Integrantes: Camilo Fernando Bomfim, Joaquim Augusto Nardino, Luana
Mackieviez e Lucas Pereira.

Stack: SvelteKit 3 com Svelte 5, TypeScript, adapter-node, PostgreSQL 16 via
Docker Compose, Drizzle ORM e pnpm.

## Como rodar

Precisa de Node 24 ou mais novo, pnpm e Docker.

```sh
cp .env.example .env
pnpm install
pnpm db:start
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Abre em http://localhost:5173. Para produção: `pnpm build` e `pnpm start`
(porta e origem vêm de `PORT` e `ORIGIN` no `.env`).

## Telas

- `/`: notícias mais recentes, com autor e cidade.
- `/noticias/[id]`: lê e exclui uma notícia.
- `/noticias/nova` e `/noticias/[id]/editar`: formulário de notícia.
- `/pessoas`: lista, cadastra e exclui pessoas. O CEP preenche logradouro,
  bairro e cidade pelo ViaCEP.

## API

| Método | Caminho | Resposta |
|---|---|---|
| GET | `/api/{recurso}/listar` | 200 |
| GET | `/api/{recurso}/listar/{id}` | 200 ou 404 |
| POST | `/api/{recurso}/novo` | 201, 400 ou 409 |
| POST | `/api/{recurso}/atualizar/{id}` | 200, 400, 404 ou 409 |
| DELETE | `/api/{recurso}/excluir/{id}` | 204, 404 ou 409 |

`{recurso}` é `pessoa` ou `noticia`. O corpo é JSON. O SvelteKit bloqueia
requisições de outra origem que pareçam formulário, então mande
`content-type: application/json` também no DELETE:

```sh
curl -X DELETE -H 'content-type: application/json' localhost:5173/api/noticia/excluir/1
```

## Twelve-Factor (fatores 1 a 4)

| Fator | Onde está |
|---|---|
| I. Codebase | um repositório git, GitHub Flow |
| II. Dependencies | `package.json` + `pnpm-lock.yaml`, `packageManager` e `engines` |
| III. Config | `.env.example` e `src/env.ts`; nada de URL ou senha no código |
| IV. Backing services | PostgreSQL (`DATABASE_URL`) e ViaCEP (`VIACEP_URL`) |

Detalhes, diagramas e respostas da atividade em
[docs/twelve-factor.md](docs/twelve-factor.md).
