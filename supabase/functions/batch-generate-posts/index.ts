import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const REPLACEMENT_TOPICS = [
  {
    topic: "5 Enterprise AI Tools Transforming Business in 2026",
    details: "Cover Microsoft Copilot, Claude, Jasper, Synthesia, and Descript with specific features, pricing, and enterprise use cases",
    category: "AI Tips"
  },
  {
    topic: "AI Governance Checklist: Your 2026 Compliance Roadmap",
    details: "Cover EU AI Act enforcement timeline (2025-2026), NIST AI RMF 2.0, ISO 42001 certification requirements, and specific compliance steps",
    category: "AI Consulting"
  },
  {
    topic: "Voice AI for Customer Service: A Complete 2026 Implementation Guide",
    details: "Cover ElevenLabs, Amazon Lex, Google CCAI with specific features, integration steps, costs, and real-world implementation examples",
    category: "AI Services"
  },
  {
    topic: "How RAG Systems Are Revolutionizing Enterprise Knowledge Management in 2025",
    details: "Cover technical architecture, vector databases (Pinecone, Weaviate, Qdrant), embedding models, and real enterprise implementation examples",
    category: "AI in the Workplace"
  },
  {
    topic: "AI Cost Optimization: Reducing Your LLM Spending in 2026",
    details: "Cover model selection strategies (GPT-4 vs Claude vs open source), caching, prompt optimization, and real cost comparisons with actual pricing",
    category: "AI Thought Leadership"
  },
  {
    topic: "Building Your First AI Workflow Automation: n8n vs Make vs Zapier (2025 Comparison)",
    details: "Cover specific feature comparisons, pricing tiers, integration counts, and step-by-step implementation guide for common automation use cases",
    category: "AI Services"
  },
  {
    topic: "The Executive's Guide to AI Risk Assessment for 2026",
    details: "Cover specific risk frameworks (NIST AI RMF, ISO 31000), risk categories, assessment methodologies, mitigation strategies, and board-level reporting",
    category: "AI Consulting"
  }
];

const CATEGORY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  "AI Tips": { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "AI Consulting": { color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  "AI in the Workplace": { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "AI Thought Leadership": { color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  "AI Services": { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  "AI News": { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" }
};

interface BlogContent {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  metaDescription: string;
  metaKeywords: string;
}

async function generateBlogContent(topic: string, details: string, category: string, lovableApiKey: string): Promise<BlogContent> {
  console.log(`Generating content for: ${topic}`);
  
  const systemPrompt = `You are an expert AI content writer for Elevated AI, an enterprise AI consulting firm. Write clear, practical, actionable content focused on business value and ROI. Use specific examples, real tools, and concrete data. Avoid buzzwords and hype.`;

  const userPrompt = `Write a blog post about: ${topic}

Details to include: ${details}

Category: ${category}

Requirements:
- Title: SEO-optimized, 50-60 characters
- Excerpt: Compelling summary, 150-160 characters  
- Content: Use H2 (##) and H3 (###) headings, bullet points with bold lead-ins, include a Pro Tip blockquote. Be SPECIFIC with real tool names, real pricing, real features.
- Tags: 5-7 relevant keywords
- Read time: Estimate based on content length
- Meta description: 155 characters max
- Meta keywords: Comma-separated SEO keywords`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      tools: [{
        type: "function",
        function: {
          name: "create_blog_post",
          description: "Create a complete blog post with all required fields",
          parameters: {
            type: "object",
            properties: {
              title: { 
                type: "string", 
                description: "SEO-optimized title, 50-60 characters" 
              },
              excerpt: { 
                type: "string", 
                description: "Compelling summary, 150-160 characters" 
              },
              content: { 
                type: "string", 
                description: "Full article content in HTML format with h2, h3, p, ul, li, blockquote tags. Must be 1000-1500 words with specific details." 
              },
              tags: { 
                type: "array", 
                items: { type: "string" },
                description: "5-7 relevant keyword tags"
              },
              readTime: { 
                type: "string", 
                description: "Estimated read time, e.g. '8 min read'" 
              },
              metaDescription: { 
                type: "string", 
                description: "SEO meta description, max 155 characters" 
              },
              metaKeywords: { 
                type: "string", 
                description: "Comma-separated SEO keywords" 
              }
            },
            required: ["title", "excerpt", "content", "tags", "readTime", "metaDescription", "metaKeywords"],
            additionalProperties: false
          }
        }
      }],
      tool_choice: { type: "function", function: { name: "create_blog_post" } }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`AI API error: ${error}`);
    throw new Error(`AI generation failed: ${response.status}`);
  }

  const data = await response.json();
  
  // Extract tool call arguments
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall || toolCall.function.name !== "create_blog_post") {
    console.error("Unexpected response format:", JSON.stringify(data).substring(0, 500));
    throw new Error("No tool call in response");
  }
  
  const args = JSON.parse(toolCall.function.arguments);
  console.log(`Generated: "${args.title}"`);
  
  return {
    title: args.title,
    excerpt: args.excerpt,
    content: args.content,
    tags: args.tags,
    readTime: args.readTime,
    metaDescription: args.metaDescription,
    metaKeywords: args.metaKeywords
  };
}

async function generateBlogImage(title: string, category: string, lovableApiKey: string): Promise<string> {
  console.log(`Generating image for: ${title.substring(0, 40)}...`);
  
  const imagePrompt = `Professional business photography for blog: "${title}". 
Style: Modern corporate office, natural lighting, high-quality stock photo.
Subject: Professional business people or modern office technology for ${category}.
Mood: Confident, innovative, forward-thinking.
16:9 aspect ratio, photorealistic.
NO abstract AI visuals, neural networks, or sci-fi elements.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: imagePrompt }],
      modalities: ["image", "text"]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Image API error: ${errorText}`);
    throw new Error(`Image generation failed: ${response.status}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
    console.error("No image in response:", JSON.stringify(data).substring(0, 500));
    throw new Error("No image URL in response");
  }
  
  return imageUrl;
}

async function uploadImageToStorage(supabase: any, base64Image: string, filename: string): Promise<string> {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filename, imageBuffer, {
      contentType: 'image/png',
      upsert: true
    });
  
  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }
  
  const { data: urlData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filename);
  
  return urlData.publicUrl;
}

// Use a fallback image if image generation fails
const FALLBACK_IMAGES: Record<string, string> = {
  "AI Tips": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
  "AI Consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop",
  "AI in the Workplace": "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=630&fit=crop",
  "AI Thought Leadership": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop",
  "AI Services": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=630&fit=crop",
  "AI News": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop"
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Starting batch generation of ${REPLACEMENT_TOPICS.length} posts...`);
    
    const results: { topic: string; status: string; postId?: number; error?: string }[] = [];
    
    for (let i = 0; i < REPLACEMENT_TOPICS.length; i++) {
      const { topic, details, category } = REPLACEMENT_TOPICS[i];
      console.log(`\n[${i + 1}/${REPLACEMENT_TOPICS.length}] Processing: ${topic}`);
      
      try {
        // Generate content using tool calling
        const blogContent = await generateBlogContent(topic, details, category, lovableApiKey);
        
        // Try to generate image, use fallback if fails
        let imageUrl: string;
        try {
          const base64Image = await generateBlogImage(blogContent.title, category, lovableApiKey);
          const filename = `batch-${Date.now()}-${i}.png`;
          imageUrl = await uploadImageToStorage(supabase, base64Image, filename);
          console.log(`Image uploaded successfully`);
        } catch (imgError) {
          console.warn(`Image generation failed, using fallback: ${imgError}`);
          imageUrl = FALLBACK_IMAGES[category] || FALLBACK_IMAGES["AI Tips"];
        }
        
        // Generate slug
        const { data: slugData } = await supabase.rpc('generate_slug', { title: blogContent.title });
        const slug = slugData || blogContent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);
        
        // Get category styles
        const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES["AI Tips"];
        
        // Insert post
        const { data: post, error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title: blogContent.title,
            excerpt: blogContent.excerpt,
            content: blogContent.content,
            category,
            read_time: blogContent.readTime,
            image: imageUrl,
            tags: blogContent.tags,
            slug,
            status: 'published',
            date: new Date().toISOString().split('T')[0],
            meta_description: blogContent.metaDescription,
            meta_keywords: blogContent.metaKeywords,
            color: styles.color,
            bg: styles.bg,
            border: styles.border
          })
          .select('id, title')
          .single();
        
        if (insertError) {
          throw new Error(`Insert failed: ${insertError.message}`);
        }
        
        console.log(`SUCCESS: Post ID ${post.id} - ${post.title}`);
        results.push({ topic: blogContent.title, status: 'success', postId: post.id });
        
        // Delay between posts
        if (i < REPLACEMENT_TOPICS.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`FAILED [${i + 1}]: ${errorMessage}`);
        results.push({ topic, status: 'failed', error: errorMessage });
      }
    }
    
    const successCount = results.filter(r => r.status === 'success').length;
    const failCount = results.filter(r => r.status === 'failed').length;
    
    console.log(`\n=== BATCH COMPLETE ===`);
    console.log(`Success: ${successCount}, Failed: ${failCount}`);
    
    return new Response(JSON.stringify({
      message: `Batch generation complete`,
      summary: { total: REPLACEMENT_TOPICS.length, success: successCount, failed: failCount },
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Batch generation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});