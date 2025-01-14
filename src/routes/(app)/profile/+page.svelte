<script lang="ts">
	import { onMount } from 'svelte';
	onMount(async () => {
		await Notification.requestPermission();
		console.log('Notification.permission :>> ', Notification.permission);
	});
</script>

<div class="container">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
</div>
