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
		content="Anmol Madan, Cybersecurity Trainer, Motivational Speaker, Corporate Training, Cybersecurity Specialist, Chandigarh, Speaker India, Ethical Hacking"
	/>
	<link rel="canonical" href="https://anmolmadan.in" />

	<!-- OpenGraph / Facebook / LinkedIn -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anmolmadan.in" />
	<meta property="og:site_name" content="Anmol Madan" />
	<meta property="og:title" content="Anmol Madan — Cybersecurity Trainer & Motivational Speaker" />
	<meta
		property="og:description"
		content="Transforming classrooms and boardrooms with memorable cybersecurity sessions and motivational keynotes."
	/>
	<meta property="og:image" content="https://anmolmadan.in/images/hero_portrait.png" />
	<meta property="og:image:alt" content="Anmol Madan — Cybersecurity Specialist & Motivational Speaker" />
	<meta property="og:locale" content="en_IN" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://anmolmadan.in" />
	<meta name="twitter:title" content="Anmol Madan — Cybersecurity Trainer & Motivational Speaker" />
	<meta
		name="twitter:description"
		content="Transforming classrooms and boardrooms with memorable cybersecurity sessions and motivational keynotes."
	/>
	<meta name="twitter:image" content="https://anmolmadan.in/images/hero_portrait.png" />

	<!-- Schema.org JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": "https://anmolmadan.in/#person",
				"name": "Anmol Madan",
				"jobTitle": "Cybersecurity Trainer & Motivational Speaker",
				"url": "https://anmolmadan.in",
				"image": "https://anmolmadan.in/images/hero_portrait.png",
				"telephone": "+91 6283603879",
				"email": "anmolmadan20@gmail.com",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Chandigarh",
					"addressCountry": "IN"
				},
				"sameAs": [
					"https://www.linkedin.com/in/anmolmadan7/",
					"https://www.instagram.com/anmolxmadan/"
				],
				"knowsAbout": [
					"Cybersecurity",
					"Ethical Hacking",
					"Motivational Speaking",
					"Corporate Training",
					"Executive Threat Defense"
				]
			},
			{
				"@type": "WebSite",
				"@id": "https://anmolmadan.in/#website",
				"url": "https://anmolmadan.in",
				"name": "Anmol Madan",
				"description": "Official portfolio of Anmol Madan, certified Cybersecurity Specialist & Motivational Speaker based in Chandigarh, India."
			}
		]
	}
	</script>`}
</svelte:head>

<LoadingScreen />

<div class="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
	{@render children()}
</div>
