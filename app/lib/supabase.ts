import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key'
);

export interface Room {
  code: string;
  store: string;
  p1_suit_color: string;
  p2_suit_color: string | null;
  p1_done: boolean;
  p2_done: boolean;
  p1_score: number;
  p1_hearts: number;
  p1_total: number;
  p2_score: number;
  p2_hearts: number;
  p2_total: number;
  created_at: string;
}
