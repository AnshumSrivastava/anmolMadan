<script lang="ts">
	import type { VisionData } from "$lib/data/vision";
	import Reveal from "$lib/components/shared/Reveal.svelte";

	interface Props {
		vision: VisionData;
	}

	let { vision }: Props = $props();

	let hasError = $state(false);
	let currentImg = $derived(hasError ? vision.fallbackImageUrl : vision.imageUrl);

	function handleError() {
		hasError = true;
	}
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

			<!-- RIGHT — IMAGE -->
			<div class="order-1 lg:order-2 flex justify-center items-center">
				<div class="relative w-full max-w-[560px] aspect-[16/9] rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-black/30 dark:hover:border-white/30">
					<div
						aria-hidden="true"
						class="absolute inset-0 bg-radial from-neutral-200/40 dark:from-white/5 to-transparent blur-2xl"
					></div>
					<img
						src={currentImg}
						alt={vision.mainHeading || "Vision"}
						onerror={handleError}
						class="h-full w-full object-cover object-[50%_25%] transition-transform duration-700 ease-out hover:scale-105"
					/>
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
