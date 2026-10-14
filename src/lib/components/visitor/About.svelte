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
			: [
					{
						url: about.imageUrl || about.fallbackImageUrl,
						alt: about.mainHeading || "About",
						focal: "28% 35%"
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
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<section
	id="about"
	class="relative overflow-hidden bg-white dark:bg-black py-20 text-black dark:text-white lg:py-24"
>
	<div class="mx-auto max-w-[1400px] px-6 lg:px-8">
		<Reveal>
			<!-- DESKTOP VERSION (Identical to original) -->
			<div
				class="hidden lg:grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
			>
				<!-- LEFT — CONTENT (TEXT + 4 BLOCKS) -->
				<div class="relative z-10 flex flex-col justify-between">
					<div>
						<!-- Section Label with standardized G4 mini-line -->
						<div class="flex items-center gap-3">
							<span class="section-mini-line"></span>
							<p
								class="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400 dark:text-neutral-500"
							>
								{about.sectionHeading || "HOW I DO IT"}
							</p>
						</div>

						<!-- Main Heading -->
						<h2
							class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl leading-tight"
						>
							{about.mainHeading || "More Than Just a Trainer."}
						</h2>

						<!-- Divider Line (Ref 12: identical color as mini-heading line, no visible break) -->
						<div class="my-6 h-[1.5px] w-16 bg-zinc-400 dark:bg-neutral-500"></div>

						<!-- Paragraphs with Justified Alignment (G9) & Standardized Size (G3) -->
						<div class="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-neutral-400 sm:text-[17px] body-copy">
							{#if about.paragraph1}
								<p>{about.paragraph1.replace(/—/g, ', ')}</p>
							{/if}
							{#if about.paragraph2}
								<p>{about.paragraph2.replace(/—/g, ', ')}</p>
							{/if}
							{#if about.paragraph3}
								<p>{about.paragraph3.replace(/—/g, ', ')}</p>
							{/if}
						</div>
					</div>

					<!-- Credentials Grid (4 BLOCKS) -->
					<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-5 pt-6 border-t border-zinc-200/80 dark:border-neutral-800">
						{#each about.credentials as cred}
							<div
								class="rounded-2xl border border-zinc-200/80 dark:border-neutral-800/80 bg-zinc-50/50 dark:bg-neutral-900/30 p-4 sm:p-5 transition-all hover:border-black/30 dark:hover:border-white/30"
							>
								<div class="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
									{cred.title}
								</div>
								<div class="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-neutral-400 font-medium">
									{cred.subtitle}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- RIGHT — 3-PHOTO CAROUSEL (3s AUTOSCROLL, INNER ZOOM ON HOVER, STABLE BORDER) -->
				<div class="relative flex flex-col h-full min-h-[420px] lg:min-h-0">
					<!-- Ambient Glow -->
					<div
						aria-hidden="true"
						class="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.03] blur-[90px] dark:bg-white/[0.02]"
					></div>

					<!-- Carousel Frame (No border scaling or translation, pure inner zoom) -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						onmouseenter={() => (isPaused = true)}
						onmouseleave={() => (isPaused = false)}
						class="group relative z-10 flex h-full w-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900 select-none"
					>
						{#each slides as slide, i}
							<div
								class="absolute inset-0 transition-opacity duration-700 ease-in-out {i === currentIndex
									? 'opacity-100 pointer-events-auto z-10'
									: 'opacity-0 pointer-events-none z-0'}"
							>
								<img
									src={slide.url}
									alt={slide.alt || "Anmol Madan"}
									class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
									style="object-position: {slide.focal || 'center center'};"
								/>
							</div>
						{/each}

						<!-- Gradient overlay at bottom for depth & dot contrast -->
						<div
							class="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"
						></div>

						<!-- Navigation Arrows (visible on hover) -->
						{#if slides.length > 1}
							<button
								type="button"
								onclick={prevSlide}
								aria-label="Previous slide"
								class="absolute left-3.5 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-all hover:bg-black/75 group-hover:opacity-100 cursor-pointer"
							>
								<ChevronLeft size={18} />
							</button>
							<button
								type="button"
								onclick={nextSlide}
								aria-label="Next slide"
								class="absolute right-3.5 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-all hover:bg-black/75 group-hover:opacity-100 cursor-pointer"
							>
								<ChevronRight size={18} />
							</button>

							<!-- Indicator Dots -->
							<div
								class="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5"
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

			<!-- MOBILE VERSION -->
			<div class="flex flex-col lg:hidden space-y-6">
				<div>
					<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
						{about.sectionHeading || "HOW I DO IT"}
					</p>
					<h2 class="mt-2 text-2xl font-bold tracking-tight text-black dark:text-white leading-tight">
						{about.mainHeading || "More Than Just a Trainer."}
					</h2>
				</div>

				<!-- Mobile Carousel Card (3s auto-scroll) -->
				<div class="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
					{#each slides as slide, i}
						<div
							class="absolute inset-0 transition-opacity duration-700 ease-in-out {i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
						>
							<img
								src={slide.url}
								alt={slide.alt || "Anmol Madan"}
								class="h-full w-full object-cover"
								style="object-position: {slide.focal || 'center center'};"
							/>
						</div>
					{/each}
					<div class="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
					{#if slides.length > 1}
						<div class="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
							{#each slides as _, idx}
								<button
									type="button"
									onclick={() => goToSlide(idx)}
									class="h-1 rounded-full transition-all duration-300 {idx === currentIndex ? 'w-5 bg-white' : 'w-1 bg-white/50'}"
									aria-label="Go to slide {idx + 1}"
								></button>
							{/each}
						</div>
					{/if}
				</div>

				<div class="space-y-4 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
					{#if about.paragraph1}
						<p>{about.paragraph1.replace(/—/g, ', ')}</p>
					{/if}
					{#if about.paragraph2}
						<p>{about.paragraph2.replace(/—/g, ', ')}</p>
					{/if}
					{#if about.paragraph3}
						<p>{about.paragraph3.replace(/—/g, ', ')}</p>
					{/if}
				</div>

				<!-- Credentials -->
				<div class="-mx-6">
					<div
						class="flex gap-2.5 overflow-x-auto px-6 pb-2 scrollbar-none"
						style="scrollbar-width: none; -webkit-overflow-scrolling: touch;"
					>
						{#each about.credentials as cred}
							<div class="shrink-0 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 px-3.5 min-w-[120px]">
								<div class="text-lg font-bold text-black dark:text-white tracking-tight">
									{cred.title}
								</div>
								<div class="mt-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
									{cred.subtitle}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</Reveal>
	</div>
</section>
