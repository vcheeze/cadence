<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import Share2 from 'lucide-svelte/icons/share-2';
	import { DateTime } from 'luxon';

	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	// import { Progress } from '$lib/components/ui/progress';
	import * as Select from '$lib/components/ui/select';
	import type { ReadingEntry, ReadingEntryTemplate, ReadingPlan } from '$lib/server/db/schema.js';

	let { data } = $props();

	interface GroupedEntry {
		month: string;
		entries: Array<ReadingEntry & { entryTemplate: ReadingEntryTemplate }>;
	}

	const groupByMonth = (
		array: Array<ReadingEntry & { entryTemplate: ReadingEntryTemplate }>,
		dateKey: string
	): GroupedEntry[] => {
		const result: { [key: string]: GroupedEntry } = {};

		array.forEach((currentValue) => {
			// Extract the month from the date using Luxon
			const date = DateTime.fromISO(currentValue[dateKey]);
			const month = date.toFormat('MMMM');

			// If the group doesn't exist, create it
			if (!result[month]) {
				result[month] = { month, entries: [] };
			}

			// Add the current value to the group
			result[month].entries.push(currentValue);
		});

		// Convert the result object to an array and sort by month
		const orderedMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		return orderedMonths
			.filter((month) => result[month]) // Filter out months with no entries
			.map((month) => result[month]);
	};

	let selectedPlan = $state<
		| (ReadingPlan & { entries: Array<ReadingEntry & { entryTemplate: ReadingEntryTemplate }> })
		| undefined
	>(data.plan);
	const selectContent = $derived(
		data.plan?.name ?? 'Select a reading plan'
	);
	const entryGroups = $derived(groupByMonth(selectedPlan?.entries || [], 'scheduledDate'));

	// function calculateProgress(plan) {
	// 	const completed = plan.entries.filter((e) => e.completedAt).length;
	// 	return Math.round((completed / plan.entries.length) * 100);
	// }
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">Your Reading Plans</h1>
		<div class="flex gap-4">
			<!-- <a href="/dashboard/import">
				<Button variant="outline">Import Plan</Button>
			</a> -->
			<a href="/dashboard/new">
				<Button>
					<Plus class="mr-2 h-4 w-4" />
					New Plan
				</Button>
			</a>
		</div>
	</div>
	{#if !data.plan}
		<Card.Root class="p-6 text-center">
			<h2 class="text-xl font-semibold">You have no reading plans yet</h2>
			<p class="mt-2 text-muted-foreground">Create a reading plan to get started</p>
		</Card.Root>
	{:else}
		<!-- <Select.Root
			type="single"
			value={selectedPlan?.id}
			onValueChange={(value) => (selectedPlan = data.plans.find((p) => p.id === value))}
		>
			<Select.Trigger class="w-[180px]">{selectContent}</Select.Trigger>
			<Select.Content>
				{#each data.plans as plan}
					<Select.Item value={plan.id}>{plan.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root> -->
		<div class="grid gap-6">
			{#if selectedPlan}
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex justify-between"
							>{selectedPlan.name}<Button
								variant="secondary"
								size="icon"
								onclick={() => {
									const url = `${window.location.origin}/share/${selectedPlan?.id ?? ''}`;
									navigator.clipboard.writeText(url);
								}}
							>
								<Share2 class="size-4" />
							</Button></Card.Title
						>
					</Card.Header>
					<Card.Content class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						<Accordion.Root type="multiple">
							{#each entryGroups as group}
								<Accordion.Item>
									<Accordion.Trigger>{group.month}</Accordion.Trigger>
									<Accordion.Content>
										{#each group.entries as entry}
											<!-- <Card.Root class="p-4">
                  <Card.Title class="text-base"
                    >{DateTime.fromISO(entry.scheduledDate).toFormat('ccc, LLL d')}</Card.Title
                  >
                  <Card.Description>{entry.entryTemplate.readingText}</Card.Description>
                </Card.Root> -->
											<div
												class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
											>
												<Checkbox />
												<div class="space-y-1 leading-none">
													<Label
														>{DateTime.fromISO(entry.scheduledDate).toFormat('ccc, LLL d')}</Label
													>
													<div class="text-sm text-muted-foreground">
														{entry.entryTemplate.readingText}
													</div>
												</div>
											</div>
										{/each}
									</Accordion.Content>
								</Accordion.Item>
							{/each}
						</Accordion.Root>
					</Card.Content>
					<!-- <div class="mb-4 space-y-2">
						<div class="flex justify-between text-sm">
							<span>Progress</span>
							<span>{calculateProgress(selectedPlan)}%</span>
						</div>
						<Progress value={calculateProgress(selectedPlan)} />
					</div>

					<div class="flex gap-4">
						<a href="/dashboard/plan/{selectedPlan.id}" class="flex-1">
							<Button variant="outline" class="w-full">View Details</Button>
						</a>
						<a href="/dashboard/plan/{selectedPlan.id}/edit" class="flex-1">
							<Button variant="outline" class="w-full">Edit Schedule</Button>
						</a>
					</div> -->
				</Card.Root>
			{/if}
		</div>
	{/if}
</div>
