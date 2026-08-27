export type Project = {
  id: string;

  lesson_title: string;

  description: string;

  institution_name: string;

  duration: string;

  image_url: string | null;

  institution_logo_url: string | null;

  sort_order: number;

  created_at: string;

  updated_at: string;

  images?: ProjectImage[];

  testimonials?: ProjectTestimonial[];
};

export type ProjectImage = {
  id: string;

  project_id: string;

  image_url: string;

  sort_order: number;

  created_at?: string;
};

export type ProjectTestimonial = {
  id: string;

  project_id: string;

  quote: string;

  author_name: string | null;

  author_role: string | null;

  sort_order: number;

  created_at: string;

  updated_at: string;
};