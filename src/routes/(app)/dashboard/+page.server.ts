import { fail, redirect } from '@sveltejs/kit';

import { createClient } from '@sanity/client';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { PageServerLoad, Actions } from './$types';

const sanityClient = createClient({
  projectId: 'fgzsbdbg',
  dataset: 'production',
  apiVersion: '2025-01-21',
  useCdn: false
});

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) throw redirect(302, '/login');

	const plan = await db.query.readingPlan.findFirst({
		where: eq(table.readingPlan.userId, locals.session.userId),
		with: {
			entries: {
				with: { entryTemplate: true },
				orderBy: (entries, { asc }) => [asc(entries.scheduledDate)]
			}
		}
	});

  const quote = await sanityClient.fetch(`*[_type == 'quote' && active][0]`);

	return { plan, quote };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.session) return fail(401);

		const formData = await request.formData();
		const planId = formData.get('planId') as string;
		const totalReadings = parseInt(formData.get('totalReadings') as string);
		const currentReadingNumber = parseInt(formData.get('currentReadingNumber') as string);

		try {
			await db
				.update(table.readingPlan)
				.set({ schedulePattern: { totalReadings, currentReadingNumber } })
				.where(eq(table.readingPlan.id, planId));

			return { success: true };
		} catch {
			return fail(500, { message: 'Could not update Reading Plan' });
		}
	}
} satisfies Actions;
