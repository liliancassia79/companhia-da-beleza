import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/"/g, '') || "https://chvcdqdmxxgvkgunytun.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.replace(/"/g, '') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNodmNkcWRteHhndmtndW55dHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODAyMzIsImV4cCI6MjA5NDU1NjIzMn0.H5gvMBoIXFt6yhogyThJCM4f5o058d6RWjDcOfSd3DQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
