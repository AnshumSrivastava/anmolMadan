<script lang="ts">
	import type { NoteData } from "$lib/data/note";
	import Reveal from "$lib/components/shared/Reveal.svelte";
	import { Quote } from "@lucide/svelte";

	interface Props {
		note: NoteData;
	}

	let { note }: Props = $props();
</script>

{#if note && note.isVisible}
	<section
		id="note"
		class="relative overflow-hidden bg-white dark:bg-black py-20 lg:py-24 text-black dark:text-white"
	>
		<div class="mx-auto max-w-[1400px] px-6 lg:px-8">
			<Reveal>
				<!-- DESKTOP VERSION (Dog-Ear Paper Card) -->
				<div
					class="hidden lg:block group relative overflow-hidden rounded-tl-[36px] rounded-bl-[36px] rounded-br-[36px] rounded-tr-none bg-[#fbf9f5] dark:bg-[#111110] p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
				>
					<!-- Top-Right Paper Dog-Ear Fold -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute top-0 right-0 z-20 h-[80px] w-[80px]"
					>
						<svg viewBox="0 0 80 80" class="h-full w-full overflow-visible">
							<defs>
								<!-- Fold paper gradient - light mode -->
								<linearGradient id="noteFoldGradLight" x1="100%" y1="0%" x2="25%" y2="75%">
									<stop offset="0%" stop-color="#ded5c4" />
									<stop offset="35%" stop-color="#e9e1d2" />
									<stop offset="100%" stop-color="#f7f2e8" />
								</linearGradient>

								<!-- Fold paper gradient - dark mode -->
								<linearGradient id="noteFoldGradDark" x1="100%" y1="0%" x2="25%" y2="75%">
									<stop offset="0%" stop-color="#181816" />
									<stop offset="40%" stop-color="#242421" />
									<stop offset="100%" stop-color="#30302b" />
								</linearGradient>

								<!-- Shadow filters -->
								<filter id="noteFoldShadowLight" x="-40%" y="-20%" width="170%" height="170%">
									<feDropShadow
										dx="-3"
										dy="4"
										stdDeviation="4.5"
										flood-color="#000000"
										flood-opacity="0.12"
									/>
								</filter>
								<filter id="noteFoldShadowDark" x="-40%" y="-20%" width="170%" height="170%">
									<feDropShadow
										dx="-4"
										dy="5"
										stdDeviation="5.5"
										flood-color="#000000"
										flood-opacity="0.75"
									/>
								</filter>
							</defs>

							<!-- Missing paper corner cut (matches background behind card) -->
							<polygon points="0,0 80,0 80,80" class="fill-white dark:fill-black" />

							<!-- Folded paper flap -->
							<g
								class="transition-transform duration-300 ease-out group-hover:scale-[1.02] origin-top-right"
							>
								<path
									d="M 0 0 L 0 70 Q 0 80 10 80 L 80 80 Z"
									class="block dark:hidden fill-[url(#noteFoldGradLight)] stroke-black/5"
									stroke-width="0.5"
									filter="url(#noteFoldShadowLight)"
								/>
								<path
									d="M 0 0 L 0 70 Q 0 80 10 80 L 80 80 Z"
									class="hidden dark:block fill-[url(#noteFoldGradDark)] stroke-white/10"
									stroke-width="0.5"
									filter="url(#noteFoldShadowDark)"
								/>
								<!-- Catch-light line -->
								<line
									x1="0"
									y1="0"
									x2="80"
									y2="80"
									class="stroke-white/50 dark:stroke-white/10"
									stroke-width="0.75"
								/>
							</g>
						</svg>
					</div>

					<!-- Soft ambient accent -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/[0.04] dark:bg-amber-400/[0.03] blur-[80px]"
					></div>

					<!-- Eyebrow and Quote Icon -->
					<div
						class="flex items-center justify-between gap-4 border-b border-neutral-200/80 dark:border-neutral-800 pb-8"
					>
						<div class="flex items-center gap-3">
							<span class="section-mini-line"></span>
							<p
								class="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400"
							>
								{note.eyebrow || "Personal Philosophy"}
							</p>
						</div>

						<div
							class="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 shadow-sm mr-16"
						>
							<Quote class="h-5 w-5 rotate-180" />
						</div>
					</div>

					<!-- 2-COLUMN LAYOUT ON LARGE SCREENS -->
					<div class="grid grid-cols-[1.25fr_0.75fr] gap-14 xl:gap-16 items-stretch mt-8">
						<!-- LEFT COLUMN: Heading, Quote, Paragraphs -->
						<div class="flex flex-col justify-between">
							<div>
								<h2
									class="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl"
								>
									{note.heading || "A Note From Me to You"}
								</h2>

								{#if note.quote}
									<blockquote
										class="mt-8 rounded-2xl border-l-2 border-neutral-900 dark:border-neutral-100 bg-black/[0.02] dark:bg-white/[0.02] py-4 pl-6 pr-4 text-lg font-medium italic text-neutral-800 dark:text-neutral-200 sm:text-xl leading-relaxed"
									>
										&ldquo;{note.quote}&rdquo;
									</blockquote>
								{/if}

								<div
									class="mt-8 space-y-5 text-base sm:text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300 body-copy"
								>
									{#each note.paragraphs as p}
										<p>{p}</p>
									{/each}
								</div>
							</div>
						</div>

						<!-- RIGHT COLUMN: Desktop Author & Guiding Principle Card -->
						<div
							class="flex flex-col justify-between rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 p-8 xl:p-10 relative overflow-hidden backdrop-blur-sm shadow-sm"
						>
							<div
								aria-hidden="true"
								class="absolute -bottom-8 -right-4 text-[200px] font-serif font-black leading-none text-neutral-950/[0.04] dark:text-white/[0.03] select-none pointer-events-none"
							>
								&rdquo;
							</div>

							<div class="relative z-10 space-y-5">
								<div
									class="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
									Guiding Principle
								</div>

								<p class="text-xl xl:text-2xl font-bold text-black dark:text-white leading-snug tracking-tight">
									"Security is not a one-time setup: it is a continuous, empowering culture."
								</p>

								<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
									Every session, keynote, and workshop is crafted to turn complex security concepts into memorable, instinctual habits that protect individuals and organizations.
								</p>
							</div>

							<div class="relative z-10 pt-8 border-t border-neutral-200/80 dark:border-neutral-800 mt-8">
								<h3 class="text-2xl font-bold text-black dark:text-white tracking-tight">
									{note.authorName || "Anmol Madan"}
								</h3>
								<p
									class="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mt-1.5"
								>
									{note.authorTitle || "Cybersecurity Specialist & Motivational Speaker"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- MOBILE VERSION (Clean Minimal Note) -->
				<div class="block lg:hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-sm">
					<div class="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-3">
						<span class="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
							{note.eyebrow || "Personal Note"}
						</span>
					</div>

					<h2 class="mt-4 text-xl font-bold text-black dark:text-white tracking-tight leading-snug">
						{note.heading || "A Note From Me to You"}
					</h2>

					{#if note.quote}
						<div class="my-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 p-3.5">
							<p class="text-xs italic leading-relaxed text-neutral-700 dark:text-neutral-300">
								&ldquo;{note.quote}&rdquo;
							</p>
						</div>
					{/if}

					<div class="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
						{#each note.paragraphs as p}
							<p>{p}</p>
						{/each}
					</div>

					<!-- Signature Block -->
					<div class="mt-5 border-t border-neutral-200/80 dark:border-neutral-800 pt-4 flex items-center justify-between">
						<div>
							<p class="text-sm font-bold text-black dark:text-white">
								{note.authorName || "Anmol Madan"}
							</p>
							<p class="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-0.5">
								{note.authorTitle || "Cybersecurity Specialist & Speaker"}
							</p>
						</div>
					</div>
				</div>
			</Reveal>
		</div>
	</section>
{/if}
