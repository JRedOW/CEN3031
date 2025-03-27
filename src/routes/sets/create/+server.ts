import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_set } from '$lib/server/db/schema.js';
import { verifySessionToken } from '$lib/server/session_token';

export async function POST({ request, cookies }) {
    let owner_id = 0;

    if (cookies.get('session_token')) {
        const raw_token = cookies.get('session_token');

        try {
            const { payload } = await verifySessionToken(raw_token!);

            const exp = (payload.exp ?? 0) * 1000;

            if (exp < Date.now()) {
                return json({ error: 'Not authenticated' }, { status: 404 });
            }

            owner_id = Number(payload.sub);
        } catch {
            return json({ error: 'Not authenticated' }, { status: 404 });
        }
    } else {
        return json({ error: 'Not authenticated' }, { status: 404 });
    }

    const { set_data } = await request.json();

    const new_study_set = await db.insert(study_set).values({
        owner_id,
        set_data
    });

    if (new_study_set.length === 0) {
        return json({ error: 'Failed to create set' }, { status: 500 });
    }
}
