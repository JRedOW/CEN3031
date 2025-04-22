<script lang="ts">
    let { data } = $props();

    let showingExtraData = $state(false);
    let currentIndex = $state(0);

    let showExtraData = (index: number) => {
        if (index == currentIndex) {
            showingExtraData = !showingExtraData;
        } else {
            showingExtraData = true;
            currentIndex = index;
        }
    };
</script>

<div style="padding-left:3em;padding-top:3em">
    <!-- <p>{data.set.id}</p> -->
    <a href="/dashboard/sets" class="nav-btn">← My Sets</a>

    <h1 style="font-family:Kavoon">View Stats</h1>
    <div>
        {#each data.set.set_data.questions as q (q.id)}
            <button style="min-width:80%" onclick={() => showExtraData(q.id)}>
                <div style="margin-right:1em;float:left">{q.term}</div>
                <div style="float:right">{q.definition}</div>

                {#if (q.correct ?? 0) / ((q.correct ?? 0) + (q.incorrect ?? 0)) > 0.75}
                    <span class="dot" style="background: var(--Good)"></span>
                {:else if (q.correct ?? 0) / ((q.correct ?? 0) + (q.incorrect ?? 0)) > 0.4}
                    <span class="dot" style="background: var(--Okay)"></span>
                {:else if q.correct != 0 || q.incorrect != 0}
                    <span class="dot" style="background: var(--Poor)"></span>
                {:else}
                    <span class="dot" style="background: var(--Intangible)"></span>
                {/if}
            </button>
            {#if showingExtraData && currentIndex == q.id}
                <div class="smallContainer">
                    <p>Times Seen: {(q.correct ?? 0) + (q.incorrect ?? 0)}</p>
                    <p>Times Answered Correctly: {q.correct}</p>
                </div>
            {/if}
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
    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
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

    .smallContainer {
        float: left;
        display: flex;
        flex-direction: row;
        gap: 1em;
        height: 100%;
        align-items: left;
        justify-content: left;
        perspective: 100vh;
        background-color: var(--Pumpkin);
        padding: 1em;
        margin-top: 1em;
        min-width: 45%;
        max-width: 45%;
        border-radius: 8px;
        color: white;
        font-family: ComicSans;
        text-wrap: inherit;
    }

    button {
        border: none;
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
