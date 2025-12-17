import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SUPABASE_URL = 'https://cqvpzkvrsdxytdohmenq.supabase.co/functions/v1';

export default function SSRLinkGenerator() {
  const [inputUrl, setInputUrl] = useState('');
  const [ssrUrl, setSsrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convertUrl = () => {
    setError('');
    setSsrUrl('');
    
    try {
      const url = new URL(inputUrl.includes('://') ? inputUrl : `https://${inputUrl}`);
      const path = url.pathname;
      
      // Blog post pattern: /blog/[slug]
      const blogMatch = path.match(/^\/blog\/([^\/]+)$/);
      if (blogMatch && blogMatch[1] && !blogMatch[1].match(/^\d+$/)) {
        setSsrUrl(`${SUPABASE_URL}/blog-ssr?slug=${encodeURIComponent(blogMatch[1])}`);
        return;
      }
      
      // Case study pattern: /case-studies/[id]
      const caseMatch = path.match(/^\/case-studies\/([^\/]+)$/);
      if (caseMatch && caseMatch[1]) {
        setSsrUrl(`${SUPABASE_URL}/case-study-ssr?id=${encodeURIComponent(caseMatch[1])}`);
        return;
      }
      
      setError('URL must be a blog post (/blog/[slug]) or case study (/case-studies/[id])');
    } catch {
      setError('Please enter a valid URL');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(ssrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">SSR Link Generator</CardTitle>
            <CardDescription>
              Convert blog or case study URLs to AI-readable SSR versions for ChatGPT, Claude, and other AI tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://elevatedai.co/blog/your-post-slug"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && convertUrl()}
                className="flex-1"
              />
              <Button onClick={convertUrl}>Convert</Button>
            </div>
            
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            
            {ssrUrl && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">AI-Readable URL:</p>
                <div className="flex gap-2">
                  <Input value={ssrUrl} readOnly className="flex-1 text-xs" />
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={ssrUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border/50">
              <p><strong>Supported URL patterns:</strong></p>
              <p>• Blog: elevatedai.co/blog/[post-slug]</p>
              <p>• Case Studies: elevatedai.co/case-studies/[case-id]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
