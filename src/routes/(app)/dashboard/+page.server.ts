import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) throw redirect(302, '/login');

  const plans = await db.select().from(table.readingPlan).where(eq(table.readingPlan.userId, locals.session.userId)); // how to include entries?

  return { plans };
};

export const actions: Actions = {
  markComplete: async ({ request, locals }) => {
    if (!locals.session) return fail(401);

    const data = await request.formData();
    const entryId = data.get('entryId')?.toString();

    if (!entryId) return fail(400);

    await db
      .update(table.readingEntry)
      .set({
        completedAt: new Date()
      })
      .where(eq(table.readingEntry.id, entryId));

    return { success: true };
  }
} satisfies Actions;
