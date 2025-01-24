<script>
	import { onMount } from 'svelte';

	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Book from 'lucide-svelte/icons/book';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Users from 'lucide-svelte/icons/users';
	import { inView } from 'motion';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	const features = [
		{
			icon: Book,
			title: 'Track Your Reading',
			description: 'Keep track of your daily Bible reading progress with an intuitive interface'
		},
		{
			icon: Users,
			title: 'Stay Accountable',
			description: 'Connect with friends and mentors who encourage your spiritual journey'
		},
		{
			icon: Calendar,
			title: 'Build Consistency',
			description: 'Develop a lasting habit with customizable reading plans and reminders'
		}
	];

	// const testimonials = [
	// 	{
	// 		name: 'Sarah M.',
	// 		role: 'Small Group Leader',
	// 		content:
	// 			"Cadence has transformed how our group stays connected through God's Word. The accountability features are game-changing."
	// 	},
	// 	{
	// 		name: 'David R.',
	// 		role: 'Church Member',
	// 		content:
	// 			'Finally found an app that helps me stay consistent with my Bible reading. Simple, focused, and effective.'
	// 	}
	// ];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function setupScrollAnimation(node) {
		if (mounted) {
			return inView(
				node,
				(target) => {
					target.style.opacity = '0';
					target.style.transform = 'translateY(20px)';

					target.animate(
						[
							{ opacity: 0, transform: 'translateY(20px)' },
							{ opacity: 1, transform: 'translateY(0)' }
						],
						{
							duration: 600,
							fill: 'forwards',
							easing: 'ease-out'
						}
					);
				},
				{ amount: 0.3 }
			);
		}
	}
</script>

<svelte:head>
	<title>Cadence - Track Your Bible Reading Journey</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Hero Section -->
	<header
		class="container mx-auto bg-gradient-to-r from-stone-200 via-stone-100 to-stone-50 px-4 py-24 text-center dark:from-stone-800 dark:via-stone-900 dark:to-stone-950"
	>
		<h1 class="mb-4 scroll-m-20 font-serif text-4xl font-bold lg:text-5xl xl:text-6xl">
			Track Your Bible Reading Journey
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
			Stay accountable and build lasting spiritual habits with Cadence - the simple Bible reading
			tracker focused on consistency and community.
		</p>
		<div class="flex justify-center gap-4">
			<div class="transition-transform duration-200 hover:scale-105">
				<Button size="lg" class="gap-2" href="/dashboard">
					Start Your Journey <ArrowRight class="size-4" />
				</Button>
				<p class="mt-1 text-sm text-muted-foreground">It's free, I promise!</p>
			</div>
			<Button size="lg" variant="outline" href="/about">Learn More</Button>
		</div>
	</header>

	<!-- Features Section -->
	<section class="container mx-auto px-4 py-16">
		{#if mounted}
			<div use:setupScrollAnimation>
				<h2
					class="mb-12 scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight transition-colors"
				>
					Why Choose Cadence?
				</h2>
			</div>
			<div class="grid gap-8 md:grid-cols-3">
				{#each features as feature}
					<div use:setupScrollAnimation>
						<Card.Root class="hover:scale-102 text-center transition-transform duration-200">
							<Card.Header>
								<div class="mb-4 flex justify-center">
									<svelte:component this={feature.icon} size={32} class="text-primary" />
								</div>
								<Card.Title>{feature.title}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="text-muted-foreground">{feature.description}</p>
							</Card.Content>
						</Card.Root>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Coming Soon Section -->
	<section class="container mx-auto bg-muted/50 px-4 py-16">
		{#if mounted}
			<div use:setupScrollAnimation>
				<div class="mx-auto max-w-md text-center">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-2xl">Coming Soon</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-4">
							<p class="text-muted-foreground">
								We're currently finalizing our plans to make Cadence accessible to everyone. Sign up
								below to be notified when we launch and receive early access benefits.
							</p>
							<div class="transition-transform duration-200 hover:scale-105">
								<Button class="w-full gap-2">
									Join Waitlist <ArrowRight size={20} />
								</Button>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		{/if}
	</section>
	<!-- Pricing Section -->
	<!-- <section class="container mx-auto px-4 py-16 bg-muted/50">
    {#if mounted}
      <div use:setupScrollAnimation>
        <h2 class="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div class="max-w-md mx-auto">
          <Card>
            <Card.Header>
              <Card.Title class="text-center">
                Personal Plan
                <div class="text-3xl font-bold mt-2">$5/month</div>
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <ul class="space-y-4">
                {#each ["Unlimited reading tracking", "Connect with accountability partners", "Custom reading plans", "Daily reminders", "Prayer request sharing"] as feature}
                  <li class="flex items-center gap-2">
                    <Check size={20} class="text-primary" />
                    {feature}
                  </li>
                {/each}
              </ul>
              <div class="transition-transform hover:scale-105 duration-200 mt-6">
                <Button class="w-full">Get Started Now</Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    {/if}
  </section> -->

	<!-- Testimonials Section -->
	<!-- <section class="container mx-auto px-4 py-16">
		{#if mounted}
			<div use:setupScrollAnimation>
				<h2
					class="mb-12 scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight transition-colors"
				>
					What Others Are Saying
				</h2>
			</div>
			<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
				{#each testimonials as testimonial}
					<div use:setupScrollAnimation>
						<Card class="hover:scale-102 transition-transform duration-200">
							<Card.Content class="pt-6">
								<p class="mb-4 text-muted-foreground">"{testimonial.content}"</p>
								<div class="font-semibold">{testimonial.name}</div>
								<div class="text-sm text-muted-foreground">{testimonial.role}</div>
							</Card.Content>
						</Card>
					</div>
				{/each}
			</div>
		{/if}
	</section> -->

	<!-- CTA Section -->
	<section class="container mx-auto px-4 py-16 text-center">
		{#if mounted}
			<div use:setupScrollAnimation>
				<h2
					class="mb-4 scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight transition-colors"
				>
					Ready to Start Your Journey?
				</h2>
				<p class="mx-auto mb-8 max-w-xl text-muted-foreground">
					Join thousands of believers building meaningful Bible reading habits with Cadence.
				</p>
				<div class="transition-transform duration-200 hover:scale-105">
					<Button size="lg" class="gap-2">
						Start Free Trial <ArrowRight size={20} />
					</Button>
				</div>
			</div>
		{/if}
	</section>

	<!-- Footer -->
	<footer class="container mx-auto border-t px-4 py-8">
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<div class="text-sm text-muted-foreground">© 2025 Cadence. All rights reserved.</div>
			<div class="flex gap-6">
				<a
					href="/privacy"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Privacy Policy
				</a>
				<a
					href="/terms"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Terms of Service
				</a>
				<a
					href="/contact"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Contact
				</a>
			</div>
		</div>
	</footer>
</div>
