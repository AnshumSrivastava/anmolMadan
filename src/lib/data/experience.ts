export interface ExperienceImage {
	id: string;
	imageUrl: string;
	sortOrder: number;
}

export interface ExperienceTestimonial {
	id: string;
	quote: string;
	authorName: string | null;
	authorRole: string | null;
	sortOrder: number;
}

export interface ExperienceItem {
	id: string;
	lessonTitle: string;
	description: string;
	institutionName: string;
	duration: string;
	imageUrl: string | null;
	institutionLogoUrl: string | null;
	sortOrder: number;
	images?: ExperienceImage[];
	testimonials?: ExperienceTestimonial[];
}

export const experiencesData: ExperienceItem[] = [];
