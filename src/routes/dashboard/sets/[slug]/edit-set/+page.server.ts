import { json, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const { user_id } = event.locals;

    if (!user_id) {
        return redirect(307, '/dashboard/sets');
    }

    let sets;

    try {
        sets = await db
            .select()
            .from(study_set)
            .where(
                and(eq(study_set.id, parseInt(event.params.slug)), eq(study_set.owner_id, user_id))
            );
    } catch (error) {
        return json({ error: `Failed to load set: ${error}` }, { status: 500 });
    }

    if (sets.length == 0) return redirect(307, '/dashboard/sets');

    return {
        set: sets[0]
    };
};
