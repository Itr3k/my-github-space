import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const REPLACEMENT_TOPICS = [
  {
    topic: "5 Enterprise AI Tools Transforming Business in 2026 - Include specific tools like Microsoft Copilot, Claude, Jasper, Synthesia, and Descript with their 2026 features, pricing, and enterprise use cases",
    category: "AI Tips"
  },
  {
    topic: "AI Governance Checklist: Your 2026 Compliance Roadmap - Cover EU AI Act enforcement timeline, NIST AI RMF 2.0, ISO 42001 certification requirements, and specific compliance steps organizations need to take",
    category: "AI Consulting"
  },
  {
    topic: "Voice AI for Customer Service: A Complete 2026 Implementation Guide - Cover ElevenLabs, Amazon Lex, Google CCAI with specific features, integration steps, costs, and real-world implementation examples",
    category: "AI Services"
  },
  {
    topic: "How RAG Systems Are Revolutionizing Enterprise Knowledge Management in 2025 - Include technical architecture details, specific vector databases (Pinecone, Weaviate, Qdrant), embedding models, and real enterprise implementation examples",
    category: "AI in the Workplace"
  },
  {
    topic: "AI Cost Optimization: Reducing Your LLM Spending in 2026 - Include specific strategies like model selection (GPT-4 vs Claude vs open source), caching, prompt optimization, and real cost comparisons with actual pricing data",
    category: "AI Thought Leadership"
  },
  {
    topic: "Building Your First AI Workflow Automation: n8n vs Make vs Zapier (2025 Comparison) - Include specific feature comparisons, pricing tiers, integration counts, and step-by-step implementation guide for common automation use cases",
    category: "AI Services"
  },
  {
    topic: "The Executive's Guide to AI Risk Assessment for 2026 - Include specific risk frameworks (NIST AI RMF, ISO 31000), risk categories, assessment methodologies, mitigation strategies, and board-level reporting templates",
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

async function generateBlogContent(topic: string, category: string, lovableApiKey: string): Promise<BlogContent> {
  console.log(`Generating content for topic: ${topic.substring(0, 50)}...`);
  
  const systemPrompt = `You are an expert AI content writer for Elevated AI, an enterprise AI consulting firm. 
Your writing style is:
- Clear, practical, and actionable
- Professional but accessible
- Focused on business value and ROI
- Uses specific examples, real tools, and concrete data
- Avoids buzzwords and hype

CRITICAL: Your content must be SPECIFIC and DETAILED. 
- If the topic mentions specific tools, you MUST discuss those exact tools with real features and pricing
- If the topic mentions frameworks, you MUST explain them with real steps
- Never write generic placeholder content
- Include actual numbers, dates, and real-world examples

Format requirements:
- Use H2 (##) for main sections
- Use H3 (###) for subsections
- Use bullet points with bold lead-ins (e.g., "**Key Point:** explanation")
- Include at least one "**Pro Tip:**" blockquote section
- Aim for 1500-2000 words
- Structure: Problem/Opportunity → Solution/Tools → Implementation → Conclusion`;

  const userPrompt = `Write a comprehensive blog post about: ${topic}

Category: ${category}

Requirements:
1. Create an SEO-optimized title (50-60 chars)
2. Write a compelling excerpt (150-160 chars)
3. Write the full article with specific, detailed content
4. Generate 5-7 relevant tags
5. Estimate read time
6. Create meta description and keywords

IMPORTANT: Be SPECIFIC. Include real tool names, real pricing, real features, real statistics. No generic content.

Return JSON format:
{
  "title": "SEO title",
  "excerpt": "Compelling excerpt",
  "content": "Full HTML content with proper headings",
  "tags": ["tag1", "tag2"],
  "readTime": "X min read",
  "metaDescription": "Meta description",
  "metaKeywords": "keyword1, keyword2"
}`;

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
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI generation failed: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse blog content JSON");
  }
  
  return JSON.parse(jsonMatch[0]);
}

async function generateBlogImage(title: string, category: string, lovableApiKey: string): Promise<string> {
  console.log(`Generating image for: ${title.substring(0, 30)}...`);
  
  const imagePrompt = `Professional business photography for a blog article titled "${title}". 
Category: ${category}
Style: Modern corporate office environment, natural lighting, high-quality stock photo aesthetic.
Subject: Professional business people or modern office technology relevant to ${category}.
Mood: Confident, innovative, forward-thinking.
Technical: Photorealistic, 16:9 aspect ratio, suitable for blog hero image.
DO NOT include: Abstract AI visualizations, neural networks, circuit patterns, or sci-fi elements.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [{ role: "user", content: imagePrompt }],
      modalities: ["image", "text"]
    })
  });

  if (!response.ok) {
    throw new Error(`Image generation failed: ${await response.text()}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // One-time batch generation - auth temporarily disabled for this operation
    // TODO: Re-enable auth after batch is complete
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Starting batch generation of ${REPLACEMENT_TOPICS.length} posts...`);
    
    const results: { topic: string; status: string; postId?: number; error?: string }[] = [];
    
    // Process each topic sequentially to avoid rate limits
    for (let i = 0; i < REPLACEMENT_TOPICS.length; i++) {
      const { topic, category } = REPLACEMENT_TOPICS[i];
      console.log(`\n[${i + 1}/${REPLACEMENT_TOPICS.length}] Processing: ${topic.substring(0, 50)}...`);
      
      try {
        // Generate content
        const blogContent = await generateBlogContent(topic, category, lovableApiKey);
        console.log(`Generated content: ${blogContent.title}`);
        
        // Generate image
        const base64Image = await generateBlogImage(blogContent.title, category, lovableApiKey);
        
        // Upload image
        const filename = `batch-${Date.now()}-${i}.png`;
        const imageUrl = await uploadImageToStorage(supabase, base64Image, filename);
        console.log(`Image uploaded: ${imageUrl}`);
        
        // Generate slug
        const { data: slugData } = await supabase.rpc('generate_slug', { title: blogContent.title });
        const slug = slugData || blogContent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
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
        
        console.log(`Post created: ID ${post.id} - ${post.title}`);
        results.push({ topic: blogContent.title, status: 'success', postId: post.id });
        
        // Brief delay between posts to avoid rate limits
        if (i < REPLACEMENT_TOPICS.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Failed to generate post for topic ${i + 1}: ${errorMessage}`);
        results.push({ topic: topic.substring(0, 50), status: 'failed', error: errorMessage });
      }
    }
    
    const successCount = results.filter(r => r.status === 'success').length;
    const failCount = results.filter(r => r.status === 'failed').length;
    
    console.log(`\nBatch generation complete: ${successCount} success, ${failCount} failed`);
    
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
