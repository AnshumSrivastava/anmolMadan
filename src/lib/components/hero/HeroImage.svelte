<script lang="ts">
	interface Props {
		heroImage?: string;
		fallbackHeroImage?: string;
		alt?: string;
	}

	let {
		heroImage = "/images/hero_portrait.png",
		fallbackHeroImage = "https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/hero/hero-1785752049223.png",
		alt = "Anmol Madan"
	}: Props = $props();

	let hasError = $state(false);
	let currentSrc = $derived(hasError ? fallbackHeroImage : heroImage);

	function handleError() {
		hasError = true;
	}
</script>

<div
	class="relative flex h-full w-full items-center justify-center pointer-events-none select-none animate-in fade-in zoom-in-95 duration-800"
>
	<!-- MASTER CIRCLE STAGE -->
	<div
		class="relative aspect-square w-[clamp(280px,30vw,440px)] max-w-[85vw] mx-auto flex items-center justify-center"
	>
		<!-- AMBIENT DEPTH GLOW -->
		<div
			aria-hidden="true"
			class="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-400/20 via-neutral-300/10 to-transparent blur-3xl dark:from-white/15 dark:via-neutral-900/30 dark:to-transparent"
		></div>

		<!-- 1. BASE CIRCLE FRAME (Bottom body is 100% perfectly clipped to circle contour) -->
		<div
			class="absolute inset-0 rounded-full bg-black dark:bg-white border-2 border-neutral-900 dark:border-neutral-100 shadow-[0_25px_55px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_55px_rgba(255,255,255,0.2)] overflow-hidden"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[126%] w-auto max-w-none object-contain object-bottom"
			/>
		</div>

		<!-- 2. TOP BREAKOUT (Head & shoulders cleanly pop out above the circle edge) -->
		<div
			class="absolute inset-0 pointer-events-none"
			style="clip-path: inset(-30% -25% 45% -25%); -webkit-clip-path: inset(-30% -25% 45% -25%);"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[126%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
			/>
		</div>
	</div>
</div>
