<script lang="ts">
	import { onMount } from "svelte";
	import { X, ArrowLeft } from "@lucide/svelte";

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	type EventType = "15" | "30";

	const EVENTS = {
		"15": {
			title: "15 min meeting",
			description: "Quick consultation",
			url: "https://cal.com/anmolmadan/15min"
		},
		"30": {
			title: "30 min meeting",
			description: "Detailed consultation",
			url: "https://cal.com/anmolmadan/30min"
		}
	} as const;

	let selectedEvent: EventType | null = $state(null);
	let isDark = $state(false);

	$effect(() => {
		if (isOpen) {
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
		selectedEvent = null;
		onClose();
	}

	function handleBack() {
		selectedEvent = null;
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
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
			class="relative flex flex-col w-full max-w-2xl h-[90vh] max-h-[750px] overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl transition-all"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Top Bar -->
			<div
				class="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-6 py-4"
			>
				<div class="flex items-center gap-3">
					{#if selectedEvent}
						<button
							type="button"
							onclick={handleBack}
							class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
							aria-label="Back to event selection"
						>
							<ArrowLeft size={16} />
						</button>
					{/if}
					<div>
						<h3 class="text-lg font-bold text-black dark:text-white">
							{selectedEvent ? EVENTS[selectedEvent].title : "Book a Meeting"}
						</h3>
						<p class="text-xs text-neutral-500 dark:text-neutral-400">
							{selectedEvent ? EVENTS[selectedEvent].description : "Choose a meeting duration"}
						</p>
					</div>
				</div>

				<button
					type="button"
					onclick={handleClose}
					class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
					aria-label="Close modal"
				>
					<X size={16} />
				</button>
			</div>

			<!-- Body -->
			<div class="flex-1 overflow-y-auto p-6">
				{#if !selectedEvent}
					<!-- Choose Event -->
					<div class="mx-auto max-w-md py-8">
						<div class="text-center mb-8">
							<div class="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
								<img
									src="/images/hero_portrait.png"
									alt="Anmol Madan"
									class="h-full w-full object-cover"
								/>
							</div>
							<h4 class="text-xl font-bold text-black dark:text-white">Anmol Madan</h4>
							<p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
								Cybersecurity Specialist & Motivational Speaker
							</p>
						</div>

						<div class="space-y-4">
							{#each Object.entries(EVENTS) as [key, ev]}
								<button
									type="button"
									onclick={() => (selectedEvent = key as EventType)}
									class="group flex w-full items-center justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-5 text-left transition-all hover:border-black dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer shadow-sm hover:shadow-md"
								>
									<div>
										<h5 class="text-base font-semibold text-black dark:text-white">
											{ev.title}
										</h5>
										<p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
											{ev.description}
										</p>
									</div>
									<span
										class="text-lg text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-white"
									>
										→
									</span>
								</button>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Cal.com Embed Iframe -->
					<div class="h-full w-full min-h-[500px] overflow-hidden rounded-2xl">
						<iframe
							src="{EVENTS[selectedEvent].url}?embed=1&theme={isDark ? 'dark' : 'light'}"
							title="Schedule with Anmol Madan"
							class="h-full w-full min-h-[550px] border-none"
							allow="camera; microphone; autoplay; fullscreen"
						></iframe>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
