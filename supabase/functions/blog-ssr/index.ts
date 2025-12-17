import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Strip HTML tags for plain text extraction
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Escape HTML entities for safe embedding
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Escape JSON string for embedding in script tag
function escapeJsonString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response('Missing slug parameter', { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`[blog-ssr] Fetching post with slug: ${slug}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the blog post
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error('[blog-ssr] Database error:', error);
      return new Response('Database error', { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    if (!post) {
      console.log(`[blog-ssr] Post not found for slug: ${slug}`);
      return new Response('Post not found', { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    console.log(`[blog-ssr] Found post: ${post.title}`);

    // Extract plain text from HTML content for articleBody
    const plainTextContent = post.content ? stripHtml(post.content) : post.excerpt;
    const canonicalUrl = `https://elevatedai.co/blog/${post.slug}`;
    const imageUrl = post.image.startsWith('http') ? post.image : `https://elevatedai.co${post.image}`;

    // Build JSON-LD schema
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.meta_description || post.excerpt,
      "image": imageUrl,
      "datePublished": post.date || post.created_at,
      "dateModified": post.created_at,
      "author": {
        "@type": "Person",
        "name": post.author_name || "Elevated AI Team",
        "jobTitle": post.author_role || "AI Consulting Experts"
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
      "articleBody": plainTextContent,
      "keywords": post.meta_keywords || (post.tags ? post.tags.join(', ') : ''),
      "wordCount": plainTextContent.split(/\s+/).length,
      "articleSection": post.category
    };

    // Build the complete HTML response
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | Elevated AI Blog</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="${escapeHtml(post.meta_description || post.excerpt)}">
  <meta name="keywords" content="${escapeHtml(post.meta_keywords || (post.tags ? post.tags.join(', ') : ''))}">
  <meta name="author" content="${escapeHtml(post.author_name || 'Elevated AI Team')}">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph Tags -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.meta_description || post.excerpt)}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Elevated AI">
  <meta property="article:published_time" content="${post.date || post.created_at}">
  <meta property="article:author" content="${escapeHtml(post.author_name || 'Elevated AI Team')}">
  <meta property="article:section" content="${escapeHtml(post.category)}">
  ${post.tags ? post.tags.map((tag: string) => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n  ') : ''}
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.meta_description || post.excerpt)}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  
  <!-- Basic Styling for Readability -->
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.7;
      color: #1a1a2e;
      background: #fafafa;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    header { margin-bottom: 2rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 1rem; }
    .meta { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
    .category { 
      display: inline-block;
      background: #6366f1;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      margin-right: 1rem;
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #1a1a2e; }
    .excerpt { font-size: 1.1rem; color: #444; font-style: italic; margin-bottom: 1.5rem; }
    .featured-image { width: 100%; max-height: 400px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 2rem; }
    article h2 { font-size: 1.5rem; margin: 2rem 0 1rem; color: #1a1a2e; }
    article h3 { font-size: 1.25rem; margin: 1.5rem 0 0.75rem; color: #333; }
    article p { margin-bottom: 1rem; }
    article ul, article ol { margin: 1rem 0; padding-left: 2rem; }
    article li { margin-bottom: 0.5rem; }
    article blockquote { 
      border-left: 4px solid #6366f1;
      padding-left: 1rem;
      margin: 1.5rem 0;
      color: #555;
      font-style: italic;
    }
    article strong { color: #1a1a2e; }
    article a { color: #6366f1; }
    .tags { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; }
    .tag { 
      display: inline-block;
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 0.85rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      color: #555;
    }
    footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; color: #666; font-size: 0.9rem; }
    footer a { color: #6366f1; text-decoration: none; }
    .cta { 
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-top: 2rem;
      text-align: center;
    }
    .cta a { color: white; font-weight: bold; }
    .redirect-notice {
      background: #f0f4ff;
      border: 1px solid #c7d2fe;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      font-size: 0.9rem;
      color: #4338ca;
    }
  </style>
</head>
<body>
  <div class="redirect-notice">
    <strong>Note:</strong> You are viewing the static version of this article. 
    <a href="${canonicalUrl}">Click here for the full interactive experience →</a>
  </div>

  <header>
    <div class="meta">
      <span class="category">${escapeHtml(post.category)}</span>
      <span>${post.date || new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <span> · ${escapeHtml(post.read_time)}</span>
    </div>
    <h1>${escapeHtml(post.title)}</h1>
    <p class="excerpt">${escapeHtml(post.excerpt)}</p>
    <p class="meta">By ${escapeHtml(post.author_name || 'Elevated AI Team')}, ${escapeHtml(post.author_role || 'AI Consulting Experts')}</p>
  </header>

  ${post.image ? `<img src="${imageUrl}" alt="${escapeHtml(post.title)}" class="featured-image">` : ''}

  <article>
    ${post.content || `<p>${escapeHtml(post.excerpt)}</p>`}
  </article>

  ${post.tags && post.tags.length > 0 ? `
  <div class="tags">
    <strong>Topics:</strong>
    ${post.tags.map((tag: string) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
  </div>
  ` : ''}

  <div class="cta">
    <p>Ready to transform your business with AI?</p>
    <p><a href="https://elevatedai.co/book-consultation">Book a Free Consultation →</a></p>
  </div>

  <footer>
    <p>© ${new Date().getFullYear()} <a href="https://elevatedai.co">Elevated AI</a> - Enterprise AI Consulting</p>
    <p>
      <a href="https://elevatedai.co/blog">More Articles</a> · 
      <a href="https://elevatedai.co/solutions">Our Solutions</a> · 
      <a href="https://elevatedai.co/contact">Contact Us</a>
    </p>
  </footer>

  <!-- Redirect JavaScript-enabled browsers to the SPA version after a short delay -->
  <script>
    // Only redirect if this appears to be a regular browser visit, not a crawler
    const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|slurp|baidu/i.test(navigator.userAgent);
    const isChatGPT = /ChatGPT|GPTBot/i.test(navigator.userAgent);
    
    if (!isBot && !isChatGPT) {
      // Regular user - redirect to SPA for better experience
      setTimeout(function() {
        window.location.replace('${canonicalUrl}');
      }, 100);
    }
  </script>

  <noscript>
    <p>For the best experience, please <a href="${canonicalUrl}">visit the full article</a> with JavaScript enabled.</p>
  </noscript>
</body>
</html>`;

    console.log(`[blog-ssr] Successfully rendered HTML for: ${post.title}`);

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('[blog-ssr] Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Server error: ${errorMessage}`, { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
});
