<script lang="ts">
    import CharacterEngine from '$lib/CharacterEngine.svelte';

    let msg = $state('');

    let character_engine: CharacterEngine;

    let sendmessage = () => {
        character_engine.sendmessage(msg);
    };
</script>

<h1>Testing Comms</h1>
<input type="text" id="msg" name="msg" bind:value={msg} />
<button onclick={sendmessage}>Send Message</button>

<div style="width: 200px; height: 300px; padding: 10px;">
    <CharacterEngine bind:this={character_engine} />
</div>
