<script lang="ts">
	import "./layout.css";
	import LoadingScreen from "$lib/components/shared/LoadingScreen.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Anmol Madan — Cybersecurity Trainer & Motivational Speaker</title>
	<meta
		name="description"
		content="Official portfolio of Anmol Madan, certified Cybersecurity Specialist & Motivational Speaker based in Chandigarh, India. Corporate training, keynotes, and workshops across India and online."
	/>
	<meta
		name="keywords"
		content="Anmol Madan, Cybersecurity Trainer, Motivational Speaker, Corporate Training, Cybersecurity Specialist, Chandigarh, Speaker India"
	/>
	<meta property="og:title" content="Anmol Madan — Cybersecurity Trainer & Motivational Speaker" />
	<meta
		property="og:description"
		content="Transforming classrooms and boardrooms with memorable cybersecurity sessions and motivational keynotes."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
</svelte:head>

<LoadingScreen />

<div class="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
	{@render children()}
</div>
