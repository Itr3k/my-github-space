import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables without crashing
// if import.meta.env is undefined (e.g. in some test/build environments)
const getEnvVar = (key: string) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || '';
    }
  } catch (e) {
    console.warn('Error accessing environment variable:', key);
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Create the client with actual keys or placeholders.
// Using placeholders prevents the app from crashing on startup if keys are missing.
// API calls will simply fail (which is fine since we are defaulting to Mock Data currently).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
