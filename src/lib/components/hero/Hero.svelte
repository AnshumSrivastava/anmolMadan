<script lang="ts">
	import { onMount } from "svelte";
	import type { HeroData } from "$lib/data/hero";
	import HeroBackground from "./HeroBackground.svelte";
	import HeroTitle from "./HeroTitle.svelte";
	import HeroStats from "./HeroStats.svelte";
	import HeroImage from "./HeroImage.svelte";
	import Reveal from "$lib/components/shared/Reveal.svelte";

	import { ArrowUpRight, ArrowDown } from "@lucide/svelte";

	interface Props {
		hero: HeroData;
		onBookCall: () => void;
	}

	let { hero, onBookCall }: Props = $props();

	let mobileImageFailed = $state(false);
	let mobileImageSrc = $derived(
		mobileImageFailed
			? hero.fallbackHeroImage ||
					"https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/hero/hero-1785752049223.png"
			: "/images/hero_portrait_mobile.webp"
	);
	function handleMobileImageError() {
		mobileImageFailed = true;
	}

	let scrollY = $state(0);

	let blurPx = $derived(Math.min(16, (scrollY / 480) * 16));
	let opacity = $derived(Math.max(0, 1 - scrollY / 420));
	let scale = $derived(Math.max(0.92, 1 - (scrollY / 1000) * 0.08));
	let translateY = $derived(-(scrollY * 0.1));

	let ticking = false;

	onMount(() => {
		function handleScroll() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					scrollY = window.scrollY;
					ticking = false;
				});
				ticking = true;
			}
		}

		window.addEventListener("scroll", handleScroll, {
			passive: true
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<section
	id="hero"
	class="fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-white dark:bg-black"
>
	<!-- ========================================================= -->
	<!-- BACKGROUND                                                -->
	<!-- ========================================================= -->

	<HeroBackground />

	<!-- ========================================================= -->
	<!-- SCROLL TRANSFORM WRAPPER                                  -->
	<!-- ========================================================= -->

	<div
		class="relative flex h-full w-full flex-col will-change-transform mobile-no-filter"
		style="filter: blur({blurPx}px); opacity: {opacity}; transform: scale({scale}) translateY({translateY}px); transform-origin: center center;"
	>
		<!-- ===================================================== -->
		<!-- DESKTOP VERSION                                      -->
		<!-- ===================================================== -->

		<div
			class="relative hidden flex-1 items-center overflow-hidden lg:flex"
		>
			<div
				class="relative mx-auto w-full max-w-[1400px] px-6 lg:px-8"
			>
				<div class="relative flex w-full items-center">

					<!-- =========================================== -->
					<!-- DESKTOP LEFT CONTENT                     -->
					<!-- =========================================== -->

					<div
						class="relative z-20 flex w-full flex-col text-left lg:w-[52%] xl:w-[50%]"
					>

						<!-- NAME + ROLE -->
						<Reveal delay={0.08}>
							<div class="w-fit">

								<HeroTitle
									title={hero.preHeading || "ANMOL MADAN"}
								/>

								<p
									class="mt-2 break-words pl-[3px] text-[clamp(11px,0.9vw,15px)] font-semibold uppercase leading-[1.2] tracking-[0.18em] text-neutral-500 sm:whitespace-nowrap sm:leading-[1] sm:tracking-[0.34em] dark:text-neutral-400"
								>
									Cybersecurity SPECIALIST

									<span class="mx-[6px] sm:mx-[8px]">
										·
									</span>

									Motivational Speaker
								</p>

							</div>
						</Reveal>


						<!-- DESCRIPTION -->
						<Reveal delay={0.2}>
							<div
								class="mt-7 max-w-full space-y-4 text-left text-[14px] leading-[1.75] text-neutral-600 sm:mt-8 sm:max-w-[520px] sm:space-y-5 sm:text-[15px] sm:text-justify lg:max-w-[540px] lg:text-[16px] xl:text-[17px] [text-justify:inter-word] dark:text-neutral-400"
							>

								<p>
									Behind every device is a person. Behind every identity is a life.
									Behind every piece of data is something worth protecting.
								</p>

								<p>
									That's why my approach to cybersecurity has always been people-first
									— because we're not protecting technology from people. We're
									protecting people through technology.
								</p>

							</div>
						</Reveal>


						<!-- BUTTONS -->
						<Reveal delay={0.3}>
							<div
								class="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-4"
							>

								<button
									type="button"
									onclick={onBookCall}
									class="inline-flex cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 active:scale-95 sm:px-6 sm:py-3 sm:text-[12px] lg:px-7 lg:py-3.5 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
								>
									{hero.buttonText || "Book a Call"}
								</button>


								<a
									href="#about"
									class="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-transparent px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-700 transition-all duration-200 hover:border-black hover:text-black active:scale-95 sm:px-6 sm:py-3 sm:text-[12px] lg:px-7 lg:py-3.5 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
								>
									Learn More
								</a>

							</div>
						</Reveal>


						<!-- DESKTOP STATS -->
						<Reveal delay={0.42}>
							<div
								class="mt-8 border-t border-neutral-200 pt-6 sm:mt-10 sm:pt-7 dark:border-neutral-800"
							>
								<HeroStats stats={hero.stats} />
							</div>
						</Reveal>

					</div>


					<!-- =========================================== -->
					<!-- DESKTOP IMAGE                              -->
					<!-- =========================================== -->

					<div
						class="pointer-events-none absolute right-[-4%] top-1/2 z-10 h-[88%] w-[55%] -translate-y-[46%] opacity-30 transition-opacity duration-300 sm:right-[0%] sm:h-[90%] sm:w-[48%] sm:opacity-60 lg:pointer-events-auto lg:right-[1%] lg:h-[92%] lg:w-[46%] lg:opacity-100 xl:right-[3%]"
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


		<!-- ===================================================== -->
		<!-- MOBILE VERSION (Remade Native-App Style)              -->
		<!-- ===================================================== -->

		<div
			class="relative flex h-full min-h-[100dvh] w-full flex-col justify-between overflow-hidden px-5 pt-7 pb-8 lg:hidden text-white"
		>
			<!-- FULL-SCREEN HERO IMAGE BACKGROUND LAYER -->
			<div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-neutral-950">
				<!-- Giant ambient glow behind Anmol -->
				<div
					aria-hidden="true"
					class="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 h-[80vw] w-[80vw] rounded-full bg-gradient-to-tr from-blue-900/20 via-white/10 to-transparent blur-[90px]"
				></div>

				<!-- Subtle Giant Typographic Watermark -->
				<div
					aria-hidden="true"
					class="absolute inset-x-0 top-[28%] -translate-y-1/2 flex items-center justify-center pointer-events-none select-none"
				>
					<span
						class="text-[92px] sm:text-[110px] font-black tracking-[-0.04em] text-white/[0.04] uppercase leading-none"
					>
						ANMOL
					</span>
				</div>

				<!-- Full-Screen Anmol Portrait Image rising from the bottom -->
				<img
					src={mobileImageSrc}
					alt={hero.preHeading || "Anmol Madan"}
					onerror={handleMobileImageError}
					class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[88vh] max-h-none w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
					loading="eager"
				/>

				<!-- Top Vignette for Header Contrast -->
				<div class="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent"></div>

				<!-- Bottom Deep Gradient for Content Legibility -->
				<div class="absolute bottom-0 inset-x-0 h-[58%] bg-gradient-to-t from-black via-black/85 via-50% to-transparent"></div>
			</div>

			<!-- Top Bar: Clean Monogram & Location Pill (No green dot) -->
			<div class="relative z-20 flex items-center justify-between">
				<img
					src="/anmol_logo.png"
					alt="Anmol Madan"
					class="h-6 w-auto invert brightness-200 transition-opacity"
				/>
				<div
					class="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 shadow-sm"
				>
					<span
						class="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-white/80"
					>
						Keynote Speaker · India
					</span>
				</div>
			</div>

			<!-- Bottom Content Stack: Overlaid over the bottom gradient -->
			<div class="relative z-20 mt-auto flex flex-col w-full max-w-[360px] mx-auto text-center">
				<!-- Perfectly Aligned Authority Bubbles -->
				<div class="mb-3.5 flex items-center justify-center gap-2">
					<div
						class="inline-flex items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 shadow-md"
					>
						<span class="text-[8.5px] font-mono font-bold tracking-wider text-white">
							100K+ STUDENTS
						</span>
					</div>
					<div
						class="inline-flex items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 shadow-md"
					>
						<span class="text-[8.5px] font-mono font-bold tracking-wider text-white">
							1,000+ SESSIONS
						</span>
					</div>
					<div
						class="inline-flex items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 shadow-md"
					>
						<span class="text-[8.5px] font-mono font-bold tracking-wider text-white">
							50+ ORGS
						</span>
					</div>
				</div>

				<!-- Subtitle / Role -->
				<p
					class="text-[9.5px] font-semibold uppercase tracking-[0.28em] text-white/60"
				>
					Cybersecurity · Motivation
				</p>

				<!-- Bold Commanding Name -->
				<h1
					class="mt-1 text-[34px] sm:text-[38px] font-black tracking-tight text-white uppercase leading-none drop-shadow-sm"
				>
					{hero.preHeading || "ANMOL MADAN"}
				</h1>

				<!-- Ethos Quote -->
				<p
					class="mt-2 text-[12px] leading-relaxed text-white/75 font-normal px-2 max-w-[320px] mx-auto"
				>
					Behind every device is a person. Protecting people through technology.
				</p>

				<!-- Action Buttons -->
				<div class="mt-4 flex items-center gap-2.5">
					<button
						type="button"
						onclick={onBookCall}
						class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-black px-5 text-xs font-semibold uppercase tracking-wider shadow-xl active:scale-95 transition-all duration-150 cursor-pointer"
					>
						<span>{hero.buttonText || "Book a Call"}</span>
						<ArrowUpRight size={14} />
					</button>

					<a
						href="#about"
						class="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 text-xs font-medium uppercase tracking-wider text-white active:scale-95 transition-all duration-150"
					>
						Explore
					</a>
				</div>

				<!-- Subtle Scroll Cue -->
				<div
					class="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/40"
				>
					<span>Scroll to explore</span>
					<ArrowDown size={11} class="animate-bounce mt-0.5" />
				</div>
			</div>
		</div>

		<!-- END MOBILE VERSION -->

	</div>

	<!-- END SCROLL TRANSFORM WRAPPER -->

</section>