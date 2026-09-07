<script lang="ts">
	import { onMount } from "svelte";

	let isVisible = $state(true);
	let isFading = $state(false);
	const MIN_VISIBLE_MS = 800;

	onMount(() => {
		const mountTime = Date.now();

		function dismiss() {
			const elapsed = Date.now() - mountTime;
			const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

			setTimeout(() => {
				isFading = true;
				setTimeout(() => {
					isVisible = false;
				}, 600);
			}, remaining);
		}

		if (document.readyState === "complete") {
			dismiss();
		} else {
			window.addEventListener("load", dismiss, { once: true });
		}

		return () => {
			window.removeEventListener("load", dismiss);
		};
	});
</script>

{#if isVisible}
	<div
		aria-hidden="true"
		class="fixed inset-0 z-[9999] flex select-none items-center justify-center bg-white dark:bg-black transition-opacity duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] {isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}"
	>
		<!-- Center lockup -->
		<div class="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
			<!-- AM monogram SVG -->
			<svg
				width="48"
				height="32"
				viewBox="0 0 48 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="text-black dark:text-white transition-colors"
			>
				<!-- A -->
				<path
					d="M1 31 L8.5 3 L16 31"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M3.5 21.5 H13"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
				/>
				<!-- M -->
				<path
					d="M22 31 L22 3 L31 18 L40 3 L40 31"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

			<!-- Wordmark -->
			<p
				class="text-[9px] font-semibold uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600"
			>
				Anmol&nbsp;Madan
			</p>
		</div>

		<!-- Bottom progress shimmer -->
		<div
			class="absolute inset-x-0 bottom-0 h-[1.5px] overflow-hidden bg-neutral-100 dark:bg-neutral-900"
		>
			<div class="shimmer-bar"></div>
		</div>
	</div>
{/if}

<style>
	.shimmer-bar {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 8rem;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(115, 115, 115, 0.8) 50%,
			transparent 100%
		);
		animation: shimmer 1.4s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			left: -8rem;
		}
		100% {
			left: 100%;
		}
	}
</style>
