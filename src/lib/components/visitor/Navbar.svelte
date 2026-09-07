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

<!-- NAVBAR CONTAINER -->
<nav
	class="fixed inset-x-0 z-[100] pointer-events-none transition-all duration-300 ease-out font-['Instrument_Sans',sans-serif]"
	style="top: {isMobile ? (scrollY > 50 ? 8 : 0) : topOffset}px;"
>
	<div
		class="pointer-events-auto mx-auto flex items-center justify-between overflow-hidden transition-all duration-300 ease-out {isMobile
			? scrollY > 50
				? 'mx-3 rounded-full px-4 sm:px-6'
				: 'w-full px-6'
			: 'px-8'}"
		style="{!isMobile
			? `max-width: calc(100% - ${desktopMarginX * 2}px); border-radius: ${borderRadius}px;`
			: ''} height: {isMobile
			? scrollY > 50
				? 56
				: 68
			: containerHeight}px; background-color: rgba({isDark
			? '0, 0, 0'
			: '255, 255, 255'}, {bgOpacity}); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba({isDark
			? '255, 255, 255'
			: '0, 0, 0'}, {borderOpacity}); box-shadow: 0 10px 30px rgba(0, 0, 0, {shadowOpacity});"
	>
		<!-- LEFT: LOGO -->
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
					class="h-7 sm:h-8 lg:h-9 w-auto transition-all duration-300 group-hover:opacity-75"
				/>
			</button>
		</div>

		<!-- CENTER: DESKTOP NAV ITEMS -->
		<div class="hidden lg:flex shrink-0 items-center justify-center gap-7 xl:gap-8">
			{#each navItems as item}
				{@const isActive = activeSection === item.id}
				<button
					type="button"
					onclick={() => scrollTo(item.href)}
					class="group relative whitespace-nowrap border-none bg-transparent p-0 text-[11px] font-semibold uppercase tracking-[0.18em] outline-none transition-colors duration-300 cursor-pointer {isActive
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
			<!-- Book a Call Button -->
			<button
				type="button"
				onclick={onBookCall}
				class="hidden sm:inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white dark:text-black transition-all duration-200 hover:opacity-85 active:scale-95 cursor-pointer shadow-sm"
			>
				<span>Book a Call</span>
			</button>

			<!-- Mobile Menu Hamburger -->
			<button
				type="button"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
				class="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white transition-colors cursor-pointer"
			>
				{#if mobileMenuOpen}
					<X size={18} />
				{:else}
					<Menu size={18} />
				{/if}
			</button>
		</div>
	</div>

	<!-- MOBILE DROPDOWN DRAWER -->
	{#if mobileMenuOpen}
		<div
			class="pointer-events-auto mx-3 mt-2 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200"
		>
			<div class="flex flex-col gap-4">
				{#each navItems as item}
					{@const isActive = activeSection === item.id}
					<button
						type="button"
						onclick={() => scrollTo(item.href)}
						class="flex items-center justify-between py-2 text-base font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer {isActive
							? 'text-black dark:text-white'
							: 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'}"
					>
						<span>{item.label}</span>
						{#if isActive}
							<span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"></span>
						{/if}
					</button>
				{/each}

				<div class="mt-4 border-t border-neutral-100 dark:border-neutral-800 pt-4">
					<button
						type="button"
						onclick={() => {
							mobileMenuOpen = false;
							onBookCall();
						}}
						class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white dark:text-black cursor-pointer"
					>
						<Calendar size={14} />
						<span>Book a Call</span>
					</button>
				</div>
			</div>
		</div>
	{/if}
</nav>
