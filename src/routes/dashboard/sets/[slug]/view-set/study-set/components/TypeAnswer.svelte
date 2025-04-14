<script lang="ts">
    import type { Question } from '$lib/interfaces';
    import { getContext } from 'svelte';

    // const currentQuestion: CurrentQuestion = getContext('currentQuestion');

    // let { currentQuestion = $bindable() } = $props();
    let { correct = $bindable(), currentQuestion = $bindable() } = $props();
    let typedResponse = $state('');
    let questionType = $state(0);
    let answered = $state(false);
    // store question and answer as the definition and term may be swapped
    let question = $state('');
    let answer = $state('');

    interface CurrentQuestion {
        question: {
            definition: string;
            term: string;
        };
        type: number;
    }

    export function randomizeType() {
        questionType = Math.floor(Math.random() * 2);
        if (questionType == 0) {
            question = currentQuestion.question.term;
            answer = currentQuestion.question.definition;
        } else {
            question = currentQuestion.question.definition;
            answer = currentQuestion.question.term;
        }
    }

    function setType() {
        questionType = currentQuestion.type;
        if (questionType == 0) {
            question = currentQuestion.question.term;
            answer = currentQuestion.question.definition;
        } else {
            question = currentQuestion.question.definition;
            answer = currentQuestion.question.term;
        }
    }

    export function reset() {
        answered = false;
        correct = false;
        typedResponse = '';

        setType();
    }

    function checkAnswer() {
        answered = true;

        if (typedResponse == answer) {
            correct = true;
        } else {
            correct = false;
        }
    }
</script>

<div>
    <h3>{question}</h3>

    <!-- when answered display if its correct or incorrect, then display the answer regardless -->
    {#if answered}
        {#if correct}
            <h3 style="color:var(--Good)">correct!</h3>
        {:else}
            <h3 style="color:var(--Poor)">incorrect</h3>
        {/if}
        <h3>Your Answer: {typedResponse}</h3>
        <h3>Answer: {answer}</h3>
    {:else}
        <input bind:value={typedResponse} />
        <div>
            <button onclick={() => checkAnswer()}> Submit </button>
        </div>
    {/if}
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
</style>
