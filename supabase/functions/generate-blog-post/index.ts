import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Blog categories to rotate through
const CATEGORIES = [
  "AI in the Workplace",
  "AI Consulting", 
  "AI Tips",
  "AI Thought Leadership",
  "AI Services",
  "AI News"
];

// Topic ideas for each category
const TOPIC_IDEAS: Record<string, string[]> = {
  "AI in the Workplace": [
    "How AI is Revolutionizing Employee Productivity in 2025",
    "5 Ways to Integrate AI Tools Into Your Daily Workflow",
    "The Future of Human-AI Collaboration in Modern Offices",
    "Building an AI-Ready Workforce: Training Strategies That Work",
    "AI-Powered Decision Making: Transforming Business Operations"
  ],
  "AI Consulting": [
    "What to Look for When Hiring an AI Consultant",
    "ROI of AI Implementation: Real Case Studies from 2025",
    "Common AI Implementation Mistakes and How to Avoid Them",
    "The AI Consulting Process: From Assessment to Deployment",
    "Why Every Business Needs an AI Strategy in 2025"
  ],
  "AI Tips": [
    "10 ChatGPT Prompts That Will Transform Your Productivity",
    "How to Choose the Right AI Tool for Your Business Needs",
    "Maximizing AI Output: Advanced Prompting Techniques",
    "AI Security Best Practices Every Business Should Follow",
    "Quick Wins: AI Implementations You Can Do This Week"
  ],
  "AI Thought Leadership": [
    "The Ethical Implications of AI in Business Decision Making",
    "AI Trends That Will Define the Next Decade",
    "Why AI Adoption Is No Longer Optional for Business Growth",
    "The Human Element in an AI-Driven World",
    "Preparing Your Organization for the AI Revolution"
  ],
  "AI Services": [
    "Custom AI Solutions vs. Off-the-Shelf: Which Is Right for You?",
    "Understanding AI-as-a-Service: Benefits and Considerations",
    "How AI Automation Can Save Your Business Thousands",
    "The Complete Guide to AI Integration Services",
    "Measuring Success: KPIs for AI Implementation Projects"
  ],
  "AI News": [
    "Latest AI Breakthroughs and What They Mean for Your Business",
    "Regulatory Updates: New AI Laws You Need to Know",
    "Top AI Tools Released This Month: A Business Review",
    "Industry Giants Embrace AI: Lessons for Small Businesses",
    "AI Market Trends: Where the Industry Is Heading"
  ]
};

// Color schemes for different categories
const CATEGORY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  "AI in the Workplace": { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "AI Consulting": { color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  "AI Tips": { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  "AI Thought Leadership": { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "AI Services": { color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  "AI News": { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" }
};

async function generateBlogContent(topic: string, category: string, lovableApiKey: string): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
  readTime: string;
}> {
  console.log(`Generating blog content for topic: ${topic}`);
  
  const systemPrompt = `You are an expert SEO and AEO (Answer Engine Optimization) content writer for Elevated AI, a leading AI consulting company based in Los Angeles, California. 

Your task is to write professional, engaging, and highly optimized blog posts about AI topics for business professionals.

IMPORTANT GUIDELINES:
- Write in a professional yet approachable tone
- Use proper heading structure (H2, H3) for SEO
- Include actionable insights and real-world examples
- Optimize for featured snippets and answer boxes
- Target business decision-makers and executives
- Include statistics and data where relevant
- Write 1200-1500 words of substantive content
- Use short paragraphs for readability

OUTPUT FORMAT (JSON):
{
  "title": "SEO-optimized title (max 60 chars)",
  "excerpt": "Compelling meta description (max 155 chars)",
  "content": "Full HTML content with proper heading tags (h2, h3), paragraphs, lists, and formatting",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaDescription": "SEO meta description (max 155 chars)",
  "metaKeywords": "comma, separated, keywords",
  "readTime": "X min read"
}`;

  const userPrompt = `Write a comprehensive, SEO-optimized blog post about: "${topic}"

Category: ${category}

Requirements:
1. Create an engaging, clickable title optimized for search
2. Write a compelling excerpt that drives clicks
3. Structure content with H2 and H3 headings for featured snippets
4. Include an introduction, 4-5 main sections, and a conclusion
5. Add bullet points and numbered lists where appropriate
6. Include a call-to-action mentioning Elevated AI's consulting services
7. Generate 5 relevant SEO tags
8. Estimate realistic read time

The content should establish Elevated AI as a thought leader in AI consulting.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI content generation failed:", response.status, errorText);
    throw new Error(`AI content generation failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error("No content generated from AI");
  }

  console.log("Content generated successfully");
  return JSON.parse(content);
}

async function generateBlogImage(title: string, category: string, lovableApiKey: string): Promise<string> {
  console.log(`Generating image for: ${title}`);
  
  const imagePrompt = `Professional business blog header image for an article titled "${title}". 
Category: ${category}. 
Style: Modern, clean, corporate, technology-focused. 
Elements: Abstract AI visualization, neural networks, futuristic tech patterns, professional blue and purple gradient tones.
Aspect ratio: 16:9 landscape format.
Quality: Ultra high resolution, suitable for web publishing.
NO text or words in the image.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        { role: "user", content: imagePrompt }
      ],
      modalities: ["image", "text"]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Image generation failed:", response.status, errorText);
    throw new Error(`Image generation failed: ${response.status}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
    console.error("No image URL in response:", JSON.stringify(data));
    throw new Error("No image generated from AI");
  }

  console.log("Image generated successfully");
  return imageUrl;
}

async function uploadImageToStorage(
  supabaseClient: any,
  base64Image: string,
  filename: string
): Promise<string> {
  console.log(`Uploading image: ${filename}`);
  
  // Extract base64 data (remove data:image/png;base64, prefix if present)
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  const { data, error } = await supabaseClient.storage
    .from('blog-images')
    .upload(filename, imageBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabaseClient.storage
    .from('blog-images')
    .getPublicUrl(filename);

  console.log("Image uploaded successfully:", urlData.publicUrl);
  return urlData.publicUrl;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body for optional custom topic/category
    let customTopic: string | null = null;
    let customCategory: string | null = null;
    
    try {
      const body = await req.json();
      customTopic = body.topic || null;
      customCategory = body.category || null;
    } catch {
      // No body provided, use random selection
    }

    // Select category (use custom or pick random)
    const category = customCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    // Select topic (use custom or pick random from category)
    const categoryTopics = TOPIC_IDEAS[category] || TOPIC_IDEAS["AI Tips"];
    const topic = customTopic || categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
    
    console.log(`Selected category: ${category}, topic: ${topic}`);

    // Generate blog content
    const blogContent = await generateBlogContent(topic, category, lovableApiKey);
    
    // Generate featured image
    const base64Image = await generateBlogImage(blogContent.title, category, lovableApiKey);
    
    // Upload image to storage
    const timestamp = Date.now();
    const filename = `blog-${timestamp}.png`;
    const imageUrl = await uploadImageToStorage(supabase, base64Image, filename);

    // Get category styles
    const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES["AI Tips"];
    
    // Format date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    // Insert blog post into database
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: blogContent.title,
        excerpt: blogContent.excerpt,
        category: category,
        read_time: blogContent.readTime,
        image: imageUrl,
        content: blogContent.content,
        tags: blogContent.tags,
        meta_description: blogContent.metaDescription,
        meta_keywords: blogContent.metaKeywords,
        date: dateStr,
        status: 'published',
        color: styles.color,
        bg: styles.bg,
        border: styles.border,
        author_name: 'Elevated AI Team',
        author_role: 'AI Consulting Experts',
        author_image: '/placeholder.svg',
        views: 0
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error(`Failed to save blog post: ${insertError.message}`);
    }

    console.log("Blog post created successfully:", post.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Blog post generated and published successfully",
        post: {
          id: post.id,
          title: post.title,
          category: post.category,
          image: post.image
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error generating blog post:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
