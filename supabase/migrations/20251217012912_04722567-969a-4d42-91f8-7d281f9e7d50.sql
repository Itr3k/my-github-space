-- Fix blog_posts SELECT policy to only show published posts
DROP POLICY IF EXISTS "Public blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Public can view published blog posts" ON public.blog_posts 
FOR SELECT USING (status = 'published');