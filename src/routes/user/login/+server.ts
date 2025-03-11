import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { createSessionToken } from '$lib/server/session_token';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
    const { email, password_hash } = await request.json();

    const found_user = await db.select().from(user).where(eq(user.email, email));

    if (found_user.length === 0) {
        return json({}, { status: 401 });
    }

    if (found_user[0].password_hash !== password_hash) {
        return json({}, { status: 401 });
    }

    const new_token = await createSessionToken(found_user[0].id);

    cookies.set('session_token', new_token, {
        path: '/',
        maxAge: 1000 * 60 * 60,
        sameSite: 'strict',
        secure: true,
        httpOnly: true
    });

    return json({ id: found_user[0].id }, { status: 202 });
}
