import { OAuth2RequestError } from 'arctic';

import { google, lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';

import type { RequestEvent } from '@sveltejs/kit';
import type { DatabaseUser } from '$lib/server/db';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');

  const storedState = event.cookies.get('google_oauth_state') ?? null;
  const storedCodeVerifier = event.cookies.get('google_oauth_code_verifier') ?? null;

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
    // TODO set this base URL in .env?
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const user: GoogleUser = await response.json();
    const existingUser = (await db.user.findUnique({ where: { id: user.id } })) as
      | DatabaseUser
      | undefined;

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = await lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    } else {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = await lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  } catch (e) {
    // console.error('error :>> ', e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      });
    }
    // unknown error
    return new Response(null, {
      status: 500
    });
  }
}
