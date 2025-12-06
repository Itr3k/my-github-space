-- Extend blog_posts table with additional fields for AI-generated content
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Elevated AI Team',
ADD COLUMN IF NOT EXISTS author_role text DEFAULT 'AI Consulting Experts',
ADD COLUMN IF NOT EXISTS author_image text DEFAULT '/placeholder.svg',
ADD COLUMN IF NOT EXISTS views integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS date text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled')),
ADD COLUMN IF NOT EXISTS scheduled_for timestamp with time zone,
ADD COLUMN IF NOT EXISTS color text DEFAULT 'text-primary',
ADD COLUMN IF NOT EXISTS bg text DEFAULT 'bg-primary/10',
ADD COLUMN IF NOT EXISTS border text DEFAULT 'border-primary/20';

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to blog images
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow service role to upload blog images (for edge functions)
CREATE POLICY "Service role can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Allow service role to update blog images
CREATE POLICY "Service role can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images');

-- Allow service role to delete blog images
CREATE POLICY "Service role can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images');

-- Create INSERT policy for blog_posts (for edge function to create posts)
CREATE POLICY "Service role can insert blog posts"
ON public.blog_posts FOR INSERT
WITH CHECK (true);

-- Create UPDATE policy for blog_posts
CREATE POLICY "Service role can update blog posts"
ON public.blog_posts FOR UPDATE
USING (true);

-- Enable pg_cron and pg_net extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;