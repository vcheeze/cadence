import { fail } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const plan = await db.query.readingPlan.findFirst({
		where: eq(table.readingPlan.id, params.planId)
	});

	console.log('plan :>> ', plan);

	if (!plan) return fail(404, { message: 'Plan not found or not public' });

	return { plan };
};
