<script lang="ts">
	import type { ContactLink } from "$lib/data/contact";
	import { ArrowUpRight, Mail, Phone, Calendar } from "@lucide/svelte";
	import SocialIcons from "$lib/components/shared/SocialIcons.svelte";

	interface Props {
		links: ContactLink[];
		onBookCall: () => void;
	}

	let { links = [], onBookCall }: Props = $props();

	function scrollToSection(id: string) {
		const target = document.querySelector(id);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<footer
	class="font-['Instrument_Sans',sans-serif] border-t border-black/[0.08] bg-white text-black dark:border-white/[0.08] dark:bg-black dark:text-white"
>
	<!-- PRE-FOOTER CTA -->
	<div class="border-b border-white/[0.08] bg-neutral-900 text-white">
		<div
			class="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-12 xl:px-16"
		>
			<div class="max-w-2xl">
				<span
					class="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
				>
					Work Together
				</span>

				<h3
					class="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl text-white"
				>
					Ready to create an unforgettable session?
				</h3>

				<p class="mt-4 text-sm text-neutral-400 sm:text-base">
					Available for corporate cybersecurity training, college workshops, and keynote
					speaking across India & online.
				</p>
			</div>

			<!-- BOOK A CALL -->
			<div class="flex flex-wrap items-center gap-4">
				<button
					type="button"
					onclick={onBookCall}
					class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:scale-105 hover:bg-neutral-100 active:scale-95 cursor-pointer"
				>
					Book a Call
					<ArrowUpRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>

	<!-- MAIN FOOTER -->
	<div
		class="mx-auto max-w-[1500px] px-6 py-20 sm:px-8 lg:px-12 xl:px-16"
	>
		<div
			class="grid gap-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr] lg:gap-12 xl:gap-20"
		>
			<!-- BRAND -->
			<div>
				<button
					type="button"
					onclick={scrollToTop}
					class="group cursor-pointer border-none bg-transparent p-0 text-left outline-none"
				>
					<h3
						class="text-[26px] font-semibold leading-none tracking-[0.25em] text-black transition-opacity duration-300 group-hover:opacity-60 dark:text-white"
					>
						ANMOL
					</h3>
					<p
						class="mt-1.5 text-[8px] font-medium leading-none tracking-[0.48em] text-neutral-400"
					>
						MADAN
					</p>
				</button>

				<div
					class="mt-8 max-w-[290px] space-y-2 text-[14px] leading-6 text-neutral-500 dark:text-neutral-400"
				>
					<p class="font-medium text-neutral-800 dark:text-neutral-200">
						Cybersecurity Trainer & Motivational Speaker
					</p>
					<p>Based in Chandigarh, India</p>
					<p>Delivering sessions Pan-India & Online</p>
				</div>
			</div>

			<!-- EXPLORE -->
			<div>
				<h4
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Explore
				</h4>

				<div
					class="flex flex-col gap-3.5 text-[14px] text-neutral-600 dark:text-neutral-400"
				>
					<button
						type="button"
						onclick={scrollToTop}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						Home
					</button>
					<button
						type="button"
						onclick={() => scrollToSection("#about")}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						About
					</button>
					<button
						type="button"
						onclick={() => scrollToSection("#testimonials")}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						Testimonials
					</button>
					<button
						type="button"
						onclick={() => scrollToSection("#services")}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						Services
					</button>
					<button
						type="button"
						onclick={() => scrollToSection("#vision")}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						Vision
					</button>
					<button
						type="button"
						onclick={() => scrollToSection("#note")}
						class="w-fit cursor-pointer border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white"
					>
						Notes
					</button>
				</div>
			</div>

			<!-- KEY EXPERTISE -->
			<div>
				<h4
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Key Expertise
				</h4>

				<ul
					class="space-y-3.5 text-[14px] leading-6 text-neutral-600 dark:text-neutral-400"
				>
					<li>Corporate Cybersecurity</li>
					<li>Ethical Hacking Workshops</li>
					<li>Motivational Keynotes</li>
					<li>Executive Threat Defense</li>
					<li>Student Mentorship</li>
				</ul>
			</div>

			<!-- CONNECT DIRECTLY -->
			<div>
				<h4
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Connect Directly
				</h4>

				<div class="flex flex-col gap-4">
					{#each links as link}
						{@const isBooking = link.id === "booking" || link.url.includes("cal.com")}
						{#if isBooking}
							<button
								type="button"
								onclick={onBookCall}
								class="flex items-center gap-3 text-sm text-neutral-600 transition-colors duration-300 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer text-left"
							>
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
								>
									<Calendar size={14} />
								</div>
								<span class="truncate">{link.label}</span>
							</button>
						{:else}
							{@const isSpecial = link.url.startsWith("mailto:") || link.url.startsWith("tel:")}
							<a
								href={link.url}
								target={isSpecial ? undefined : "_blank"}
								rel={isSpecial ? undefined : "noopener noreferrer"}
								class="flex items-center gap-3 text-sm text-neutral-600 transition-colors duration-300 hover:text-black dark:text-neutral-400 dark:hover:text-white"
							>
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
								>
									{#if link.iconName === "Linkedin"}
										<SocialIcons name="Linkedin" size={14} class="h-3.5 w-3.5" />
									{:else if link.iconName === "Instagram"}
										<SocialIcons name="Instagram" size={14} class="h-3.5 w-3.5" />
									{:else if link.iconName === "Mail"}
										<Mail size={14} />
									{:else if link.iconName === "Phone"}
										<Phone size={14} />
									{:else}
										<Calendar size={14} />
									{/if}
								</div>
								<span class="truncate">{link.label}</span>
							</a>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- BOTTOM BAR -->
		<div
			class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-200/80 dark:border-neutral-800 pt-8 sm:flex-row text-xs text-neutral-500 dark:text-neutral-400"
		>
			<p>© {new Date().getFullYear()} Anmol Madan. All rights reserved.</p>
			<p class="text-neutral-400">Cybersecurity Specialist & Motivational Speaker</p>
		</div>
	</div>
</footer>
