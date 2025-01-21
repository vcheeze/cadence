<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';

	import { formSchema } from './schema';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	const isDesktop = new MediaQuery('(min-width: 768px)');

	$effect(() => {
		if (data.planTemplate) {
			$formData.templateId = data.planTemplate.id;
		}
	});
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
	<p class="mb-6 leading-7 [&:not(:first-child)]:mt-6">
		Add a reading plan to keep track of your progress and share it with friends who will keep you
		accountable.
	</p>
	<form method="POST" use:enhance>
		<div class="flex flex-col space-y-4">
			<input type="hidden" name="templateId" bind:value={$formData.templateId} />
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
							<Form.Description
								>Give your reading plan a name so you know what it is in the future. A simple
								example is "M'Cheyne 2025".</Form.Description
							>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="totalReadings">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Total Number of Readings</Form.Label>
							<Input {...props} type="number" bind:value={$formData.totalReadings} />
							<Form.Description
								>Most plans have 365 days of reading, but some allow off days, with 5 readings per
								week or 25 days per month.</Form.Description
							>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="currentReadingNumber">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label
								>If you've already started reading, tell us which day you are reading next:</Form.Label
							>
							<Input {...props} type="number" bind:value={$formData.currentReadingNumber} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Button class={cn(isDesktop.current && 'w-fit')} disabled={!$formData.name}
				>Create</Form.Button
			>
			{#if browser}
				<SuperDebug data={$formData} />
			{/if}
		</div>
	</form>
</div>
