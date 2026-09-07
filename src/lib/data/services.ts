export interface ServiceItem {
	id: string;
	serviceNumber: number;
	title: string;
	badge: string;
	description: string;
	points: string[];
	buttonText: string;
	displayOrder: number;
	isActive: boolean;
}

export interface ServicesSectionData {
	id: string;
	sectionHeading: string;
	mainHeading: string;
	description: string;
	items: ServiceItem[];
}

export const servicesData: ServicesSectionData = {
	id: "a3f6b41f-e6ee-457c-91c4-653f4b38716f",
	sectionHeading: "WAYS WE CAN WORK TOGETHER",
	mainHeading: "Ways We Can Work Together",
	description:
		"Not everyone learns the same way. Neither should cybersecurity. Whether you're looking for personal guidance, an interactive workshop, or a practical learning experience — I offer different ways to make cybersecurity relevant to you.",
	items: [
		{
			id: "935df2c2-28ca-416f-8edd-d76bef73e0eb",
			serviceNumber: 1,
			title: "1 on 1 Sessions",
			badge: "Personalized",
			description:
				"Personalized learning, built around you. One-on-one sessions designed around your goals, questions, and current level of knowledge.",
			points: [
				"Beginners & Career guidance",
				"Interview preparation",
				"Project guidance"
			],
			buttonText: "Let's Talk",
			displayOrder: 1,
			isActive: true
		},
		{
			id: "3b527fde-4a14-4a5a-8283-da341c6b19d6",
			serviceNumber: 2,
			title: "Online Sessions",
			badge: "Live Interactive",
			description:
				"Learn from wherever you are. Interactive cybersecurity sessions delivered online, designed to be practical rather than just theoretical.",
			points: [
				"Students & Professionals",
				"Communities & Institutions",
				"Live Online Format"
			],
			buttonText: "Let's Talk",
			displayOrder: 2,
			isActive: true
		},
		{
			id: "9c7d8363-4a0c-4304-89e9-8855fc897c9d",
			serviceNumber: 3,
			title: "Offline Workshops",
			badge: "Hands-On",
			description:
				"Learn it. Experience it. Remember it. Hands-on workshops where cybersecurity moves beyond the screen and into the room.",
			points: [
				"Schools & Colleges",
				"Universities & Organizations",
				"In-person format"
			],
			buttonText: "Let's Talk",
			displayOrder: 3,
			isActive: true
		},
		{
			id: "95db456d-9c3b-4a54-8a26-3ae34c8140ca",
			serviceNumber: 4,
			title: "Awareness Sessions",
			badge: "Awareness",
			description:
				"Because security starts with awareness. Interactive sessions designed to help people recognize and respond to everyday cyber threats.",
			points: [
				"Phishing & social engineering",
				"Passwords & scams",
				"Data protection"
			],
			buttonText: "Let's Talk",
			displayOrder: 4,
			isActive: true
		},
		{
			id: "69e30ea2-7401-4722-be82-b82bc4ec80ea",
			serviceNumber: 5,
			title: "Career Guidance",
			badge: "Guidance",
			description:
				"You don't need to have it all figured out. You just need to know where to start.",
			points: [
				"Career direction & Learning roadmap",
				"Skills & Projects",
				"Resume & Interview preparation"
			],
			buttonText: "Let's Talk",
			displayOrder: 5,
			isActive: true
		},
		{
			id: "c3de9dcd-e98e-4757-a862-e32604a6f778",
			serviceNumber: 6,
			title: "Speaking & Keynotes",
			badge: "Keynotes",
			description:
				"Sometimes, one conversation can change the way you see things. Talks designed to educate, motivate, and create curiosity.",
			points: [
				"Conferences & Seminars",
				"Corporate & College events",
				"Student communities"
			],
			buttonText: "Let's Talk",
			displayOrder: 6,
			isActive: true
		}
	]
};
