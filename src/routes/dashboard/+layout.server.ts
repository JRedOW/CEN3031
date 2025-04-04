import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
    if (!event.locals.user_id) {
        throw redirect(307, '/dashboard');
    }

    return {
        user_id: event.locals.user_id
    };
};
