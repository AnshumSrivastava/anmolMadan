export interface TestimonialVideo {
	id: string;
	caption: string;
	url: string;
	sortOrder: number;
}

export const testimonialsData: TestimonialVideo[] = [
	{
		id: "7180e0d4-e11d-4272-8999-4e23addc56ea",
		caption: "Cybersecurity Awareness & Key Insights",
		sortOrder: 1,
		url: "https://youtube.com/shorts/sEDtYVs0EZc?feature=share"
	},
	{
		id: "81bcb10c-2d73-4260-abfa-4919b3bfbf0b",
		caption: "Interactive Student Session & Reaction",
		sortOrder: 2,
		url: "https://youtube.com/shorts/PMabjo7T52k?feature=share"
	}
];

export function extractYouTubeId(input: string): string {
	if (!input) return "";
	const trimmed = input.trim();
	const iframeMatch = trimmed.match(/src=["'](.*?)["']/);
	const target = iframeMatch && iframeMatch[1] ? iframeMatch[1] : trimmed;

	const match = target.match(
		/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
	);

	if (match && match[1]) return match[1];
	return "";
}

export function getEmbedUrl(videoId: string, autoplay = true): string {
	if (!videoId) return "";
	return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${
		autoplay ? "&autoplay=1" : ""
	}`;
}

export function getThumbnailUrl(videoId: string): string {
	if (!videoId) return "";
	return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
