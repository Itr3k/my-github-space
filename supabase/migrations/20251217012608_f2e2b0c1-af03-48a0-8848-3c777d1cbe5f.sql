-- Fix blog_posts policies - change from permissive true to restrictive false
DROP POLICY IF EXISTS "Service role can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Service role can update blog posts" ON public.blog_posts;
CREATE POLICY "Service role only insert blog posts" ON public.blog_posts FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update blog posts" ON public.blog_posts FOR UPDATE USING (false);

-- Fix editor_reviews policies
DROP POLICY IF EXISTS "Service can insert editor reviews" ON public.editor_reviews;
DROP POLICY IF EXISTS "Service can update editor reviews" ON public.editor_reviews;
CREATE POLICY "Service role only insert editor reviews" ON public.editor_reviews FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update editor reviews" ON public.editor_reviews FOR UPDATE USING (false);

-- Fix blog_analytics policies
DROP POLICY IF EXISTS "Service can insert blog analytics" ON public.blog_analytics;
DROP POLICY IF EXISTS "Service can update blog analytics" ON public.blog_analytics;
CREATE POLICY "Service role only insert blog analytics" ON public.blog_analytics FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update blog analytics" ON public.blog_analytics FOR UPDATE USING (false);

-- Fix brand_voice_profile policies
DROP POLICY IF EXISTS "Service can insert brand voice profile" ON public.brand_voice_profile;
DROP POLICY IF EXISTS "Service can update brand voice profile" ON public.brand_voice_profile;
CREATE POLICY "Service role only insert brand voice profile" ON public.brand_voice_profile FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update brand voice profile" ON public.brand_voice_profile FOR UPDATE USING (false);

-- Fix topic_recommendations policies
DROP POLICY IF EXISTS "Service can insert topic recommendations" ON public.topic_recommendations;
DROP POLICY IF EXISTS "Service can update topic recommendations" ON public.topic_recommendations;
CREATE POLICY "Service role only insert topic recommendations" ON public.topic_recommendations FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update topic recommendations" ON public.topic_recommendations FOR UPDATE USING (false);

-- Fix contact_submissions INSERT policy (keep restrictive - service role bypasses RLS anyway)
DROP POLICY IF EXISTS "Service role can insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Service role only insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (false);