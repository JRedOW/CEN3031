<script lang="ts">
    let { data } = $props();
    const originalQuestions = data?.set?.set_data?.questions ?? [];
    let studyQuestions = $state([...originalQuestions]);

    let shuffleOption = $state(false);
    let switchQAOption = $state(false);
    let multipleChoiceMode = $state(false);
    let matchCardsMode = $state(false);
    let flipped = $state(false);
    let index = $state(0);
    let feedbackMessage = $state('');
    let answeredCorrectly = new Set<number>();
    let completed = $state(false);
    let autoAdvanceTimeout: ReturnType<typeof setTimeout> | null = null;

    let selectedQuestion: string | null = null;
    let selectedAnswer: string | null = null;
    let matchedPairs = $state<{ question: string; answer: string }[]>([]);

    let randomizedQuestions = $state<string[]>([]);
    let randomizedAnswers = $state<string[]>([]);

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
        feedbackMessage = '';
    }

    function toggleFlipMode() {
        multipleChoiceMode = false;
        matchCardsMode = false;
        flipped = false;
        feedbackMessage = '';
    }

    function toggleMultipleChoice() {
        multipleChoiceMode = true;
        matchCardsMode = false;
        flipped = false;
        feedbackMessage = '';
    }

    function toggleMatchMode() {
        matchCardsMode = true;
        multipleChoiceMode = false;
        flipped = false;
        feedbackMessage = '';
        resetMatchCards();
    }

    function increment() {
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
    }

    function decrement() {
        if (studyQuestions.length === 0) return;
        let prevIndex = (index - 1 + studyQuestions.length) % studyQuestions.length;
        while (answeredCorrectly.has(prevIndex)) {
            prevIndex = (prevIndex - 1 + studyQuestions.length) % studyQuestions.length;
        }
        index = prevIndex;
        flipped = switchQAOption;
        feedbackMessage = '';
        if (autoAdvanceTimeout) {
            clearTimeout(autoAdvanceTimeout);
            autoAdvanceTimeout = null;
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
            if (answeredCorrectly.size === studyQuestions.length) {
                autoAdvanceTimeout = setTimeout(() => (completed = true), 1000);
            } else {
                autoAdvanceTimeout = setTimeout(() => increment(), 2000);
            }
        } else {
            feedbackMessage = `Incorrect. The correct answer is: ${correct}`;
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
        return 'Flip Mode';
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
            {#if multipleChoiceMode || matchCardsMode}
                <button onclick={toggleFlipMode}>Flip Mode</button>
            {/if}
        </div>
    </div>
    <div style="display: flex; gap: 1em;">
        <label style="font-family: Kavoon; color: var(--Mahogany);">
            <input type="checkbox" bind:checked={shuffleOption} onchange={handleShuffleChange} />
            Randomize
        </label>
        <label style="font-family: Kavoon; color: var(--Mahogany);">
            <input type="checkbox" bind:checked={switchQAOption} onchange={handleSwitchQAChange} />
            Switch Question/Answer
        </label>
    </div>
</div>

<div class="container">
    {#if data?.set}
        <a href="/dashboard/sets/{data.set.id}/view-set">view set</a>
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
            <button onclick={decrement}>&lt;</button>
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
            <button onclick={decrement}>&lt;</button>
            <button onclick={increment}>&gt;</button>
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
