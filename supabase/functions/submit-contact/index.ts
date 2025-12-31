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

    // Send to Pipedream webhooks for Notion CRM and Outlook integration
    const pipedreamPayload = {
      id: data.id,
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      areaOfInterest: sanitizedData.area_of_interest,
      message: sanitizedData.message,
      source: sanitizedData.source,
      submittedAt: new Date().toISOString(),
    };

    // Send to Notion CRM webhook
    const notionWebhookUrl = Deno.env.get('PIPEDREAM_NOTION_WEBHOOK_URL');
    if (notionWebhookUrl) {
      try {
        const notionResponse = await fetch(notionWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pipedreamPayload),
        });
        console.log('Pipedream Notion webhook response:', notionResponse.status);
      } catch (webhookError) {
        console.error('Error sending to Notion webhook:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    // Send to Outlook webhook (for meeting requests from consultation form)
    const outlookWebhookUrl = Deno.env.get('PIPEDREAM_OUTLOOK_WEBHOOK_URL');
    if (outlookWebhookUrl && sanitizedData.source === 'consultation') {
      try {
        const outlookResponse = await fetch(outlookWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pipedreamPayload),
        });
        console.log('Pipedream Outlook webhook response:', outlookResponse.status);
      } catch (webhookError) {
        console.error('Error sending to Outlook webhook:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

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
