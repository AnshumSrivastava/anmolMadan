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
	<!-- MASTER AVATAR STAGE -->
	<div
		class="relative w-full max-w-[460px] h-[520px] sm:h-[580px] lg:h-[620px] flex items-end justify-center"
	>
		<!-- AMBIENT DEPTH GLOW -->
		<div
			aria-hidden="true"
			class="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-300/40 via-neutral-100/20 to-transparent blur-3xl dark:from-white/10 dark:via-neutral-800/30 dark:to-transparent"
		></div>

		<!-- ELEGANT ARCHITECTURAL BACKDROP PODIUM -->
		<div
			class="absolute left-1/2 bottom-4 -translate-x-1/2 w-[310px] sm:w-[350px] lg:w-[380px] h-[440px] sm:h-[490px] rounded-t-[190px] rounded-b-[40px] bg-gradient-to-b from-neutral-100/90 via-neutral-150/70 to-neutral-200/50 dark:from-neutral-900/90 dark:via-neutral-900/70 dark:to-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
		></div>

		<!-- PERSON PORTRAIT WITH SEAMLESS BOTTOM GRADIENT MASK (Eliminates crude clipping) -->
		<div
			class="relative z-10 h-full w-full flex items-end justify-center pointer-events-none overflow-visible"
			style="-webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%); mask-image: linear-gradient(to bottom, black 85%, transparent 100%);"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="h-[520px] sm:h-[580px] lg:h-[630px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-[1.02]"
			/>
		</div>
	</div>
</div>
