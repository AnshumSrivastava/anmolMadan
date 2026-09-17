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
	<!-- MASTER AVATAR STAGE (Ref 10 & list-2 #5: slightly reduced size, centered alignment) -->
	<div
		class="relative aspect-square shrink-0 w-[clamp(260px,28vw,480px)] max-w-[85vw] mx-auto translate-y-[1vh]"
	>
		<!-- AMBIENT GLOW -->
		<div
			aria-hidden="true"
			class="absolute left-1/2 top-[54%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-400/20 via-neutral-300/5 to-transparent blur-2xl dark:from-white/15 dark:via-neutral-900/30 dark:to-transparent"
		></div>

		<!-- PURE BLACK-AND-WHITE CIRCLE (LIGHT: PURE BLACK, DARK: PURE WHITE - Ref 10) -->
		<div
			class="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 aspect-square w-[82%] rounded-full bg-black dark:bg-white border border-neutral-800 dark:border-neutral-200 shadow-[0_20px_45px_rgba(0,0,0,0.22)] dark:shadow-[0_25px_55px_rgba(255,255,255,0.18)] overflow-hidden"
		></div>

		<!-- PERSON (BREAKOUT PHOTO CENTERED) -->
		<div
			class="absolute left-1/2 bottom-0 -translate-x-1/2 w-[82%] h-[132%] overflow-hidden rounded-b-full rounded-t-none pointer-events-none flex items-end justify-center"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute left-1/2 bottom-0 -translate-x-1/2 h-[122%] w-auto max-w-none scale-[1.08] origin-bottom translate-y-[calc(4%+65px)] object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
			/>
		</div>
	</div>
</div>
