import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
// import { verifySessionToken } from '$lib/server/session_token';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { id, set_data } = await request.json();

    await db.update(study_set).set({ set_data }).where(eq(study_set.id, id));

    // new Response();
    return json({ id: id }, { status: 202 });

    // if (set_data.length === 0) {
    //     return json({ error: 'Failed to save set' }, { status: 500 });
    // }
};
