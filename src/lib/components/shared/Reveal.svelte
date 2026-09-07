<script lang="ts">
	import { onMount } from "svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		delay?: number;
		className?: string;
	}

	let { children, delay = 0, className = "" }: Props = $props();

	let element: HTMLElement | null = $state(null);
	let isVisible = $state(false);

	onMount(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				}
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -40px 0px"
			}
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={element}
	class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] {className} {isVisible
		? 'opacity-100 translate-y-0'
		: 'opacity-0 translate-y-8'}"
	style="transition-delay: {delay}s;"
>
	{@render children()}
</div>
