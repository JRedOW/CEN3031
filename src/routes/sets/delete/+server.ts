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

    const { id } = await request.json();

    const deletedSets = await db
        .delete(study_set)
        .where(and(eq(study_set.id, id), eq(study_set.owner_id, owner_id)))
        .returning({ deletedId: study_set.id });

    if (deletedSets.length === 0) {
        throw json({ error: 'Set not found' }, { status: 404 });
    }

    return json({ id: id }, { status: 200 });
};
