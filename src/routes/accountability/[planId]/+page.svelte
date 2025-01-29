<script lang="ts">
	import { DateTime } from 'luxon';

	import * as Popover from '$lib/components/ui/popover';
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
		{data.plan?.name}
	</h1>
	<p class="leading-7">
		You are on Day {data.plan?.schedulePattern?.currentReadingNumber}. You should be on Day {idealProgress}.
	</p>
	<div class="flex flex-wrap justify-start gap-6 lg:gap-8">
		{#each Array.from({ length: data.plan?.schedulePattern?.totalReadings ?? 0 }, (_, index) => index + 1) as readingEntry}
			{#if readingEntry === data.plan?.schedulePattern?.currentReadingNumber}
				<Popover.Root open={true}>
					<Popover.Trigger
						><div
							class="size-1.5 animate-ping rounded-full bg-foreground lg:size-2"
						></div></Popover.Trigger
					>
					<Popover.Content class="w-fit space-y-2">
						<p class="leading-7">
							You are on <strong>Day {data.plan?.schedulePattern?.currentReadingNumber}</strong>.
						</p>
					</Popover.Content>
				</Popover.Root>
			{:else if readingEntry === idealProgress}
				<Popover.Root open={true}>
					<Popover.Trigger
						><div
							class="size-1.5 rounded-full bg-muted-foreground/50 lg:size-2"
						></div></Popover.Trigger
					>
					<Popover.Content class="w-fit space-y-2">
						<p class="leading-7">You should be on <strong>Day {idealProgress}</strong>.</p>
					</Popover.Content>
				</Popover.Root>
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
