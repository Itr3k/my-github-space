import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReviewResult {
  score: number;
  issues: string[];
  corrections: string[];
  reasoning: string;
}

interface EditorReview {
  factCheck: ReviewResult;
  seoAudit: ReviewResult;
  brandVoice: ReviewResult;
  engagement: ReviewResult;
  overallScore: number;
  editedContent: string;
  shouldAutoPublish: boolean;
}

// Fetch brand voice profile from database
async function getBrandVoiceProfile(supabaseClient: any): Promise<any> {
  const { data, error } = await supabaseClient
    .from('brand_voice_profile')
    .select('*')
    .order('last_synced_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error || !data) {
    console.log('No brand voice profile found, using defaults');
    return {
      key_phrases: ['AI strategy', 'future of work', 'practical insights', 'business transformation'],
      tone_descriptors: ['professional', 'clear', 'actionable', 'thought-provoking'],
      forbidden_terms: ['synergy', 'leverage', 'paradigm shift'],
      writing_style_notes: 'Clear, practical insights on AI and business strategy. Focus on actionable advice with real-world examples.',
      topics_covered: ['AI consulting', 'workplace AI', 'AI strategy', 'digital transformation']
    };
  }
  
  return data;
}

// Get top performing posts for engagement comparison
async function getTopPerformingPosts(supabaseClient: any): Promise<any[]> {
  const { data, error } = await supabaseClient
    .from('blog_posts')
    .select('id, title, category, views, excerpt')
    .order('views', { ascending: false })
    .limit(5);
  
  return data || [];
}

// Fact-checking module
async function performFactCheck(content: string, title: string, lovableApiKey: string): Promise<ReviewResult> {
  console.log('Performing fact check...');
  
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
          content: `You are a fact-checking editor for AI and business content. Your job is to:
1. Identify any factual claims, statistics, or assertions
2. Flag any claims that seem unverifiable or potentially incorrect
3. Note any missing citations or sources that should be added
4. Check for logical consistency

Respond in JSON format:
{
  "score": 0-100,
  "issues": ["list of factual issues found"],
  "corrections": ["suggested corrections"],
  "reasoning": "brief explanation of the review"
}`
        },
        {
          role: 'user',
          content: `Review this blog post for factual accuracy:\n\nTitle: ${title}\n\nContent:\n${content}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "fact_check_result",
            description: "Return the fact-checking results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score from 0-100" },
                issues: { type: "array", items: { type: "string" }, description: "List of factual issues" },
                corrections: { type: "array", items: { type: "string" }, description: "Suggested corrections" },
                reasoning: { type: "string", description: "Brief explanation" }
              },
              required: ["score", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "fact_check_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { score: 75, issues: [], corrections: [], reasoning: 'Unable to perform detailed fact check' };
}

// SEO/AEO audit module
async function performSEOAudit(content: string, title: string, excerpt: string, metaDescription: string, tags: string[], lovableApiKey: string): Promise<ReviewResult> {
  console.log('Performing SEO/AEO audit...');
  
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
          content: `You are an SEO and AEO (Answer Engine Optimization) specialist. Analyze blog posts for:

SEO Factors:
- Title optimization (60 chars max, keyword placement)
- Meta description quality (160 chars max, compelling)
- Heading structure (H1, H2, H3 hierarchy)
- Keyword density and placement
- Internal/external linking opportunities
- Image alt text suggestions

AEO Factors (for AI assistants and featured snippets):
- Clear, direct answers to questions
- Structured data opportunities
- FAQ-style content blocks
- Definition formatting
- List and step formatting

Respond in JSON format with score (0-100), issues, corrections, and reasoning.`
        },
        {
          role: 'user',
          content: `Analyze this blog post for SEO/AEO optimization:\n\nTitle: ${title}\nExcerpt: ${excerpt}\nMeta Description: ${metaDescription || 'Not provided'}\nTags: ${tags?.join(', ') || 'None'}\n\nContent:\n${content.substring(0, 5000)}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "seo_audit_result",
            description: "Return the SEO/AEO audit results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number" },
                issues: { type: "array", items: { type: "string" } },
                corrections: { type: "array", items: { type: "string" } },
                reasoning: { type: "string" }
              },
              required: ["score", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "seo_audit_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { score: 70, issues: [], corrections: [], reasoning: 'Unable to perform SEO audit' };
}

// Brand voice consistency module
async function checkBrandVoice(content: string, title: string, brandVoice: any, lovableApiKey: string): Promise<ReviewResult> {
  console.log('Checking brand voice consistency...');
  
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
          content: `You are a brand voice editor. Compare content against the established brand voice profile and check for consistency.

Brand Voice Profile:
- Key Phrases: ${brandVoice.key_phrases?.join(', ') || 'AI strategy, practical insights'}
- Tone: ${brandVoice.tone_descriptors?.join(', ') || 'professional, clear, actionable'}
- Forbidden Terms: ${brandVoice.forbidden_terms?.join(', ') || 'synergy, leverage'}
- Style Notes: ${brandVoice.writing_style_notes || 'Clear, practical insights on AI and business'}
- Topics: ${brandVoice.topics_covered?.join(', ') || 'AI consulting, workplace AI'}

Check for:
1. Tone consistency with brand voice
2. Use of forbidden terms
3. Alignment with typical topics
4. Professional quality
5. Engagement level

Return JSON with score, issues, corrections, and reasoning.`
        },
        {
          role: 'user',
          content: `Check this content against the brand voice:\n\nTitle: ${title}\n\nContent:\n${content.substring(0, 4000)}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "brand_voice_result",
            description: "Return brand voice check results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number" },
                issues: { type: "array", items: { type: "string" } },
                corrections: { type: "array", items: { type: "string" } },
                reasoning: { type: "string" }
              },
              required: ["score", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "brand_voice_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { score: 80, issues: [], corrections: [], reasoning: 'Unable to check brand voice' };
}

// Engagement prediction module
async function predictEngagement(content: string, title: string, topPosts: any[], lovableApiKey: string): Promise<ReviewResult> {
  console.log('Predicting engagement...');
  
  const topPostsSummary = topPosts.map(p => `- "${p.title}" (${p.views} views)`).join('\n');
  
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
          content: `You are an engagement analyst. Predict how well a blog post will perform based on:

Top Performing Posts:
${topPostsSummary || 'No historical data available'}

Analyze:
1. Headline appeal and click-worthiness
2. Topic relevance and timeliness
3. Content structure and readability
4. Call-to-action strength
5. Shareability potential

Suggest alternative headlines if the current one could be improved.
Return JSON with score (predicted engagement 0-100), issues, corrections (including headline alternatives), and reasoning.`
        },
        {
          role: 'user',
          content: `Predict engagement for:\n\nTitle: ${title}\n\nContent preview:\n${content.substring(0, 2000)}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "engagement_result",
            description: "Return engagement prediction results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number" },
                issues: { type: "array", items: { type: "string" } },
                corrections: { type: "array", items: { type: "string" } },
                reasoning: { type: "string" }
              },
              required: ["score", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "engagement_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { score: 75, issues: [], corrections: [], reasoning: 'Unable to predict engagement' };
}

// Apply corrections to content
async function applyCorrections(content: string, allCorrections: string[], lovableApiKey: string): Promise<string> {
  if (allCorrections.length === 0) return content;
  
  console.log('Applying corrections to content...');
  
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
          content: `You are an editor. Apply the suggested corrections to the content while maintaining the overall structure and voice. Return ONLY the corrected HTML content, no explanations.`
        },
        {
          role: 'user',
          content: `Apply these corrections:\n${allCorrections.join('\n')}\n\nTo this content:\n${content}`
        }
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || content;
}

// Save review to database
async function saveReview(supabaseClient: any, blogPostId: number, review: EditorReview, originalContent: string) {
  const { error } = await supabaseClient
    .from('editor_reviews')
    .insert({
      blog_post_id: blogPostId,
      review_type: 'full_review',
      original_content: originalContent,
      edited_content: review.editedContent,
      issues_found: [
        ...review.factCheck.issues,
        ...review.seoAudit.issues,
        ...review.brandVoice.issues,
        ...review.engagement.issues
      ],
      corrections_made: [
        ...review.factCheck.corrections,
        ...review.seoAudit.corrections,
        ...review.brandVoice.corrections,
        ...review.engagement.corrections
      ],
      score: review.overallScore,
      ai_reasoning: JSON.stringify({
        factCheck: review.factCheck.reasoning,
        seoAudit: review.seoAudit.reasoning,
        brandVoice: review.brandVoice.reasoning,
        engagement: review.engagement.reasoning
      })
    });

  if (error) {
    console.error('Error saving review:', error);
  }
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
      console.log('Unauthorized access attempt to editor-agent');
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

    const { blogPostId, content, title, excerpt, metaDescription, tags } = await req.json();

    if (!blogPostId || !content || !title) {
      throw new Error('Missing required fields: blogPostId, content, title');
    }

    console.log(`Starting editorial review for post ${blogPostId}: "${title}"`);

    // Fetch brand voice profile and top posts
    const [brandVoice, topPosts] = await Promise.all([
      getBrandVoiceProfile(supabaseClient),
      getTopPerformingPosts(supabaseClient)
    ]);

    // Run all reviews in parallel
    const [factCheck, seoAudit, brandVoiceCheck, engagement] = await Promise.all([
      performFactCheck(content, title, lovableApiKey),
      performSEOAudit(content, title, excerpt, metaDescription, tags, lovableApiKey),
      checkBrandVoice(content, title, brandVoice, lovableApiKey),
      predictEngagement(content, title, topPosts, lovableApiKey)
    ]);

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      (factCheck.score * 0.3) +
      (seoAudit.score * 0.25) +
      (brandVoiceCheck.score * 0.25) +
      (engagement.score * 0.2)
    );

    // Collect all corrections
    const allCorrections = [
      ...factCheck.corrections,
      ...seoAudit.corrections,
      ...brandVoiceCheck.corrections
    ];

    // Apply corrections if score is above threshold
    let editedContent = content;
    if (overallScore >= 60 && allCorrections.length > 0) {
      editedContent = await applyCorrections(content, allCorrections, lovableApiKey);
    }

    const review: EditorReview = {
      factCheck,
      seoAudit,
      brandVoice: brandVoiceCheck,
      engagement,
      overallScore,
      editedContent,
      shouldAutoPublish: overallScore >= 80
    };

    // Save review to database
    await saveReview(supabaseClient, blogPostId, review, content);

    // Update blog post with edited content if auto-publish
    if (review.shouldAutoPublish) {
      const { error: updateError } = await supabaseClient
        .from('blog_posts')
        .update({ 
          content: editedContent,
          status: 'published'
        })
        .eq('id', blogPostId);

      if (updateError) {
        console.error('Error updating blog post:', updateError);
      }
    } else {
      // Mark for manual review
      const { error: updateError } = await supabaseClient
        .from('blog_posts')
        .update({ status: 'review' })
        .eq('id', blogPostId);

      if (updateError) {
        console.error('Error marking post for review:', updateError);
      }
    }

    console.log(`Review complete. Overall score: ${overallScore}. Auto-publish: ${review.shouldAutoPublish}`);

    return new Response(JSON.stringify({
      success: true,
      review: {
        overallScore,
        factCheck: { score: factCheck.score, issueCount: factCheck.issues.length },
        seoAudit: { score: seoAudit.score, issueCount: seoAudit.issues.length },
        brandVoice: { score: brandVoiceCheck.score, issueCount: brandVoiceCheck.issues.length },
        engagement: { score: engagement.score, issueCount: engagement.issues.length },
        shouldAutoPublish: review.shouldAutoPublish,
        totalIssues: factCheck.issues.length + seoAudit.issues.length + brandVoiceCheck.issues.length + engagement.issues.length,
        totalCorrections: allCorrections.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Editor agent error:', error);
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
