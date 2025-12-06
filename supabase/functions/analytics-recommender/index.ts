import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TopicRecommendation {
  topic_title: string;
  category: string;
  reasoning: string;
  trending_score: number;
  keywords: string[];
}

// Get analytics data and top performing posts
async function getPerformanceData(supabaseClient: any): Promise<{
  topPosts: any[];
  categoryPerformance: Record<string, number>;
  recentTopics: string[];
}> {
  // Get top performing posts
  const { data: topPosts } = await supabaseClient
    .from('blog_posts')
    .select('id, title, category, views, tags, created_at')
    .order('views', { ascending: false })
    .limit(10);

  // Get recent posts to avoid repetition
  const { data: recentPosts } = await supabaseClient
    .from('blog_posts')
    .select('title, category')
    .order('created_at', { ascending: false })
    .limit(20);

  // Calculate category performance
  const categoryPerformance: Record<string, number> = {};
  (topPosts || []).forEach((post: any) => {
    if (!categoryPerformance[post.category]) {
      categoryPerformance[post.category] = 0;
    }
    categoryPerformance[post.category] += post.views || 0;
  });

  return {
    topPosts: topPosts || [],
    categoryPerformance,
    recentTopics: (recentPosts || []).map((p: any) => p.title)
  };
}

// Get brand voice profile for context
async function getBrandVoice(supabaseClient: any): Promise<any> {
  const { data } = await supabaseClient
    .from('brand_voice_profile')
    .select('topics_covered, key_phrases')
    .order('last_synced_at', { ascending: false })
    .limit(1)
    .single();

  return data || { topics_covered: [], key_phrases: [] };
}

// Generate topic recommendations using AI
async function generateRecommendations(
  performanceData: any,
  brandVoice: any,
  lovableApiKey: string
): Promise<TopicRecommendation[]> {
  console.log('Generating topic recommendations...');

  const topPostsSummary = performanceData.topPosts
    .map((p: any) => `- "${p.title}" (${p.views} views, category: ${p.category})`)
    .join('\n');

  const categoryStats = Object.entries(performanceData.categoryPerformance)
    .map(([cat, views]) => `- ${cat}: ${views} total views`)
    .join('\n');

  const recentTopicsList = performanceData.recentTopics.slice(0, 10).join('\n- ');

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
          content: `You are a content strategist for an AI consulting company. Based on performance data and brand voice, recommend new blog topics that:

1. Build on what's performing well
2. Fill content gaps
3. Are NOT repetitive of recent topics
4. Align with current AI trends and news
5. Match the brand voice and expertise areas

Brand Topics: ${brandVoice.topics_covered?.join(', ') || 'AI consulting, workplace AI, AI strategy'}
Brand Phrases: ${brandVoice.key_phrases?.join(', ') || 'practical insights, future of work'}

Generate 5 unique, non-repetitive topic recommendations with reasoning based on performance data.`
        },
        {
          role: 'user',
          content: `Based on this performance data, recommend 5 new blog topics:

TOP PERFORMING POSTS:
${topPostsSummary || 'No data yet'}

CATEGORY PERFORMANCE:
${categoryStats || 'No data yet'}

RECENT TOPICS TO AVOID:
- ${recentTopicsList || 'None'}

Generate fresh, unique topics that will perform well based on this data.`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "topic_recommendations",
            description: "Return topic recommendations",
            parameters: {
              type: "object",
              properties: {
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      topic_title: { type: "string" },
                      category: { type: "string" },
                      reasoning: { type: "string" },
                      trending_score: { type: "number" },
                      keywords: { type: "array", items: { type: "string" } }
                    },
                    required: ["topic_title", "category", "reasoning", "trending_score", "keywords"]
                  }
                }
              },
              required: ["recommendations"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "topic_recommendations" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    const result = JSON.parse(toolCall.function.arguments);
    return result.recommendations || [];
  }
  
  return [];
}

// Store recommendations in database
async function storeRecommendations(
  supabaseClient: any,
  recommendations: TopicRecommendation[],
  topPostId?: number
): Promise<void> {
  for (const rec of recommendations) {
    const { error } = await supabaseClient
      .from('topic_recommendations')
      .insert({
        topic_title: rec.topic_title,
        category: rec.category,
        reasoning: rec.reasoning,
        trending_score: rec.trending_score,
        keywords: rec.keywords,
        similar_to_post_id: topPostId || null,
        status: 'pending'
      });

    if (error) {
      console.error('Error storing recommendation:', error);
    }
  }
}

// Get pending recommendations
async function getPendingRecommendations(supabaseClient: any): Promise<any[]> {
  const { data } = await supabaseClient
    .from('topic_recommendations')
    .select('*')
    .eq('status', 'pending')
    .order('trending_score', { ascending: false })
    .limit(10);

  return data || [];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'generate';

    if (action === 'get') {
      // Return pending recommendations
      const recommendations = await getPendingRecommendations(supabaseClient);
      return new Response(JSON.stringify({
        success: true,
        recommendations
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'approve' && body.recommendationId) {
      // Approve a recommendation
      const { error } = await supabaseClient
        .from('topic_recommendations')
        .update({ status: 'approved' })
        .eq('id', body.recommendationId);

      if (error) throw error;

      return new Response(JSON.stringify({
        success: true,
        message: 'Recommendation approved'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'reject' && body.recommendationId) {
      // Reject a recommendation
      const { error } = await supabaseClient
        .from('topic_recommendations')
        .update({ status: 'rejected' })
        .eq('id', body.recommendationId);

      if (error) throw error;

      return new Response(JSON.stringify({
        success: true,
        message: 'Recommendation rejected'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Default: generate new recommendations
    console.log('Generating new topic recommendations...');

    const [performanceData, brandVoice] = await Promise.all([
      getPerformanceData(supabaseClient),
      getBrandVoice(supabaseClient)
    ]);

    const recommendations = await generateRecommendations(
      performanceData,
      brandVoice,
      lovableApiKey
    );

    console.log(`Generated ${recommendations.length} recommendations`);

    // Store recommendations
    const topPostId = performanceData.topPosts[0]?.id;
    await storeRecommendations(supabaseClient, recommendations, topPostId);

    return new Response(JSON.stringify({
      success: true,
      message: `Generated ${recommendations.length} topic recommendations`,
      recommendations: recommendations.map(r => ({
        title: r.topic_title,
        category: r.category,
        score: r.trending_score
      })),
      analytics: {
        topCategories: Object.entries(performanceData.categoryPerformance)
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .slice(0, 3)
          .map(([cat, views]) => ({ category: cat, views })),
        totalPostsAnalyzed: performanceData.topPosts.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Analytics recommender error:', error);
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
