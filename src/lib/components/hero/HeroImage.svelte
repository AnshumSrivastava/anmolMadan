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
	<!-- MASTER HERO PORTRAIT STAGE -->
	<div
		class="relative w-full max-w-[480px] h-[520px] sm:h-[580px] lg:h-[620px] flex items-end justify-center"
	>
		<!-- 02 | THIN OUTLINE CIRCLE -->
		<!-- A minimal, low-contrast circular outline adds structure while keeping the focus on the portrait -->
		<div
			aria-hidden="true"
			class="absolute left-[52%] top-[54%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[380px] lg:w-[420px] aspect-square rounded-full border border-black/15 dark:border-white/20 pointer-events-none"
			style="-webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 80%); mask-image: linear-gradient(to bottom, black 50%, transparent 80%);"
		></div>

		<!-- FOREGROUND PORTRAIT (Softly fades into background at bottom) -->
		<div
			class="relative z-10 h-full w-full flex items-end justify-center pointer-events-none overflow-visible"
			style="-webkit-mask-image: linear-gradient(to bottom, black 72%, transparent 97%); mask-image: linear-gradient(to bottom, black 72%, transparent 97%);"
		>
			<img
				src={currentSrc}
				{alt}
				onerror={handleError}
				class="h-[490px] sm:h-[550px] lg:h-[590px] xl:h-[620px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
			/>
		</div>
	</div>
</div>
