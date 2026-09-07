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
	class="relative flex h-full w-full items-center justify-center lg:justify-end pointer-events-none select-none animate-in fade-in zoom-in-95 duration-800"
>
	<!-- MASTER AVATAR STAGE -->
	<div
		class="relative aspect-square shrink-0 w-[clamp(240px,30vw,540px)] max-w-[90vw] translate-y-[1vh]"
	>
		<!-- AMBIENT GLOW -->
		<div
			aria-hidden="true"
			class="absolute left-1/2 top-[56%] h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-400/20 via-neutral-300/5 to-transparent blur-2xl dark:from-white/20 dark:via-neutral-900/30 dark:to-transparent"
		></div>

		<!-- CIRCLE (LIGHT: BLACK, DARK: WHITE) -->
		<div
			class="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 aspect-square w-[84%] rounded-full bg-black dark:bg-white border border-neutral-700/40 dark:border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_55px_rgba(255,255,255,0.15)] overflow-hidden"
		>
			<div
				aria-hidden="true"
				class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 dark:from-black/5 dark:via-transparent dark:to-black/10 pointer-events-none"
			></div>
		</div>

		<!-- PERSON (BREAKOUT PHOTO) -->
		<div
			class="absolute left-1/2 bottom-0 -translate-x-1/2 w-[84%] h-[135%] overflow-hidden rounded-b-full rounded-t-none pointer-events-none flex items-end justify-center"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="absolute left-1/2 bottom-0 -translate-x-1/2 h-[125%] w-auto max-w-none scale-[1.12] origin-bottom translate-y-[calc(4%+68px)] object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
			/>
		</div>
	</div>
</div>
