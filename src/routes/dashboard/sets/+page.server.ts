import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const { user_id } = event.locals;

    if (!user_id) {
        return {
            sets: []
        };
    }

    const sets = await db
        .select()
        .from(study_set)
        .where(eq(study_set.owner_id, user_id))
        .orderBy(study_set.id);

    return {
        sets
    };
};
