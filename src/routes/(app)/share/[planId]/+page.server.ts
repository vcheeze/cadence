import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const plan = await db.select().from(table.readingPlan).where(eq(table.readingPlan.id, params.planId));
  // const plan = await db.query.readingPlans.findFirst({
  //   where: and(
  //     eq(readingPlans.id, params.planId),
  //     eq(readingPlans.isPublic, true)
  //   ),
  //   with: {
  //     entries: true,
  //     user: {
  //       columns: {
  //         email: true
  //       },
  //       with: {
  //         preferences: {
  //           columns: {
  //             timezone: true
  //           }
  //         }
  //       }
  //     }
  //   }
  // });

  if (!plan) return fail(404, { message: 'Plan not found or not public' });

  return {
    plan,
    // timezone: plan.user.preferences?.timezone || 'UTC'
  };
};
