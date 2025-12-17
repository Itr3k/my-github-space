import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReviewResult {
  postId: number;
  title: string;
  status: 'passed' | 'rewritten' | 'flagged' | 'error';
  issues: string[];
  scores: {
    alignment: number;
    completeness: number;
    factCheck: number;
    brandVoice: number;
    overall: number;
  };
  rewritten: boolean;
  error?: string;
}

// Check title-content alignment
async function checkTitleContentAlignment(content: string, title: string, lovableApiKey: string): Promise<{ score: number; aligned: boolean; issues: string[] }> {
  console.log(`Checking title-content alignment for: "${title}"`);
  
  const response = await fetch('https://ai.lovable.dev/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are a content quality analyst. Analyze whether the blog post content delivers on its title's promise.

Return JSON format:
{
  "score": 0-100,
  "aligned": true/false,
  "titlePromise": "what the title promises",
  "contentDelivers": "what the content actually delivers",
  "gaps": ["list of gaps between promise and delivery"],
  "issues": ["specific issues to fix"]
}`
        },
        {
          role: 'user',
          content: `TITLE: ${title}

CONTENT:
${content.substring(0, 8000)}

Does this content deliver on the title's promise?`
        }
      ],
    }),
  });

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || '';
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        score: result.score || 50,
        aligned: result.aligned !== false && result.score >= 70,
        issues: result.issues || result.gaps || []
      };
    }
  } catch (e) {
    console.error('Failed to parse alignment response:', e);
  }
  
  return { score: 50, aligned: true, issues: [] };
}

// Check content completeness
async function checkContentCompleteness(content: string, title: string, category: string, lovableApiKey: string): Promise<{ score: number; complete: boolean; missing: string[] }> {
  console.log(`Checking content completeness for: "${title}"`);
  
  const response = await fetch('https://ai.lovable.dev/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are a content completeness analyst. Based on the title and category, determine what elements this content SHOULD include, then check if they're present.

For "list" or "tools" posts: Should have specific named items with details
For "trends" posts: Should have specific data, statistics, expert quotes
For "case study" posts: Should have real company names, specific metrics
For "how-to" posts: Should have clear steps with examples
For "news" posts: Should have recent events, dates, sources

Return JSON:
{
  "contentType": "list|trends|case-study|how-to|news|general",
  "expectedElements": ["what should be included"],
  "presentElements": ["what IS included"],
  "missingElements": ["what's missing"],
  "score": 0-100,
  "complete": true/false
}`
        },
        {
          role: 'user',
          content: `TITLE: ${title}
CATEGORY: ${category}

CONTENT:
${content.substring(0, 8000)}

What elements are missing from this content?`
        }
      ],
    }),
  });

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || '';
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        score: result.score || 50,
        complete: result.complete !== false && result.score >= 70,
        missing: result.missingElements || []
      };
    }
  } catch (e) {
    console.error('Failed to parse completeness response:', e);
  }
  
  return { score: 50, complete: true, missing: [] };
}

// Perform fact check with research
async function performFactCheck(content: string, title: string, lovableApiKey: string): Promise<{ score: number; issues: string[] }> {
  console.log(`Performing fact check for: "${title}"`);
  
  const response = await fetch('https://ai.lovable.dev/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro',
      messages: [
        {
          role: 'system',
          content: `You are a fact-checker with access to current information. Review the blog post for:

1. Unsupported statistical claims (e.g., "AI increases productivity by 40%")
2. Vague assertions that should have specifics
3. Outdated information
4. Generic claims that could apply to anything
5. Missing sources for specific data points

Return JSON:
{
  "score": 0-100,
  "accurateStatements": ["list of verified accurate statements"],
  "questionableClaims": ["claims that need verification or sources"],
  "genericContent": ["vague statements that should be specific"],
  "issues": ["specific problems to fix"]
}`
        },
        {
          role: 'user',
          content: `TITLE: ${title}

CONTENT:
${content.substring(0, 8000)}

Fact-check this content and identify any issues.`
        }
      ],
    }),
  });

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || '';
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      const allIssues = [
        ...(result.issues || []),
        ...(result.questionableClaims || []),
        ...(result.genericContent || [])
      ];
      return {
        score: result.score || 50,
        issues: allIssues
      };
    }
  } catch (e) {
    console.error('Failed to parse fact-check response:', e);
  }
  
  return { score: 50, issues: [] };
}

// Check brand voice
async function checkBrandVoice(content: string, brandVoice: any, lovableApiKey: string): Promise<{ score: number; issues: string[] }> {
  if (!brandVoice) return { score: 80, issues: [] };
  
  console.log('Checking brand voice consistency...');
  
  const response = await fetch('https://ai.lovable.dev/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are a brand voice analyst. Compare the content against the brand voice profile.

Brand Voice Profile:
- Tone: ${brandVoice.tone_descriptors?.join(', ') || 'professional, clear'}
- Key phrases: ${brandVoice.key_phrases?.join(', ') || 'none specified'}
- Forbidden terms: ${brandVoice.forbidden_terms?.join(', ') || 'none specified'}
- Writing style: ${brandVoice.writing_style_notes || 'professional business writing'}

Return JSON:
{
  "score": 0-100,
  "matches": ["aspects that match the brand voice"],
  "deviations": ["aspects that deviate from brand voice"],
  "issues": ["specific corrections needed"]
}`
        },
        {
          role: 'user',
          content: `CONTENT:
${content.substring(0, 6000)}

Does this match our brand voice?`
        }
      ],
    }),
  });

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || '';
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        score: result.score || 70,
        issues: result.issues || result.deviations || []
      };
    }
  } catch (e) {
    console.error('Failed to parse brand voice response:', e);
  }
  
  return { score: 70, issues: [] };
}

// Perform substantial rewrite
async function performSubstantialRewrite(
  content: string,
  title: string,
  category: string,
  issues: string[],
  lovableApiKey: string
): Promise<string> {
  console.log(`Performing substantial rewrite for: "${title}"`);
  
  const response = await fetch('https://ai.lovable.dev/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro',
      messages: [
        {
          role: 'system',
          content: `You are an expert business content writer for Elevated AI, an AI consulting firm in Los Angeles. 

CRITICAL REQUIREMENTS:
1. Use REAL, SPECIFIC examples - actual company names, real tools, real statistics with sources
2. Every claim must be verifiable or clearly marked as an estimate/projection
3. Include specific details: names, numbers, dates, features
4. Match the title's promise exactly
5. Write in a professional but accessible tone
6. Use proper HTML formatting with h2, h3, p, ul, li tags
7. Include a strong introduction and conclusion
8. Target 1200-1800 words

ISSUES TO FIX:
${issues.join('\n')}

Return ONLY the rewritten HTML content, no explanations.`
        },
        {
          role: 'user',
          content: `TITLE: ${title}
CATEGORY: ${category}

ORIGINAL CONTENT:
${content}

Rewrite this content to fix all issues and deliver on the title's promise with specific, real information.`
        }
      ],
    }),
  });

  const data = await response.json();
  const rewrittenContent = data.choices?.[0]?.message?.content || '';
  
  // Clean up the response
  let cleanContent = rewrittenContent
    .replace(/```html\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  
  // Ensure it starts with proper HTML
  if (!cleanContent.startsWith('<')) {
    cleanContent = `<p>${cleanContent}`;
  }
  
  return cleanContent;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key
    const authHeader = req.headers.get('Authorization');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!authHeader || !authHeader.includes(serviceRoleKey || '')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { dryRun = true } = await req.json().catch(() => ({}));
    
    console.log(`Starting batch review (dryRun: ${dryRun})`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseClient = createClient(supabaseUrl, serviceRoleKey!);
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Fetch brand voice profile
    const { data: brandVoice } = await supabaseClient
      .from('brand_voice_profile')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Fetch all published blog posts
    const { data: posts, error: postsError } = await supabaseClient
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: true });

    if (postsError) throw postsError;

    console.log(`Found ${posts?.length || 0} published posts to review`);

    const results: ReviewResult[] = [];

    for (const post of posts || []) {
      console.log(`\n========== Reviewing post ${post.id}: "${post.title}" ==========`);
      
      try {
        // Run all checks
        const [alignmentResult, completenessResult, factCheckResult, brandVoiceResult] = await Promise.all([
          checkTitleContentAlignment(post.content || '', post.title, lovableApiKey),
          checkContentCompleteness(post.content || '', post.title, post.category, lovableApiKey),
          performFactCheck(post.content || '', post.title, lovableApiKey),
          checkBrandVoice(post.content || '', brandVoice, lovableApiKey),
        ]);

        const overallScore = Math.round(
          (alignmentResult.score * 0.30) +
          (completenessResult.score * 0.30) +
          (factCheckResult.score * 0.25) +
          (brandVoiceResult.score * 0.15)
        );

        const allIssues = [
          ...alignmentResult.issues,
          ...completenessResult.missing.map(m => `Missing: ${m}`),
          ...factCheckResult.issues,
          ...brandVoiceResult.issues,
        ];

        console.log(`Scores - Alignment: ${alignmentResult.score}, Completeness: ${completenessResult.score}, FactCheck: ${factCheckResult.score}, BrandVoice: ${brandVoiceResult.score}, Overall: ${overallScore}`);
        console.log(`Issues found: ${allIssues.length}`);

        // Determine if rewrite is needed
        const needsRewrite = !alignmentResult.aligned || !completenessResult.complete || overallScore < 70;
        
        let status: ReviewResult['status'] = 'passed';
        let rewritten = false;

        if (needsRewrite) {
          console.log(`Post needs rewrite - alignment: ${alignmentResult.aligned}, completeness: ${completenessResult.complete}, score: ${overallScore}`);
          
          if (!dryRun) {
            // Perform rewrite
            const rewrittenContent = await performSubstantialRewrite(
              post.content || '',
              post.title,
              post.category,
              allIssues,
              lovableApiKey
            );

            if (rewrittenContent && rewrittenContent.length > 500) {
              // Update the post
              const { error: updateError } = await supabaseClient
                .from('blog_posts')
                .update({ content: rewrittenContent })
                .eq('id', post.id);

              if (updateError) {
                console.error(`Failed to update post ${post.id}:`, updateError);
                status = 'error';
              } else {
                console.log(`Successfully rewrote post ${post.id}`);
                status = 'rewritten';
                rewritten = true;
              }

              // Save review record
              await supabaseClient.from('editor_reviews').insert({
                blog_post_id: post.id,
                review_type: 'batch_review',
                original_content: post.content,
                edited_content: rewrittenContent,
                score: overallScore,
                issues_found: allIssues,
                corrections_made: ['Substantial rewrite performed'],
                ai_reasoning: `Alignment: ${alignmentResult.score}, Completeness: ${completenessResult.score}, FactCheck: ${factCheckResult.score}`,
              });
            } else {
              status = 'flagged';
            }
          } else {
            status = 'flagged';
          }
        }

        results.push({
          postId: post.id,
          title: post.title,
          status,
          issues: allIssues,
          scores: {
            alignment: alignmentResult.score,
            completeness: completenessResult.score,
            factCheck: factCheckResult.score,
            brandVoice: brandVoiceResult.score,
            overall: overallScore,
          },
          rewritten,
        });

        // Add delay between posts to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (postError) {
        const errorMessage = postError instanceof Error ? postError.message : 'Unknown error';
        console.error(`Error reviewing post ${post.id}:`, postError);
        results.push({
          postId: post.id,
          title: post.title,
          status: 'error',
          issues: [],
          scores: { alignment: 0, completeness: 0, factCheck: 0, brandVoice: 0, overall: 0 },
          rewritten: false,
          error: errorMessage,
        });
      }
    }

    // Summary
    const summary = {
      totalPosts: results.length,
      passed: results.filter(r => r.status === 'passed').length,
      rewritten: results.filter(r => r.status === 'rewritten').length,
      flagged: results.filter(r => r.status === 'flagged').length,
      errors: results.filter(r => r.status === 'error').length,
      dryRun,
    };

    console.log('\n========== BATCH REVIEW COMPLETE ==========');
    console.log(JSON.stringify(summary, null, 2));

    return new Response(JSON.stringify({ summary, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Batch review error:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
