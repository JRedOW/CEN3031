<script lang="ts">
    import CharacterEngine from './CharacterEngine.svelte';

    let character_engine: CharacterEngine;
    let ready = $state(false);
    let loaded = $state(false);
    let started = $state(false);

    let streak = $state(0);

    let onReady = () => {
        ready = true;

        character_engine.sendmessage(
            `{
                "command":"new_character",
                "character":"NotsuneMiku",
                "pack_path":"${window.location.origin}/characters/notsune_miku.pck",
                "scene_path":"res://characters/notsune_miku/NotsuneMiku.tscn",
                "secs":2
            }`
        );
    };

    export const correct = () => {
        streak++;

        if (streak < 5) character_engine.sendmessage(`{"command":"new_emotion","emotion":"Happy"}`);
        else character_engine.sendmessage(`{"command":"new_emotion","emotion":"Excited"}`);
    };

    export const incorrect = () => {
        streak = 0;

        character_engine.sendmessage(`{"command":"new_emotion","emotion":"Sad"}`);
    };
</script>

<div class="reaction_container">
    <div class="character_engine_container">
        <CharacterEngine {onReady} bind:this={character_engine} bind:loaded bind:started />
    </div>
</div>

<style>
    div.reaction_container {
        position: fixed;
        bottom: 0;
        right: 0;
    }

    div.character_engine_container {
        width: 500px;
        height: 270px;
        padding: 0px;
    }
</style>
