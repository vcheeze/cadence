<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import { pwaInfo } from 'virtual:pwa-info';
	import { i18n } from '$lib/i18n';
	import '../app.css';

	let { children } = $props();

	let webManifestLink = $state(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<ParaglideJS {i18n}>
	<ModeWatcher />
	{@render children()}
</ParaglideJS>
