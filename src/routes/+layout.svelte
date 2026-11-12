<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { PUBLIC_APP_NAME } from '$app/env/public';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<header>
	<a class="marca" href="/">{PUBLIC_APP_NAME}</a>
	<nav aria-label="Principal">
		<a href="/">Notícias</a>
		<a href="/noticias/nova">Nova notícia</a>
		<a href="/pessoas">Pessoas</a>
	</nav>
</header>

<main>
	{@render children()}
</main>
