import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	// Clear the session cookie
	cookies.set('session_token', '', {
		path: '/',
		expires: new Date(0)
	});

	// Redirect to the login page
	throw redirect(303, '/debug/user');
};
