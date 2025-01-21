import { redirect } from '@sveltejs/kit';

import { ilike } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) throw redirect(302, '/login');

	const planTemplate = await db.query.readingPlanTemplate.findFirst({
		where: ilike(table.readingPlanTemplate.name, 'custom')
	});

	return { planTemplate, form: await superValidate(zod(formSchema)) };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.session) return fail(401, { message: 'Unauthorized' });

		const formData = await request.formData();
		const templateId = formData.get('templateId') as string;
		const name = formData.get('name') as string;
		const totalReadings = parseInt(formData.get('totalReadings') as string);
		const currentReadingNumber = parseInt(formData.get('currentReadingNumber') as string);
		// const startDate = formData.get('startDate') as string;
		// const endDate = formData.get('endDate') as string;

		// const planTemplate = await db.query.readingPlanTemplate.findFirst({
		//   where: eq(table.readingPlanTemplate.id, templateId),
		//   with: { entries: true }
		// });
		// if (!planTemplate) {
		//   return fail(404, { message: 'Template not found' });
		// }

		// return { success: true };

    const start = new Date(new Date().getFullYear(), 0, 1); // get first day of the year
    const tzoffset = start.getTimezoneOffset() * 60000; // offset in milliseconds
    const startDate = new Date(start.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string

    const end = new Date(new Date().getFullYear(), 11, 31); // get last day of the year
    const endDate = new Date(end.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string

		try {
			const planId = nanoid();
			const readingPlan: table.ReadingPlan = {
				id: planId,
				name,
				startDate,
				endDate,
				userId: locals.session.userId,
				templateId,
				isPublic: false,
				schedulePattern: { totalReadings, currentReadingNumber },
				lastCompletedDate: null,
				currentStreak: null,
				longestStreak: null,
				lastStreakUpdate: null,
				createdAt: null,
				updatedAt: null
			};
			await db.insert(table.readingPlan).values(readingPlan);
			// const insertEntries = db.insert(table.readingEntry).values(
			// 	Array.from({ length: totalReadings }, (_, index) => ({
			// 		id: nanoid(),
			// 		planId,
			// 		sequenceNumber: index,
      //     // dummy values below that are not used
			// 		entryTemplateId: 'MQqa4uy-YpYrDwMmcpZBr',
			// 		scheduledDate: endDate
			// 	}))
			// );

			// await db.batch([insertPlan, insertEntries]);
		} catch (err) {
			console.error(err);
			return fail(500, { message: err.message || 'An error has occurred' });
		}

		return redirect(302, '/dashboard');
	}
};
