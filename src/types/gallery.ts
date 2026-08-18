export interface Gallery {
  id: string;
  image: string;
  caption: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}