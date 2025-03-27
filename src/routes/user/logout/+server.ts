import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.set('session_token', '', {
        path: '/'
    });

    return json({}, { status: 200 });
};
