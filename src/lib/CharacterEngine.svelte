<script lang="ts">
    let {
        onMessage = (msg: string) => {
            console.log('Character Engine recieved message: ' + msg);
        },
        onReady = () => {
            console.log('Character Engine is ready: ');
        },
        debug = false,
        started = $bindable(false),
        loaded = $bindable(false)
    } = $props();

    let onmessage = (event: MessageEvent) => {
        try {
            const obj = JSON.parse(event.data);

            if (obj.command == 'loaded') {
                loaded = true;
            } else if (obj.command == 'loading') {
                loaded = false;
            } else if (obj.command == 'ready') {
                sendmessage(`{"command":"debug","debug":${debug ? 'true' : 'false'}}`);

                onReady();
            } else if (obj.command == 'started') {
                started = true;
            } else if (obj.command == 'stopped') {
                started = false;
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
