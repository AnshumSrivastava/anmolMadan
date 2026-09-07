export interface Credential {
	title: string;
	subtitle: string;
}

export interface AudienceItem {
	title: string;
	description: string;
	iconName: "Building2" | "GraduationCap" | "Users";
}

export interface AboutData {
	id: string;
	sectionHeading: string;
	mainHeading: string;
	paragraph1: string;
	paragraph2: string;
	paragraph3: string;
	imageUrl: string;
	fallbackImageUrl: string;
	images?: { url: string; alt: string; focal?: string }[];
	credentials: Credential[];
	audience: AudienceItem[];
}

export const aboutData: AboutData = {
	id: "57f4e40e-0491-4dad-9edb-3873611ba593",
	sectionHeading: "HOW I DO IT",
	mainHeading: "More Than Just a Trainer.",
	paragraph1:
		"I chose cybersecurity because I realized how deeply our lives depend on technology — and how easily that trust can be exploited.",
	paragraph2:
		"The best way to learn is to experience it. That's why I bring cybersecurity beyond the classroom through interactive sessions, practical demonstrations, and real-world scenarios.",
	paragraph3: "",
	imageUrl: "/images/about_signature.png",
	fallbackImageUrl:
		"https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/about/about-b18b7b97-f4e6-4d00-9958-2d898909bb99.png",
	images: [
		{
			url: "/images/about_signature.png",
			alt: "Anmol Madan keynote speaker at AISS DSCI",
			focal: "26% 40%"
		},
		{
			url: "/images/about_auditorium.jpg",
			alt: "Anmol Madan addressing packed auditorium",
			focal: "35% 50%"
		},
		{
			url: "/images/about_indigo.jpg",
			alt: "Anmol Madan training IndiGo Reach team outdoors",
			focal: "50% 40%"
		}
	],
	credentials: [
		{
			title: "B.E. CSE",
			subtitle: "Chitkara University"
		},
		{
			title: "Google + Microsoft",
			subtitle: "Certified"
		},
		{
			title: "10+ Patents",
			subtitle: "Filed & Published"
		},
		{
			title: "500+ Sessions",
			subtitle: "Delivered Across India"
		}
	],
	audience: [
		{
			title: "Students & Professionals",
			description:
				"Whether you're beginning your cybersecurity journey or looking to sharpen your skills, I offer learning that's practical, accessible, and relevant to where you are right now.",
			iconName: "Building2"
		},
		{
			title: "Organizations & Institutions",
			description:
				"Schools, colleges, universities — I work with institutions to build awareness programs that give students real-world knowledge they can actually use.",
			iconName: "GraduationCap"
		},
		{
			title: "Corporates & MNCs",
			description:
				"I help teams understand and respond to cyber threats — through awareness sessions, workshops, and speaking engagements that make security feel relevant, not theoretical.",
			iconName: "Users"
		}
	]
};
