<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Login | Cadence</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center px-4">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="font-serif text-3xl tracking-normal">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" name="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="##" class="ml-auto inline-block text-sm underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" class="w-full">Login</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Don't have an account?
					<a href="/register" class="underline"> Sign up </a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
