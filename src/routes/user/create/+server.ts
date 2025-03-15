import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { createSessionToken } from '$lib/server/session_token';

export async function POST({ request, cookies }) {
    const { email, password_hash, login } = await request.json();

    const new_user = await db
        .insert(user)
        .values({
            email,
            password_hash
        })
        .returning({ id: user.id });

    if (new_user.length === 0) {
        return json({ error: 'Failed to create user' }, { status: 500 });
    }

    if (login) {
        const new_token = await createSessionToken(new_user[0].id);

        cookies.set('session_token', new_token, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            sameSite: 'strict',
            secure: true,
            httpOnly: true
        });
    }

    return json({ id: new_user[0].id }, { status: 201 });
}
