<script lang="ts">
	import SideNav from '$lib/components/SideNav.svelte';

	const contactEmail = 'support@cadence.com';
</script>

<div class="container flex gap-8 py-6 md:py-8">
	<SideNav />
	<div>
		<h1 class="mb-6 scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl">
			Terms of Service
		</h1>
		<h3 class="scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Agreement to Terms</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			By accessing or using Cadence, you agree to be bound by these Terms of Service. If you
			disagree with any part of these terms, you may not access the service.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Account Registration
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">To use Cadence, you must:</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Create an account with accurate information</li>
			<li>Maintain the security of your account credentials</li>
			<li>Promptly notify us of any unauthorized access</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Acceptable Use
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">You agree to use Cadence only for:</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Tracking personal Bible reading progress</li>
			<li>Forming accountability partnerships</li>
			<li>Sharing progress with explicit consent</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Prohibited Activities
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">You must not:</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Share account credentials</li>
			<li>Harass or spam other users</li>
			<li>Attempt to access unauthorized data</li>
			<li>Use the service for any illegal purpose</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Intellectual Property
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Cadence and its original content, features, and functionality are owned by us and are
			protected by international copyright, trademark, and other intellectual property laws.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Termination</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			We may terminate or suspend your account immediately for any violation of these Terms of
			Service.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Limitation of Liability
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Cadence is provided "as is" without warranties of any kind. We are not liable for any damages
			arising from your use of the service.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Changes to Terms
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			We reserve the right to modify these terms at any time. We will notify users of significant
			changes.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Contact Information
		</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Questions about these Terms should be sent to <a
				href={`mailto:${contactEmail}`}
				class="text-primary underline">{contactEmail}</a
			>
		</p>

		<p class="mt-8 text-sm text-muted-foreground">Last updated: January 22, 2025</p>
	</div>
</div>
