<script lang="ts">
	import { onMount } from "svelte";
	import { Sun, Moon } from "@lucide/svelte";

	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains("dark");
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

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle dark/light mode"
	class="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-sm transition-all hover:border-black dark:hover:border-white hover:scale-105 active:scale-95 cursor-pointer"
>
	{#if isDark}
		<Sun size={18} class="text-amber-400" />
	{:else}
		<Moon size={18} class="text-neutral-700" />
	{/if}
</button>
