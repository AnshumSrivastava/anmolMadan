<script lang="ts">
	import { onMount } from "svelte";
	import { X, Calendar, Clock, ExternalLink } from "@lucide/svelte";

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		requestedService?: string | null;
	}

	let { isOpen, onClose, requestedService = null }: Props = $props();

	type EventType = "15" | "30";

	const EVENTS = {
		"15": {
			title: "15 Min Consultation",
			shortTitle: "15 Min",
			description: "Quick introduction & preliminary inquiry",
			url: "https://cal.com/anmolmadan/15min"
		},
		"30": {
			title: "30 Min In-Depth Meeting",
			shortTitle: "30 Min",
			description: "Detailed workshop, session, or keynote planning",
			url: "https://cal.com/anmolmadan/30min"
		}
	} as const;

	let selectedEvent: EventType = $state("15");
	let isDark = $state(false);

	$effect(() => {
		if (isOpen) {
			if (requestedService) {
				selectedEvent = "30";
			} else {
				selectedEvent = "15";
			}
			isDark = document.documentElement.classList.contains("dark");
			const prevOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			function handleKeyDown(e: KeyboardEvent) {
				if (e.key === "Escape") {
					handleClose();
				}
			}

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				document.body.style.overflow = prevOverflow;
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
	});

	function handleClose() {
		onClose();
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
		onclick={handleClose}
		onkeydown={(e) => {
			if (e.key === 'Escape') handleClose();
		}}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="relative flex flex-col w-full max-w-[1040px] h-[92vh] max-h-[820px] overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl transition-all duration-300"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Top Bar: Website Logo, Duration Switcher, Close Button -->
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 px-4 sm:px-6 py-3 sm:py-3.5 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm"
			>
				<!-- Left: Official Website Logo + Branding -->
				<div class="flex items-center gap-3">
					<img
						src="/anmol_logo.png"
						alt="Anmol Madan"
						class="h-7 sm:h-8 w-auto grayscale contrast-125 dark:invert dark:grayscale transition-opacity"
					/>
					<div class="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
					<div>
						<h3 class="text-xs sm:text-sm font-bold text-black dark:text-white leading-tight flex items-center gap-2">
							<span>Book a Call</span>
							{#if requestedService}
								<span class="hidden md:inline-block rounded-full bg-neutral-200/80 dark:bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
									{requestedService}
								</span>
							{/if}
						</h3>
						<p class="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 hidden xs:block">
							{EVENTS[selectedEvent].description}
						</p>
					</div>
				</div>

				<!-- Right Area: Duration Segmented Control + Close -->
				<div class="flex items-center gap-2.5">
					<!-- Segmented Duration Toggle -->
					<div
						class="flex items-center rounded-full bg-neutral-200/70 dark:bg-neutral-850 p-1 border border-neutral-300/40 dark:border-neutral-700/50 shadow-inner"
					>
						<button
							type="button"
							onclick={() => (selectedEvent = "15")}
							class="rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer {selectedEvent === '15'
								? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
								: 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'}"
						>
							<span class="hidden sm:inline">15 Min Consultation</span>
							<span class="sm:hidden">15 Min</span>
						</button>
						<button
							type="button"
							onclick={() => (selectedEvent = "30")}
							class="rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer {selectedEvent === '30'
								? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
								: 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'}"
						>
							<span class="hidden sm:inline">30 Min In-Depth</span>
							<span class="sm:hidden">30 Min</span>
						</button>
					</div>

					<!-- Direct Cal.com Link -->
					<a
						href={EVENTS[selectedEvent].url}
						target="_blank"
						rel="noopener noreferrer"
						title="Open scheduler in new tab"
						aria-label="Open in new tab"
						class="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-colors"
					>
						<ExternalLink size={14} />
					</a>

					<!-- Close Button -->
					<button
						type="button"
						onclick={handleClose}
						class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
						aria-label="Close modal"
					>
						<X size={15} />
					</button>
				</div>
			</div>

			<!-- Body: Spacious Cal.com embed with no squishing -->
			<div class="flex-1 w-full h-full min-h-0 bg-neutral-50/50 dark:bg-neutral-900/40 relative">
				{#key selectedEvent}
					<iframe
						src="{EVENTS[selectedEvent].url}?embed=1&theme={isDark ? 'dark' : 'light'}"
						title="Schedule with Anmol Madan"
						class="w-full h-full border-none"
						allow="camera; microphone; autoplay; fullscreen"
					></iframe>
				{/key}
			</div>
		</div>
	</div>
{/if}
