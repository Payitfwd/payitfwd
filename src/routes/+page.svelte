<script>
	import { Button } from '$lib/components/ui/button/index';
	import { Card } from '$lib/components/ui/card/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Avatar } from '$lib/components/ui/avatar/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Accordion } from '$lib/components/ui/accordion/index';
</script>

<div class="bg-background text-foreground">
	<!-- Header -->
	<header class="sticky top-0 z-50 flex items-center justify-between bg-card px-6 py-4 shadow">
		<div class="text-xl font-bold">PayItFwd</div>
		<nav class="hidden gap-6 md:flex">
			<a href="#" class="hover:underline">Learn</a>
			<a href="#" class="hover:underline">Contribute</a>
			<a href="#" class="hover:underline">Stories</a>
			<a href="#" class="hover:underline">Leaderboard</a>
		</nav>
		<div class="flex gap-2">
			<Button variant="outline">Sign In</Button>
			<Button class="bg-primary text-primary-foreground">Join Now</Button>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="mx-auto grid max-w-6xl items-center gap-8 px-6 py-20 md:grid-cols-2">
		<div>
			<h1 class="mb-4 text-4xl font-bold">Learn with purpose. Give with impact.</h1>
			<p class="mb-6">Empower your DSA journey while fueling someone else's.</p>
			<div class="flex gap-4">
				<Button class="bg-primary text-primary-foreground">Get Started</Button>
				<Button variant="outline">Browse DSA Roadmap</Button>
			</div>
		</div>
		<div class="h-64 rounded-xl bg-muted"></div>
	</section>

	<!-- How It Works -->
	<section class="bg-card px-6 py-16 text-center">
		<h2 class="mb-10 text-2xl font-semibold">How It Works</h2>
		<div class="grid gap-6 md:grid-cols-3">
			{#each ['Learn DSA with curated modules', 'Contributors fund your journey', 'You pay it forward'] as text, idx}
				<Card class="p-6">
					<Badge class="mb-4">Step {idx + 1}</Badge>
					<p>{text}</p>
				</Card>
			{/each}
		</div>
	</section>

	<!-- Mission Section -->
	<section class="mx-auto max-w-4xl px-6 py-20 text-center">
		<h2 class="mb-4 text-xl font-semibold">
			We're on a mission to democratize tech learning, one learner at a time.
		</h2>
		<Card class="mt-6 p-6">
			<Accordion
				items={[
					{
						title: 'What is PayItFwd?',
						content: 'A mission-driven learning platform where past learners fund future learners.'
					}
				]}
			/>
		</Card>
	</section>

	<!-- Testimonials -->
	<!-- <section class="bg-card px-6 py-16">
		<h2 class="mb-10 text-center text-2xl font-semibold">Stories That Inspire</h2>
		<div class="grid gap-6 md:grid-cols-3">
			{#each [1, 2, 3] as idx}
				<Card class="p-6">
					<div class="mb-4 flex items-center gap-4">
						<Avatar />
						<div>
							<p class="font-medium">Learner {idx}</p>
							<p class="text-sm text-muted-foreground">Contributor-funded</p>
						</div>
					</div>
					<p>"Thanks to the support, I cracked my DSA rounds and landed a job!"</p>
				</Card>
			{/each}
		</div>
		<div class="mt-10 text-center">
			<Button variant="outline">Read More Stories</Button>
		</div>
	</section> -->

	<!-- Footer -->
	<footer class="grid gap-6 bg-background px-6 py-10 text-sm text-muted-foreground md:grid-cols-3">
		<div>
			<p class="font-bold">PayItFwd</p>
			<p>© 2025 All rights reserved.</p>
		</div>
		<div class="flex flex-col gap-2">
			<a href="#">About</a>
			<a href="#">Support</a>
			<a href="#">Blog</a>
		</div>
		<div>
			<p class="mb-2">Subscribe to updates:</p>
			<Input placeholder="Enter your email" />
		</div>
	</footer>
</div>
