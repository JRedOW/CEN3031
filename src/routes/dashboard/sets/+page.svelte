<script lang="ts">
    import { json } from '@sveltejs/kit';
    import type { Set } from '$lib/interfaces';

    let { data } = $props();
    let create_message = $state('');
    // let currentSetId = $state(0);

    const this_set: Set = {
        title: 'My New Set (' + data.sets.length + ')',
        questions: [],
        last_question_id: 0
    };

    let createSet = async () => {
        const response = await fetch('/sets/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                set_data: this_set
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            create_message = 'Created Set ' + data.id;
        } else {
            console.error('Failed to create set');
            create_message = 'Failed to create set';
        }
    };

    let deleteSet = async () => {
        const response = await fetch('/sets/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this_set
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            create_message = 'Deleted Set ' + data.id;
        } else {
            console.error('Failed to create set');
            create_message = 'Failed to delete set';
        }
    };
</script>

<div style="padding:3em">
    <h1 style="font-family:Kavoon;color:var(--Mahogany);padding-bottom:1em">My Sets</h1>

    <ul style="list-style-type:none">
        <div>
            {#each data.sets as set (set.id)}
                <div class="container">
                    <li>
                        <h1>{set.set_data.title}</h1>
                        <a href="/dashboard/sets/{set.id}/view-set">view set</a>
                        <span>|</span>
                        <a href="/dashboard/sets/{set.id}}/edit-set">edit set</a>
                        <!-- <button onclick={}>delete</button> -->
                    </li>
                </div>
            {/each}
            {#if data.sets.length === 0}
                <h2 style="text-align:center">you have no sets! Create one</h2>
            {/if}
        </div>
    </ul>

    <button onclick={createSet} style="padding:0.1em;padding-left:0.5em;padding-right:0.5em"
        >+</button
    >
</div>

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
</style>
