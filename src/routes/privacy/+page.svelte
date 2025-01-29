<script lang="ts">
	import SideNav from '$lib/components/SideNav.svelte';

	const contactEmail = 'support@cadence.com';
</script>

<div class="container flex gap-8 py-6 max-sm:flex-col md:py-8">
	<SideNav />
	<div>
		<h1 class="scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
			Privacy Policy
		</h1>
		<h3 class="scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Introduction</h3>
		<p class="leading-7 not-first:mt-6">
			Welcome to Cadence ("we," "our," or "us"). We respect your privacy and are committed to
			protecting your personal data. This privacy policy explains how we handle your information
			when you use our Bible reading progress tracking and accountability partnership service.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Information We Collect
		</h3>
		<p class="leading-7 not-first:mt-6">
			We collect and process the following information:
		</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Account information (email address, name, and password)</li>
			<li>Bible reading progress data</li>
			<li>Partnership connections and shared progress information</li>
			<li>Usage data and analytics</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			How We Use Your Information
		</h3>
		<p class="leading-7 not-first:mt-6">We use your information to:</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Provide and maintain the Cadence service</li>
			<li>Track and display your Bible reading progress</li>
			<li>Enable accountability partnerships and progress sharing</li>
			<li>Improve and optimize our service</li>
			<li>Send important updates about your account or the service</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Data Sharing and Partnerships
		</h3>
		<p class="leading-7 not-first:mt-6">
			Your reading progress is only shared with accountability partners you explicitly choose to
			connect with. We do not sell your personal data to third parties.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Data Security</h3>
		<p class="leading-7 not-first:mt-6">
			We implement appropriate security measures to protect your personal information. However, no
			method of transmission over the internet is 100% secure.
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Your Rights</h3>
		<p class="leading-7 not-first:mt-6">You have the right to:</p>
		<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
			<li>Access your personal data</li>
			<li>Correct inaccurate data</li>
			<li>Request deletion of your data</li>
			<li>Withdraw consent for data processing</li>
		</ul>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">Contact Us</h3>
		<p class="leading-7 not-first:mt-6">
			If you have questions about this privacy policy, please contact us at
			<a href={`mailto:${contactEmail}`} class="text-primary underline">{contactEmail}</a>
		</p>

		<h3 class="mt-8 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
			Updates to This Policy
		</h3>
		<p class="leading-7 not-first:mt-6">
			We may update this privacy policy from time to time. We will notify you of any significant
			changes.
		</p>

		<p class="mt-8 text-sm text-muted-foreground">Last updated: January 22, 2025</p>
	</div>
</div>
