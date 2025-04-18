import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const user_id = event.locals.user_id;

	// Optional: protect the dashboard route
	if (!user_id) {
		throw redirect(307, '/');
	}

	// Provide user_id to layout.svelte safely
	return {
		user_id
	};
};
