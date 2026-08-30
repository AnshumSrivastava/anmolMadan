export type Testimonial = {
  id: string;
  client_name: string;
  designation: string;
  company: string;
  photo: string | null;
  message: string;
  sort_order: number;
  is_active: boolean;
  status?: "pending" | "approved" | "rejected";

  created_at?: string;
  updated_at?: string;
};