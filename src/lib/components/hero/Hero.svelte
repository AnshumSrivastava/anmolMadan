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

	<!-- SCROLL TRANSFORM WRAPPER — full height, flex column -->
	<div
		class="relative flex h-full w-full flex-col will-change-transform"
		style="filter: blur({blurPx}px); opacity: {opacity}; transform: scale({scale}) translateY({translateY}px); transform-origin: center center;"
	>
		<!-- ① MAIN ZONE — grows to fill all space above stats, content centred inside -->
		<div class="relative flex flex-1 items-center overflow-hidden">
			<div class="relative mx-auto w-full max-w-[1400px] px-6 lg:px-8">
				<div class="relative flex w-full items-center">

					<!-- LEFT CONTENT -->
					<div class="relative z-20 flex w-full lg:w-[52%] xl:w-[50%] flex-col text-left">
						<!-- NAME + ROLE -->
						<Reveal delay={0.08}>
							<div class="w-fit">
								<HeroTitle title={hero.preHeading || "ANMOL MADAN"} />

								<!-- ROLE -->
								<p
									class="mt-2 break-words sm:whitespace-nowrap pl-[3px] text-[clamp(11px,0.9vw,15px)] font-semibold uppercase leading-[1.2] sm:leading-[1] tracking-[0.18em] sm:tracking-[0.34em] text-neutral-500 dark:text-neutral-400"
								>
									Cybersecurity SPECIALIST
									<span class="mx-[6px] sm:mx-[8px]">·</span>
									Motivational Speaker
								</p>
							</div>
						</Reveal>

						<!-- DESCRIPTION -->
						<Reveal delay={0.2}>
							<div
								class="mt-7 sm:mt-8 space-y-4 sm:space-y-5 max-w-full sm:max-w-[520px] lg:max-w-[540px] text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.75] text-neutral-600 dark:text-neutral-400 text-left sm:text-justify [text-justify:inter-word]"
							>
								<p>
									Behind every device is a person. Behind every identity is a life. Behind every piece of data is something worth protecting.
								</p>
								<p>
									That's why my approach to cybersecurity has always been people-first — because we're not protecting technology from people. We're protecting people through technology.
								</p>
							</div>
						</Reveal>

						<!-- BUTTONS -->
						<Reveal delay={0.3}>
							<div class="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4">
								<button
									type="button"
									onclick={onBookCall}
									class="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
								>
									{hero.buttonText || "Book a Call"}
								</button>

								<a
									href="#about"
									class="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-transparent px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-700 transition-all duration-200 hover:border-black hover:text-black active:scale-95 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
								>
									Learn More
								</a>
							</div>
						</Reveal>

						<!-- STATS — credential row anchored below buttons -->
						<Reveal delay={0.42}>
							<div class="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-neutral-200 dark:border-neutral-800">
								<HeroStats stats={hero.stats} />
							</div>
						</Reveal>
					</div>

					<!-- RIGHT IMAGE AREA — portrait centred in the main zone -->
					<div
						class="absolute right-[-4%] sm:right-[0%] lg:right-[1%] xl:right-[3%] top-1/2 -translate-y-[46%] z-10 h-[88%] sm:h-[90%] lg:h-[92%] w-[55%] sm:w-[48%] lg:w-[46%] opacity-30 sm:opacity-60 lg:opacity-100 pointer-events-none lg:pointer-events-auto transition-opacity duration-300"
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

	</div>
</section>
