<script>
    import { page } from '$app/state';
    let { children } = $props();

    let links = [
        { url: '/dashboard', text: 'home' },
        { url: '/dashboard/example', text: 'example' },
        { url: '/dashboard/example2', text: 'example2' }
    ];
</script>

<div id="grid_root">
    <div id="grid_header"></div>

    <div id="grid_side">
        {#each links as link}
            <a
                style="text-decoration: none;color: {page.url.pathname === link.url
                    ? 'yellow'
                    : 'white'};"
                class={page.url.pathname === link.url ? '' : 'hoverable'}
                href={link.url}
            >
                <p style="font-size: 1.8em;font-weight: bold;">{link.text}</p>
            </a>
            <div style="height: 2px;width: 80%;background-color: orange;"></div>
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
        background-color: orange;
    }

    #grid_side {
        grid-area: side;
        background-color: brown;

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
        color: bisque !important;
    }
</style>
