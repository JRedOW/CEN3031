<script lang="ts">
    let { data } = $props();
    let create_message = $state('');
    let sets = $state(data.sets);
</script>

<div style="padding:3em">
    <h1 style="font-family:Kavoon;color:var(--Mahogany);padding-bottom:1em">Stats</h1>

    <ul style="list-style-type:none">
        <div>
            {#each sets as set (set.id)}
                <div class="container">
                    <li>
                        <h1>{set.set_data.title}</h1>
                        <a href="/dashboard/stats/{set.id}/view-stats">view stats</a>
                        <span>|</span>
                    </li>
                </div>
            {/each}
            {#if sets.length === 0}
                <h2 style="text-align:center">You have no sets! Create one</h2>
            {/if}
        </div>
    </ul>
</div>

{#if false}
    <p>{create_message}</p>
{/if}

<style>
    Button {
        font-family: Kavoon;
        font-size: xx-large;
        color: White;
        background-color: var(--Pumpkin);
        border-radius: 8px;
        border: none;
        float: center;
    }

    h1 {
        margin-bottom: 1em;
        font-family: Kavoon;
        color: var(--Rust);
    }

    h2 {
        margin-bottom: 0.2em;
        font-family: Kavoon;
        color: var(--Rust);
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        height: 100%;
        align-items: left;
        justify-content: left;
        perspective: 100vh;
        background-color: white;
        padding: 1em;
        margin: 1em;
        border-radius: 8px;
        color: var(--Mahogany);
        font-family: Kavoon;
    }

    a {
        color: blue;
        text-decoration: none;
    }

    span {
        margin: 0 5px;
    }
</style>
