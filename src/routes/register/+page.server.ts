import { fail, redirect } from '@sveltejs/kit';

// import { hash } from '@node-rs/argon2';
import { nanoid } from 'nanoid';

import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import {
	generateSalt,
	hash,
	validateEmail,
	validatePassword,
	validateUsername
} from '$lib/utils/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

		// TODO validate name
		if (username && !validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const userId = nanoid();
		// const passwordHash = await hash(password, {
		// 	// recommended minimum parameters
		// 	memoryCost: 19456,
		// 	timeCost: 2,
		// 	outputLen: 32,
		// 	parallelism: 1
		// });
		const salt = generateSalt();
		const passwordHash = await hash(password, salt);

		try {
			await db.insert(table.user).values({ id: userId, name, username, email, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (err) {
			console.log('err :>> ', err);
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/dashboard');
	}
};
