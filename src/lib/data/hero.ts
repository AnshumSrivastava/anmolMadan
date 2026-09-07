export interface HeroStat {
	number: string;
	label: string;
}

export interface HeroData {
	id: string;
	preHeading: string;
	title: string;
	roleSubtitle: string;
	description: string;
	heroImage: string;
	fallbackHeroImage: string;
	buttonText: string;
	buttonLink: string;
	stats: HeroStat[];
}

export const heroData: HeroData = {
	id: "795a3005-1824-4072-83f4-403864c4f38f",
	preHeading: "ANMOL MADAN",
	title: "CYBERSECURITY SPECIALIST · MOTIVATIONAL SPEAKER",
	roleSubtitle: "Cybersecurity SPECIALIST · Motivational Speaker",
	description:
		"Cybersecurity is often described as the protection of systems, networks, and data. But I believe that's only half the story.\n\nBehind every device is a person. Behind every identity is a life. Behind every piece of data is something worth protecting.\n\nThat's why my approach to cybersecurity has always been people-first. Because ultimately, we're not protecting technology from people. We're protecting people through technology.",
	heroImage: "/images/hero_portrait.png",
	fallbackHeroImage:
		"https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/hero/hero-1785752049223.png",
	buttonText: "Book a Call",
	buttonLink: "#contact",
	stats: [
		{
			number: "100000+",
			label: "Students Taught"
		},
		{
			number: "1000+",
			label: "Sessions Delivered"
		},
		{
			number: "50+",
			label: "Organisations Trained"
		}
	]
};
