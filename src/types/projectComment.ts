export type ProjectComment = {
  id: string;
  project_id: string;
  author_name: string;
  comment: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at?: string;
};
