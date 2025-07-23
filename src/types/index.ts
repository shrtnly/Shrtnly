export interface Link {
  id: string;
  original_url: string;
  short_code: string;
  title: string | null;
  description: string | null;
  click_count: number;
  created_at: string;
  created_by: string | null;
  created_ip: string | null;
  expires_at: string | null;
  is_active: boolean;
}

export interface CreateLinkData {
  original_url: string;
  short_code?: string;
  title?: string;
  description?: string;
  created_ip?: string | null;
  expires_at?: string;
}

export interface FocusOptions {
  preventScroll?: boolean;
  restore?: boolean;
}