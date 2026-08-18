export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};