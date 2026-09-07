<script lang="ts">
	import { onMount } from "svelte";
	import type { VisionData } from "$lib/data/vision";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";

	interface Props {
		vision: VisionData;
	}

	let { vision }: Props = $props();

	const slides = $derived(
		vision.images && vision.images.length > 0
			? vision.images
			: [
					{
						url: vision.imageUrl || vision.fallbackImageUrl,
						alt: vision.mainHeading || "Vision",
						focal: "50% 25%"
					}
				]
	);

	let currentIndex = $state(0);
	let isPaused = $state(false);

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	}

	function goToSlide(idx: number) {
		currentIndex = idx;
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (!isPaused && slides.length > 1) {
				nextSlide();
			}
		}, 4000);

		return () => clearInterval(interval);
	});
</script>

<section
	id="vision"
	class="font-['Josefin_Sans',sans-serif] relative overflow-hidden bg-white dark:bg-black py-20 lg:py-24 text-black dark:text-white"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- MAIN VISION: 2-COLUMN -->
		<div class="grid items-center gap-16 {vision.imageUrl ? 'lg:grid-cols-2' : ''}">
			<!-- LEFT — CONTENT -->
			<Reveal delay={0.15} className="order-2 lg:order-1">
				<div>
					<div class="flex items-center gap-3">
						<span class="h-px w-6 bg-neutral-400 dark:bg-neutral-600"></span>
						<p
							class="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400 font-sans"
						>
							{vision.sectionHeading || "MY VISION"}
						</p>
					</div>

					<h2
						class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl leading-tight"
					>
						{vision.mainHeading || "Cybersecurity should become a mindset, not just a skill."}
					</h2>

					<div class="my-6 h-px w-16 bg-neutral-300 dark:bg-neutral-700"></div>

					<p
						class="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg font-sans"
					>
						{vision.description}
					</p>
				</div>
			</Reveal>

			<!-- RIGHT — AUTOSCROLL PHOTO CAROUSEL -->
			<div class="order-1 lg:order-2 flex justify-center items-center">
				<!-- Ambient Glow -->
				<div
					aria-hidden="true"
					class="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-[90px] dark:bg-white/[0.02]"
				></div>

				<!-- Carousel Frame -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onmouseenter={() => (isPaused = true)}
					onmouseleave={() => (isPaused = false)}
					class="group relative z-10 w-full max-w-[560px] aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white/30 select-none"
				>
					{#each slides as slide, i}
						<div
							class="absolute inset-0 transition-all duration-700 ease-in-out {i === currentIndex
								? 'opacity-100 scale-100 pointer-events-auto z-10'
								: 'opacity-0 scale-105 pointer-events-none z-0'}"
						>
							<img
								src={slide.url}
								alt={slide.alt || "Vision"}
								class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								style="object-position: {slide.focal || 'center center'}; {slide.zoom ? `transform: scale(${slide.zoom});` : ''}"
							/>
						</div>
					{/each}

					<!-- Gradient Overlay at bottom for contrast -->
					<div
						class="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"
					></div>

					<!-- Navigation Buttons (visible on hover or focus) -->
					{#if slides.length > 1}
						<button
							type="button"
							onclick={prevSlide}
							aria-label="Previous slide"
							class="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-all hover:bg-black/70 group-hover:opacity-100 cursor-pointer"
						>
							<ChevronLeft size={18} />
						</button>
						<button
							type="button"
							onclick={nextSlide}
							aria-label="Next slide"
							class="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-all hover:bg-black/70 group-hover:opacity-100 cursor-pointer"
						>
							<ChevronRight size={18} />
						</button>

						<!-- Indicator Dots -->
						<div
							class="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5"
						>
							{#each slides as _, idx}
								<button
									type="button"
									onclick={() => goToSlide(idx)}
									aria-label="Go to slide {idx + 1}"
									class="h-1.5 rounded-full transition-all duration-300 cursor-pointer {idx ===
									currentIndex
										? 'w-6 bg-white shadow-sm'
										: 'w-1.5 bg-white/50 hover:bg-white/80'}"
								></button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- USPs (3 Pillars) -->
		<Reveal delay={0.25}>
			<div class="mt-20 border-t border-neutral-200/80 dark:border-neutral-800 pt-16">
				<div class="grid gap-8 md:grid-cols-3">
					{#each vision.usps as usp, index}
						<div
							class="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-8 transition-all hover:border-black dark:hover:border-white"
						>
							<span
								class="text-xs font-mono font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider"
							>
								0{index + 1}
							</span>
							<h3 class="mt-3 text-xl font-bold text-black dark:text-white">
								{usp.title}
							</h3>
							<p
								class="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans"
							>
								{usp.description}
							</p>
						</div>
					{/each}
				</div>

				{#if vision.closingStatement}
					<div class="mt-12 text-center">
						<blockquote
							class="text-xl sm:text-2xl font-medium italic text-neutral-800 dark:text-neutral-200"
						>
							&ldquo;{vision.closingStatement}&rdquo;
						</blockquote>
					</div>
				{/if}
			</div>
		</Reveal>
	</div>
</section>
