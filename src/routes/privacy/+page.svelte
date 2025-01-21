<script>
	import * as Card from '$lib/components/ui/card';

	let companyName = 'Cadence';
	let contactEmail = 'support@cadence.com';
</script>

<div class="container mx-auto px-4 py-16">
	<!-- Privacy Policy Section -->
	<section id="privacy-policy" class="mb-16">
		<Card.Root>
			<Card.Header>
				<Card.Title class="mb-8 text-4xl font-bold">Privacy Policy</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="mb-4">
					At {companyName}, we value your privacy and are committed to protecting your personal
					information. This Privacy Policy outlines how we collect, use, and safeguard your data.
				</p>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">Information We Collect</h2>
				<ul class="mb-4 list-disc pl-8">
					<li>Personal information you provide when signing up (e.g., name, email address).</li>
					<li>Usage data, such as app interactions and preferences.</li>
					<li>Technical data, including IP address and device information.</li>
				</ul>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">How We Use Your Information</h2>
				<ul class="mb-4 list-disc pl-8">
					<li>To provide and improve our services.</li>
					<li>To communicate updates and promotions.</li>
					<li>To ensure security and prevent fraud.</li>
				</ul>
				<h2 class="mb-4 mt-8 text-2xl font-semibold">Your Rights</h2>
				<p class="mb-4">
					You have the right to access, update, or delete your personal information. For assistance,
					please contact us at <a href={`mailto:${contactEmail}`} class="text-primary underline"
						>{contactEmail}</a
					>.
				</p>
			</Card.Content>
		</Card.Root>
	</section>
</div>
