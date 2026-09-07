<script lang="ts">
	import type { AudienceItem } from "$lib/data/about";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { Building2, GraduationCap, Users } from "@lucide/svelte";

	interface Props {
		audience: AudienceItem[];
	}

	let { audience }: Props = $props();
</script>

<section
	id="audience"
	class="relative overflow-hidden bg-white dark:bg-black py-20 lg:py-24 text-black dark:text-white"
>
	<div class="mx-auto max-w-[1400px] px-6 lg:px-8 space-y-12">
		<Reveal>
			<div class="text-center">
				<!-- SECTION LABEL -->
				<div class="flex items-center justify-center gap-3">
					<span class="h-px w-6 bg-zinc-400 dark:bg-neutral-600"></span>
					<p
						class="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400 dark:text-neutral-400"
					>
						Who I Work With
					</p>
					<span class="h-px w-6 bg-zinc-400 dark:bg-neutral-600"></span>
				</div>

				<!-- MAIN HEADING -->
				<h2
					class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl"
				>
					Helping People Across Industries
				</h2>

				<!-- HEADING DIVIDER -->
				<div class="mx-auto mt-4 h-px w-16 bg-zinc-300 dark:bg-neutral-700"></div>
			</div>
		</Reveal>

		<!-- AUDIENCE CARDS -->
		<div class="grid gap-6 lg:gap-8 lg:grid-cols-3">
			{#each audience as item, index}
				<Reveal delay={index * 0.1} className="h-full">
					<div
						class="group flex flex-col justify-between h-full rounded-3xl border border-zinc-200 bg-white p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-500"
					>
						<!-- ICON BADGE -->
						<div
							class="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-500 group-hover:scale-110 group-hover:border-black group-hover:bg-black dark:border-neutral-800 dark:bg-neutral-800 dark:group-hover:border-white dark:group-hover:bg-white"
						>
							{#if item.iconName === "Building2"}
								<Building2
									class="h-6 w-6 text-zinc-700 transition-colors duration-500 group-hover:text-white dark:text-neutral-300 dark:group-hover:text-black"
								/>
							{:else if item.iconName === "GraduationCap"}
								<GraduationCap
									class="h-6 w-6 text-zinc-700 transition-colors duration-500 group-hover:text-white dark:text-neutral-300 dark:group-hover:text-black"
								/>
							{:else}
								<Users
									class="h-6 w-6 text-zinc-700 transition-colors duration-500 group-hover:text-white dark:text-neutral-300 dark:group-hover:text-black"
								/>
							{/if}
						</div>

						<!-- CARD TITLE -->
						<h3 class="text-2xl font-bold text-black dark:text-white">
							{item.title}
						</h3>

						<!-- CARD DIVIDER -->
						<div
							class="my-5 h-px w-12 bg-zinc-300 transition-all duration-500 group-hover:w-20 group-hover:bg-black dark:bg-neutral-700 dark:group-hover:bg-white"
						></div>

						<!-- CARD DESCRIPTION -->
						<p class="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-neutral-400">
							{item.description}
						</p>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
