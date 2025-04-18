<script lang="ts">
    import type { Question } from '$lib/interfaces';

    interface CurrentQuestion {
        question: {
            definition: string;
            term: string;
        };
        type: number;
        format: number;
    }

    let {
        correct = $bindable(false),
        currentQuestion = $bindable()
    }: { correct: boolean; currentQuestion: CurrentQuestion } = $props();

    let questionType = $state(0);
    let question = $state('');
    let answer = $state('');
    let wrongAnswer0 = $state('');
    let wrongAnswer1 = $state('');
    let wrongAnswer2 = $state('');
    let answered = $state(false);
    let correctIndex = $state(0);
    let answers: string[] = $state([]);

    function reset() {
        answered = false;
        correct = false;
    }

    export function randomizeType() {
        reset();
        questionType = Math.floor(Math.random() * 2);
        if (questionType == 0) {
            question = currentQuestion.question.term;
            answer = currentQuestion.question.definition;
        } else {
            question = currentQuestion.question.definition;
            answer = currentQuestion.question.term;
        }
    }

    export function getWrongAnswers(a0: Question, a1: Question, a2: Question) {
        if (questionType == 0) {
            wrongAnswer0 = a0.definition;
            wrongAnswer1 = a1.definition;
            wrongAnswer2 = a2.definition;
        } else {
            wrongAnswer0 = a0.term;
            wrongAnswer1 = a1.term;
            wrongAnswer2 = a2.term;
        }

        randomizeAnswers();
    }

    function randomizeAnswers() {
        let possibleAnswers = [answer, wrongAnswer0, wrongAnswer1, wrongAnswer2];
        answers = [];
        for (let i = 0; i < 4; i++) {
            let randomInt = Math.floor(Math.random() * possibleAnswers.length);
            answers.push(possibleAnswers[randomInt]);
            possibleAnswers.splice(randomInt, 1);
        }
    }

    function checkAnswer(clicked: number) {
        answered = true;
        correct = false;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] == answer) {
                correctIndex = i;
                if (correctIndex == clicked) {
                    correct = true;
                }
            }
        }
    }
</script>

{#if currentQuestion.format === 2}
    <h3>{question}</h3>

    {#if !answered}
        <button onclick={() => checkAnswer(0)}>{answers[0]}</button>
        <button onclick={() => checkAnswer(1)}>{answers[1]}</button>
        <button onclick={() => checkAnswer(2)}>{answers[2]}</button>
        <button onclick={() => checkAnswer(3)}>{answers[3]}</button>
    {:else}
        {#each answers as this_answer, i (this_answer)}
            {#if i !== correctIndex}
                <button style="background-color: var(--Poor)">{this_answer}</button>
            {:else}
                <button style="background-color: var(--Good)">{this_answer}</button>
            {/if}
        {/each}
    {/if}
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
</style>
