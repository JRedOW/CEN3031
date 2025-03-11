<script lang="ts">
    let {
        onMessage = (msg: string) => {
            console.log('Character Engine recieved message: ' + msg);
        }
    } = $props();

    let onmessage = (event: MessageEvent) => {
        onMessage(event.data);
    };

    export const sendmessage = (msg: string) => {
        const iframe = document.querySelector('iframe')!;
        iframe.contentWindow!.postMessage(msg, '*');
    };
</script>

<iframe src="/character_engine/character_engine.html" title="Character Engine" {onmessage}></iframe>

<style>
    iframe {
        border: none;
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
