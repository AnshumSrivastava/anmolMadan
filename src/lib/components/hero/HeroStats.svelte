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

		// Independent animation durations for each counter (Ref 6)
		// Each stat animates at its own pace and reaches its target independently
		const baseDurations = [2400, 1600, 1000]; // 100k takes 2.4s, 1000 takes 1.6s, 50 takes 1.0s

		stats.forEach((stat, i) => {
			const target = parseInt(stat.number?.replace(/\D/g, "") || "0", 10);
			if (!target) return;

			const duration = baseDurations[i] ?? Math.min(2400, Math.max(800, Math.log10(target + 1) * 600));
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

<div class="flex items-stretch gap-0 text-left select-none divide-x divide-neutral-200 dark:divide-neutral-800">
	{#each stats as stat, index}
		{#if stat.number || stat.label}
			{@const hasPlus = stat.number.includes("+")}
			<div class={index === 0 ? "flex flex-col pr-6 sm:pr-8" : "flex flex-col px-6 sm:px-8"}>
				<!-- Number -->
				<div
					class="text-[clamp(1.4rem,2vw,2rem)] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none"
				>
					{(animatedValues[index] ?? 0).toLocaleString()}{hasPlus ? "+" : ""}
				</div>

				<!-- Label -->
				<div
					class="mt-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500"
				>
					{stat.label.trim()}
				</div>
			</div>
		{/if}
	{/each}
</div>
