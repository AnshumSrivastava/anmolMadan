export type ServiceSection = {
  id: string;

  section_heading: string;
  main_heading: string;
  description: string;

  created_at?: string;
  updated_at?: string;
};

export type ServiceItem = {
  id: string;

  service_id: string;

  service_number: number;

  title: string;
  badge: string;

  description: string;

  point_1: string;
  point_2: string;
  point_3: string;

  button_text: string;

  display_order: number;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
};