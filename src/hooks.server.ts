import type { Handle } from '@sveltejs/kit';
import { verifySessionToken, createSessionToken } from '$lib/server/session_token';

export const handle: Handle = async ({ event, resolve }) => {
    if (event.cookies.get('session_token')) {
        const raw_token = event.cookies.get('session_token');

        try {
            const { payload } = await verifySessionToken(raw_token!);

            const exp = (payload.exp ?? 0) * 1000;

            if (exp < Date.now()) {
                event.locals.user_id = undefined;
            } else {
                event.locals.user_id = Number(payload.sub);

                if (exp - Date.now() < 1000 * 60 * 30) {
                    // If the token expires in half an hour or less, refresh it
                    const new_token = await createSessionToken(event.locals.user_id);

                    event.cookies.set('session_token', new_token, {
                        path: '/',
                        maxAge: 1000 * 60 * 60,
                        sameSite: 'strict',
                        secure: true,
                        httpOnly: true
                    });
                }
            }
        } catch {
            event.locals.user_id = undefined;
            event.cookies.set('session_token', '', { path: '/', maxAge: 0 });
        }
    }

    const response = await resolve(event);
    return response;
};
