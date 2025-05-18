
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

// This edge function will fetch schemes from myscheme.gov.in and save them to the database
Deno.serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting sync-schemes function')

    // Now we'll call our fetch-myscheme-api function to get comprehensive scheme data
    const fetchResponse = await supabase.functions.invoke('fetch-myscheme-api');
    
    if (!fetchResponse.data || fetchResponse.error) {
      throw new Error(`Error calling fetch-myscheme-api: ${fetchResponse.error?.message || 'Unknown error'}`);
    }

    console.log(`Sync completed via fetch-myscheme-api function: ${fetchResponse.data.message}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: fetchResponse.data.message,
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in sync-schemes function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
