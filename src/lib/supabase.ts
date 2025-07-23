import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      links: {
        Row: {
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
          user_id: string | null;
        };
        Insert: {
          id?: string;
          original_url: string;
          short_code: string;
          title?: string | null;
          description?: string | null;
          click_count?: number;
          created_at?: string;
          created_by?: string | null;
          created_ip?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          original_url?: string;
          short_code?: string;
          title?: string | null;
          description?: string | null;
          click_count?: number;
          created_at?: string;
          created_by?: string | null;
          created_ip?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          user_id?: string | null;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      link_analytics: {
        Row: {
          id: string;
          link_id: string | null;
          user_id: string | null;
          event_type: string;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          link_id?: string | null;
          user_id?: string | null;
          event_type: string;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          link_id?: string | null;
          user_id?: string | null;
          event_type?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
      };
      auth_tokens: {
        Row: {
          id: string;
          user_id: string;
          token_hash: string;
          token_type: string;
          expires_at: string;
          used_at: string | null;
          created_at: string;
          ip_address: string | null;
          user_agent: string | null;
          attempts: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          token_hash: string;
          token_type: string;
          expires_at: string;
          used_at?: string | null;
          created_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          attempts?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          token_hash?: string;
          token_type?: string;
          expires_at?: string;
          used_at?: string | null;
          created_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          attempts?: number;
        };
      };
      auth_security_logs: {
        Row: {
          id: string;
          user_id: string | null;
          event_type: string;
          event_data: any;
          ip_address: string | null;
          user_agent: string | null;
          success: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          event_type: string;
          event_data?: any;
          ip_address?: string | null;
          user_agent?: string | null;
          success?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          event_type?: string;
          event_data?: any;
          ip_address?: string | null;
          user_agent?: string | null;
          success?: boolean;
          created_at?: string;
        };
      };
    };
  };
};