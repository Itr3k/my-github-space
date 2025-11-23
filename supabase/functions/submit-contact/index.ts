import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  areaOfInterest?: string;
  message: string;
  source: 'contact' | 'consultation';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const submission: ContactSubmission = await req.json();

    // Validate required fields
    if (!submission.name || !submission.email || !submission.message || !submission.source) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submission.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Sanitize and trim inputs
    const sanitizedData = {
      name: submission.name.trim().substring(0, 100),
      email: submission.email.trim().toLowerCase().substring(0, 255),
      company: submission.company?.trim().substring(0, 100) || null,
      area_of_interest: submission.areaOfInterest?.trim().substring(0, 100) || null,
      message: submission.message.trim().substring(0, 2000),
      source: submission.source,
    };

    console.log('Storing contact submission:', { 
      email: sanitizedData.email, 
      source: sanitizedData.source 
    });

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([sanitizedData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Contact submission stored successfully:', data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message. We\'ll get back to you soon!',
        id: data.id 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in submit-contact function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
