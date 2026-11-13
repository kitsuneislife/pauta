<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let v = $derived((form && 'valores' in form ? form.valores : {}) as Record<string, string>);
</script>

<h1>Pessoas</h1>

{#if form?.erro}<p class="erro" role="alert">{form.erro}</p>{/if}
{#if form && 'sucesso' in form}<p role="status">{form.sucesso}</p>{/if}

<div class="tabela">
	<table>
		<thead>
			<tr><th>Nome</th><th>CPF</th><th>Endereço</th><th><span class="meta">Ações</span></th></tr>
		</thead>
		<tbody>
			{#each data.pessoas as p (p.id)}
				<tr>
					<td>{p.nome}<br /><span class="meta">{p.email ?? ''}</span></td>
					<td>{p.cpf}</td>
					<td>{p.cidade ? `${p.logradouro}, ${p.numero} · ${p.bairro} · ${p.cidade}/${p.uf}` : '—'}</td>
					<td>
						<form method="POST" action="?/excluir">
							<input type="hidden" name="id" value={p.id} />
							<button class="perigo" aria-label="Excluir {p.nome}">Excluir</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>Cadastrar pessoa</h2>

<form method="POST" action="?/criar">
	<label>Nome <input name="nome" value={v.nome ?? ''} required maxlength="150" /></label>
	<label>CPF <input name="cpf" value={v.cpf ?? ''} required inputmode="numeric" placeholder="só números" /></label>
	<label>E-mail <input name="email" type="email" value={v.email ?? ''} /></label>
	<label>Data de nascimento <input name="dataNascimento" type="date" value={v.dataNascimento ?? ''} /></label>
	<label>CEP <input name="cep" value={v.cep ?? ''} inputmode="numeric" placeholder="preenche o endereço pelo ViaCEP" /></label>
	<label>Número <input name="numero" value={v.numero ?? ''} maxlength="10" /></label>
	<button>Cadastrar</button>
</form>
