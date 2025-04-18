import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user_id) {
        throw redirect(307, '/dashboard');
    }

    return {
        user_id: locals.user_id
    };
};
