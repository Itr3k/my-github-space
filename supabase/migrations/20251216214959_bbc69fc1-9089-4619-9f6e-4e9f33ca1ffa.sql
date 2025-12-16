-- Restrict brand_voice_profile table access
DROP POLICY IF EXISTS "Public can view brand voice profile" ON public.brand_voice_profile;
CREATE POLICY "No public access to brand voice profile" ON public.brand_voice_profile
FOR SELECT USING (false);

-- Restrict topic_recommendations table access  
DROP POLICY IF EXISTS "Public can view topic recommendations" ON public.topic_recommendations;
CREATE POLICY "No public access to topic recommendations" ON public.topic_recommendations
FOR SELECT USING (false);