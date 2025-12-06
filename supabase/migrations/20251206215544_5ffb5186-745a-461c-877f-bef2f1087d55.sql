-- Drop the vulnerable SELECT policy that exposes PII to any authenticated user
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON public.contact_submissions;

-- Create restrictive SELECT policy - no frontend access allowed
CREATE POLICY "No frontend access to contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (false);

-- Create INSERT policy for edge function (uses service role)
CREATE POLICY "Service role can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);