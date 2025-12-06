-- Drop the public SELECT policy on blog_analytics
DROP POLICY IF EXISTS "Public can view blog analytics" ON public.blog_analytics;

-- Create restrictive SELECT policy - no public access
CREATE POLICY "No public access to blog analytics" 
ON public.blog_analytics 
FOR SELECT 
USING (false);