<script lang="ts">
    import { goto } from '$app/navigation';
    let { data } = $props();
</script>

<div class="view-set-container">
    <h1 class="page-heading">View Set</h1>

    <div class="nav-buttons">
        <a href="/dashboard/sets" class="nav-button">My Sets</a>
        <a href={`/dashboard/sets/${data.set.id}/view-set/study-set`} class="nav-button">Study</a>
    </div>

    <div class="questions">
        {#each data.set.set_data.questions as q (q.id)}
            <div class="question-card">
                <div class="term">{q.term}</div>
                <div class="definition">{q.definition}</div>
            </div>
        {/each}
    </div>
</div>

<style>
  .view-set-container {
    padding: 3rem;
    background: var(--Cream);
    min-height: 100vh;
    font-family: Kavoon, sans-serif;
  }

  .nav-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .nav-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-family: Kavoon, sans-serif;
    font-size: 1rem;
    color: white;
    background: var(--Pumpkin);
    border: none;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
  }
  .nav-button:hover {
    background: var(--Rust);
  }

  .page-heading {
    font-family: Kavoon, sans-serif;
    color: var(--Rust);
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .questions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .question-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    font-family: ComicSans, sans-serif;
  }

  .term {
    font-weight: bold;
    color: var(--Mahogany);
  }

  .definition {
    color: var(--Mahogany);
    text-align: right;
  }
</style>
