import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    // Clear the session cookie
    cookies.set('session_token', '', {
        path: '/',
        expires: new Date(0)
    });

    return json({}, { status: 200 });
};
