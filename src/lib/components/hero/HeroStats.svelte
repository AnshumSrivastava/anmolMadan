<script lang="ts">
	import { onMount } from "svelte";

	interface Stat {
		number: string;
		label: string;
	}

	interface Props {
		stats: Stat[];
	}

	let { stats }: Props = $props();

	// Counter animation for numbers
	let animatedValues: number[] = $state([]);

	onMount(() => {
		animatedValues = stats.map(() => 0);

		stats.forEach((stat, i) => {
			const target = parseInt(stat.number?.replace(/\D/g, "") || "0", 10);
			if (!target) return;

			const duration = 2400;
			let startTime: number | null = null;

			function animate(timestamp: number) {
				if (!startTime) startTime = timestamp;
				const progress = timestamp - startTime;
				const percentage = Math.min(progress / duration, 1);
				const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
				animatedValues[i] = Math.floor(easeOutQuart * target);

				if (progress < duration) {
					requestAnimationFrame(animate);
				} else {
					animatedValues[i] = target;
				}
			}

			requestAnimationFrame(animate);
		});
	});
</script>

<div class="flex flex-wrap items-start gap-8 sm:gap-12 lg:gap-14 text-left select-none">
	{#each stats as stat, index}
		{#if stat.number || stat.label}
			{@const hasPlus = stat.number.includes("+")}
			<div class="flex flex-col">
				<!-- Number -->
				<div
					class="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none font-sans"
				>
					{(animatedValues[index] ?? 0).toLocaleString()}{hasPlus ? "+" : ""}
				</div>

				<!-- Label -->
				<div
					class="mt-1.5 text-[clamp(11px,0.8vw,13px)] font-medium text-neutral-500 dark:text-neutral-400"
				>
					{stat.label.trim()}
				</div>
			</div>
		{/if}
	{/each}
</div>
