-- Drop existing permissive policy on editor_reviews
DROP POLICY IF EXISTS "Public can view editor reviews" ON public.editor_reviews;

-- Create restrictive policy blocking all public access
CREATE POLICY "No public access to editor reviews" ON public.editor_reviews
FOR SELECT USING (false);