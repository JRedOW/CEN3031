<script lang="ts">
    import { page } from '$app/state';
    import '../styles/fonts.css';
    import '../styles/colors.css';
    let { children } = $props();

    let links = [
        { url: '/dashboard', text: 'home' },
        { url: '/dashboard/sets', text: 'sets' },
        { url: '/dashboard/example2', text: 'example 2' }
    ];
</script>

<div id="grid_root">
    <div id="grid_header">
        <p style="font-family:Kavoon;font-size:3em;color:white">StudyBuddy</p>
    </div>

    <div id="grid_side">
        {#each links as link (link.url)}
            <a
                style="text-decoration: none;color: {page.url.pathname === link.url
                    ? 'var(--Honey)'
                    : 'white'};"
                class={page.url.pathname === link.url ? '' : 'hoverable'}
                href={link.url}
            >
                <p style="font-family:Kavoon;font-size: 1.8em;font-weight: bold;">
                    {link.text}
                </p>
            </a>
            <div style="height: 2px;width: 80%;background-color: var(--Pumpkin);"></div>
        {/each}
    </div>

    <div id="grid_main">
        {@render children()}
    </div>
</div>

<body style="background-color: var(--Cream)"> </body>

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
    }

    a:hover.hoverable {
        color: var(--Cream) !important;
    }
</style>
