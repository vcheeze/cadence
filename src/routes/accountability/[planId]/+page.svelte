<script lang="ts">
	import { DateTime } from 'luxon';

	import * as Card from '$lib/components/ui/card';

	import { cn } from '$lib/utils';

	let { data } = $props();

	const realProgress = $derived(
		Math.round(
			((data.plan?.schedulePattern?.currentReadingNumber ?? 1) /
				(data.plan?.schedulePattern?.totalReadings ?? 365)) *
				100
		)
	);
	const idealProgress = $derived(
		Math.ceil(
			(DateTime.fromJSDate(new Date()).ordinal / 365) *
				(data.plan?.schedulePattern?.totalReadings ?? 365)
		)
	);
	const plusMinus = $derived(
		(data.plan?.schedulePattern?.currentReadingNumber ?? 1) - idealProgress
	);
</script>

<div class="container min-h-screen space-y-6 p-6 lg:p-8">
	<h1 class="scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.plan?.name} {#if data.plan?.user.username}<span class="text-muted-foreground tracking-normal text-xl"
				>({data.plan.user.username})</span
			>{/if}
	</h1>
	<div class="grid gap-4 md:grid-cols-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>On Day {data.plan?.schedulePattern?.currentReadingNumber}</Card.Title>
				<Card.Description>As opposed to Day {idealProgress}, on average.</Card.Description>
			</Card.Header>
			<Card.Content></Card.Content>
		</Card.Root>
	</div>
	<div class="flex flex-wrap justify-start gap-6 lg:gap-8">
		{#each Array.from({ length: data.plan?.schedulePattern?.totalReadings ?? 0 }, (_, index) => index + 1) as readingEntry}
			{#if readingEntry === data.plan?.schedulePattern?.currentReadingNumber}
				<div class="bg-foreground size-1.5 animate-ping rounded-full lg:size-2"></div>
			{:else if readingEntry === idealProgress}
				<div class="bg-muted-foreground/50 size-1.5 rounded-full lg:size-2"></div>
			{:else}
				<div
					class={cn(
						'size-1.5 rounded-full lg:size-2',
						readingEntry <= (data.plan?.schedulePattern?.currentReadingNumber ?? 1)
							? 'bg-foreground'
							: readingEntry <= idealProgress
								? 'bg-muted-foreground/50'
								: 'bg-muted'
					)}
				></div>
			{/if}
		{/each}
	</div>
</div>
0
