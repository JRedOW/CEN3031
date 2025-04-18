import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    const user_id = locals.user_id;

    // Optional: protect the dashboard route
    if (!user_id) {
        throw redirect(307, '/');
    }

    // Provide user_id to layout.svelte safely
    return {
        user_id
    };
};
