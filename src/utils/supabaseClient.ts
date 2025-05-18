
import { createClient } from '@supabase/supabase-js';

// Normally we would use environment variables, but we're using direct URLs for this demo
let supabaseClient: any = null;

// This function checks if the Supabase client is connected
export const isSupabaseConnected = () => {
  return !!supabaseClient;
};

// This function gets the Supabase client, creating it if it doesn't exist
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    // For security reasons, in a production app, these values should come from environment variables
    // For this demo, we're logging a warning instead
    console.warn("Please connect to Supabase using Lovable's integration. Using demo mode for now.");
  }
  return supabaseClient;
};

// This function initializes the Supabase client with the provided URL and key
// This would typically be called when the Supabase integration is connected
export const initSupabaseClient = (supabaseUrl: string, supabaseKey: string) => {
  if (supabaseUrl && supabaseKey) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    return true;
  }
  return false;
};

// Supabase table structure for reference:
/*
schemes:
  - id (text, primary key)
  - title (text)
  - description (text)
  - category (text)
  - category_id (text, foreign key to categories.id)
  - ministry (text)
  - deadline (text)
  - eligibility_text (text)
  - eligibility (json)
  - launch_date (text)
  - is_popular (boolean)
  - benefit_amount (text)
  - documents (array)
  - tags (array)
  - application_url (text)
  - scheme_code (text)
  - funding_ministry (text)
  - state (text)
  - implementing_agency (text)
  - beneficiaries (text)
  - objective (text)
  - created_at (timestamp)
  - updated_at (timestamp)

scheme_applications:
  - id (uuid, primary key)
  - scheme_id (text, foreign key to schemes.id)
  - name (text)
  - email (text)
  - phone (text)
  - address (text)
  - city (text)
  - state (text)
  - id_type (text)
  - id_number (text)
  - additional_info (text)
  - status (text)
  - documents (json)
  - created_at (timestamp)
  - updated_at (timestamp)
*/
