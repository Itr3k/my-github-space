import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJsonString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Missing case study id parameter', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`[case-study-ssr] Fetching case study with id: ${id}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: caseStudy, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[case-study-ssr] Database error:`, error);
      return new Response('Case study not found', { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    if (!caseStudy) {
      console.log(`[case-study-ssr] Case study not found for id: ${id}`);
      return new Response('Case study not found', { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`[case-study-ssr] Found case study: ${caseStudy.client}`);

    // Build the full content for AI crawlers
    const fullContent = `
Client: ${caseStudy.client}
Category: ${caseStudy.category}

${caseStudy.headline}

Challenge:
${caseStudy.challenge}

Solution:
${caseStudy.solution}

Results:
${caseStudy.results}

${caseStudy.full_description || ''}
    `.trim();

    const title = `${caseStudy.client} Case Study - ${caseStudy.headline}`;
    const description = caseStudy.challenge.substring(0, 160);
    const canonicalUrl = `https://elevatedai.co/case-studies/${caseStudy.id}`;
    const imageUrl = caseStudy.image.startsWith('http') ? caseStudy.image : `https://elevatedai.co${caseStudy.image}`;

    // Build stats text if available
    let statsText = '';
    if (caseStudy.stats && Array.isArray(caseStudy.stats)) {
      statsText = caseStudy.stats.map((stat: { value: string; label: string }) => 
        `${stat.value} - ${stat.label}`
      ).join('\n');
    }

    // JSON-LD structured data for case study
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": escapeJsonString(title),
      "description": escapeJsonString(description),
      "image": imageUrl,
      "author": {
        "@type": "Organization",
        "name": "Elevated AI",
        "url": "https://elevatedai.co"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Elevated AI",
        "url": "https://elevatedai.co",
        "logo": {
          "@type": "ImageObject",
          "url": "https://elevatedai.co/favicon.ico"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "articleBody": escapeJsonString(fullContent),
      "about": {
        "@type": "Organization",
        "name": caseStudy.client
      },
      "keywords": `${caseStudy.category}, AI consulting, case study, ${caseStudy.client}`
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Elevated AI</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${caseStudy.category}, AI consulting, case study, ${escapeHtml(caseStudy.client)}, enterprise AI">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:site_name" content="Elevated AI">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
    h1 { color: #1a1a2e; font-size: 2rem; margin-bottom: 0.5rem; }
    .client { color: #6366f1; font-size: 1.25rem; margin-bottom: 1rem; }
    .category { background: #6366f1; color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.875rem; display: inline-block; margin-bottom: 1.5rem; }
    .section { margin-bottom: 2rem; }
    .section h2 { color: #1a1a2e; font-size: 1.25rem; border-bottom: 2px solid #6366f1; padding-bottom: 0.5rem; }
    .stats { display: flex; gap: 2rem; flex-wrap: wrap; margin: 1.5rem 0; padding: 1rem; background: #f8f9fa; border-radius: 8px; }
    .stat { text-align: center; }
    .stat-value { font-size: 1.5rem; font-weight: bold; color: #6366f1; }
    .stat-label { font-size: 0.875rem; color: #666; }
    .content { white-space: pre-wrap; }
    a { color: #6366f1; }
  </style>
</head>
<body>
  <article>
    <p class="client">${escapeHtml(caseStudy.client)}</p>
    <span class="category">${escapeHtml(caseStudy.category)}</span>
    <h1>${escapeHtml(caseStudy.headline)}</h1>
    
    ${statsText ? `
    <div class="stats">
      ${caseStudy.stats.map((stat: { value: string; label: string }) => `
        <div class="stat">
          <div class="stat-value">${escapeHtml(stat.value)}</div>
          <div class="stat-label">${escapeHtml(stat.label)}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    <div class="section">
      <h2>Challenge</h2>
      <p>${escapeHtml(caseStudy.challenge)}</p>
    </div>
    
    <div class="section">
      <h2>Solution</h2>
      <p>${escapeHtml(caseStudy.solution)}</p>
    </div>
    
    <div class="section">
      <h2>Results</h2>
      <p>${escapeHtml(caseStudy.results)}</p>
    </div>
    
    ${caseStudy.full_description ? `
    <div class="section">
      <h2>Full Description</h2>
      <div class="content">${escapeHtml(caseStudy.full_description)}</div>
    </div>
    ` : ''}
    
    <p><a href="${canonicalUrl}">View full case study on Elevated AI</a></p>
  </article>
  
  <script>
    // Redirect browsers to SPA version, but let bots read the content
    const isBot = /bot|crawl|spider|slurp|bing|google|facebook|twitter|linkedin|pinterest|gptbot|chatgpt|claude|perplexity|anthropic/i.test(navigator.userAgent);
    if (!isBot && window.location.hostname !== 'localhost') {
      setTimeout(() => {
        window.location.href = '${canonicalUrl}';
      }, 100);
    }
  </script>
  
  <noscript>
    <p>For the best experience, please <a href="${canonicalUrl}">visit our website</a>.</p>
  </noscript>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });

  } catch (error) {
    console.error('[case-study-ssr] Unexpected error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
});
