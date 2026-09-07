<script lang="ts">
	import { onMount } from "svelte";
	import type { AboutData } from "$lib/data/about";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";

	interface Props {
		about: AboutData;
	}

	let { about }: Props = $props();

	const slides = $derived(
		about.images && about.images.length > 0
			? about.images
			: [{ url: about.imageUrl || about.fallbackImageUrl, alt: about.mainHeading || "Anmol Madan", focal: "26% 40%" }]
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
	id="about"
	class="relative overflow-hidden bg-white dark:bg-black py-20 text-black dark:text-white lg:py-24"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<Reveal>
			<div
				class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-24"
			>
				<!-- LEFT — CONTENT -->
				<div class="relative z-10">
					<!-- Section Label -->
					<div class="flex items-center gap-3">
						<span class="h-px w-6 bg-zinc-400 dark:bg-neutral-600"></span>
						<p
							class="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400 dark:text-neutral-400"
						>
							{about.sectionHeading || "HOW I DO IT"}
						</p>
					</div>

					<!-- Main Heading -->
					<h2
						class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl"
					>
						{about.mainHeading || "More Than Just a Trainer."}
					</h2>

					<!-- Divider -->
					<div class="my-6 h-px w-16 bg-zinc-300 dark:bg-neutral-700"></div>

					<!-- Paragraphs -->
					<div class="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-neutral-400 sm:text-lg">
						{#if about.paragraph1}
							<p>{about.paragraph1}</p>
						{/if}
						{#if about.paragraph2}
							<p>{about.paragraph2}</p>
						{/if}
						{#if about.paragraph3}
							<p>{about.paragraph3}</p>
						{/if}
					</div>
				</div>

				<!-- RIGHT — AUTOSCROLL PHOTO CAROUSEL -->
				<div class="relative flex items-center justify-center">
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
						class="group relative z-10 w-full max-w-[560px] aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200/80 bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white/30 select-none"
					>
						{#each slides as slide, i}
							<div
								class="absolute inset-0 transition-all duration-700 ease-in-out {i === currentIndex
									? 'opacity-100 scale-100 pointer-events-auto z-10'
									: 'opacity-0 scale-105 pointer-events-none z-0'}"
							>
								<img
									src={slide.url}
									alt={slide.alt || "Anmol Madan"}
									class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									style="object-position: {slide.focal || 'center center'};"
								/>
							</div>
						{/each}

						<!-- Gradient overlay on bottom for indicators -->
						<div
							aria-hidden="true"
							class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-20"
						></div>

						<!-- Left / Right Nav Arrows (show on hover) -->
						{#if slides.length > 1}
							<button
								type="button"
								onclick={prevSlide}
								aria-label="Previous photo"
								class="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 cursor-pointer"
							>
								<ChevronLeft size={18} />
							</button>

							<button
								type="button"
								onclick={nextSlide}
								aria-label="Next photo"
								class="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 cursor-pointer"
							>
								<ChevronRight size={18} />
							</button>

							<!-- Dots / Progress Bars -->
							<div class="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
								{#each slides as _, i}
									<button
										type="button"
										onclick={() => goToSlide(i)}
										aria-label="Go to slide {i + 1}"
										class="h-1.5 rounded-full transition-all duration-300 cursor-pointer {i === currentIndex
											? 'w-6 bg-white shadow-sm'
											: 'w-1.5 bg-white/50 hover:bg-white/80'}"
									></button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Credentials Grid (Full width under photo & paragraph) -->
			<div class="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 pt-10 border-t border-zinc-200/80 dark:border-neutral-800">
				{#each about.credentials as cred}
					<div
						class="rounded-2xl border border-zinc-200/80 dark:border-neutral-800/80 bg-zinc-50/50 dark:bg-neutral-900/30 p-5 transition-all hover:border-black/30 dark:hover:border-white/30"
					>
						<div class="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
							{cred.title}
						</div>
						<div class="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-neutral-400">
							{cred.subtitle}
						</div>
					</div>
				{/each}
			</div>
		</Reveal>
	</div>
</section>
