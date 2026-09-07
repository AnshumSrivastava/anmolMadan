<script lang="ts">
	import { onMount } from "svelte";
	import type { ContactLink } from "$lib/data/contact";
	import { X, Calendar, Mail, Phone, MessageCircle, Moon, Sun } from "@lucide/svelte";
	import SocialIcons from "$lib/components/shared/SocialIcons.svelte";

	interface Props {
		links: ContactLink[];
		onBookCall: () => void;
	}

	let { links = [], onBookCall }: Props = $props();

	let isOpen = $state(false);
	let menuRef: HTMLDivElement | null = $state(null);
	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains("dark");

		function handleClickOutside(event: MouseEvent) {
			if (menuRef && !menuRef.contains(event.target as Node)) {
				isOpen = false;
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}
</script>

<div
	bind:this={menuRef}
	class="fixed bottom-8 right-8 z-[140] flex flex-col items-end gap-3 font-sans select-none"
>
	<!-- POPUP MENU -->
	{#if isOpen}
		<div
			class="absolute bottom-full right-0 mb-3 w-64 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:bg-neutral-950 dark:ring-white/10 animate-in fade-in zoom-in-95 duration-200"
		>
			<div class="flex flex-col gap-1">
				{#each links as link}
					{@const isBooking = link.id === "booking" || link.url.includes("cal.com")}
					{#if isBooking}
						<button
							type="button"
							onclick={() => {
								isOpen = false;
								onBookCall();
							}}
							class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white cursor-pointer"
						>
							<span
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white"
							>
								<Calendar size={16} />
							</span>
							<span class="truncate">Book a call</span>
						</button>
					{:else}
						{@const isSpecial = link.url.startsWith("mailto:") || link.url.startsWith("tel:")}
						<a
							href={link.url}
							target={isSpecial ? undefined : "_blank"}
							rel={isSpecial ? undefined : "noopener noreferrer"}
							onclick={() => (isOpen = false)}
							class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
						>
							<span
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white"
							>
								{#if link.iconName === "Linkedin"}
									<SocialIcons name="Linkedin" size={16} class="h-4 w-4" />
								{:else if link.iconName === "Instagram"}
									<SocialIcons name="Instagram" size={16} class="h-4 w-4" />
								{:else if link.iconName === "Mail"}
									<Mail size={16} />
								{:else if link.iconName === "Phone"}
									<Phone size={16} />
								{:else}
									<MessageCircle size={16} />
								{/if}
							</span>
							<span class="truncate">{link.label}</span>
						</a>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	<!-- THEME TOGGLE BUTTON (Positioned ABOVE rather than left side) -->
	<button
		type="button"
		onclick={toggleTheme}
		aria-label="Toggle theme"
		class="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
	>
		{#if isDark}
			<Sun size={18} class="text-amber-400" />
		{:else}
			<Moon size={18} class="text-neutral-700" />
		{/if}
	</button>

	<!-- MAIN CONNECT BUTTON -->
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		aria-label={isOpen ? "Close connect options" : "Open connect options"}
		class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-lg outline-none transition-all duration-200 hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
	>
		{#if isOpen}
			<X size={20} />
		{:else}
			<MessageCircle size={20} />
		{/if}
	</button>
</div>
