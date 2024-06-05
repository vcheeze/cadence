import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, '/login');

  return {
    name: event.locals.user.name,
    email: event.locals.user.email
  };
};
