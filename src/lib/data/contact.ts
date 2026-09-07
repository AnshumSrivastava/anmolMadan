export interface ContactLink {
	id: string;
	label: string;
	url: string;
	iconName: "Linkedin" | "Mail" | "Phone" | "Calendar" | "Instagram" | "MessageCircle" | "WhatsApp";
	sortOrder?: number;
}

export interface ContactData {
	email: string;
	emailDescription: string;
	whatsapp: string;
	whatsappDescription: string;
	phone: string;
	linkedin: string;
	linkedinDescription: string;
	bookingLink: string;
	bookingDescription: string;
	instagram: string;
	links: ContactLink[];
}

export const contactData: ContactData = {
	email: "anmolmadan20@gmail.com",
	emailDescription: "Best for formal enquiries and proposals",
	whatsapp: "+91 6283603879",
	whatsappDescription: "Fastest response for quick questions",
	phone: "+91 6283603879",
	linkedin: "https://www.linkedin.com/in/anmolmadan7/",
	linkedinDescription: "Connect professionally",
	bookingLink: "https://cal.com/anmolmadan",
	bookingDescription: "Schedule a free 30-minute discovery call",
	instagram: "https://www.instagram.com/anmolxmadan/",
	links: [
		{
			id: "whatsapp",
			label: "+91 6283603879 (WhatsApp)",
			url: "https://wa.me/916283603879",
			iconName: "WhatsApp",
			sortOrder: 1
		},
		{
			id: "linkedin",
			label: "Anmol Madan",
			url: "https://www.linkedin.com/in/anmolmadan7/",
			iconName: "Linkedin",
			sortOrder: 2
		},
		{
			id: "email",
			label: "anmolmadan20@gmail.com",
			url: "mailto:anmolmadan20@gmail.com",
			iconName: "Mail",
			sortOrder: 3
		},
		{
			id: "phone",
			label: "+91 6283603879",
			url: "tel:+916283603879",
			iconName: "Phone",
			sortOrder: 4
		},
		{
			id: "booking",
			label: "Book a call",
			url: "https://cal.com/anmolmadan",
			iconName: "Calendar",
			sortOrder: 5
		},
		{
			id: "instagram",
			label: "Instagram",
			url: "https://www.instagram.com/anmolxmadan/",
			iconName: "Instagram",
			sortOrder: 6
		}
	]
};
