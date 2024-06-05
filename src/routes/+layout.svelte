<script lang="ts">
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<ThemeSwitch />
<slot></slot>

<style></style>
