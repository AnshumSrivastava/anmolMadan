<script lang="ts">
	interface Props {
		heroImage?: string;
		fallbackHeroImage?: string;
		alt?: string;
	}

	let {
		heroImage = "/images/hero_portrait_mobile.png",
		fallbackHeroImage = "https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/hero/hero-1785752049223.png",
		alt = "Anmol Madan"
	}: Props = $props();

	let hasError = $state(false);
	// Always use the tight portrait crop so head and body pop out of the frame correctly
	let tightPortrait = "/images/hero_portrait_mobile.png";
	let currentSrc = $derived(
		hasError
			? fallbackHeroImage
			: heroImage && heroImage.includes("mobile")
				? heroImage
				: tightPortrait
	);

	function handleError() {
		hasError = true;
	}
</script>

<div
	class="relative flex h-full w-full items-center justify-center pointer-events-none select-none animate-in fade-in zoom-in-95 duration-800"
>
	<!-- MASTER POP-OUT CIRCLE STAGE -->
	<div
		class="relative aspect-square w-[clamp(280px,30vw,440px)] max-w-[85vw] mx-auto flex items-center justify-center translate-y-[2vh]"
	>
		<!-- AMBIENT DEPTH GLOW -->
		<div
			aria-hidden="true"
			class="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-400/25 via-neutral-200/10 to-transparent blur-3xl dark:from-white/15 dark:via-neutral-800/20 dark:to-transparent"
		></div>

		<!-- 1. BASE CIRCLE PORTAL (Cleanly contains and clips lower body inside the circle frame) -->
		<div
			class="absolute inset-0 rounded-full bg-black dark:bg-white border-4 lg:border-[6px] border-neutral-800/20 dark:border-neutral-200/40 shadow-[0_25px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_rgba(255,255,255,0.18)] overflow-hidden"
		>
			<!-- Subtle inner glass/gradient overlay -->
			<div
				aria-hidden="true"
				class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/35 dark:from-black/10 dark:via-transparent dark:to-black/20 pointer-events-none"
			></div>

			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[128%] w-auto max-w-none object-contain object-bottom"
			/>
		</div>

		<!-- 2. POP-OUT BREAKOUT LAYER (Head and shoulders bursting out beyond the top border) -->
		<div
			class="absolute inset-0 pointer-events-none"
			style="clip-path: inset(-60% -50% 50% -50%); -webkit-clip-path: inset(-60% -50% 50% -50%);"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[128%] w-auto max-w-none object-contain object-bottom"
			/>
		</div>
	</div>
</div>
