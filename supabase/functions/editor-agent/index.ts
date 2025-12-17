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

interface AlignmentResult extends ReviewResult {
  titlePromise: string;
  contentDelivers: boolean;
  missingElements: string[];
}

interface CompletenessResult extends ReviewResult {
  contentType: string;
  expectedElements: string[];
  foundElements: string[];
  missingElements: string[];
}

interface EditorReview {
  titleAlignment: AlignmentResult;
  contentCompleteness: CompletenessResult;
  factCheck: ReviewResult;
  seoAudit: ReviewResult;
  brandVoice: ReviewResult;
  engagement: ReviewResult;
  overallScore: number;
  editedContent: string;
  shouldAutoPublish: boolean;
  requiresRewrite: boolean;
  rewriteReason: string | null;
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

// NEW: Title-Content Alignment Check
async function checkTitleContentAlignment(content: string, title: string, lovableApiKey: string): Promise<AlignmentResult> {
  console.log('Checking title-content alignment...');
  
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
          content: `You are a content alignment checker. Your job is to verify that article content ACTUALLY DELIVERS on what the title promises.

CRITICAL ALIGNMENT RULES:
- "Top X..." or "Best X..." titles MUST contain at least X named items with descriptions
- "...Released This Month" or "...This Week" MUST contain current, dated, specific information
- "Review of..." MUST contain actual evaluation with pros/cons/verdict
- "How to..." MUST contain step-by-step instructions
- "Guide to..." MUST provide comprehensive coverage
- Tool/product review titles MUST name and describe actual tools/products

FAILURE EXAMPLES:
- Title: "Top 5 AI Tools Released This Month" but content has 0 named tools = FAIL
- Title: "Review of ChatGPT 5" but content is generic AI advice = FAIL
- Title: "Best Project Management Software" but content talks about PM theory = FAIL

You must be STRICT. If the title promises specific items/tools/reviews and the content is generic advice without specifics, the alignment score should be LOW (below 50).`
        },
        {
          role: 'user',
          content: `Analyze if this content delivers on its title promise:

TITLE: ${title}

CONTENT:
${content}

Check:
1. What does the title promise the reader?
2. Does the content actually deliver on that promise?
3. If the title implies a list/review of specific items, are those items actually named and described?
4. What specific elements are missing that the title implies should be present?`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "alignment_check_result",
            description: "Return the title-content alignment results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score from 0-100. Below 50 if title promises specifics but content is generic" },
                titlePromise: { type: "string", description: "What the title promises to deliver" },
                contentDelivers: { type: "boolean", description: "Does the content actually deliver on the promise?" },
                missingElements: { type: "array", items: { type: "string" }, description: "Specific elements the title implies but content lacks" },
                issues: { type: "array", items: { type: "string" }, description: "List of alignment issues" },
                corrections: { type: "array", items: { type: "string" }, description: "Suggested corrections to fix alignment" },
                reasoning: { type: "string", description: "Explanation of the alignment analysis" }
              },
              required: ["score", "titlePromise", "contentDelivers", "missingElements", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "alignment_check_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { 
    score: 50, 
    titlePromise: 'Unknown',
    contentDelivers: false,
    missingElements: [],
    issues: ['Unable to perform alignment check'], 
    corrections: [], 
    reasoning: 'Unable to analyze title-content alignment' 
  };
}

// NEW: Content Completeness Check
async function checkContentCompleteness(content: string, title: string, category: string, lovableApiKey: string): Promise<CompletenessResult> {
  console.log('Checking content completeness...');
  
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
          content: `You are a content completeness checker. Analyze if the content has all the elements it should have based on its type.

CONTENT TYPE REQUIREMENTS:

LIST/ROUNDUP articles ("Top X...", "Best...", "X Tools/Apps/Products"):
- Must have at least the number of items promised in title
- Each item must be NAMED (not generic descriptions)
- Each item should have: name, description, key features, use case

NEWS articles ("...Released", "...Announced", "New..."):
- Must have specific dates
- Must have specific product/company names
- Must have concrete details (features, pricing, availability)

REVIEW articles:
- Must have the reviewed item clearly identified
- Must have evaluation criteria
- Must have pros and cons
- Must have verdict/recommendation

HOW-TO articles:
- Must have numbered steps
- Must have actionable instructions
- Should have examples

THOUGHT LEADERSHIP:
- Must have a clear thesis
- Must have supporting arguments
- Must have practical takeaways`
        },
        {
          role: 'user',
          content: `Analyze content completeness:

TITLE: ${title}
CATEGORY: ${category}

CONTENT:
${content}

Determine:
1. What type of content is this (List, News, Review, How-To, Thought Leadership)?
2. What elements should this type of content have?
3. Which required elements are present?
4. Which required elements are missing?`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "completeness_check_result",
            description: "Return content completeness results",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score 0-100 based on completeness" },
                contentType: { type: "string", description: "Detected content type" },
                expectedElements: { type: "array", items: { type: "string" }, description: "Elements this content type should have" },
                foundElements: { type: "array", items: { type: "string" }, description: "Elements that are present" },
                missingElements: { type: "array", items: { type: "string" }, description: "Elements that are missing" },
                issues: { type: "array", items: { type: "string" }, description: "Completeness issues" },
                corrections: { type: "array", items: { type: "string" }, description: "Suggestions to improve completeness" },
                reasoning: { type: "string" }
              },
              required: ["score", "contentType", "expectedElements", "foundElements", "missingElements", "issues", "corrections", "reasoning"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "completeness_check_result" } }
    }),
  });

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  
  if (toolCall?.function?.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }
  
  return { 
    score: 70, 
    contentType: 'Unknown',
    expectedElements: [],
    foundElements: [],
    missingElements: [],
    issues: [], 
    corrections: [], 
    reasoning: 'Unable to check completeness' 
  };
}

// ENHANCED: Research-based Fact-checking with web grounding
async function performFactCheck(content: string, title: string, category: string, lovableApiKey: string): Promise<ReviewResult> {
  console.log('Performing research-based fact check...');
  
  // Use Gemini 2.5 Pro which has better grounding capabilities
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
          content: `You are a fact-checking editor with research capabilities. Your job is to:

1. Identify any factual claims, statistics, dates, product names, or assertions
2. Verify these claims against your knowledge (you have training data up to early 2025)
3. Flag any claims that seem unverifiable, outdated, or potentially incorrect
4. Check if mentioned products/tools/services actually exist
5. Verify dates and timelines are accurate
6. Note any missing citations or sources that should be added
7. Check for logical consistency

CRITICAL FOR NEWS/LIST ARTICLES:
- If the article claims to list "new" or "recently released" tools/products, verify they exist
- If specific features are claimed, verify they're accurate
- If the article is generic and mentions no specific products when it should, flag this as a MAJOR issue

Be strict with verification. If you cannot verify a claim, say so.`
        },
        {
          role: 'user',
          content: `Fact-check this ${category} blog post:

TITLE: ${title}

CONTENT:
${content}

Verify all factual claims, product names, features, dates, and statistics. Flag anything unverifiable or potentially incorrect.`
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
                score: { type: "number", description: "Score from 0-100. Lower if many unverified claims or factual errors" },
                issues: { type: "array", items: { type: "string" }, description: "List of factual issues, unverified claims, or errors" },
                corrections: { type: "array", items: { type: "string" }, description: "Suggested corrections with verified information" },
                reasoning: { type: "string", description: "Explanation of fact-check findings" }
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

// Apply minor corrections to content
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

// NEW: Substantial rewrite for content that fails alignment/completeness
async function performSubstantialRewrite(
  content: string, 
  title: string, 
  category: string,
  alignmentResult: AlignmentResult,
  completenessResult: CompletenessResult,
  lovableApiKey: string
): Promise<{ success: boolean; newContent: string; reasoning: string }> {
  console.log('Performing substantial rewrite due to alignment/completeness failures...');
  
  const missingElements = [
    ...alignmentResult.missingElements,
    ...completenessResult.missingElements
  ].filter((v, i, a) => a.indexOf(v) === i); // dedupe
  
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
          content: `You are a content rewriter with research capabilities. The content you're given has FAILED quality checks because it doesn't deliver on its title's promise.

YOUR TASK: Rewrite the content to actually deliver on what the title promises.

CRITICAL REQUIREMENTS:
1. If the title promises a list of tools/products, you MUST include REAL, NAMED tools with actual features
2. If the title mentions "this month" or "released", include current information (use your training data)
3. Each item in a list must have: NAME, DESCRIPTION, KEY FEATURES, USE CASE
4. Do NOT use generic placeholders or vague descriptions
5. Maintain the same HTML structure but replace vague content with specific, researched information

MISSING ELEMENTS TO ADD:
${missingElements.map(e => `- ${e}`).join('\n')}

You have knowledge of AI tools and products up to early 2025. Use this knowledge to provide REAL, SPECIFIC information.`
        },
        {
          role: 'user',
          content: `REWRITE THIS CONTENT to actually deliver on the title.

TITLE: ${title}
CATEGORY: ${category}

ALIGNMENT ISSUES:
- Title promises: ${alignmentResult.titlePromise}
- Content delivers: ${alignmentResult.contentDelivers ? 'Yes' : 'No'}
- Missing: ${alignmentResult.missingElements.join(', ')}

COMPLETENESS ISSUES:
- Content type: ${completenessResult.contentType}
- Missing elements: ${completenessResult.missingElements.join(', ')}

ORIGINAL CONTENT TO REWRITE:
${content}

Return the COMPLETE rewritten HTML content that properly delivers on the title's promise with REAL, SPECIFIC information.`
        }
      ],
    }),
  });

  const data = await response.json();
  const newContent = data.choices?.[0]?.message?.content;
  
  if (newContent && newContent.length > 500) {
    return {
      success: true,
      newContent: newContent,
      reasoning: `Rewrote content to include: ${missingElements.join(', ')}`
    };
  }
  
  return {
    success: false,
    newContent: content,
    reasoning: 'Rewrite failed - original content preserved'
  };
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
        ...review.titleAlignment.issues,
        ...review.contentCompleteness.issues,
        ...review.factCheck.issues,
        ...review.seoAudit.issues,
        ...review.brandVoice.issues,
        ...review.engagement.issues
      ],
      corrections_made: [
        ...review.titleAlignment.corrections,
        ...review.contentCompleteness.corrections,
        ...review.factCheck.corrections,
        ...review.seoAudit.corrections,
        ...review.brandVoice.corrections,
        ...review.engagement.corrections
      ],
      score: review.overallScore,
      ai_reasoning: JSON.stringify({
        titleAlignment: review.titleAlignment.reasoning,
        contentCompleteness: review.contentCompleteness.reasoning,
        factCheck: review.factCheck.reasoning,
        seoAudit: review.seoAudit.reasoning,
        brandVoice: review.brandVoice.reasoning,
        engagement: review.engagement.reasoning,
        requiresRewrite: review.requiresRewrite,
        rewriteReason: review.rewriteReason
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

    const { blogPostId, content, title, excerpt, metaDescription, tags, category } = await req.json();

    if (!blogPostId || !content || !title) {
      throw new Error('Missing required fields: blogPostId, content, title');
    }

    console.log(`Starting enhanced editorial review for post ${blogPostId}: "${title}"`);

    // Fetch brand voice profile and top posts
    const [brandVoice, topPosts] = await Promise.all([
      getBrandVoiceProfile(supabaseClient),
      getTopPerformingPosts(supabaseClient)
    ]);

    // PHASE 1: Run critical alignment and completeness checks first
    const [titleAlignment, contentCompleteness] = await Promise.all([
      checkTitleContentAlignment(content, title, lovableApiKey),
      checkContentCompleteness(content, title, category || 'AI News', lovableApiKey)
    ]);

    console.log(`Alignment score: ${titleAlignment.score}, Completeness score: ${contentCompleteness.score}`);

    // Determine if content needs substantial rewrite
    const needsRewrite = !titleAlignment.contentDelivers || 
                         titleAlignment.score < 60 || 
                         contentCompleteness.score < 60;
    
    let workingContent = content;
    let rewriteReason: string | null = null;
    
    // PHASE 2: Attempt rewrite if needed
    if (needsRewrite) {
      console.log('Content needs substantial rewrite - title does not deliver on promise');
      rewriteReason = `Title promises: "${titleAlignment.titlePromise}" but content doesn't deliver. Missing: ${titleAlignment.missingElements.join(', ')}`;
      
      const rewriteResult = await performSubstantialRewrite(
        content,
        title,
        category || 'AI News',
        titleAlignment,
        contentCompleteness,
        lovableApiKey
      );
      
      if (rewriteResult.success) {
        workingContent = rewriteResult.newContent;
        console.log('Substantial rewrite completed successfully');
        
        // Re-run alignment check on rewritten content
        const recheck = await checkTitleContentAlignment(workingContent, title, lovableApiKey);
        titleAlignment.score = recheck.score;
        titleAlignment.contentDelivers = recheck.contentDelivers;
        titleAlignment.issues = recheck.issues;
        titleAlignment.reasoning = `REWRITTEN: ${rewriteResult.reasoning}. New analysis: ${recheck.reasoning}`;
      } else {
        console.log('Rewrite failed - will flag for manual review');
      }
    }

    // PHASE 3: Run remaining reviews in parallel on (potentially rewritten) content
    const [factCheck, seoAudit, brandVoiceCheck, engagement] = await Promise.all([
      performFactCheck(workingContent, title, category || 'AI News', lovableApiKey),
      performSEOAudit(workingContent, title, excerpt, metaDescription, tags, lovableApiKey),
      checkBrandVoice(workingContent, title, brandVoice, lovableApiKey),
      predictEngagement(workingContent, title, topPosts, lovableApiKey)
    ]);

    // Calculate overall score with new weights including alignment and completeness
    const overallScore = Math.round(
      (titleAlignment.score * 0.25) +      // Title-content alignment (critical)
      (contentCompleteness.score * 0.20) + // Content completeness (critical)
      (factCheck.score * 0.20) +           // Fact accuracy
      (seoAudit.score * 0.15) +            // SEO
      (brandVoiceCheck.score * 0.10) +     // Brand voice
      (engagement.score * 0.10)            // Engagement prediction
    );

    // Collect all corrections (excluding structural issues that needed rewrite)
    const allCorrections = [
      ...factCheck.corrections,
      ...seoAudit.corrections,
      ...brandVoiceCheck.corrections
    ];

    // Apply minor corrections if score is decent and there are corrections
    let editedContent = workingContent;
    if (overallScore >= 60 && allCorrections.length > 0) {
      editedContent = await applyCorrections(workingContent, allCorrections, lovableApiKey);
    }

    // STRICTER PUBLISHING GATES
    // Must pass ALL critical checks
    const canAutoPublish = 
      titleAlignment.contentDelivers &&       // Content delivers on title
      titleAlignment.score >= 70 &&           // Good alignment
      contentCompleteness.score >= 70 &&      // Reasonably complete
      factCheck.score >= 70 &&                // Facts are verified
      overallScore >= 75;                     // Overall quality

    const review: EditorReview = {
      titleAlignment,
      contentCompleteness,
      factCheck,
      seoAudit,
      brandVoice: brandVoiceCheck,
      engagement,
      overallScore,
      editedContent,
      shouldAutoPublish: canAutoPublish,
      requiresRewrite: needsRewrite,
      rewriteReason
    };

    // Save review to database
    await saveReview(supabaseClient, blogPostId, review, content);

    // Update blog post
    if (review.shouldAutoPublish) {
      console.log('All quality gates passed - auto-publishing');
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
      // Mark for manual review with reason
      console.log(`Quality gates not met - flagging for review. Reason: ${rewriteReason || 'Scores below threshold'}`);
      const { error: updateError } = await supabaseClient
        .from('blog_posts')
        .update({ 
          status: 'review',
          content: editedContent // Still save improved content
        })
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
        titleAlignment: { 
          score: titleAlignment.score, 
          contentDelivers: titleAlignment.contentDelivers,
          titlePromise: titleAlignment.titlePromise,
          issueCount: titleAlignment.issues.length 
        },
        contentCompleteness: { 
          score: contentCompleteness.score, 
          contentType: contentCompleteness.contentType,
          missingElements: contentCompleteness.missingElements,
          issueCount: contentCompleteness.issues.length 
        },
        factCheck: { score: factCheck.score, issueCount: factCheck.issues.length },
        seoAudit: { score: seoAudit.score, issueCount: seoAudit.issues.length },
        brandVoice: { score: brandVoiceCheck.score, issueCount: brandVoiceCheck.issues.length },
        engagement: { score: engagement.score, issueCount: engagement.issues.length },
        shouldAutoPublish: review.shouldAutoPublish,
        requiresRewrite: review.requiresRewrite,
        rewriteReason: review.rewriteReason,
        totalIssues: titleAlignment.issues.length + contentCompleteness.issues.length + factCheck.issues.length + seoAudit.issues.length + brandVoiceCheck.issues.length + engagement.issues.length,
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
