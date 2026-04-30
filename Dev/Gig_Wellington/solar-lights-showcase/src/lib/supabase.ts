import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isConfigured = supabaseUrl && 
                     supabaseAnonKey && 
                     supabaseUrl !== 'your_supabase_url_here' &&
                     supabaseUrl.startsWith('http');

// Create a dummy client if not configured to prevent errors
export const supabase: SupabaseClient = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

export const isSupabaseConfigured = isConfigured;

export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  image_url: string;
  show_price: boolean;
  created_at: string;
};
