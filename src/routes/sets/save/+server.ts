import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const owner_id = locals.user_id!;

    if (!owner_id) {
        throw json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id, set_data } = await request.json();

    const editedSets = await db
        .update(study_set)
        .set({ set_data })
        .where(and(eq(study_set.id, id), eq(study_set.owner_id, owner_id)))
        .returning({ editedIds: study_set.id });

    if (editedSets.length === 0) {
        throw json({ error: 'Failed to save set' }, { status: 500 });
    }

    return json({ id: id }, { status: 202 });
};
