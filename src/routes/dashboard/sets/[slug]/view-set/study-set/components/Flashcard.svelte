<script lang="ts">
    import type { Question } from '$lib/interfaces';
    import { getContext } from 'svelte';
    import returnQuestion from '../+page.svelte';

    interface CurrentQuestion {
        question: {
            definition: string;
            term: string;
        };
        type: number;
        format: number;
    }

    const currentQuestion: CurrentQuestion = getContext('currentQuestion');
    let flipped = $state(false);

    let front = $state(currentQuestion.question.term);
    let back = $state(currentQuestion.question.definition);

    export function setQuestionType(type: number) {
        flipped = false;
        if (type == 0) {
            front = currentQuestion.question.term;
            back = currentQuestion.question.definition;
        } else if (type == 1) {
            front = currentQuestion.question.definition;
            back = currentQuestion.question.term;
        }
    }
</script>

{#if currentQuestion.format === 1}
    <div class="container">
        <button class={['card', { flipped }]} onclick={() => (flipped = !flipped)}>
            <div class="front">
                <h3>{front}</h3>
            </div>
            <div class="back">
                <h3>{back}</h3>
            </div>
        </button>
        <p>{currentQuestion.type}</p>
    </div>
{/if}

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
