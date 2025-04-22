<script lang="ts">
    let { data } = $props();

    const user_id = data.user_id;

    let email = $state('');
    let password = $state('');
    let login_message = $state('');

    let new_email = $state('');
    let new_password = $state('');
    let login_new_account = $state(false);
    let create_message = $state('');

    const createUser = async () => {
        const response = await fetch('/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: new_email,
                password_hash: new_password,
                login: login_new_account
            })
        });

        if (response.ok) {
            const result = await response.json();
            create_message = 'Created User ' + result.id;

            if (login_new_account) window.location.replace('/dashboard/');
        } else {
            create_message = 'Failed to create user';
        }
    };

    const login = async () => {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password_hash: password })
        });

        if (response.ok) {
            const result = await response.json();
            login_message = 'Logged In User ' + result.id;

            window.location.replace('/dashboard/');
        } else {
            login_message = 'Failed to login';
        }
    };
</script>

<div class="page">
    <h1>Study Buddy</h1>
    <p>Welcome to the Study Buddy site!</p>

    <div class="flex-row">
        <div class="auth-box">
            <h2>Login</h2>
            {#if user_id}
                <p>Already Logged In</p>
            {:else}
                <h3>Email:</h3>
                <input type="text" bind:value={email} />

                <h3>Password:</h3>
                <input type="password" bind:value={password} />

                <button onclick={login}>Login</button>
                <p class="message">{login_message}</p>
            {/if}
        </div>

        <div class="auth-box">
            <h2>Create Account</h2>

            <h3>New Email:</h3>
            <input type="text" bind:value={new_email} />

            <h3>New Password:</h3>
            <input type="password" bind:value={new_password} />

            <h3>
                <input type="checkbox" bind:checked={login_new_account} />
                Login to new account after creation
            </h3>

            <button onclick={createUser}>Create User</button>
            <p class="message">{create_message}</p>
        </div>
    </div>
</div>

<style>
    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em;
        font-family: Kavoon;
        background-color: var(--Cream);
    }

    h1 {
        font-size: 2.8em;
        color: var(--Mahogany);
        margin-bottom: 0.1em;
    }

    p {
        font-size: 1em;
        color: var(--Mahogany);
        margin-bottom: 1.5em;
    }

    .flex-row {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        justify-content: center;
    }

    .auth-box {
        background-color: white;
        padding: 1.5em;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        width: 250px;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    input[type='text'],
    input[type='password'] {
        padding: 0.4em;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 0.9em;
    }

    h3 {
        font-size: 0.9em;
        color: var(--Mahogany);
    }

    button {
        background-color: lightgray;
        color: black;
        font-family: Kavoon;
        font-size: 0.9em;
        border: none;
        border-radius: 5px;
        padding: 0.5em;
        cursor: pointer;
        margin-top: 0.5em;
    }

    button:hover {
        transform: translateY(-2px);
    }

    input:focus {
        outline: none;
        border-color: var(--Mahogany);
    }

    input:placeholder {
        font-style: italic;
    }

    .message {
        color: red;
        font-size: 0.8em;
        margin-top: 0.3em;
    }
</style>
