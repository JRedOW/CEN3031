<script lang="ts">
    let { data } = $props();

    let flipped = $state(false);
    let index = $state(0);

    function increment() {
        index = (index + 1) % data.set.set_data.questions.length;
        flipped = false;
    }
    function decrement() {
        index = (index - 1) % data.set.set_data.questions.length;
        if (index == -1) {
            index = data.set.set_data.questions.length - 1;
        }
        flipped = false;
    }
</script>

<div class="container">
    <a href="/dashboard/sets/{data.set.id}/view-set">view set</a>
    <button class={['card', { flipped }]} onclick={() => (flipped = !flipped)}>
        <div class="front">
            <h3>{data.set.set_data.questions[index].definition}</h3>
        </div>
        <div class="back">
            <h3>{data.set.set_data.questions[index].term}</h3>
        </div>
    </button>
    <div style="display: flex;flex-direction: row;gap: 1em;">
        <button onclick={decrement}>&lt;</button>
        <button onclick={increment}>></button>
    </div>
</div>

<style>
    h3 {
        font-family: ComicSans;
        font-size: x-large;
        color: var(--Mahogany);
    }

    button {
        font-family: Kavoon;
        font-size: xx-large;
        color: White;
        background-color: var(--Pumpkin);
        border-radius: 8px;
        border: none;
        float: center;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        height: 100%;
        align-items: center;
        justify-content: center;
        perspective: 100vh;
    }

    .card {
        position: relative;
        aspect-ratio: 1.6 / 1;
        font-size: min(1vh, 0.25rem);
        height: 80em;
        /* background: var(--bg-1); */
        border-radius: 8em;
        border: none;
        transform: rotateY(180deg);
        transition: transform 0.4s;
        transform-style: preserve-3d;
        padding: 0;
        user-select: none;
        cursor: pointer;
    }

    .card.flipped {
        transform: rotateY(0);
    }

    .front,
    .back {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        border-radius: 2em;
        border: 1px solid var(--fg-2);
        box-sizing: border-box;
        padding: 2em;
    }

    .front {
        background-color: white;
        background-size:
            8em 8em,
            8em 8em;
    }

    .back {
        background-color: white;
        transform: rotateY(180deg);
    }

    .symbol {
        font-size: 30em;
        color: var(--fg-1);
    }

    .pattern {
        width: 100%;
        height: 100%;
        /* pattern from https://projects.verou.me/css3patterns/#marrakesh */
        background-size:
            3em 3em,
            9em 9em;
        background-position: 0 0;
        border-radius: 1em;
    }
</style>
