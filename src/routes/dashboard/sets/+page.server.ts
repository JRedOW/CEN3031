import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ parent }) {
    const { user_id } = await parent();

    const sets = await db
        .select()
        .from(study_set)
        .where(eq(study_set.owner_id, user_id))
        .orderBy(study_set.id);

    return {
        sets
    };
}
