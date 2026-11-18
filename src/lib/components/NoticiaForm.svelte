<script lang="ts">
	type Opcao = { id: number; nome: string };
	type Props = {
		autores: Opcao[];
		cidades: (Opcao & { uf: string })[];
		valores?: Record<string, unknown>;
		erro?: string;
	};

	let { autores, cidades, valores = {}, erro }: Props = $props();
</script>

{#if erro}<p class="erro" role="alert">{erro}</p>{/if}

<form method="POST">
	<label>
		Título
		<input name="titulo" value={valores.titulo ?? ''} required maxlength="200" />
	</label>
	<label>
		Conteúdo
		<textarea name="conteudo" rows="8" required value={String(valores.conteudo ?? '')}></textarea>
	</label>
	<label>
		Autor
		<select name="autorId" required>
			{#each autores as a (a.id)}
				<option value={a.id} selected={String(a.id) === String(valores.autorId)}>{a.nome}</option>
			{/each}
		</select>
	</label>
	<label>
		Cidade
		<select name="cidadeId" required>
			{#each cidades as c (c.id)}
				<option value={c.id} selected={String(c.id) === String(valores.cidadeId)}>{c.nome}/{c.uf}</option>
			{/each}
		</select>
	</label>
	<button>Salvar</button>
</form>
