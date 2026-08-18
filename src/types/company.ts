export interface Company {
  id: string;
  company_name: string;
  role: string;
  description: string | null;
  website: string | null;
  start_date: string;
  end_date: string | null;
  current_company: boolean;
  sort_order: number;
}