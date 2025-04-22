<div class="dashboard">
    <h1>Welcome Learner!</h1>

    <div class="boxes">
        <div class="box">
            <h2>Sets</h2>
            <p class="description">
                Use Sets tab to practice on older sets and create new ones to learn!
            </p>
        </div>

        <div class="box">
            <h2>Stats</h2>
            <p class="description">Use Stats tab to check performance and improvement over time!</p>
        </div>
    </div>
</div>

<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

    .dashboard {
        min-height: 100vh;
        padding: 2em;
        background-color: var(--Cream);
        font-family: Kavoon, sans-serif;
        color: var(--Mahogany);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .dashboard h1 {
        font-size: 2.8em;
        margin-bottom: 1em;
    }

    .boxes {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        max-width: 800px;
    }

    .box {
        background-color: white;
        padding: 1.5em;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        flex: 1 1 250px;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .box h2 {
        margin: 0;
        font-size: 1.5em;
        color: var(--Mahogany);
    }

    .box .description {
        flex-grow: 1;
        font-size: 1em;
        color: var(--Mahogany);
        opacity: 0.8;
    }
</style>
