<script lang="ts">
    import type { Set } from '$lib/interfaces';

    let { data } = $props();
    let create_message = $state('');
    let sets = $state(data.sets);

    const default_set = (): Set => {
        return {
            title: 'My New Set (' + sets.length + ')',
            questions: [],
            last_question_id: 0
        };
    };

    let createSet = async () => {
        const new_set = default_set();

        const response = await fetch('/sets/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                set_data: new_set
            })
        });

        if (response.ok) {
            const response_json = await response.json();
            create_message = 'Created Set ' + response_json.new_set.id;

            sets.push(response_json.new_set);
        } else {
            console.error('Failed to create set');
            create_message = 'Failed to create set';
        }
    };

    let deleteSet = async (setId: number) => {
        const response = await fetch('/sets/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: setId // Send the correct set ID for deletion
            })
        });

        if (response.ok) {
            const response_json = await response.json();
            create_message = 'Deleted Set ' + response_json.id;

            sets = sets.filter((set: { id: number }) => set.id !== setId);
        } else {
            console.error('Failed to delete set');

            // Handle specific errors based on status code
            if (response.status === 404) {
                create_message = 'Set not found';
            } else if (response.status === 500) {
                create_message = 'Server error, could not delete set';
            } else {
                create_message = 'Failed to delete set';
            }
        }
    };
</script>

<div style="padding:3em">
    <h1 style="font-family:Kavoon;color:var(--Mahogany);padding-bottom:1em">My Sets</h1>

    <ul style="list-style-type:none">
        <div>
            {#each sets as set (set.id)}
                <div class="container">
                    <li>
                        <h1>{set.set_data.title}</h1>
                        <a href="/dashboard/stats/{set.id}/view-stats">view stats</a>
                        <span>|</span>
                    </li>
                </div>
            {/each}
            {#if sets.length === 0}
                <h2 style="text-align:center">you have no sets! Create one</h2>
            {/if}
        </div>
    </ul>

    <button onclick={createSet} style="padding:0.1em;padding-left:0.5em;padding-right:0.5em"
        >+</button
    >
</div>

{#if false}
    <p>{create_message}</p>
{/if}

<style>
    Button {
        font-family: Kavoon;
        font-size: xx-large;
        color: White;
        background-color: var(--Pumpkin);
        border-radius: 8px;
        border: none;
        float: center;
    }

    h1 {
        margin-bottom: 1em;
        font-family: Kavoon;
        color: var(--Rust);
    }

    h2 {
        margin-bottom: 0.2em;
        font-family: Kavoon;
        color: var(--Rust);
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        height: 100%;
        align-items: left;
        justify-content: left;
        perspective: 100vh;
        background-color: white;
        padding: 1em;
        margin: 1em;
        border-radius: 8px;
        color: var(--Mahogany);
        font-family: Kavoon;
    }

    a {
        color: blue;
        text-decoration: none;
    }

    span {
        margin: 0 5px;
    }
</style>
