<script lang="ts">
	import type { AboutData } from "$lib/data/about";
	import Reveal from "$lib/components/shared/Reveal.svelte";

	interface Props {
		about: AboutData;
	}

	let { about }: Props = $props();

	let hasError = $state(false);
	let currentImg = $derived(hasError ? about.fallbackImageUrl : about.imageUrl);

	function handleError() {
		hasError = true;
	}
</script>

<section
	id="about"
	class="relative overflow-hidden bg-white dark:bg-black py-20 text-black dark:text-white lg:py-24"
>
	<div class="mx-auto max-w-[1400px] px-6 lg:px-8">
		<Reveal>
			<div
				class="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
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

					<!-- Ref 24: Removed unnecessary boxed containers, replacing with clean stats strip -->
					<div class="mt-8 grid grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-zinc-200 dark:border-neutral-800">
						{#each about.credentials as cred}
							<div class="flex flex-col">
								<div class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
									{cred.title}
								</div>
								<div class="mt-1 text-sm text-zinc-500 dark:text-neutral-400 font-medium">
									{cred.subtitle}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- RIGHT — PHOTO (FULL COVER, MATCHING HEIGHT) -->
				<div class="relative flex flex-col h-full min-h-[380px] lg:min-h-0">
					<!-- Ambient Glow -->
					<div
						aria-hidden="true"
						class="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.03] blur-[90px] dark:bg-white/[0.02]"
					></div>

					<div
						class="group relative z-10 flex h-full w-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white/30"
					>
						<img
							src={currentImg}
							alt={about.mainHeading || "Anmol Madan"}
							onerror={handleError}
							class="h-full w-full object-cover object-[28%_35%] transition-transform duration-700 ease-out group-hover:scale-105"
						/>
					</div>
				</div>
			</div>
		</Reveal>
	</div>
</section>
