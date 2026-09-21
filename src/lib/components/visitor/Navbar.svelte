<script lang="ts">
	import { onMount } from "svelte";
	import { Menu, X, Calendar } from "@lucide/svelte";

	interface Props {
		onBookCall: () => void;
	}

	let { onBookCall }: Props = $props();

	let scrollY = $state(0);
	let isMobile = $state(false);
	let mobileMenuOpen = $state(false);
	let activeSection = $state("");
	let isDark = $state(false);

	const navItems = [
		{ label: "About", href: "#about", id: "about" },
		{ label: "Testimonials", href: "#testimonials", id: "testimonials" },
		{ label: "Services", href: "#services", id: "services" },
		{ label: "Vision", href: "#vision", id: "vision" },
		{ label: "Note", href: "#note", id: "note" }
	];

	// Scroll interpolation (0 -> 300px)
	let scrollProgress = $derived(Math.min(1, Math.max(0, scrollY / 260)));
	let desktopMarginX = $derived(scrollProgress * 180); // margin on each side for pill effect
	let topOffset = $derived(scrollProgress * 14);
	let containerHeight = $derived(80 - scrollProgress * 26); // 80px -> 54px
	let borderRadius = $derived(scrollProgress * 9999);
	let bgOpacity = $derived(0.6 + scrollProgress * 0.35);
	let shadowOpacity = $derived(scrollProgress * 0.12);
	let borderOpacity = $derived(0.04 + scrollProgress * 0.08);

	onMount(() => {
		isDark = document.documentElement.classList.contains("dark");

		const observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains("dark");
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

		function handleScroll() {
			scrollY = window.scrollY;
			updateActiveSection();
		}

		function handleResize() {
			isMobile = window.innerWidth < 1024;
		}

		function updateActiveSection() {
			const sections = navItems
				.map((item) => document.getElementById(item.id))
				.filter(Boolean) as HTMLElement[];

			const activationPoint = window.innerHeight * 0.35;

			for (const section of sections) {
				const rect = section.getBoundingClientRect();
				if (rect.top <= activationPoint && rect.bottom >= activationPoint) {
					activeSection = section.id;
					return;
				}
			}

			if (window.scrollY < 300) {
				activeSection = "";
			}
		}

		handleResize();
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleResize);

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	});

	function scrollTo(href: string) {
		mobileMenuOpen = false;
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	function scrollToTop() {
		mobileMenuOpen = false;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<!-- NAVBAR CONTAINER (Desktop Only) -->
<nav
	class="fixed inset-x-0 z-[100] pointer-events-none transition-all duration-300 ease-out font-sans hidden lg:block"
	style="top: {topOffset}px;"
>
	<div
		class="pointer-events-auto mx-auto hidden lg:flex items-center justify-between overflow-hidden transition-all duration-300 ease-out px-8"
		style="max-width: calc(100% - {desktopMarginX * 2}px); border-radius: {borderRadius}px; height: {containerHeight}px; background-color: rgba({isDark
			? '0, 0, 0'
			: '255, 255, 255'}, {bgOpacity}); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba({isDark
			? '255, 255, 255'
			: '0, 0, 0'}, {borderOpacity}); box-shadow: 0 10px 30px rgba(0, 0, 0, {shadowOpacity});"
	>
		<!-- LEFT: LOGO (BLACK & WHITE) -->
		<div class="flex flex-1 items-center justify-start">
			<button
				type="button"
				onclick={scrollToTop}
				aria-label="Go to homepage"
				class="group relative z-[110] flex items-center cursor-pointer border-none bg-transparent p-0 outline-none"
			>
				<img
					src="/anmol_logo.png"
					alt="Anmol Madan"
					class="h-7 sm:h-8 lg:h-9 w-auto grayscale contrast-125 dark:invert dark:grayscale transition-all duration-300 group-hover:opacity-75"
				/>
			</button>
		</div>

		<!-- CENTER: DESKTOP NAV ITEMS -->
		<div class="hidden lg:flex shrink-0 items-center justify-center gap-7 xl:gap-8 font-sans">
			{#each navItems as item}
				{@const isActive = activeSection === item.id}
				<button
					type="button"
					onclick={() => scrollTo(item.href)}
					class="group relative whitespace-nowrap border-none bg-transparent p-0 text-[12px] font-semibold uppercase tracking-[0.16em] outline-none transition-colors duration-300 cursor-pointer {isActive
						? 'text-black dark:text-white'
						: 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'}"
				>
					{item.label}

					<!-- Active / Hover Underline -->
					<span
						class="absolute -bottom-[5px] left-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 ease-out {isActive
							? 'w-full'
							: 'w-0 group-hover:w-full'}"
					></span>
				</button>
			{/each}
		</div>

		<!-- RIGHT: ACTIONS -->
		<div class="flex flex-1 items-center justify-end gap-3">
			<!-- Book a Call Button with Icon -->
			<button
				type="button"
				onclick={onBookCall}
				class="inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white dark:text-black transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
			>
				<Calendar size={14} class="stroke-[2.2]" />
				<span>Book a Call</span>
			</button>
		</div>
	</div>
</nav>
