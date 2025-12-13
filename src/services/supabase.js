// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client configuration
 * - supabaseUrl: seu projeto Supabase
 * - supabaseAnonKey: chave anon (frontend)
 *
 * Nota: ANON key pode ser usada no frontend, nunca exponha a service_role em client-side.
 */

const supabaseUrl = "https://rxxpulnpdkhvogmkcsjl.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eHB1bG5wZGtodm9nbWtjc2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODAyMDIsImV4cCI6MjA4MDk1NjIwMn0.1oaOka-9yWFo27NoPSEHZtKypsHYdUMiqbyCfVWmEHs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
