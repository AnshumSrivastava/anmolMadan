export interface NoteData {
	id: string;
	eyebrow: string;
	heading: string;
	quote: string;
	paragraphs: string[];
	authorName: string;
	authorTitle: string;
	isVisible: boolean;
}

export const noteData: NoteData = {
	id: "default-note",
	eyebrow: "Personal Philosophy",
	heading: "A Note From Me to You",
	quote:
		"Technology moves fast, but the greatest defense will always be the instincts you and I build together.",
	paragraphs: [
		"When I first stepped into cybersecurity, I noticed how detached and intimidating it felt. Most guidance treated you like a liability—burying real awareness under dry checklists that were easy to ignore. I knew you deserved something much better.",
		"My goal with you is simple: cut through the jargon, remove the fear, and turn security into practical instincts you can trust every day. Whether we're in an auditorium together or having a one-on-one conversation, I'm here to build genuine confidence with you so you always feel in control of your digital world."
	],
	authorName: "Anmol Madan",
	authorTitle: "Cybersecurity Specialist & Motivational Speaker",
	isVisible: true
};
