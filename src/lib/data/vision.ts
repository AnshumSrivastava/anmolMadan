export interface UspItem {
	title: string;
	description: string;
}

export interface VisionData {
	id: string;
	sectionHeading: string;
	mainHeading: string;
	description: string;
	usps: UspItem[];
	closingStatement: string;
	imageUrl: string;
	fallbackImageUrl: string;
}

export const visionData: VisionData = {
	id: "c7e877e9-d90a-4d46-a141-8a686b86d4d4",
	sectionHeading: "MY VISION",
	mainHeading: "Cybersecurity should become a mindset, not just a skill.",
	description:
		"A world where cybersecurity isn't something people think about only after something goes wrong. The future of security is not only about stronger systems, it's about people who are aware, responsible, and prepared.",
	usps: [
		{
			title: "Knowledge Over Fear",
			description:
				"I believe knowledge should create confidence, not fear. I simplify without oversimplifying, and teach without intimidating, so you feel capable of making better decisions in the digital world."
		},
		{
			title: "Learning Should Be Experienced",
			description:
				"I don't want you to simply listen to cybersecurity. I want you to experience it, through practical demonstrations, real-world examples, and interactive activities that make the lesson feel real."
		},
		{
			title: "The Human Element",
			description:
				"Behind every device is a person. Behind every account is a life. I don't just focus on systems and threats, I focus on the people who use them. That's who cybersecurity is really for."
		}
	],
	closingStatement: "Anyone can teach a concept. I focus on making it stay with you.",
	imageUrl: "/images/vision_illustration.png",
	fallbackImageUrl:
		"https://qtwduupxhsxrsniicswk.supabase.co/storage/v1/object/public/vision/vision-08489cd1-4f9c-4d84-ac4d-ef93b8ca9222.png"
};
