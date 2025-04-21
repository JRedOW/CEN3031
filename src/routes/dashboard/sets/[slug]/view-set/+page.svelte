<script lang="ts">
    let { data } = $props();
</script>

<div style="padding-left:3em;padding-top:3em">
    <!-- <p>{data.set.id}</p> -->
    <div class="nav-container">
        <a href="/dashboard/sets" class="nav-btn">← My Sets</a>
        <a href="/dashboard/sets/{data.set.id}/view-set/study-set" class="nav-btn">Study</a>
    </div>
    <h1 style="font-family:Kavoon">View Set</h1>
    <div>
        {#each data.set.set_data.questions as q (q.id)}
            <div class="container" style="min-width:80%">
                <div style="margin-right:1em;float:left">{q.term}</div>
                <div style="float:right">{q.definition}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    h1 {
        font-family: Kavoon;
        color: var(--Rust);
    }

    .nav-btn {
        font-family: Kavoon;
        font-size: x-large;
        color: White;
        background-color: var(--Pumpkin);
        padding: 0.1em 0.5em;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        margin: -1em 0 1em -1em;
    }

    .nav-container {
        display: flex;
        flex-direction: row;
        gap: 2em;
        align-items: center;
        margin-bottom: 1em;
    }

    .container {
        float: left;
        display: flex;
        flex-direction: row;
        gap: 1em;
        height: 100%;
        align-items: left;
        justify-content: left;
        perspective: 100vh;
        background-color: white;
        padding: 1em;
        margin-top: 1em;
        min-width: 45%;
        max-width: 45%;
        border-radius: 8px;
        color: var(--Mahogany);
        font-family: ComicSans;
        text-wrap: inherit;
    }
</style>
