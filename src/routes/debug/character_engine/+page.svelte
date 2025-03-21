<script lang="ts">
    import CharacterEngine from '$lib/CharacterEngine.svelte';

    let msg = $state('');
    let character_delay = $state(0.0);

    let character_engine: CharacterEngine;
    let ready = $state(false);
    let loaded = $state(false);
    let started = $state(false);

    let onReady = () => {
        ready = true;
    };

    let sendMessage = () => {
        character_engine.sendmessage(msg);
    };

    let sendEmotion = (emotion: String) => {
        return () => {
            character_engine.sendmessage(`{"command":"new_emotion","emotion":"${emotion}"}`);
        };
    };

    let sendCharacter = (character: String, path: String, scene_path: String) => {
        return () => {
            character_engine.sendmessage(
                `{
                    "command":"new_character",
                    "character":"${character}",
                    "pack_path":"${window.location.origin}/${path}",
                    "scene_path":"res://characters/${scene_path}",
                    "secs":${character_delay ?? 0.0}
                }`
            );
        };
    };
</script>

<h1>Testing Character Engine</h1>

<div class="row_container flex_row">
    <h3 style="margin: 0px">Ready: {ready ? 'Yes' : 'No'}</h3>
    <h3 style="margin: 0px">|</h3>
    <h3 style="margin: 0px">Loaded: {loaded ? 'Yes' : 'No'}</h3>
    <h3 style="margin: 0px">|</h3>
    <h3 style="margin: 0px">Started: {started ? 'Yes' : 'No'}</h3>
</div>

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

<div class="row_container flex_row">
    <button
        onclick={sendCharacter(
            'TestingMiku',
            'characters/testing_miku.pck',
            'testing_miku/TestingMiku.tscn'
        )}>Send Testing Miku</button
    >
    <h3 style="margin: 0px">|</h3>
    <input type="number" style="width: 30px" bind:value={character_delay} />
</div>

<div id="character_engine_container">
    <CharacterEngine debug={true} {onReady} bind:this={character_engine} bind:loaded bind:started />
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
