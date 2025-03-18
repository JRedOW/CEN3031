<script lang="ts">
    import CharacterEngine from '$lib/CharacterEngine.svelte';

    let msg = $state('');

    let character_engine: CharacterEngine;

    let sendMessage = () => {
        character_engine.sendmessage(msg);
    };

    let sendEmotion = (emotion: String) => {
        return () => {
            character_engine.sendmessage(`{"command":"new_emotion","emotion":"${emotion}"}`);
        };
    };
</script>

<h1>Testing Character Engine</h1>

<div class="row_container flex_row">
    <input type="text" id="msg" name="msg" bind:value={msg} />
    <button onclick={sendMessage}>Send Custom Message</button>
</div>

<div class="row_container flex_row">
    <button onclick={sendEmotion('Excited')}>Send Excited</button>
    <button onclick={sendEmotion('Happy')}>Send Happy</button>
    <button onclick={sendEmotion('Neutral')}>Send Neutral</button>
    <button onclick={sendEmotion('Sad')}>Send Sad</button>
</div>

<div id="character_engine_container">
    <CharacterEngine debug={true} bind:this={character_engine} />
</div>

<style>
    #character_engine_container {
        width: 500px;
        height: 270px;
        padding: 10px;
    }

    .row_container {
        width: 100%;
        padding: 10px;
    }

    .flex_row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    }
</style>
