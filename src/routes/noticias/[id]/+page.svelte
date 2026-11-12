<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let n = $derived(data.noticia);
</script>

<article>
	<h1>{n.titulo}</h1>
	<p class="meta">{n.autor} · {n.cidade}/{n.uf} · {n.publicadaEm.toLocaleString('pt-BR')}</p>
	<p style="white-space: pre-line">{n.conteudo}</p>
</article>

<p>
	<a href="/noticias/{n.id}/editar">Editar</a>
</p>
<form method="POST" action="?/excluir">
	<button class="perigo">Excluir notícia</button>
</form>
