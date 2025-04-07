<script lang="ts">
    import type { Set } from '$lib/interfaces';
    let { data } = $props();

    let this_set: Set = $state({
        title: data.set.set_data.title,
        questions: data.set.set_data.questions,
        last_question_id: data.set.set_data.last_question_id
    });

    let save_message = $state('');

    let saveSet = async () => {
        const response = await fetch('/sets/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.set.id,
                set_data: this_set
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Set saved: ', data);
            save_message = 'saved!';
        } else {
            console.error('Failed to save set');
            save_message = 'not saved';
        }
    };

    function incrementTerms() {
        const newId = this_set.last_question_id + 1;
        this_set.questions.push({
            term: '',
            definition: '',
            id: newId
        });
        this_set.last_question_id = newId;
    }

    function decrementTerms() {
        this_set.questions.pop();
        this_set.last_question_id = this_set.questions.length;
    }

    function deleteQuestion(questionId: number) {
        this_set.questions = this_set.questions.filter(q => q.id !== questionId);

    }
</script>

<div style="padding:3em">
    <a href="/dashboard/sets">my sets</a>
    <h1 style="font-family:Kavoon">Edit Set</h1>

    <div>
        <div>
            <input
                type="text"
                id="term"
                name="term"
                placeholder="Title term here"
                bind:value={this_set.title}
                style="font-size:x-large;margin-bottom:0.5em;font-family:Kavoon"
            />
            {#each this_set.questions as q (q.id)}
                <div style="padding:0.2em">
                    <input
                        type="text"
                        id="term"
                        name="term"
                        placeholder="Type term here"
                        bind:value={q.term}
                        style="font-family:ComicSans; padding:0.4em; border-radius:8px; border:none; min-width:45%;"
                    />
                    <input
                        type="text"
                        id="definition"
                        name="definition"
                        placeholder="Type definition here"
                        bind:value={q.definition}
                        style="font-family:ComicSans; padding:0.4em; border-radius:8px; border:none; min-width:45%;"
                    />
                    <!-- Delete button for each question -->
                    <button
                        onclick={() => deleteQuestion(q.id)}
                        style="font-family:Kavoon; font-size:medium; color:White; background-color:var(--Pumpkin); border-radius:8px; border:none; padding:0.3em; margin-left:0.5em; cursor:pointer;">
                        delete
                    </button>
                </div>
            {/each}

            {#if this_set.questions.length == 0}
                <p>you have no questions! Add a question</p>
            {/if}

            <div style="padding:3em;margin:auto">
                <button
                    onclick={incrementTerms}
                    style="font-family:Kavoon; font-size:xx-large; color:White; background-color:var(--Pumpkin); padding:0.1em 0.5em; border:none; cursor:pointer;"
                    >+</button>
            </div>
        </div>
        <button
            onclick={saveSet}
            style="font-family:Kavoon; font-size:xx-large; color:White; background-color:var(--Pumpkin); padding:0.1em 0.5em; border:none; cursor:pointer;"
            >Save</button>
        <p>{save_message}</p>
    </div>
</div>

<style>
    span {
        background-color: White;
        border-radius: 8px;
        padding: 0.4em;
        min-width: 45%;
    }

    input {
        font-family: ComicSans;
        color: var(--Rust);
        border: none;
        padding: 0.4em;
        border-radius: 8px;
    }

    button {
        font-family: Kavoon;
        font-size: xx-large;
        color: White;
        background-color: var(--Pumpkin);
        border-radius: 8px;
    }

    p {
        font-family: ComicSans;
    }

    .textarea[contenteditable]:empty::before {
        content: 'Type definition here';
        color: var(--Intangible);
        font-size: small;
        font-family: ComicSans;
    }

    ::placeholder {
        color: var(--Intangible);
        opacity: 1; /* Firefox */
    }

    ::-ms-input-placeholder {
        color: var(--Intangible);
    }
</style>
