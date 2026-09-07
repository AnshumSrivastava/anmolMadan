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
						<span class="h-px w-6 bg-neutral-400"></span>
						<p
							class="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400"
						>
							Experience & Impact
						</p>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<h2
						class="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-black dark:text-white sm:text-5xl lg:text-6xl"
					>
						Work that made an impact.
					</h2>
				</Reveal>
			</div>

			<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
				{#each experiences as exp, index}
					<Reveal delay={0.1 + index * 0.08} className="h-full">
						<article
							class="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm"
						>
							<h3 class="text-2xl font-bold text-black dark:text-white">
								{exp.lessonTitle}
							</h3>
							<p class="mt-2 text-sm text-neutral-500">
								{exp.institutionName} · {exp.duration}
							</p>
							<p class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
								{exp.description}
							</p>
						</article>
					</Reveal>
				{/each}
			</div>
		</div>
	</section>
{/if}
