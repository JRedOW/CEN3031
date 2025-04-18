<script lang="ts">
	import { page } from '$app/state';
	import '$lib/styles/fonts.css';
	import '$lib/styles/colors.css';

	let { children } = $props();

	let links = [
		{ url: '/dashboard', text: 'home' },
		{ url: '/dashboard/sets', text: 'sets' },
		{ url: '/dashboard/example2', text: 'example 2' }
	];
</script>

<div id="grid_root">
	<div id="grid_header">
		<p class="logo">StudyBuddy</p>

		<!-- Logout form that POSTs to /user/logout -->
        <form method="POST" action="/user/logout">
	        <button type="submit" class="logout-button">Logout</button>
        </form>
	</div>

	<div id="grid_side">
		{#each links as link (link.url)}
			<a
				style="text-decoration: none;color: {page.url.pathname === link.url ? 'var(--Honey)' : 'white'};"
				class={page.url.pathname === link.url ? '' : 'hoverable'}
				href={link.url}
			>
				<p style="font-family:Kavoon;font-size: 1.8em;font-weight: bold;">{link.text}</p>
			</a>
			<div style="height: 2px;width: 80%;background-color: var(--Pumpkin);"></div>
		{/each}
	</div>

	<div id="grid_main">
		{@render children()}
	</div>
</div>

<style>
	#grid_root {
		display: grid;
		grid-template-columns: 20% auto;
		grid-template-rows: 10% auto;
		grid-template-areas:
			'header header'
			'side main';
		width: 100vw;
		height: 100vh;
	}

	#grid_header {
		grid-area: header;
		background-color: var(--Pumpkin);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1em;
		position: relative;
	}

	.logo {
		font-family: Kavoon;
		font-size: 3em;
		color: white;
		margin: 0;
	}

	.logout-button {
		background-color: white;
		color: var(--Mahogany);
		font-family: Kavoon;
		font-size: 1em;
		padding: 0.4em 1em;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.logout-button:hover {
		background-color: var(--Rust);
		color: white;
	}

	#grid_side {
		grid-area: side;
		background-color: var(--Rust);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		padding-top: 30px;
	}

	#grid_main {
		grid-area: main;
		padding: 1em;
	}

	a:hover.hoverable {
		color: var(--Cream) !important;
	}

	:global(body) {
		background-color: var(--Cream);
		margin: 0;
	}
</style>
