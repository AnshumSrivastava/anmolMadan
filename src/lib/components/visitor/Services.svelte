<script lang="ts">
	import type { ServicesSectionData } from "$lib/data/services";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { ArrowRight, Check } from "@lucide/svelte";

	interface Props {
		services: ServicesSectionData;
		onRequestService: (serviceTitle: string) => void;
	}

	let { services, onRequestService }: Props = $props();

	let sortedItems = $derived(
		(services.items || [])
			.filter((it) => it.isActive)
			.sort((a, b) => a.displayOrder - b.displayOrder)
	);
</script>

<section
	id="services"
	class="relative overflow-hidden bg-[#fafafa] py-20 text-black dark:bg-neutral-950 dark:text-white lg:py-24"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- HEADER -->
		<Reveal>
			<div class="max-w-3xl">
				<div class="flex items-center gap-3">
					<span class="h-px w-6 bg-neutral-400 dark:bg-neutral-600"></span>
					<p
						class="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400"
					>
						{services.sectionHeading || "WAYS WE CAN WORK TOGETHER"}
					</p>
				</div>

				<h2
					class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl"
				>
					{services.mainHeading || "Ways We Can Work Together"}
				</h2>

				<p class="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
					{services.description}
				</p>
			</div>
		</Reveal>

		<!-- GRID OF CARDS -->
		<div class="mt-12 lg:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each sortedItems as item, index}
				<Reveal delay={index * 0.08} className="h-full">
					<article
						class="group relative flex h-full min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] border border-neutral-200/90 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-500 sm:p-10"
					>
						<div>
							<!-- NUMBER & BADGE -->
							<div class="flex items-center justify-between">
								<span
									class="font-mono text-xs font-semibold tracking-widest text-neutral-400 dark:text-neutral-500"
								>
									{String(index + 1).padStart(2, "0")}
								</span>

								{#if item.badge}
									<span
										class="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
									>
										{item.badge}
									</span>
								{/if}
							</div>

							<!-- TITLE -->
							<h3
								class="mt-6 min-h-[72px] text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl"
							>
								{item.title}
							</h3>

							<!-- DESCRIPTION -->
							<p
								class="mt-4 min-h-[84px] text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
							>
								{item.description}
							</p>

							<!-- DIVIDER -->
							<div class="my-7 h-px bg-neutral-100 dark:bg-neutral-800"></div>

							<!-- POINTS -->
							<div class="min-h-[120px] space-y-3.5">
								{#each item.points as point}
									<div class="flex items-start gap-3">
										<div
											class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
										>
											<Check class="h-3 w-3" />
										</div>
										<p
											class="text-xs leading-snug text-neutral-700 dark:text-neutral-300 sm:text-sm"
										>
											{point}
										</p>
									</div>
								{/each}
							</div>
						</div>

						<!-- ACTION BUTTON -->
						<button
							type="button"
							onclick={() => onRequestService(item.title)}
							class="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black transition-all group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300 sm:text-sm cursor-pointer"
						>
							<span>{item.buttonText || "Let's Talk"}</span>
							<ArrowRight
								class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
							/>
						</button>
					</article>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
