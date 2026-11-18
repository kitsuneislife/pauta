<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Últimas notícias</h1>

{#each data.noticias as n (n.id)}
	<article>
		<h2><a href="/noticias/{n.id}">{n.titulo}</a></h2>
		<p class="meta">{n.autor} · {n.cidade}/{n.uf} · {n.publicadaEm.toLocaleDateString('pt-BR')}</p>
	</article>
{:else}
	<p>Nenhuma notícia ainda. <a href="/noticias/nova">Escreva a primeira.</a></p>
{/each}
