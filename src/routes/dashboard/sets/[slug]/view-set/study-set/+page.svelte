<script lang="ts">
    import { tick } from 'svelte';
    import TypeAnswer from '$lib/study-components/TypeAnswer.svelte';
    import type { Set } from '$lib/interfaces';

    let { data } = $props();
    const originalQuestions = data?.set?.set_data?.questions ?? [];
    let studyQuestions = $state([...originalQuestions]);

    // which question type
    let shuffleOption = $state(false);
    let switchQAOption = $state(false);
    let multipleChoiceMode = $state(false);
    let matchCardsMode = $state(false);
    let flashcardMode = $state(true);
    let typeAnswerMode = $state(false);

    // questions
    let currentQuestion = $state({ question: data.set.set_data.questions[0], type: 0 });
    let correct = $state(false);

    // for flashcards
    let flipped = $state(false);
    // for match cards
    let matchedPairs = $state<{ question: string; answer: string }[]>([]);
    // for type answer
    let typeAnswerComponent: TypeAnswer | undefined = $state(undefined);

    // track data
    let answeredCorrectly = new Set<number>();
    let selectedQuestion: string | null = null;
    let selectedAnswer: string | null = null;

    let index = $state(0);
    let feedbackMessage = $state('');
    let completed = $state(false);
    let autoAdvanceTimeout: ReturnType<typeof setTimeout> | null = null;

    let randomizedQuestions = $state<string[]>([]);
    let randomizedAnswers = $state<string[]>([]);

    let randomizeType = $state(false);

    function shuffleArray<T>(arr: Array<T>): Array<T> {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function handleShuffleChange() {
        studyQuestions = shuffleOption
            ? shuffleArray([...originalQuestions])
            : [...originalQuestions];
        resetSession();
    }

    function handleSwitchQAChange() {
        flipped = switchQAOption;
        if (switchQAOption) {
            currentQuestion.type = 0;
        } else {
            currentQuestion.type = 1;
        }
        feedbackMessage = '';
    }

    function toggleFlipMode() {
        flashcardMode = true;
        multipleChoiceMode = false;
        matchCardsMode = false;
        typeAnswerMode = false;
        flipped = false;
        feedbackMessage = '';
    }

    function toggleMultipleChoice() {
        multipleChoiceMode = true;
        matchCardsMode = false;
        typeAnswerMode = false;
        flashcardMode = false;
        flipped = false;
        feedbackMessage = '';
    }

    function toggleMatchMode() {
        matchCardsMode = true;
        multipleChoiceMode = false;
        typeAnswerMode = false;
        flashcardMode = false;
        flipped = false;
        feedbackMessage = '';
        resetMatchCards();
    }

    async function toggleTypeAnswer() {
        typeAnswerMode = true;
        multipleChoiceMode = false;
        matchCardsMode = false;
        flashcardMode = false;
        flipped = false;
        feedbackMessage = '';
        currentQuestion = {
            question: studyQuestions[index],
            type: switchQAOption ? 1 : 0
        };

        await tick();

        if (typeAnswerComponent) {
            typeAnswerComponent.reset();
        }
    }

    let updateQuestionCorrectCount = async (thisId: number) => {
        let tempSet: Set = {
            title: data.set.set_data.title,
            questions: data.set.set_data.questions,
            last_question_id: data.set.set_data.last_question_id
        };

        tempSet.questions[thisId].correct = data.set.set_data.questions[thisId].correct;
        tempSet.questions[thisId].incorrect = data.set.set_data.questions[thisId].incorrect;

        const response = await fetch('/sets/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.set.id,
                set_data: tempSet
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Set saved: ', data);
        } else {
            console.error('Failed to save set');
        }
    };

    function increment() {
        if (typeAnswerMode) {
            if (correct) {
                data.set.set_data.questions[index].correct =
                    (data.set.set_data.questions[index].correct || 0) + 1;
                updateQuestionCorrectCount(data.set.set_data.questions[index].id); // Persist the change
            } else {
                data.set.set_data.questions[index].incorrect =
                    (data.set.set_data.questions[index].incorrect || 0) + 1;
                updateQuestionCorrectCount(data.set.set_data.questions[index].id); // Persist the change
            }
        }
        if (randomizeType) {
            let randInt = Math.floor(Math.random() * 4);
            if (randInt == 0) {
                toggleFlipMode();
            } else if (randInt == 1) {
                toggleMatchMode();
            } else if (randInt == 2) {
                toggleMultipleChoice();
            } else {
                toggleTypeAnswer();
            }
        }
        if (studyQuestions.length === 0) return;
        let nextIndex = (index + 1) % studyQuestions.length;
        if (answeredCorrectly.size === studyQuestions.length) {
            completed = true;
            return;
        }
        while (answeredCorrectly.has(nextIndex)) {
            nextIndex = (nextIndex + 1) % studyQuestions.length;
        }
        index = nextIndex;
        flipped = switchQAOption;
        feedbackMessage = '';
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }
        // currentQuestion.question = studyQuestions[index];
        currentQuestion = {
            question: studyQuestions[index],
            type: switchQAOption ? 0 : 1
        };
        if (typeAnswerMode && typeAnswerComponent) {
            typeAnswerComponent.reset();
        }
    }

    function getMultipleChoiceAnswers(idx: number) {
        const correct = studyQuestions[idx];
        const all = originalQuestions.filter(
            (q) =>
                (switchQAOption ? q.term : q.definition) !==
                (switchQAOption ? correct.term : correct.definition)
        );
        const randomThree = shuffleArray(all)
            .slice(0, 3)
            .map((q) => (switchQAOption ? q.term : q.definition));
        const allChoices = shuffleArray([
            switchQAOption ? correct.term : correct.definition,
            ...randomThree
        ]);
        return allChoices;
    }

    function checkAnswer(choice: string) {
        const correct = switchQAOption
            ? studyQuestions[index].term
            : studyQuestions[index].definition;

        if (choice === correct) {
            feedbackMessage = 'Correct!';
            answeredCorrectly.add(index);
            data.set.set_data.questions[index].correct =
                (data.set.set_data.questions[index].correct || 0) + 1;
            if (answeredCorrectly.size === studyQuestions.length) {
                autoAdvanceTimeout = setTimeout(() => (completed = true), 1000);
            } else {
                autoAdvanceTimeout = setTimeout(() => increment(), 2000);
            }
        } else {
            feedbackMessage = `Incorrect. The correct answer is: ${correct}`;
            data.set.set_data.questions[index].incorrect =
                (data.set.set_data.questions[index].incorrect || 0) + 1;
        }

        if (correct) {
            data.set.set_data.questions[index].correct =
                (data.set.set_data.questions[index].correct || 0) + 1;
            updateQuestionCorrectCount(data.set.set_data.questions[index].id - 1); // Persist the change
        } else {
            data.set.set_data.questions[index].incorrect =
                (data.set.set_data.questions[index].incorrect || 0) + 1;
            updateQuestionCorrectCount(data.set.set_data.questions[index].id - 1); // Persist the change
        }
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
        }
    }

    function resetSession() {
        index = 0;
        flipped = false;
        feedbackMessage = '';
        answeredCorrectly = new Set();
        completed = false;
        matchedPairs = [];
        selectedQuestion = null;
        selectedAnswer = null;
        studyQuestions = shuffleOption
            ? shuffleArray([...originalQuestions])
            : [...originalQuestions];
    }

    function resetMatchCards() {
        matchedPairs = [];
        selectedQuestion = null;
        selectedAnswer = null;
        randomizedQuestions = shuffleArray([...studyQuestions.map((q) => q.term)]);
        randomizedAnswers = shuffleArray([...studyQuestions.map((q) => q.definition)]);
    }

    function getCurrentModeLabel() {
        if (multipleChoiceMode) return 'Multiple Choice Mode';
        if (matchCardsMode) return 'Match Cards Mode';
        if (typeAnswerMode) return 'Type Answer Mode';
        return 'Flashcard Mode';
    }

    function handleMatchSelection(type: 'question' | 'answer', value: string) {
        if (type === 'question') {
            selectedQuestion = value;
        } else {
            selectedAnswer = value;
        }

        if (selectedQuestion && selectedAnswer) {
            const match = studyQuestions.find(
                (q) => q.term === selectedQuestion && q.definition === selectedAnswer
            );
            if (match) {
                matchedPairs = [
                    ...matchedPairs,
                    { question: selectedQuestion, answer: selectedAnswer }
                ];
                feedbackMessage = 'Correct!';
            } else {
                feedbackMessage = 'Incorrect! Try again.';
            }
            selectedQuestion = null;
            selectedAnswer = null;
        }

        if (matchedPairs.length === studyQuestions.length) {
            completed = true;
        }
    }
</script>

<!-- SWITCH MODE BUTTONS -->

<div style="display: flex; justify-content: space-between; padding: 1em;">
    <div>
        <h1 style="font-family: Kavoon; color: var(--Rust); margin-bottom: 0.3em;">
            Study Set - {getCurrentModeLabel()}
        </h1>
        <div style="display: flex; gap: 0.5em;">
            {#if !multipleChoiceMode}
                <button onclick={toggleMultipleChoice}>Multiple Choice Mode</button>
            {/if}
            {#if !matchCardsMode}
                <button onclick={toggleMatchMode}>Match Cards Mode</button>
            {/if}
            {#if !typeAnswerMode}
                <button onclick={toggleTypeAnswer}>Type Answer Mode</button>
            {/if}
            {#if !flashcardMode}
                <button onclick={toggleFlipMode}>Flip Mode</button>
            {/if}
        </div>
    </div>

    <!-- TOGGLEABLE OPTIONS -->

    <div style="display: flex; gap: 1em;">
        <label style="font-family: Kavoon; color: var(--Mahogany);">
            <input type="checkbox" bind:checked={shuffleOption} onchange={handleShuffleChange} />
            Randomize
        </label>
        <label style="font-family: Kavoon; color: var(--Mahogany);">
            <input type="checkbox" bind:checked={switchQAOption} onchange={handleSwitchQAChange} />
            Switch Question/Answer
        </label>
        <label style="font-family: Kavoon; color: var(--Mahogany);">
            <input type="checkbox" bind:checked={randomizeType} onchange={handleShuffleChange} />
            Randomize Format
        </label>
    </div>
</div>

<div class="container">
    {#if data?.set}
        <a href="/dashboard/sets/{data.set.id}/view-set" class="view-set-btn">View Set</a>
    {/if}

    {#if studyQuestions.length === 0}
        <p style="font-family: Kavoon; color: var(--Mahogany);">No questions to display</p>
    {:else if completed}
        <p class="complete">Great job! Do you wish to reset?</p>
        <button onclick={resetSession}>Reset</button>
    {:else if multipleChoiceMode}
        <div class="question-panel">
            <h3>
                {#if switchQAOption}
                    {studyQuestions[index].definition}
                {:else}
                    {studyQuestions[index].term}
                {/if}
            </h3>
        </div>
        <div class="choice-panel">
            {#each getMultipleChoiceAnswers(index) as choice (choice)}
                <button onclick={() => checkAnswer(choice)}>{choice}</button>
            {/each}
        </div>
        {#if feedbackMessage}
            <p class="feedback">{feedbackMessage}</p>
        {/if}
        <div style="display: flex; gap: 1em;">
            <button onclick={increment}>&gt;</button>
        </div>
    {:else if matchCardsMode}
        <div class="match-mode">
            <div class="column">
                <h2>Questions</h2>
                {#each randomizedQuestions as q (q)}
                    {#if !matchedPairs.find((pair) => pair.question === q)}
                        <button
                            class="match-card"
                            onclick={() => handleMatchSelection('question', q)}>{q}</button
                        >
                    {:else}
                        <div class="match-card blank"></div>
                    {/if}
                {/each}
            </div>
            <div class="column">
                <h2>Answers</h2>
                {#each randomizedAnswers as a (a)}
                    {#if !matchedPairs.find((pair) => pair.answer === a)}
                        <button class="match-card" onclick={() => handleMatchSelection('answer', a)}
                            >{a}</button
                        >
                    {:else}
                        <div class="match-card blank"></div>
                    {/if}
                {/each}
            </div>
        </div>
        {#if feedbackMessage}
            <p class="feedback">{feedbackMessage}</p>
        {/if}
        <div style="display: flex; gap: 1em;">
            <button onclick={increment}>&gt;</button>
        </div>
    {:else if typeAnswerMode}
        <TypeAnswer bind:this={typeAnswerComponent} bind:currentQuestion bind:correct />
        <div style="display: flex; gap: 1em;">
            <button onclick={increment}>&gt;</button>
        </div>
    {:else}
        <button class={['card', { flipped }]} onclick={() => (flipped = !flipped)}>
            <div class="front">
                <h3>
                    {#if switchQAOption}
                        {studyQuestions[index].term}
                    {:else}
                        {studyQuestions[index].definition}
                    {/if}
                </h3>
            </div>
            <div class="back">
                <h3>
                    {#if switchQAOption}
                        {studyQuestions[index].definition}
                    {:else}
                        {studyQuestions[index].term}
                    {/if}
                </h3>
            </div>
        </button>
        <div style="display: flex; gap: 1em;">
            <!-- <button onclick={decrement}>&lt;</button> -->
            <button onclick={increment}>&gt;</button>
        </div>
    {/if}
</div>

<style>
    .view-set-btn {
        font-family: Kavoon;
        font-size: large;
        color: white;
        background-color: var(--Pumpkin);
        border: none;
        border-radius: 8px;
        padding: 0.5em 1em;
        text-decoration: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.1s;
        display: inline-block;
        margin-bottom: 1em;
    }
    .view-set-btn:hover {
        transform: scale(1.05);
    }
    h3 {
        font-family: ComicSans;
        font-size: x-large;
        color: var(--Mahogany);
    }

    button {
        font-family: Kavoon;
        font-size: large;
        color: white;
        background-color: var(--Pumpkin);
        border: none;
        border-radius: 8px;
        padding: 0.4em 1em;
        cursor: pointer;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
        justify-content: center;
        perspective: 100vh;
    }

    .card {
        position: relative;
        width: 25em;
        height: 15em;
        border-radius: 8px;
        background-color: var(--Pumpkin);
        transform-style: preserve-3d;
        transform: rotateY(180deg);
        transition: transform 0.4s;
        user-select: none;
    }

    .card.flipped {
        transform: rotateY(0);
    }

    .front,
    .back {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
        border-radius: 8px;
        background-color: white;
    }

    .back {
        transform: rotateY(180deg);
    }

    .choice-panel {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .question-panel {
        margin-bottom: 1em;
    }

    .feedback {
        font-family: Kavoon;
        font-size: large;
        color: var(--Mahogany);
        margin-top: 0.5em;
        text-align: center;
    }

    .complete {
        font-family: Kavoon;
        font-size: x-large;
        color: var(--Mahogany);
        text-align: center;
        margin: 1em;
    }

    .match-mode {
        display: flex;
        gap: 3em;
        margin-top: 2em;
        justify-content: center;
        width: 100%;
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 200px;
    }

    .column h2 {
        font-family: Kavoon;
        color: var(--Rust);
        margin-bottom: 1em;
    }

    .match-card {
        background-color: white;
        color: var(--Mahogany);
        font-family: ComicSans;
        padding: 0.8em 1em;
        border-radius: 8px;
        margin-bottom: 0.5em;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        width: 100%;
        text-align: center;
        border: 2px solid var(--Pumpkin);
        cursor: pointer;
        transition: 0.2s;
    }

    .match-card:hover {
        background-color: var(--Pumpkin);
        color: white;
    }

    .match-card.blank {
        background-color: transparent;
        color: transparent;
        border: 2px solid transparent;
        pointer-events: none;
    }
</style>
