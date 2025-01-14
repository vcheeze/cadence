<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';

	import { Toaster } from "$lib/components/ui/sonner";
	import { i18n } from '$lib/i18n';
	
	import '../../app.css';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Toaster />
  <div class="min-h-screen p-8 max-sm:p-6">
    {@render children()}
  </div>
</ParaglideJS>
