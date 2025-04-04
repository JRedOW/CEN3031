import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const owner_id = locals.user_id!;

    if (!owner_id) {
        throw json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { set_data } = await request.json();

    const new_study_set = await db
        .insert(study_set)
        .values({
            owner_id,
            set_data
        })
        .returning({
            id: study_set.id,
            owner_id: study_set.owner_id,
            set_data: study_set.set_data
        });

    if (new_study_set.length === 0) {
        throw json({ error: 'Failed to create set' }, { status: 500 });
    }

    return json({ new_set: new_study_set[0] }, { status: 201 });
};
