<script lang="ts">
    import type { Set } from '$lib/interfaces';
    let { data } = $props();

    let this_set: Set = $state({
        title: data.set[0].set_data.title,
        questions: data.set[0].set_data.questions,
        last_question_id: data.set[0].set_data.last_question_id
    });

    let save_message = $state('');

    let saveSet = async () => {
        const response = await fetch('/sets/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.set[0].id,
                set_data: this_set
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            save_message = 'saved!';
        } else {
            console.error('Failed to create set');
            save_message = 'not saved';
        }
    };

    function incrementTerms() {
        this_set.questions.push({
            term: '',
            definition: '',
            id: this_set.questions.length
        });
        this_set.last_question_id = this_set.questions.length;
    }

    function decrementTerms() {
        this_set.questions.pop();
        this_set.last_question_id = this_set.questions.length;

        // setState = this_set;
    }

    let success_message = $state('');
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
            {#each this_set.questions as q, _i (q.id)}
                <div style="padding:0.2em">
                    <input
                        type="text"
                        id="term"
                        name="term"
                        placeholder="Type term here"
                        bind:value={q.term}
                    />
                    <input
                        type="text"
                        id="definition"
                        name="definition"
                        placeholder="Type definition here"
                        bind:value={q.definition}
                    />
                </div>
            {/each}

            {#if this_set.questions.length == 0}
                <p>you have no questions! Add a question</p>
            {/if}

            <div style="padding:3em;margin:auto">
                <button
                    onclick={incrementTerms}
                    style="font-family:Kavoon;font-size:xx-large;color:White;background-color:var(--Pumpkin);padding:0.1em;padding-left:0.5em;padding-right:0.5em;border:none"
                    >+</button
                >
                <button
                    onclick={decrementTerms}
                    style="font-family:Kavoon;font-size:xx-large;color:White;background-color:var(--Pumpkin);padding:0.1em;padding-left:0.5em;padding-right:0.5em;border:none"
                    >-</button
                >
            </div>
        </div>
        <button
            onclick={saveSet}
            style="font-family:Kavoon;font-size:xx-large;color:White;background-color:var(--Pumpkin);padding:0.1em;padding-left:0.5em;padding-right:0.5em;border:none"
            >Save</button
        >
        <p>{save_message}</p>
    </div>
</div>

<style>
    Span {
        background-color: White;
        border-radius: 8px;
        padding: 0.4em;
        min-width: 45%;
    }
    Input {
        font-family: ComicSans;
        color: var(--Rust);
        border: none;
        padding: 0.4em;
        border-radius: 8px;
        min-width: 45%;
        /* text-wrap: inherit; */
    }

    Button {
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
        /* Edge 12 -18 */
        color: var(--Intangible);
    }
</style>
