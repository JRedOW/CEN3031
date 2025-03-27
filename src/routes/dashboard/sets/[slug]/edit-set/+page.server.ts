import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
    const set = await db
        .select()
        .from(study_set)
        .where(eq(study_set.id, parseInt(params.slug)));

    console.log(params.slug);
    if (!set) error(404);

    return {
        set
    };
}


