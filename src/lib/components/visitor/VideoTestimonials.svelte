<script lang="ts">
	import type { TestimonialVideo } from "$lib/data/testimonials";
	import { extractYouTubeId, getEmbedUrl, getThumbnailUrl } from "$lib/data/testimonials";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { ChevronLeft, ChevronRight, Grid2x2, X, Play, Share2, Check, RotateCw } from "@lucide/svelte";

	interface Props {
		items: TestimonialVideo[];
	}

	let { items = [] }: Props = $props();

	let active = $state(0);
	let isPlaying = $state(false);
	let isModalOpen = $state(false);
	let copied = $state(false);

	let count = $derived(items.length);
	let centerIndex = $derived(count > 0 ? ((active % count) + count) % count : 0);
	let leftIndex = $derived(count > 0 ? (centerIndex - 1 + count) % count : 0);
	let rightIndex = $derived(count > 0 ? (centerIndex + 1) % count : 0);

	let centerItem = $derived(items[centerIndex]);
	let leftItem = $derived(items[leftIndex]);
	let rightItem = $derived(items[rightIndex]);

	let centerVideoId = $derived(extractYouTubeId(centerItem?.url || ""));
	let leftVideoId = $derived(extractYouTubeId(leftItem?.url || ""));
	let rightVideoId = $derived(extractYouTubeId(rightItem?.url || ""));

	function prev() {
		isPlaying = false;
		active -= 1;
	}

	function next() {
		isPlaying = false;
		active += 1;
	}

	function handleShare(e?: MouseEvent) {
		if (e) e.stopPropagation();
		const urlToShare = centerItem?.url || (typeof window !== "undefined" ? window.location.href : "");

		if (typeof navigator !== "undefined" && navigator.share) {
			navigator.share({
				title: "Anmol Madan — Student Reaction",
				url: urlToShare
			}).catch(() => {});
		} else if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(urlToShare);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}
</script>

{#if count > 0}
	<section
		id="testimonials"
		class="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-20 lg:py-24 text-black dark:text-white"
	>
		<div class="mx-auto max-w-[1440px] px-6 lg:px-10">
			<Reveal>
				<div class="w-full">
					<!-- HEADER & CONTROLS -->
					<div class="flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end">
						<div class="max-w-2xl">
							<!-- Eyebrow -->
							<div class="flex items-center gap-3">
								<span class="h-px w-8 bg-neutral-400 dark:bg-neutral-600"></span>
								<p
									class="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400"
								>
									Live Reactions
								</p>
								<span class="h-px w-8 bg-neutral-400 dark:bg-neutral-600"></span>
							</div>

							<!-- Heading -->
							<h3
								class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-[2.65rem] leading-[1.15]"
							>
								Hear from the{" "}
								<span class="font-light italic text-neutral-700 dark:text-neutral-300">
									students.
								</span>
							</h3>

							<p
								class="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl"
							>
								Real student reactions, genuine feedback, and live moments captured
								during interactive cybersecurity training sessions.
							</p>
						</div>

						<!-- Action Buttons & Navigation -->
						<div class="flex items-center gap-3 sm:self-end">
							<!-- Prev / Next controls -->
							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={prev}
									aria-label="Previous video"
									class="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm cursor-pointer"
								>
									<ChevronLeft size={18} />
								</button>

								<span
									class="px-2 text-xs font-semibold tabular-nums tracking-wider text-neutral-500 dark:text-neutral-400 font-mono"
								>
									{String(centerIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
								</span>

								<button
									type="button"
									onclick={next}
									aria-label="Next video"
									class="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm cursor-pointer"
								>
									<ChevronRight size={18} />
								</button>
							</div>

							<!-- View All Modal Button -->
							<button
								type="button"
								onclick={() => (isModalOpen = true)}
								class="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm cursor-pointer"
							>
								<Grid2x2 size={14} />
								<span class="hidden sm:inline">Archive</span>
							</button>
						</div>
					</div>

					<!-- PORTRAIT CAROUSEL -->
					<div class="relative mx-auto w-full py-4 overflow-hidden">
						<div class="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
							<!-- LEFT CARD -->
							<button
								type="button"
								onclick={prev}
								class="w-[200px] sm:w-[250px] lg:w-[280px] xl:w-[330px] 2xl:w-[360px] shrink-0 cursor-pointer group transition-all duration-500 text-left border-none bg-transparent p-0"
								aria-label="Previous testimonial"
							>
								<div
									class="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-md scale-[0.92] sm:scale-[0.94] opacity-50 group-hover:opacity-85 group-hover:scale-[0.96] transition-all duration-500"
								>
									<img
										src={getThumbnailUrl(leftVideoId)}
										alt={leftItem?.caption || `Reaction ${leftIndex + 1}`}
										class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

									<!-- Play Badge on Hover -->
									<div
										class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<div
											class="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg"
										>
											<Play size={16} fill="currentColor" class="ml-0.5" />
										</div>
									</div>

									<div
										class="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-white text-[11px] font-medium backdrop-blur-md"
									>
										<span>#{leftIndex + 1}</span>
									</div>
								</div>
							</button>

							<!-- MIDDLE CARD (IN FOCUS) -->
							<div class="w-[260px] sm:w-[320px] lg:w-[350px] xl:w-[410px] 2xl:w-[450px] shrink-0 z-10">
								<div
									class="group relative aspect-[9/16] w-full overflow-hidden rounded-[26px] border-2 border-black dark:border-white bg-neutral-950 shadow-[0_25px_60px_rgba(0,0,0,0.22)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] ring-4 ring-black/5 dark:ring-white/10 scale-100 transition-all duration-500"
								>
									{#if isPlaying}
										<iframe
											src={getEmbedUrl(centerVideoId, true)}
											title={centerItem?.caption || `Student Reaction #${centerIndex + 1}`}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowfullscreen
											class="absolute inset-0 h-full w-full border-none"
										></iframe>
									{:else}
										<button
											type="button"
											onclick={() => (isPlaying = true)}
											class="relative h-full w-full cursor-pointer overflow-hidden bg-neutral-900 border-none p-0 text-left"
											aria-label="Play testimonial video"
										>
											<img
												src={getThumbnailUrl(centerVideoId)}
												alt={centerItem?.caption || `Video Testimonial ${centerIndex + 1}`}
												class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
											/>

											<!-- Dark Gradient Overlay -->
											<div
												class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30"
											></div>

											<!-- Play Button Overlay -->
											<div class="absolute inset-0 flex items-center justify-center">
												<div
													class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
												>
													<Play size={24} fill="currentColor" class="ml-1" />
												</div>
											</div>

											{#if centerItem?.caption}
												<div class="absolute bottom-16 left-4 right-4 text-left">
													<p class="text-sm font-medium text-white line-clamp-2 drop-shadow-md">
														{centerItem.caption}
													</p>
												</div>
											{/if}
										</button>
									{/if}

									<!-- Bottom-left Number Pill -->
									<div
										class="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3.5 py-1.5 text-white shadow-md backdrop-blur-md"
									>
										<div
											class="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold"
										>
											{centerIndex + 1}
										</div>
										<span class="text-xs font-medium tracking-wide">
											Reaction #{centerIndex + 1}
										</span>
									</div>

									<!-- Bottom-right Controls -->
									<div class="absolute bottom-4 right-4 z-10 flex items-center gap-2">
										{#if isPlaying}
											<button
												type="button"
												onclick={(e) => {
													e.stopPropagation();
													isPlaying = false;
												}}
												title="Stop playback"
												class="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer"
											>
												<RotateCw size={13} />
											</button>
										{/if}
										<button
											type="button"
											onclick={handleShare}
											aria-label="Share video"
											title="Share video"
											class="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer"
										>
											{#if copied}
												<Check size={14} class="text-emerald-400" />
											{:else}
												<Share2 size={13} />
											{/if}
										</button>
									</div>
								</div>
							</div>

							<!-- RIGHT CARD -->
							<button
								type="button"
								onclick={next}
								class="w-[200px] sm:w-[250px] lg:w-[280px] xl:w-[330px] 2xl:w-[360px] shrink-0 cursor-pointer group transition-all duration-500 text-left border-none bg-transparent p-0"
								aria-label="Next testimonial"
							>
								<div
									class="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-md scale-[0.92] sm:scale-[0.94] opacity-50 group-hover:opacity-85 group-hover:scale-[0.96] transition-all duration-500"
								>
									<img
										src={getThumbnailUrl(rightVideoId)}
										alt={rightItem?.caption || `Reaction ${rightIndex + 1}`}
										class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

									<!-- Play Badge on Hover -->
									<div
										class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<div
											class="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg"
										>
											<Play size={16} fill="currentColor" class="ml-0.5" />
										</div>
									</div>

									<div
										class="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-white text-[11px] font-medium backdrop-blur-md"
									>
										<span>#{rightIndex + 1}</span>
									</div>
								</div>
							</button>
						</div>

						<!-- Indicator dots -->
						<div class="mt-8 flex items-center justify-center gap-2">
							{#each items as _, i}
								<button
									type="button"
									onclick={() => {
										isPlaying = false;
										active = i;
									}}
									aria-label="Go to video {i + 1}"
									class="h-2 rounded-full transition-all duration-300 cursor-pointer {i === centerIndex
										? 'w-8 bg-black dark:bg-white'
										: 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500'}"
								></button>
							{/each}
						</div>
					</div>

					<!-- ARCHIVE MODAL -->
					{#if isModalOpen}
						<div
							class="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
							onclick={() => (isModalOpen = false)}
							onkeydown={(e) => {
								if (e.key === 'Escape') isModalOpen = false;
							}}
							role="dialog"
							aria-modal="true"
							tabindex="-1"
						>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<div
								class="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-2xl sm:p-8"
								onclick={(e) => e.stopPropagation()}
								role="document"
							>
								<!-- Modal Header -->
								<div
									class="mb-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4"
								>
									<div>
										<p
											class="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500"
										>
											Video Showcase
										</p>
										<h3 class="mt-1 text-2xl font-bold text-black dark:text-white">
											All Reactions ({count})
										</h3>
									</div>

									<button
										type="button"
										onclick={() => (isModalOpen = false)}
										class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
										aria-label="Close archive"
									>
										<X size={16} />
									</button>
								</div>

								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
									{#each items as item, idx}
										{@const vId = extractYouTubeId(item.url)}
										{@const isCurrent = idx === centerIndex}
										<button
											type="button"
											onclick={() => {
												isPlaying = false;
												active = idx;
												isModalOpen = false;
											}}
											class="group relative aspect-[9/16] overflow-hidden rounded-[16px] bg-neutral-900 shadow-sm ring-2 transition-all hover:scale-[1.02] cursor-pointer {isCurrent
												? 'ring-black dark:ring-white'
												: 'ring-transparent hover:ring-neutral-400'}"
										>
											<img
												src={getThumbnailUrl(vId)}
												alt={item.caption || `Video ${idx + 1}`}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div
												class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
											></div>
											<div
												class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
											>
												<div
													class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md"
												>
													<Play size={16} fill="currentColor" class="ml-0.5" />
												</div>
											</div>
											<div
												class="absolute top-2.5 left-2.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white"
											>
												#{idx + 1}
											</div>
										</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</Reveal>
		</div>
	</section>
{/if}
