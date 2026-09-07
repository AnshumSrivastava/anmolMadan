<div
	class="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white dark:bg-black select-none"
>
	<!-- CENTER SOFT AMBIENT LIGHT -->
	<div
		class="absolute left-1/2 top-[42%] h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100 dark:opacity-0 blur-[130px]"
	></div>

	<!-- TOP RADIAL GLOW -->
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[75vw] max-w-[1200px] bg-gradient-to-b from-neutral-100/40 dark:from-neutral-800/15 to-transparent blur-[90px]"
	></div>

	<!-- SUBTLE GRAIN / NOISE OVERLAY -->
	<div
		class="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);"
	></div>
</div>
