<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import Circle from 'lucide-svelte/icons/circle';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import { DateTime } from 'luxon';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { browser } from '$app/environment';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { cn } from '$lib/utils';

	import { formSchema } from './schema';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
				// TODO redirection should happen from server, so no need to handle here?
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

<div class="container">
	<a
		href="/dashboard"
		class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
		><ChevronLeft class="size-3" /> Back to Dashboard</a
	>
	<h1 class="my-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Add a Reading Plan
	</h1>
	<form method="POST" use:enhance>
		<div class="flex flex-col space-y-4">
			{#if data.planTemplates.length === 0}
				<div class="p-6 text-center">
					<h2 class="text-xl font-semibold">No reading plans yet</h2>
				</div>
			{:else}
				<Form.Fieldset {form} name="templateId">
					<Form.Legend>Reading Plans</Form.Legend>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{#each data.planTemplates as plan}
							<Form.Control>
								{#snippet children({ props })}
									<Card.Root
										{...props}
										class={cn(
											'hover:cursor-pointer hover:bg-stone-950/5 hover:shadow',
											plan.id === $formData.templateId && 'border-stone-400 bg-stone-50'
										)}
										onclick={() => {
											const planAlreadySelected = $formData.templateId === plan.id;
											$formData.name = planAlreadySelected ? '' : plan.name;
											$formData.templateId = planAlreadySelected ? '' : plan.id;
										}}
									>
										<Card.Header>
											<Card.Title class="flex items-center justify-between space-x-4">
												{plan.name}
												<div class="w-5">
													{#if plan.id === $formData.templateId}
														<CircleCheckBig class="size-5" />
													{:else}
														<Circle class="size-5" />
													{/if}
												</div>
											</Card.Title>
											<Card.Description>{plan.description}</Card.Description>
										</Card.Header>
										<Card.Content>
											<Collapsible.Root class="space-y-1 leading-none">
												<div class="flex items-center justify-between space-x-4">
													<h4 class="text-sm font-semibold">View details</h4>
													<Collapsible.Trigger
														class={buttonVariants({
															variant: 'ghost',
															size: 'sm',
															class: 'w-9 p-0'
														})}
														onclick={(e) => e.stopPropagation()}
													>
														<ChevronsUpDown />
														<span class="sr-only">Toggle</span>
													</Collapsible.Trigger>
												</div>
												<Collapsible.Content>
													<Table.Root>
														<Table.Body>
															<Table.Row>
																<Table.Cell>Duration</Table.Cell>
																<Table.Cell class="font-medium">{plan.duration} days</Table.Cell>
															</Table.Row>
															<Table.Row>
																<Table.Cell>Total Readings</Table.Cell>
																<Table.Cell class="font-medium">{plan.totalReadings}</Table.Cell>
															</Table.Row>
															<Table.Row>
																<Table.Cell>Frequency</Table.Cell>
																<Table.Cell class="font-medium">{plan.frequencyType}</Table.Cell>
															</Table.Row>
														</Table.Body>
													</Table.Root>
												</Collapsible.Content>
											</Collapsible.Root>
										</Card.Content>
									</Card.Root>
								{/snippet}
							</Form.Control>
						{/each}
						<input type="hidden" name="templateId" bind:value={$formData.templateId} />
						<input type="hidden" name="name" bind:value={$formData.name} />
					</div>
				</Form.Fieldset>
			{/if}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- <Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field> -->
				<Form.Field {form} name="startDate">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Start Date</Form.Label>
							<Input
								{...props}
								type="date"
								bind:value={$formData.startDate}
								onchange={(event) => {
									const startDate = DateTime.fromISO(event.currentTarget.value);
									console.log('startDate :>> ', startDate);
									$formData.endDate =
										startDate
											.plus({
												days:
													data.planTemplates.find(
														(template) => template.id === $formData.templateId
													)?.duration || 364
											})
											.toISODate() ?? '';
								}}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="endDate">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>End Date</Form.Label>
							<Input {...props} type="date" bind:value={$formData.endDate} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Button class={cn(isDesktop.current && 'w-fit')} disabled={!$formData.templateId}
				>Create</Form.Button
			>
			{#if browser}
				<SuperDebug data={$formData} />
			{/if}
		</div>
	</form>
</div>
