import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    return {
        user_id: event.locals.user_id
    };
};
