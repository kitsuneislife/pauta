<script lang="ts">
	import NoticiaForm from '#lib/components/NoticiaForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<h1>Nova notícia</h1>

<NoticiaForm autores={data.autores} cidades={data.cidades} valores={form?.valores} erro={form?.erro} />
