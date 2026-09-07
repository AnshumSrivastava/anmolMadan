<script lang="ts">
	import { siteData } from "$lib/data/siteData";
	import Navbar from "$lib/components/visitor/Navbar.svelte";
	import Hero from "$lib/components/hero/Hero.svelte";
	import About from "$lib/components/visitor/About.svelte";
	import VideoTestimonials from "$lib/components/visitor/VideoTestimonials.svelte";
	import Audience from "$lib/components/visitor/Audience.svelte";
	import Services from "$lib/components/visitor/Services.svelte";
	import Vision from "$lib/components/visitor/Vision.svelte";
	import Note from "$lib/components/visitor/Note.svelte";
	import Experience from "$lib/components/visitor/Experience.svelte";
	import Footer from "$lib/components/visitor/Footer.svelte";
	import ConnectButton from "$lib/components/visitor/ConnectButton.svelte";
	import CalModal from "$lib/components/shared/CalModal.svelte";

	let isCalOpen = $state(false);

	function handleOpenCal() {
		isCalOpen = true;
	}

	function handleRequestService(serviceTitle: string) {
		isCalOpen = true;
	}
</script>

<!-- NAVBAR -->
<Navbar onBookCall={handleOpenCal} />

<!-- FIXED HERO LAYER -->
<Hero hero={siteData.hero} onBookCall={handleOpenCal} />

<!-- ELEVATED CARD STACK (Pulls up over hero on scroll) -->
<main
	id="main-content"
	class="relative z-10 mt-[100dvh] min-h-screen w-full rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[52px] bg-white dark:bg-black shadow-[0_-25px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500"
>
	<About about={siteData.about} />
	<VideoTestimonials items={siteData.testimonials} />
	<Audience audience={siteData.about.audience} />
	<Services services={siteData.services} onRequestService={handleRequestService} />
	<Vision vision={siteData.vision} />
	<Note note={siteData.note} />
	<Experience experiences={siteData.experiences} />
	<Footer links={siteData.contact.links} onBookCall={handleOpenCal} />
</main>

<!-- STICKY CONNECT BUTTON & MENU -->
<ConnectButton links={siteData.contact.links} onBookCall={handleOpenCal} />

<!-- CAL.COM SCHEDULING MODAL -->
<CalModal isOpen={isCalOpen} onClose={() => (isCalOpen = false)} />
