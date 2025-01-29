<script lang="ts">
	import SideNav from '$lib/components/SideNav.svelte';
	// import { onMount } from 'svelte';
	// onMount(async () => {
	// 	await Notification.requestPermission();
	// 	console.log('Notification.permission :>> ', Notification.permission);
	// });
	let { data } = $props();
</script>

<div class="container flex max-sm:flex-col gap-8">
	<SideNav />
	<h1 class="scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl">
		Hello, {data.user.name}
	</h1>
</div>
