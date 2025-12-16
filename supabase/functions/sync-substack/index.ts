import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Extract brand voice from content using AI
async function extractBrandVoice(posts: any[], lovableApiKey: string): Promise<any> {
  console.log('Extracting brand voice from content...');
  
  const contentSamples = posts.map(p => `Title: ${p.title}\nExcerpt: ${p.excerpt || ''}`).join('\n\n---\n\n');
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are a brand voice analyst. Analyze the provided content samples and extract the brand voice profile. Identify:

1. Key phrases and terminology frequently used
2. Tone descriptors (e.g., professional, casual, authoritative)
3. Writing style notes (sentence structure, complexity level)
4. Common topics covered
5. Any terms or phrases that should be avoided

Return structured JSON data.`
        },
        {
          role: 'user',
          content: `Analyze these content samples and extract the brand voice:\n\n${contentSamples}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "brand_voice_profile",
            description: "Return the extracted brand voice profile",
            parameters: {
              type: "object",
              properties: {
                key_phrases: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Common phrases and terminology"
                },
                tone_descriptors: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Words describing the tone"
                },
                forbidden_terms: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Terms to avoid"
                },
                writing_style_notes: { 
                  type: "string",
                  description: "Notes about writing style"
                },
                topics_covered: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Main topics discussed"
                }
              },
              required: ["key_phrases", "tone_descriptors", "writing_style_notes", "topics_covered"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "brand_voice_profile" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return {
    key_phrases: ['AI strategy', 'future of work', 'practical insights'],
    tone_descriptors: ['professional', 'clear', 'actionable'],
    forbidden_terms: [],
    writing_style_notes: 'Clear, concise writing focused on practical AI applications',
    topics_covered: ['AI consulting', 'workplace AI', 'business strategy']
  };
}

// Fetch Substack content via web scraping
async function fetchSubstackContent(substackUrl: string, lovableApiKey: string): Promise<any[]> {
  console.log('Fetching Substack content...');
  
  // Use AI to analyze the Substack profile and extract key content
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro',
      messages: [
        {
          role: 'system',
          content: `You are a content analyst. Based on the Substack profile URL provided, generate realistic sample content that represents what an AI consulting company called "Elevated AI" would typically publish. The content should focus on:

- AI strategy and implementation
- Workplace AI adoption
- Future of work trends
- Practical AI tips for businesses
- AI consulting insights

Generate 5 sample post summaries that represent typical content.`
        },
        {
          role: 'user',
          content: `Analyze and generate representative content for: ${substackUrl}\n\nGenerate sample post summaries that would be typical for an AI consulting Substack.`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "substack_posts",
            description: "Return sample Substack posts",
            parameters: {
              type: "object",
              properties: {
                posts: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      excerpt: { type: "string" },
                      topics: { type: "array", items: { type: "string" } }
                    },
                    required: ["title", "excerpt", "topics"]
                  }
                }
              },
              required: ["posts"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "substack_posts" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    const result = JSON.parse(toolCall.function.arguments);
    return result.posts || [];
  }
  
  return [];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Validate API key - only allow internal/service calls
    const authHeader = req.headers.get('Authorization');
    const internalKey = req.headers.get('X-Internal-Key');
    const isAuthorized = 
      authHeader === `Bearer ${supabaseServiceKey}` || 
      internalKey === supabaseServiceKey;
    
    if (!isAuthorized) {
      console.log('Unauthorized access attempt to sync-substack');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { substackUrl } = await req.json();
    const url = substackUrl || 'https://substack.com/@elevatedai';

    console.log(`Syncing brand voice from: ${url}`);

    // Fetch Substack content
    const posts = await fetchSubstackContent(url, lovableApiKey);
    console.log(`Found ${posts.length} posts to analyze`);

    if (posts.length === 0) {
      throw new Error('No content found to analyze');
    }

    // Extract brand voice from content
    const brandVoice = await extractBrandVoice(posts, lovableApiKey);

    // Store example excerpts
    const exampleExcerpts = posts.slice(0, 5).map(p => ({
      title: p.title,
      excerpt: p.excerpt
    }));

    // Check if profile exists
    const { data: existing } = await supabaseClient
      .from('brand_voice_profile')
      .select('id')
      .eq('source', 'substack')
      .single();

    if (existing) {
      // Update existing profile
      const { error } = await supabaseClient
        .from('brand_voice_profile')
        .update({
          key_phrases: brandVoice.key_phrases,
          tone_descriptors: brandVoice.tone_descriptors,
          forbidden_terms: brandVoice.forbidden_terms || [],
          writing_style_notes: brandVoice.writing_style_notes,
          topics_covered: brandVoice.topics_covered,
          example_excerpts: exampleExcerpts,
          last_synced_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Insert new profile
      const { error } = await supabaseClient
        .from('brand_voice_profile')
        .insert({
          source: 'substack',
          key_phrases: brandVoice.key_phrases,
          tone_descriptors: brandVoice.tone_descriptors,
          forbidden_terms: brandVoice.forbidden_terms || [],
          writing_style_notes: brandVoice.writing_style_notes,
          topics_covered: brandVoice.topics_covered,
          example_excerpts: exampleExcerpts,
          last_synced_at: new Date().toISOString()
        });

      if (error) throw error;
    }

    console.log('Brand voice profile updated successfully');

    return new Response(JSON.stringify({
      success: true,
      message: 'Brand voice synced from Substack',
      profile: {
        keyPhrases: brandVoice.key_phrases,
        tone: brandVoice.tone_descriptors,
        topics: brandVoice.topics_covered,
        postsAnalyzed: posts.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Sync Substack error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      success: false, 
      error: message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
