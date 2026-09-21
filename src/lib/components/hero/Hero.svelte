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
		class="relative flex h-full w-full flex-col will-change-transform"
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
			class="relative flex h-full min-h-0 flex-1 flex-col justify-between px-5 pt-7 pb-20 lg:hidden"
		>
			<!-- TOP HEADER BRANDING (Mobile Only) -->
			<div class="relative z-30 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<img
						src="/anmol_logo.png"
						alt="Anmol Madan"
						class="h-7 w-auto grayscale contrast-125 dark:invert dark:grayscale"
					/>
				</div>

				<div class="flex items-center gap-2">
					<span class="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-100/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
						Available for Talks
					</span>
				</div>
			</div>

			<!-- HERO CENTER: COMPACT PORTRAIT WITH GLOW -->
			<div class="relative my-auto flex flex-col items-center justify-center pt-2">
				<!-- Ambient Soft Backing Glow -->
				<div
					aria-hidden="true"
					class="pointer-events-none absolute h-64 w-64 rounded-full bg-neutral-200/50 dark:bg-white/[0.04] blur-3xl -z-10"
				></div>

				<div class="relative h-[min(38vh,260px)] w-[min(72vw,240px)] flex items-center justify-center">
					<HeroImage
						heroImage={hero.heroImage}
						fallbackHeroImage={hero.fallbackHeroImage}
						alt={hero.preHeading || "Anmol Madan"}
					/>
				</div>

				<!-- NAME & ROLES -->
				<div class="mt-4 text-center">
					<h1 class="text-3xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
						{hero.preHeading || "ANMOL MADAN"}
					</h1>
					<p class="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
						Cybersecurity Specialist · Keynote Speaker
					</p>
				</div>

				<!-- PITHY MOTTO -->
				<p class="mt-2.5 max-w-[290px] text-center text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-400">
					"We're not protecting technology from people. We're protecting people through technology."
				</p>

				<!-- QUICK ACTIONS -->
				<div class="mt-4 flex items-center gap-2.5">
					<button
						type="button"
						onclick={onBookCall}
						class="inline-flex h-9 items-center justify-center rounded-full bg-black px-5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md active:scale-95 transition-transform duration-150 dark:bg-white dark:text-black cursor-pointer"
					>
						{hero.buttonText || "Book a Call"}
					</button>

					<a
						href="#about"
						class="inline-flex h-9 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm px-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 active:scale-95 transition-transform duration-150"
					>
						Explore ↓
					</a>
				</div>
			</div>

			<!-- MOBILE STATS: HORIZONTAL CHIPS STRIP -->
			<div class="relative z-30 pt-2 pb-1 border-t border-neutral-200/70 dark:border-neutral-800/70">
				<div class="grid grid-cols-4 gap-1.5 text-center">
					{#each (hero.stats || []) as stat}
						<div class="rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 py-1.5 px-1 border border-neutral-100 dark:border-neutral-800/80">
							<div class="text-[13px] font-extrabold text-black dark:text-white tracking-tight">
								{stat.number}
							</div>
							<div class="text-[8px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
								{stat.label}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- END MOBILE VERSION -->

	</div>

	<!-- END SCROLL TRANSFORM WRAPPER -->

</section>