<script lang="ts">
	interface Props {
		title: string;
	}

	let { title = "ANMOL MADAN" }: Props = $props();

	let cleanTitle = $derived((title || "ANMOL MADAN").trim().replace(/\s+/g, " "));
</script>

<h1
	class="font-['Josefin_Sans',sans-serif] text-left text-[clamp(2.75rem,5.2vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-neutral-950 dark:text-white select-none"
>
	{cleanTitle}
</h1>
