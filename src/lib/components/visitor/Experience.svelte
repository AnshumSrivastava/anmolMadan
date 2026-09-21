<script lang="ts">
	import type { ExperienceItem } from "$lib/data/experience";
	import Reveal from "$lib/components/shared/Reveal.svelte";

	interface Props {
		experiences: ExperienceItem[];
	}

	let { experiences = [] }: Props = $props();
</script>

{#if experiences && experiences.length > 0}
	<section
		id="experience"
		class="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-20 text-black dark:text-white lg:py-24"
	>
		<div class="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
			<div class="mb-16 max-w-3xl">
				<Reveal>
					<div class="flex items-center gap-3">
						<span class="section-mini-line"></span>
						<p
							class="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400"
						>
							Experience & Impact
						</p>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<h2
						class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl leading-tight"
					>
						Work that made an impact.
					</h2>

					<div class="my-6 h-[1.5px] w-16 bg-zinc-400 dark:bg-neutral-500"></div>
				</Reveal>
			</div>

			<!-- DESKTOP GRID -->
			<div class="hidden md:grid gap-8 md:grid-cols-2 xl:grid-cols-3">
				{#each experiences as exp, index}
					<Reveal delay={0.1 + index * 0.08} className="h-full">
						<article
							class="flex flex-col justify-between h-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 lg:p-10 shadow-sm transition-all hover:border-black/30 dark:hover:border-white/30"
						>
							<div>
								<h3 class="text-2xl font-bold text-black dark:text-white">
									{exp.lessonTitle}
								</h3>
								<p class="mt-2 text-sm text-neutral-500">
									{exp.institutionName} · {exp.duration}
								</p>
								<p class="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 body-copy">
									{exp.description}
								</p>
							</div>
						</article>
					</Reveal>
				{/each}
			</div>

			<!-- MOBILE TIMELINE RAIL -->
			<div class="relative pl-6 md:hidden">
				<!-- Vertical timeline line -->
				<div class="absolute left-2.5 top-3 bottom-3 w-px bg-neutral-300 dark:bg-neutral-800"></div>

				<div class="space-y-6">
					{#each experiences as exp, index}
						<div class="relative group">
							<!-- Timeline dot -->
							<div class="absolute -left-6 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-black border-2 border-black dark:border-white">
								<div class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"></div>
							</div>

							<div class="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 shadow-sm">
								<span class="inline-block rounded-md bg-neutral-200/60 dark:bg-neutral-800 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-mono">
									{exp.duration}
								</span>

								<h3 class="mt-2 text-sm font-bold text-black dark:text-white tracking-tight leading-snug">
									{exp.lessonTitle}
								</h3>

								<p class="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
									{exp.institutionName}
								</p>

								<p class="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
									{exp.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}
