-- Add explicit DELETE policy to blog_posts
CREATE POLICY "Service role only delete blog posts" ON public.blog_posts FOR DELETE USING (false);

-- Add explicit modification policies to case_studies
CREATE POLICY "Service role only insert case studies" ON public.case_studies FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update case studies" ON public.case_studies FOR UPDATE USING (false);
CREATE POLICY "Service role only delete case studies" ON public.case_studies FOR DELETE USING (false);

-- Add explicit modification policies to downloadable_items
CREATE POLICY "Service role only insert downloadable items" ON public.downloadable_items FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update downloadable items" ON public.downloadable_items FOR UPDATE USING (false);
CREATE POLICY "Service role only delete downloadable items" ON public.downloadable_items FOR DELETE USING (false);

-- Add explicit modification policies to library_items
CREATE POLICY "Service role only insert library items" ON public.library_items FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role only update library items" ON public.library_items FOR UPDATE USING (false);
CREATE POLICY "Service role only delete library items" ON public.library_items FOR DELETE USING (false);