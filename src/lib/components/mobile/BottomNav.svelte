<script lang="ts">
	import { onMount } from "svelte";
	import { Home, User, Sparkles, MessageSquare, Calendar } from "@lucide/svelte";

	interface Props {
		onBookCall: () => void;
	}

	let { onBookCall }: Props = $props();

	let activeSection = $state("hero");

	const navItems = [
		{ id: "hero", label: "Home", icon: Home },
		{ id: "about", label: "About", icon: User },
		{ id: "services", label: "Services", icon: Sparkles },
		{ id: "testimonials", label: "Stories", icon: MessageSquare }
	];

	function scrollToSection(id: string) {
		if (id === "hero") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			activeSection = "hero";
			return;
		}
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
			activeSection = id;
		}
	}

	onMount(() => {
		let ticking = false;

		function handleScroll() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					ticking = false;
					if (window.scrollY < 200) {
						activeSection = "hero";
						return;
					}
					const sectionIds = ["testimonials", "services", "about"];
					for (const id of sectionIds) {
						const el = document.getElementById(id);
						if (el) {
							const rect = el.getBoundingClientRect();
							if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
								activeSection = id;
								return;
							}
						}
					}
				});
				ticking = true;
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<!-- Mobile Floating App-Style Bottom Navigation (Only visible on < lg screens) -->
<aside
	aria-label="Mobile Navigation"
	class="fixed bottom-4 inset-x-4 z-50 flex items-center justify-between gap-1 rounded-full border border-neutral-200/80 bg-white/90 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-300 dark:border-neutral-800 dark:bg-black/90 dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] lg:hidden"
>
	<div class="flex flex-1 items-center justify-around">
		{#each navItems as item}
			{@const isActive = activeSection === item.id}
			{@const Icon = item.icon}
			<button
				type="button"
				onclick={() => scrollToSection(item.id)}
				class="group relative flex flex-col items-center justify-center py-1 px-3 text-[10px] font-medium transition-all duration-200 cursor-pointer {isActive
					? 'text-black dark:text-white font-bold'
					: 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'}"
				aria-label={item.label}
			>
				<div class="relative flex items-center justify-center">
					<Icon size={18} class="transition-transform duration-200 group-active:scale-90" />
					{#if isActive}
						<span
							class="absolute -bottom-1 h-1 w-1 rounded-full bg-black dark:bg-white"
						></span>
					{/if}
				</div>
				<span class="mt-1 tracking-tight text-[9.5px]">{item.label}</span>
			</button>
		{/each}
	</div>

	<!-- Direct CTA Action -->
	<button
		type="button"
		onclick={onBookCall}
		class="flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md active:scale-95 transition-transform duration-150 dark:bg-white dark:text-black cursor-pointer"
	>
		<Calendar size={13} class="stroke-[2.5]" />
		<span>Book</span>
	</button>
</aside>
