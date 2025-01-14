// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}

		// https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/#sveltekit-cloudflare-configuration
		interface Platform {
			env: {
					COUNTER: DurableObjectNamespace;
			};
			context: {
					waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache }
	}
	}
}

export {};
