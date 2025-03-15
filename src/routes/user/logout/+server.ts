import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
    cookies.set('session_token', '', {
        path: '/'
    });

    return json({}, { status: 200 });
}
