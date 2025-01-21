<script>
	import * as Card from '$lib/components/ui/card';

	let companyName = 'Cadence';
</script>

<div class="container mx-auto px-4 py-16">
	<!-- Terms of Service Section -->
	<section id="terms-of-service">
		<Card.Root>
			<Card.Header>
				<Card.Title class="mb-8 text-4xl font-bold">Terms of Service</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="mb-4">
					By using {companyName}'s services, you agree to comply with the following terms and
					conditions. Please read them carefully.
				</p>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">User Responsibilities</h2>
				<ul class="mb-4 list-disc pl-8">
					<li>Provide accurate information during registration.</li>
					<li>Use the app in compliance with applicable laws.</li>
					<li>Avoid any actions that could harm the platform or its users.</li>
				</ul>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">Prohibited Activities</h2>
				<ul class="mb-4 list-disc pl-8">
					<li>Unauthorized access or use of the platform.</li>
					<li>Uploading harmful or illegal content.</li>
					<li>Impersonating others or providing false information.</li>
				</ul>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">Limitation of Liability</h2>
				<p class="mb-4">
					{companyName} is not liable for any damages resulting from misuse of the platform. Our total
					liability is limited to the amount you have paid for the service.
				</p>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">Changes to Terms</h2>
				<p class="mb-4">
					We may update these terms from time to time. Continued use of the platform constitutes
					acceptance of the revised terms.
				</p>
			</Card.Content>
		</Card.Root>
	</section>
</div>
