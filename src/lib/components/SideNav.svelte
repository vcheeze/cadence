<script lang="ts">
	import Eye from 'lucide-svelte/icons/eye';
	import Logout from 'lucide-svelte/icons/log-out';

	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	const routes = [
		{ name: 'Home', link: '/' },
		{ name: 'Profile', link: '/profile' },
		{ name: 'About', link: '/about' },
		{ name: 'Privacy Policy', link: '/privacy' },
		{ name: 'Terms of Service', link: '/terms' }
	];
</script>

<div class="flex min-w-fit flex-col">
	{#each routes as route}
		<Button variant="link" href={route.link} class="justify-start"
			>{route.name}
			{#if route.link === page.url.pathname}<Eye />{/if}</Button
		>
	{/each}
	<Separator class="my-4" />
	<Button href="/dashboard">Back to app</Button>
	<Separator class="my-4" />
	<form method="post" action="/logout" use:enhance>
		<Button variant="outline">Logout <Logout /></Button>
	</form>
</div>
