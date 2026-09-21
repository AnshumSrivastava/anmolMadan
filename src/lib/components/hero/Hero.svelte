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
		<!-- MOBILE VERSION                                        -->
		<!-- ===================================================== -->

		<div
			class="relative flex h-full min-h-0 flex-1 flex-col px-6 pt-[88px] lg:hidden"
		>

			<!-- ================================================= -->
			<!-- MOBILE TOP CONTENT                               -->
			<!-- ================================================= -->

			<div class="relative z-20 shrink-0">

				<!-- TITLE -->
				<Reveal delay={0.08}>
					<div>

						<HeroTitle
							title={hero.preHeading || "ANMOL MADAN"}
						/>

						<p
							class="mt-1.5 pl-[2px] text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.16em] text-neutral-500 dark:text-neutral-400"
						>
							Cybersecurity SPECIALIST

							<span class="mx-1">
								·
							</span>

							Motivational Speaker
						</p>

					</div>
				</Reveal>


				<!-- DESCRIPTION -->
				<Reveal delay={0.16}>
					<div
						class="mt-5 max-w-[340px] space-y-3 text-[11.5px] leading-[1.6] text-neutral-600 dark:text-neutral-400"
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


				<!-- MOBILE BUTTONS -->
				<Reveal delay={0.24}>
					<div
						class="mt-4 flex items-center gap-2.5"
					>

						<button
							type="button"
							onclick={onBookCall}
							class="inline-flex h-9 items-center justify-center rounded-full bg-neutral-950 px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-white shadow-sm transition-transform duration-200 active:scale-95 dark:bg-white dark:text-black"
						>
							{hero.buttonText || "Book a Call"}
						</button>


						<a
							href="#about"
							class="inline-flex h-9 items-center justify-center rounded-full border border-neutral-300 px-4 text-[9px] font-medium uppercase tracking-[0.1em] text-neutral-700 transition-all duration-200 active:scale-95 dark:border-neutral-700 dark:text-neutral-300"
						>
							Learn More
						</a>

					</div>
				</Reveal>

			</div>


			<!-- ================================================= -->
			<!-- MOBILE IMAGE AREA                                -->
			<!-- ================================================= -->

			<div
				class="relative flex min-h-0 flex-1 items-center justify-center pb-[135px]"
			>

				<Reveal delay={0.3}>
					<div
						class="relative flex h-full w-full items-center justify-center"
					>

						<!--
							IMAGE CONTAINER

							The image gets its own dedicated area.
							It cannot overlap the stats.
						-->
						<div
							class="relative flex h-[min(42vh,290px)] w-[min(78vw,280px)] items-center justify-center"
						>

							<HeroImage
								heroImage={hero.heroImage}
								fallbackHeroImage={hero.fallbackHeroImage}
								alt={hero.preHeading || "Anmol Madan"}
							/>

						</div>

					</div>
				</Reveal>

			</div>


			<!-- ================================================= -->
			<!-- MOBILE STATS                                     -->
			<!-- ================================================= -->

			<div
				class="absolute bottom-[46px] left-6 right-6 z-30 border-t border-neutral-200 bg-white/95 py-3 backdrop-blur-md dark:border-neutral-800 dark:bg-black/95"
			>

				<Reveal delay={0.4}>
					<HeroStats stats={hero.stats} />
				</Reveal>

			</div>

		</div>

		<!-- END MOBILE VERSION -->

	</div>

	<!-- END SCROLL TRANSFORM WRAPPER -->

</section>