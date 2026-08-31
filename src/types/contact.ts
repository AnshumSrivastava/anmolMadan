/* ============================================================
   CONTACT LINKS (DYNAMIC)
============================================================ */

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  icon_name: string;
  sort_order: number;
}

/* ============================================================
   CONTACT CONTENT
============================================================ */

export interface ContactContent {
  id: string;

  email: string;
  email_description: string | null;

  whatsapp: string;
  whatsapp_description: string | null;

  linkedin: string;
  linkedin_description: string | null;

  booking_link: string;
  booking_description: string | null;

  phone: string | null;
  phone_description: string | null;

  instagram: string | null;
  instagram_description: string | null;

  updated_at: string;
}

/* ============================================================
   CONTACT MESSAGES
============================================================ */

export type MessageStatus = "New" | "Contacted" | "Completed";

export interface ContactMessage {
  id: string;

  full_name: string;
  organization: string | null;

  email: string;
  phone: string | null;

  session_type: string | null;
  preferred_date: string | null;

  message: string | null;

  status: MessageStatus;

  created_at: string;
}

/* ============================================================
   VISITOR CONTACT FORM
============================================================ */

export interface ContactFormData {
  full_name: string;
  organization?: string | null;

  email: string;
  phone?: string | null;

  session_type?: string | null;
  preferred_date?: string | null;

  message?: string | null;
}

/* ============================================================
   CONTACT CMS UPDATE
============================================================ */

export interface UpdateContactContent {
  email: string;
  email_description?: string | null;

  whatsapp: string;
  whatsapp_description?: string | null;

  linkedin: string;
  linkedin_description?: string | null;

  booking_link: string;
  booking_description?: string | null;

  phone?: string | null;
  phone_description?: string | null;

  instagram?: string | null;
  instagram_description?: string | null;
}