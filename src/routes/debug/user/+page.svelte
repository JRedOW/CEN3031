<script lang="ts">
    import { page } from '$app/state';

    export const user_id = page.data.user_id;

    let email = $state('');
    let password = $state('');
    let login_message = $state('');

    let logout_message = $state('');

    let new_email = $state('');
    let new_password = $state('');
    let login_new_account = $state(false);
    let create_message = $state('');

    let createUser = async () => {
        const response = await fetch('/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: new_email,
                password_hash: new_password,
                login: login_new_account
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            create_message = 'Created User ' + data.id;
        } else {
            console.error('Failed to create user');
            create_message = 'Failed to create user';
        }
    };

    let login = async () => {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password_hash: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            login_message = 'Logged In User ' + data.id;
        } else {
            console.error('Failed to login');
            login_message = 'Failed to login';
        }
    };

    let logout = async () => {
        const response = await fetch('/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            logout_message = 'Logged Out User';
        } else {
            console.error('Failed to logout');
            logout_message = 'Failed to logout';
        }
    };
</script>

{#if user_id}
    <h1>User {user_id} Logged In</h1>
{:else}
    <h1>No User Logged In</h1>
{/if}

<div style="width= 100%; display: flex; flex-direction: row; padding-top: 10px;">
    <div style="flex-grow: 1; padding: 10px;">
        <h2>Login:</h2>
        {#if user_id}
            <h4>Logged In</h4>
        {:else}
            <h4>Email:</h4>
            <input type="text" id="email" name="email" bind:value={email} />
            <h4>Password:</h4>
            <input type="password" id="password" name="password" bind:value={password} />
            <div style="width: 100%; margin-top: 1.33em;">
                <button onclick={login}>Login</button>
            </div>
            <p style="width: 100%; margin-top: 1.33em; color: red;">{login_message}</p>
        {/if}
    </div>
    <div style="flex-grow: 1; padding: 10px;">
        <h2>Logout:</h2>
        {#if user_id}
            <div style="width: 100%; margin-top: 1.33em;">
                <button onclick={logout}>Logout</button>
            </div>
            <p style="width: 100%; margin-top: 1.33em; color: red;">{logout_message}</p>
        {:else}
            <h4>Not Logged In</h4>
        {/if}
    </div>
    <div style="flex-grow: 1; padding: 10px;">
        <h2>Create User:</h2>
        <h4>Email:</h4>
        <input type="text" id="new_email" name="new_email" bind:value={new_email} />
        <h4>Password:</h4>
        <input type="password" id="new_password" name="new_password" bind:value={new_password} />
        <h4>Login To New Account:</h4>
        <input
            type="checkbox"
            id="login_new_account"
            name="login_new_account"
            bind:checked={login_new_account}
        />
        <div style="width: 100%; margin-top: 1.33em;">
            <button onclick={createUser}>Create User</button>
        </div>
        <p style="width: 100%; margin-top: 1.33em; color: red;">{create_message}</p>
    </div>
</div>
