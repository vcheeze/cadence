<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';

	import { Toaster } from '$lib/components/ui/sonner';
	import { i18n } from '$lib/i18n';

	import '../../app.css';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Toaster />
	<div class="min-h-screen py-6 md:py-8">
		{@render children()}
	</div>
</ParaglideJS>
