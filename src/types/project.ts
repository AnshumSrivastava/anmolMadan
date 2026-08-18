export interface Project {
  id: string;

  title: string;

  slug: string;

  category: string;

  year: number;

  description: string;

  github: string | null;

  live_link: string | null;

  featured: boolean;

  sort_order: number;

  created_at: string;

  updated_at: string;
}