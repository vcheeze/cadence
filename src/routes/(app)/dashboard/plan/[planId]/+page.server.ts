import { error, redirect } from '@sveltejs/kit';

import { desc, eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.session) throw redirect(302, '/login');

  const plan = await db.query.readingPlan.findFirst({
    where: eq(table.readingPlan.id, params.planId),
    with: {
      entries: {
        orderBy: [desc(table.readingEntry.scheduledDate)]
      }
    }
  });
  // const plan = await db.query.readingPlans.findFirst({
  //   where: eq(readingPlans.id, params.planId),
  //   with: {
  //     entries: {
  //       orderBy: [desc(readingEntries.scheduledDate)]
  //     }
  //   }
  // });

  if (!plan) return error(404, 'Plan not found');
  if (plan.userId !== locals.session.userId) return error(403, 'Not authorized');

  const userPrefs = await db.query.userPreference.findFirst({
    where: eq(table.userPreference.userId, locals.session.userId)
  });

  return {
    plan,
    timezone: userPrefs?.timezone || 'UTC'
  };
};
