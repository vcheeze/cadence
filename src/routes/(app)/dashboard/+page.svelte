<script lang="ts">
	// import Plus from 'lucide-svelte/icons/plus';
	import Check from 'lucide-svelte/icons/check';
	import Share2 from 'lucide-svelte/icons/share-2';
	import { DateTime } from 'luxon';

	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	// import type { ReadingEntry, ReadingEntryTemplate, ReadingPlan } from '$lib/server/db/schema.js';
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

<svelte:head>
	<title>Dashboard | Cadence</title>
</svelte:head>

{#if !data.plan}
	<Card.Root class="space-y-4 p-6 text-center">
		<p class="leading-7 not-first:mt-6">
			Looks like you haven't started tracking your Bible reading yet.
		</p>
		<Button href="/dashboard/new">Get Started Now</Button>
	</Card.Root>
{:else}
	<h1 class="scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.plan.name}
	</h1>
	<div>
		<Button
			variant="secondary"
			size="icon"
			onclick={() => {
				const url = `${window.location.origin}/share/${data.plan?.id ?? ''}`;
				navigator.clipboard.writeText(url);
			}}
		>
			<Share2 class="size-4" />
		</Button>
	</div>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<Card.Root>
			<Card.Header>
				<Card.Description>You are on</Card.Description>
				<div class="flex items-baseline gap-2">
					<Card.Title>Day {data.plan.schedulePattern!.currentReadingNumber}</Card.Title><span
						class="text-sm text-muted-foreground"
						>of {data.plan.schedulePattern!.totalReadings}</span
					>
				</div>
			</Card.Header>
			<Card.Content class="space-y-3">
				<div class="flex justify-between text-sm">
					<span>Progress</span>
					<span>{realProgress}%</span>
				</div>
				<Progress value={realProgress} />
				<div class="flex items-center gap-3">
					<p class="leading-7 not-first:mt-6">Already done?</p>
					<form method="post" use:enhance>
						<input type="hidden" name="planId" value={data.plan.id} />
						<input
							type="hidden"
							name="totalReadings"
							value={data.plan.schedulePattern?.totalReadings ?? 365}
						/>
						<input
							type="hidden"
							name="currentReadingNumber"
							value={(data.plan.schedulePattern?.currentReadingNumber ?? 1) + 1}
						/>
						<Button type="submit">Mark it as done <Check class="ml-2 size-4" /></Button>
					</form>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Description>Ideally, you should be on</Card.Description>
				<Card.Title>Day {idealProgress}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if plusMinus === 0}
					<p class="leading-7 not-first:mt-6">
						You are exactly on track. Be encouraged and press on!
					</p>
				{:else}
					<p class="leading-7 not-first:mt-6">
						You are <span class={cn(plusMinus > 0 ? 'text-emerald-600' : 'text-rose-600')}
							>{Math.abs(plusMinus)} days {plusMinus > 0 ? 'ahead' : 'behind'}</span
						>. Be encouraged and press on!
					</p>
				{/if}
				{#if data.quote}
					<blockquote class="mt-6 border-l-2 pl-6">
						<span class="italic">"{data.quote.quote}"</span>
						<span class="text-muted-foreground">
							- {data.quote.author}{data.quote.referenceName && ', '}
							{#if data.quote.referenceName}
								{#if data.quote.referenceUrl}
									<a href={data.quote.referenceUrl} class="underline hover:opacity-80"
										>{data.quote.referenceName}</a
									>
								{:else}
									{data.quote.referenceName}
								{/if}
							{/if}{data.quote.page ? `, ${data.quote.page}` : ''}</span
						>
					</blockquote>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
	<div>
		<h2
			class="scroll-m-20 pb-2 font-serif text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Progress Overview
		</h2>
		<p class="text-xs leading-7 text-muted-foreground">Start</p>
		<div class="my-1 flex flex-wrap justify-center gap-6 lg:gap-8">
			{#each Array.from({ length: data.plan?.schedulePattern?.totalReadings ?? 0 }, (_, index) => index + 1) as readingEntry}
				{#if readingEntry === data.plan?.schedulePattern?.currentReadingNumber}
					<div class="size-1.5 rounded-full bg-foreground lg:size-2"></div>
				{:else if readingEntry === idealProgress}
					<div class="size-1.5 rounded-full bg-muted-foreground/50 lg:size-2"></div>
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
		<p class="text-right text-xs leading-7 text-muted-foreground">End</p>
	</div>
{/if}
