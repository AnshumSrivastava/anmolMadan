<script lang="ts">
	import { onMount } from "svelte";
	import type { HeroData } from "$lib/data/hero";
	import HeroBackground from "./HeroBackground.svelte";
	import HeroTitle from "./HeroTitle.svelte";
	import HeroStats from "./HeroStats.svelte";
	import HeroImage from "./HeroImage.svelte";
	import Reveal from "$lib/components/shared/Reveal.svelte";

	interface Props {
		hero: HeroData;
		onBookCall: () => void;
	}

	let { hero, onBookCall }: Props = $props();

	let scrollY = $state(0);
	let blurPx = $derived(Math.min(16, (scrollY / 480) * 16));
	let opacity = $derived(Math.max(0, 1 - scrollY / 420));
	let scale = $derived(Math.max(0.92, 1 - (scrollY / 1000) * 0.08));
	let translateY = $derived(-(scrollY * 0.1));

	onMount(() => {
		function handleScroll() {
			scrollY = window.scrollY;
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<section
	id="hero"
	class="fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-white dark:bg-black"
>
	<!-- BACKGROUND -->
	<HeroBackground />

	<!-- SCROLL TRANSFORM WRAPPER -->
	<div
		class="relative h-full w-full will-change-transform"
		style="filter: blur({blurPx}px); opacity: {opacity}; transform: scale({scale}) translateY({translateY}px); transform-origin: center center;"
	>
		<div
			class="relative mx-auto h-full w-full max-w-[1560px] px-[5.5vw] lg:px-[5vw] xl:px-[4.5vw]"
		>
			<div class="relative flex h-full w-full items-center">
				<!-- LEFT CONTENT -->
				<div class="relative z-20 flex w-full lg:w-[55%] xl:w-[58%] flex-col text-left">
					<!-- NAME + ROLE -->
					<Reveal delay={0.08}>
						<div class="w-fit">
							<HeroTitle title={hero.preHeading || "ANMOL MADAN"} />

							<!-- ROLE -->
							<p
								class="mt-0 break-words sm:whitespace-nowrap pl-[3px] text-[clamp(11px,0.9vw,15px)] font-semibold uppercase leading-[1.2] sm:leading-[1] tracking-[0.18em] sm:tracking-[0.34em] text-neutral-500 dark:text-neutral-400"
							>
								Cybersecurity SPECIALIST
								<span class="mx-[6px] sm:mx-[8px]">·</span>
								Motivational Speaker
							</p>
						</div>
					</Reveal>

					<!-- DESCRIPTION -->
					<Reveal delay={0.2}>
						<p
							class="mt-[32px] max-w-full sm:max-w-[clamp(430px,31vw,580px)] text-[clamp(13px,0.95vw,17px)] leading-[1.6] text-neutral-600 dark:text-neutral-400 text-left sm:[text-align:justify] sm:[text-justify:inter-word]"
						>
							{hero.description}
						</p>
					</Reveal>

					<!-- STATS -->
					<Reveal delay={0.26}>
						<div class="mt-[14px]">
							<HeroStats stats={hero.stats} />
						</div>
					</Reveal>

					<!-- BUTTONS -->
					<Reveal delay={0.32}>
						<div class="mt-[18px] flex items-center gap-[clamp(10px,1vw,16px)]">
							<!-- BOOK A CALL -->
							<button
								type="button"
								onclick={onBookCall}
								class="inline-flex items-center justify-center rounded-full bg-neutral-950 px-[clamp(20px,1.8vw,28px)] py-[clamp(10px,0.9vh,14px)] text-[clamp(10px,0.65vw,12px)] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
							>
								{hero.buttonText || "Book a Call"}
							</button>

							<!-- LEARN MORE -->
							<a
								href="#about"
								class="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-transparent px-[clamp(20px,1.8vw,28px)] py-[clamp(10px,0.9vh,14px)] text-[clamp(10px,0.65vw,12px)] font-medium uppercase tracking-[0.12em] text-neutral-700 transition-all duration-200 hover:border-black hover:text-black active:scale-95 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
							>
								Learn More
							</a>
						</div>
					</Reveal>
				</div>

				<!-- RIGHT IMAGE AREA -->
				<div
					style="transform: translate(-30px, calc(-50% + 100px));"
					class="absolute right-[-4%] sm:right-[0%] lg:right-[2%] top-1/2 z-10 h-[72%] sm:h-[80%] lg:h-[82%] w-[55%] sm:w-[48%] lg:w-[45%] opacity-30 sm:opacity-60 lg:opacity-100 pointer-events-none lg:pointer-events-auto transition-opacity duration-300"
				>
					<HeroImage
						heroImage={hero.heroImage}
						fallbackHeroImage={hero.fallbackHeroImage}
						alt={hero.preHeading || "Anmol Madan"}
					/>
				</div>
			</div>
		</div>
	</div>
</section>
