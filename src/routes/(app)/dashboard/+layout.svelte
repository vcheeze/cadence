<script lang="ts">
	import Logout from 'lucide-svelte/icons/log-out';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { mode, toggleMode } from 'mode-watcher';

	import { buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

	let { children } = $props();
</script>

<div class="container space-y-6">
	<div class="flex justify-center">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}
				>Menu</DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Item onclick={() => toggleMode()}>
					{$mode === 'dark' ? 'Light' : 'Dark'} Mode
					{#if $mode === 'dark'}
						<Sun />
					{:else}
						<Moon />
					{/if}
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item><a href="/profile">Profile</a></DropdownMenu.Item>
				<DropdownMenu.Item><a href="/about">About</a></DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					><form method="post" action="/logout" use:enhance>
						<button class="flex items-center gap-2">Logout <Logout /></button>
					</form></DropdownMenu.Item
				>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	{@render children()}
</div>
