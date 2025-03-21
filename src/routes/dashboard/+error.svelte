<script lang="ts">
    import { page } from '$app/state';
</script>

<h1>Uh Oh, Something Went Wrong.</h1>

<h1>{page.status} | {page.error ? page.error.message : ''}</h1>

<style>
    h1 {
        padding: 10px;
    }
</style>
