import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { id } = await request.json();

    const existingSet = await db.select().from(study_set).where(eq(study_set.id, id));

    if (existingSet.length === 0) {
        return json({ error: 'Set not found' }, { status: 404 });
    }

    try {
        await db.delete(study_set).where(eq(study_set.id, id));
        return json({ id: id }, { status: 200 });
    } catch (error) {
        console.error('Error deleting set:', error);
        return json({ error: 'Failed to delete set' }, { status: 500 });
    }
};
