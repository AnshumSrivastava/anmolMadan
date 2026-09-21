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
	class="border-t border-black/[0.08] bg-white text-black dark:border-white/[0.08] dark:bg-black dark:text-white font-sans"
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

				<h2
					class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white"
				>
					Ready to create an unforgettable session?
				</h2>

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
		class="mx-auto max-w-[1500px] px-6 py-16 sm:px-8 lg:px-12 xl:px-16"
	>
		<!-- DESKTOP FOOTER GRID -->
		<div
			class="hidden sm:grid gap-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr] lg:gap-12 xl:gap-14"
		>
			<!-- BRAND -->
			<div>
				<button
					type="button"
					onclick={scrollToTop}
					class="group cursor-pointer border-none bg-transparent p-0 text-left outline-none"
				>
					<div
						class="text-[26px] font-semibold leading-none tracking-[0.25em] text-black transition-opacity duration-300 group-hover:opacity-60 dark:text-white"
					>
						ANMOL
					</div>
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

				<div class="mt-6 flex items-center gap-2.5">
					<a
						href="https://www.linkedin.com/in/anmolmadan"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
					>
						<SocialIcons name="Linkedin" size={13} class="h-3.5 w-3.5" />
					</a>
					<a
						href="https://wa.me/916283603879"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="WhatsApp"
						class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
					>
						<SocialIcons name="WhatsApp" size={13} class="h-3.5 w-3.5" />
					</a>
					<a
						href="https://www.instagram.com/anmolxmadan"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
					>
						<SocialIcons name="Instagram" size={13} class="h-3.5 w-3.5" />
					</a>
				</div>
			</div>

			<!-- EXPLORE -->
			<div>
				<h3
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Explore
				</h3>

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
				<h3
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Key Expertise
				</h3>

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
				<h3
					class="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400"
				>
					Connect Directly
				</h3>

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
							{@const isPhone = link.id === "phone"}
							<div class="flex items-center justify-between gap-2">
								<a
									href={link.url}
									target={link.url.startsWith("mailto:") || link.url.startsWith("tel:") ? undefined : "_blank"}
									rel={link.url.startsWith("mailto:") || link.url.startsWith("tel:") ? undefined : "noopener noreferrer"}
									class="flex items-center gap-3 text-sm text-neutral-600 transition-colors duration-300 hover:text-black dark:text-neutral-400 dark:hover:text-white truncate"
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

								{#if isPhone}
									<a
										href="https://wa.me/916283603879"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="WhatsApp"
										title="Chat on WhatsApp"
										class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
									>
										<SocialIcons name="WhatsApp" size={12} class="h-3 w-3" />
									</a>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- MOBILE FOOTER (Minimal Clean Design) -->
		<div class="flex flex-col items-center text-center gap-5 sm:hidden">
			<!-- Minimal Centered Brand -->
			<div>
				<div class="text-lg font-bold tracking-[0.25em] text-black dark:text-white uppercase">
					ANMOL MADAN
				</div>
				<p class="text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500 mt-1">
					Cybersecurity Specialist · Speaker
				</p>
			</div>

			<!-- Dock of Circular Quick Action / Contact Buttons -->
			<div class="flex items-center justify-center gap-3 py-1">
				{#each links as link}
					{@const isBooking = link.id === "booking" || link.url.includes("cal.com")}
					{#if isBooking}
						<button
							type="button"
							onclick={onBookCall}
							aria-label={link.label}
							class="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black shadow-md active:scale-90 transition-transform cursor-pointer"
						>
							<Calendar size={16} />
						</button>
					{:else}
						<a
							href={link.url}
							target={link.url.startsWith("mailto:") || link.url.startsWith("tel:") ? undefined : "_blank"}
							rel={link.url.startsWith("mailto:") || link.url.startsWith("tel:") ? undefined : "noopener noreferrer"}
							aria-label={link.label}
							class="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-sm active:scale-90 transition-transform"
						>
							{#if link.iconName === "Linkedin"}
								<SocialIcons name="Linkedin" size={15} class="h-4 w-4" />
							{:else if link.iconName === "Instagram"}
								<SocialIcons name="Instagram" size={15} class="h-4 w-4" />
							{:else if link.iconName === "Mail"}
								<Mail size={16} />
							{:else if link.iconName === "Phone"}
								<Phone size={16} />
							{:else}
								<Calendar size={16} />
							{/if}
						</a>
					{/if}
				{/each}
			</div>

			<!-- WhatsApp quick pill -->
			<a
				href="https://wa.me/916283603879"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
			>
				<SocialIcons name="WhatsApp" size={13} class="h-3.5 w-3.5" />
				<span>Direct WhatsApp</span>
			</a>
		</div>

		<!-- BOTTOM BAR -->
		<div
			class="mt-12 flex flex-col items-center justify-between gap-2 border-t border-neutral-200/80 dark:border-neutral-800 pt-6 sm:flex-row text-[11px] text-neutral-500 dark:text-neutral-400 pb-16 sm:pb-0"
		>
			<p>© {new Date().getFullYear()} Anmol Madan. All rights reserved.</p>
			<p class="text-neutral-400">Cybersecurity Specialist & Speaker</p>
		</div>
	</div>
</footer>
