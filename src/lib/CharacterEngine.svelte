<script lang="ts">
    let {
        onMessage = (msg: string) => {
            console.log('Character Engine recieved message: ' + msg);
        },
        onReady = () => {
            console.log('Character Engine is ready: ');
        },
        debug = false
    } = $props();

    let onmessage = (event: MessageEvent) => {
        try {
            const obj = JSON.parse(event.data);

            if (obj.command == 'ready') {
                sendmessage(`{"command":"debug","debug":${debug ? 'true' : 'false'}}`);

                onReady();
            }
        } catch {}

        onMessage(event.data);
    };

    export const sendmessage = (msg: string) => {
        const iframe = document.querySelector('iframe')!;
        iframe.contentWindow!.postMessage(msg, '*');
    };
</script>

<iframe src="/character_engine/character_engine.html" title="Character Engine"></iframe>

<svelte:window {onmessage} />

<style>
    iframe {
        border: none;
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
