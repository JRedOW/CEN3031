import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user_id) {
        redirect(307, '/dashboard');
    }
};
