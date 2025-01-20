import { redirect } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) throw redirect(302, '/login');

  const planTemplates = await db.query.readingPlanTemplate.findMany();

  return { planTemplates, form: await superValidate(zod(formSchema)) };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.session) return fail(401, { message: 'Unauthorized' });

    const formData = await request.formData();
    const templateId = formData.get('templateId') as string;
    const name = formData.get('name') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;

    const planTemplate = await db.query.readingPlanTemplate.findFirst({
      where: eq(table.readingPlanTemplate.id, templateId),
      with: { entries: true }
    });
    if (!planTemplate) {
      return fail(404, { message: 'Template not found' });
    }

    // return { success: true };

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
        schedulePattern: null,
        lastCompletedDate: null,
        currentStreak: null,
        longestStreak: null,
        lastStreakUpdate: null,
        createdAt: null,
        updatedAt: null,
      };
      const insertPlan = db.insert(table.readingPlan).values(readingPlan);
      const insertEntries = db.insert(table.readingEntry).values(planTemplate.entries.map(entry => ({
        id: nanoid(),
        planId,
        entryTemplateId: entry.id,
        sequenceNumber: entry.sequenceNumber,
        // TODO add calculation logic for scheduledDate based on schedulePattern
        scheduledDate: DateTime.fromISO(startDate).plus({ days: entry.sequenceNumber - 1 }).toISODate() ?? '',
      })));
      
      await db.batch([insertPlan, insertEntries]);
    } catch (err) {
      console.error(err);
      return fail(500, { message: err.message || 'An error has occurred' }); 
    }
      
    return redirect(302, '/dashboard');
  },
};
