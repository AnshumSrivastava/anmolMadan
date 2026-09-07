import { heroData, type HeroData } from "./hero";
import { aboutData, type AboutData } from "./about";
import { servicesData, type ServicesSectionData } from "./services";
import { testimonialsData, type TestimonialVideo } from "./testimonials";
import { visionData, type VisionData } from "./vision";
import { noteData, type NoteData } from "./note";
import { contactData, type ContactData } from "./contact";
import { experiencesData, type ExperienceItem } from "./experience";

export interface SiteData {
	hero: HeroData;
	about: AboutData;
	services: ServicesSectionData;
	testimonials: TestimonialVideo[];
	vision: VisionData;
	note: NoteData;
	contact: ContactData;
	experiences: ExperienceItem[];
}

export const siteData: SiteData = {
	hero: heroData,
	about: aboutData,
	services: servicesData,
	testimonials: testimonialsData,
	vision: visionData,
	note: noteData,
	contact: contactData,
	experiences: experiencesData
};

export * from "./hero";
export * from "./about";
export * from "./services";
export * from "./testimonials";
export * from "./vision";
export * from "./note";
export * from "./contact";
export * from "./experience";
