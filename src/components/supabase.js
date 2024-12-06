// src/supabase.js (or wherever you initialize Supabase)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dzarhwsceiabckbirrvp.supabase.co'; // Your Supabase URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6YXJod3NjZWlhYmNrYmlycnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzIxMDUsImV4cCI6MjA0ODU0ODEwNX0.kFAglE6oIhxXT13luGeYsoihOvuF6TN6A7C0rlv8VkU'; // Your Supabase Anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
